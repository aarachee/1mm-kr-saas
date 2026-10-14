import { NextRequest, NextResponse } from 'next/server'
import { saveGuestLink, findGuestLink } from '@/lib/linkStorage'
import { createClient } from '@/utils/supabase/server'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }
  return trimmed
}

// GET /api/v1/links - API 헬스체크 및 명세 안내
export async function GET() {
  return NextResponse.json({
    name: '1mm.kr Shortened URL API',
    version: 'v1.0.0',
    status: 'operational',
    documentation: 'https://1mm.kr#api-docs',
    endpoints: {
      createLink: 'POST /api/v1/links',
      getLinkStats: 'GET /api/v1/links/[shortCode]'
    }
  })
}

// POST /api/v1/links - 단축 URL 생성 API
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    let apiKey = ''
    if (authHeader && authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.replace('Bearer ', '').trim()
    }

    const body = await req.json().catch(() => ({}))
    const rawUrl = body.url || body.longUrl

    if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
      return NextResponse.json(
        { error: 'Bad Request: "url" 필드에 단축할 URL을 전달해주세요.' },
        { status: 400 }
      )
    }

    // URL 정제 및 추출 (문자열에 여러 줄이 있을 때도 안전하게 URL 추출)
    let cleanUrl = rawUrl.trim()
    const match = rawUrl.match(/(https?:\/\/[^\s]+)/)
    if (match) {
      cleanUrl = match[0]
    }
    const longUrl = normalizeUrl(cleanUrl)

    // 커스텀 단축어 (선택)
    let shortCode = (body.customCode || body.slug || '').trim()
    if (shortCode) {
      if (!/^[a-zA-Z0-9-_가-힣]+$/.test(shortCode)) {
        return NextResponse.json(
          { error: 'Bad Request: 커스텀 단축어는 한글, 영문, 숫자, 하이픈(-), 언더바(_)만 가능합니다.' },
          { status: 400 }
        )
      }
      const existing = findGuestLink(shortCode)
      if (existing) {
        return NextResponse.json(
          { error: `Conflict: 이미 사용 중인 단축어입니다: ${shortCode}` },
          { status: 409 }
        )
      }
    } else {
      shortCode = generateShortCode()
      while (findGuestLink(shortCode)) {
        shortCode = generateShortCode()
      }
    }

    // Supabase 및 로컬 스토리지에 저장
    let userId: string | null = null
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        userId = user.id
        await supabase.from('links').insert([
          {
            user_id: user.id,
            long_url: longUrl,
            short_code: shortCode,
            pixel_id: body.pixelId || null
          }
        ])
      }
    } catch {
      // Supabase 미연결 시 로컬 스토리지로 정상 처리
    }

    saveGuestLink({
      short_code: shortCode,
      long_url: longUrl,
      pixel_id: body.pixelId || null,
      user_id: userId
    })

    const host = req.headers.get('host') || '1mm.kr'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const shortUrl = `${protocol}://${host}/${shortCode}`

    return NextResponse.json(
      {
        success: true,
        shortCode,
        shortUrl,
        longUrl,
        createdAt: new Date().toISOString()
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('API /api/v1/links error:', err)
    return NextResponse.json(
      { error: 'Internal Server Error: 단축 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
