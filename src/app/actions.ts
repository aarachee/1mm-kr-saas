'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { saveGuestLink, findGuestLink, incrementGuestLinkLikes, claimGuestLinksForUser } from '@/lib/linkStorage'

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

export async function createShortLink(formData: FormData): Promise<{ 
  error?: string
  success?: boolean
  shortCode?: string
  shortUrl?: string
  longUrl?: string
  isGuest?: boolean
}> {
  const rawLongUrl = formData.get('longUrl') as string
  const rawLongUrlB = formData.get('longUrlB') as string
  const pixelId = formData.get('pixelId') as string
  const customCode = (formData.get('customCode') || formData.get('shortCode')) as string

  if (!rawLongUrl || rawLongUrl.trim().length === 0) {
    return { error: '단축할 URL을 입력해주세요.' }
  }

  // 카카오톡/쿠팡 앱 등에서 공유하기 문구 전체를 붙여넣었을 때도 URL을 자동 추출
  let cleanUrlA = rawLongUrl.trim()
  const matchA = rawLongUrl.match(/(https?:\/\/[^\s]+)/)
  if (matchA) {
    cleanUrlA = matchA[0]
  }

  let cleanUrlB = rawLongUrlB ? rawLongUrlB.trim() : null
  if (cleanUrlB) {
    const matchB = cleanUrlB.match(/(https?:\/\/[^\s]+)/)
    if (matchB) {
      cleanUrlB = matchB[0]
    }
  }

  const longUrl = normalizeUrl(cleanUrlA)
  const longUrlB = cleanUrlB ? normalizeUrl(cleanUrlB) : null

  // 커스텀 단축어가 있으면 검증 후 사용, 없으면 랜덤 6자리
  let shortCode = customCode ? customCode.trim() : generateShortCode()
  if (customCode && !/^[a-zA-Z0-9-_가-힣]+$/.test(shortCode)) {
    return { error: '단축어는 한글, 영문, 숫자, 하이픈(-), 언더바(_)만 가능합니다.' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // 1. 로그인 사용자의 경우: Supabase에 저장
      const { error } = await supabase
        .from('links')
        .insert([
          { 
            user_id: user.id, 
            long_url: longUrl, 
            long_url_b: longUrlB,
            short_code: shortCode, 
            pixel_id: pixelId || null 
          }
        ])

      if (error) {
        console.error('Supabase link insert error:', error)
        if (error.code === '23505') {
          return { error: `이미 사용 중인 단축 주소입니다: ${shortCode}` }
        }
        // Supabase 에러 시 로컬 스토리지로 fallback 저장
        saveGuestLink({
          short_code: shortCode,
          long_url: longUrl,
          long_url_b: longUrlB,
          pixel_id: pixelId || null,
          user_id: user.id
        })
      } else {
        // 캐싱 용도로 로컬에도 기록
        saveGuestLink({
          short_code: shortCode,
          long_url: longUrl,
          long_url_b: longUrlB,
          pixel_id: pixelId || null,
          user_id: user.id
        })
      }

      revalidatePath('/dashboard')
      revalidatePath('/')
      return { 
        success: true, 
        shortCode, 
        shortUrl: `/${shortCode}`,
        longUrl,
        isGuest: false 
      }
    } else {
      // 2. 비로그인(게스트/일반인)의 경우: 즉시 무료 단축 링크 생성
      const existing = findGuestLink(shortCode)
      if (existing) {
        shortCode = generateShortCode()
      }

      saveGuestLink({
        short_code: shortCode,
        long_url: longUrl,
        long_url_b: longUrlB,
        pixel_id: pixelId || null,
        user_id: null
      })

      revalidatePath('/dashboard')
      revalidatePath('/')
      return { 
        success: true, 
        shortCode, 
        shortUrl: `/${shortCode}`,
        longUrl,
        isGuest: true 
      }
    }
  } catch (err: any) {
    console.error('createShortLink error:', err)
    // 예외 발생 시에도 게스트 저장소로 안전하게 처리
    saveGuestLink({
      short_code: shortCode,
      long_url: longUrl,
      long_url_b: longUrlB,
      pixel_id: pixelId || null,
      user_id: null
    })

    return { 
      success: true, 
      shortCode, 
      shortUrl: `/${shortCode}`,
      longUrl,
      isGuest: true 
    }
  }
}

export async function createMultiLinkProfile(data: {
  shortCode: string
  storeName: string
  storeDesc?: string
  storeCategory?: string
  buttons: Array<{
    platform: 'daangn' | 'naver' | 'baemin' | 'instagram' | 'call' | 'custom'
    label: string
    url: string
    badge?: string
  }>
}): Promise<{ success?: boolean; error?: string; shortCode?: string; shortUrl?: string }> {
  let shortCode = (data.shortCode || '').trim()
  if (!shortCode) {
    shortCode = generateShortCode()
  } else if (!/^[a-zA-Z0-9-_가-힣]+$/.test(shortCode)) {
    return { error: '단축어는 한글, 영문, 숫자, 하이픈(-), 언더바(_)만 가능합니다.' }
  }

  // 기본 목적지 URL 설정 (첫 번째 버튼의 주소)
  const primaryUrl = data.buttons[0]?.url || 'https://daangn.com'

  try {
    saveGuestLink({
      short_code: shortCode,
      long_url: primaryUrl,
      is_multilink: true,
      store_name: data.storeName || '우리 동네 매장',
      store_desc: data.storeDesc || '방문해 주셔서 감사합니다.',
      store_category: data.storeCategory || '로컬 비즈니스',
      buttons: data.buttons,
      user_id: null
    })

    revalidatePath('/dashboard')
    revalidatePath('/')
    return {
      success: true,
      shortCode,
      shortUrl: `/${shortCode}`
    }
  } catch (err: any) {
    console.error('createMultiLinkProfile error:', err)
    return { error: '멀티링크 프로필 생성에 실패했습니다.' }
  }
}

export async function updateShortCode(linkId: number, newCode: string): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  if (!newCode || !/^[a-zA-Z0-9-_가-힣]+$/.test(newCode)) {
    return { error: '한글, 영문, 숫자, 하이픈(-), 언더바(_)만 사용할 수 있습니다.' }
  }

  const { error } = await supabase
    .from('links')
    .update({ short_code: newCode })
    .eq('id', linkId)
    .eq('user_id', user.id) // 보안: 내 링크만 수정 가능

  if (error) {
    if (error.code === '23505') {
      return { error: `이미 다른 사용자가 선점한 주소입니다: ${newCode}` }
    }
    return { error: '주소 변경에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteShortLink(linkId: number): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', linkId)
    .eq('user_id', user.id) // 보안: 내 링크만 삭제 가능

  if (error) {
    console.error("Delete error:", error)
    return { error: '삭제에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateLinkData(linkId: number, formData: FormData): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const longUrl = formData.get('longUrl') as string
  const longUrlB = formData.get('longUrlB') as string
  const pixelId = formData.get('pixelId') as string 

  if (!longUrl) {
    return { error: '원본 URL은 필수입니다.' }
  }

  const { error } = await supabase
    .from('links')
    .update({ 
      long_url: longUrl, 
      long_url_b: longUrlB || null,
      pixel_id: pixelId || null 
    })
    .eq('id', linkId)
    .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return { error: '링크 수정에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function generateDummyClicks(linkId: number, count: number = 50): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  // 내 링크인지 확인
  const { data: link } = await supabase.from('links').select('id').eq('id', linkId).eq('user_id', user.id).single()
  if (!link) return { error: '권한이 없습니다.' }

  const clicks = []
  const now = new Date()

  // 가상의 브라우저 및 기기 데이터셋
  const userAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', // iOS
    'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', // Android
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', // Windows
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', // Mac
  ]
  const referers = [
    'https://www.google.com/',
    'https://m.naver.com/',
    'https://www.instagram.com/',
    'https://www.daangn.com/',
    null
  ]

  for (let i = 0; i < count; i++) {
    // 최근 7일 내의 랜덤 시간
    const randomDaysAgo = Math.random() * 7
    const randomDate = new Date(now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000)
    
    // A/B 테스트 성과 차이를 주기 위해 A: 55%, B: 45% 로 설정 (대략적으로)
    const variant = Math.random() > 0.45 ? 'A' : 'B'

    clicks.push({
      link_id: linkId,
      clicked_at: randomDate.toISOString(),
      user_agent: userAgents[Math.floor(Math.random() * userAgents.length)],
      referrer: referers[Math.floor(Math.random() * referers.length)],
      variant: variant,
      ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`
    })
  }

  const { error } = await supabase.from('clicks').insert(clicks)

  if (error) {
    console.error(error)
    return { error: `더미 데이터 생성에 실패했습니다: ${error.message}` }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function getABTestStats(linkId: number): Promise<{ A: number, B: number, error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { A: 0, B: 0, error: '로그인이 필요합니다.' }

  const { data, error } = await supabase
    .from('clicks')
    .select('variant')
    .eq('link_id', linkId)

  if (error || !data) {
    return { A: 0, B: 0, error: '통계를 불러오지 못했습니다.' }
  }

  let countA = 0
  let countB = 0
  data.forEach(c => {
    if (c.variant === 'A') countA++
    else if (c.variant === 'B') countB++
  })

  return { A: countA, B: countB }
}

// 매장 응원하기(좋아요) 서버 액션
export async function likeStoreAction(shortCode: string): Promise<{ success: boolean; likesCount: number; error?: string }> {
  try {
    const decoded = decodeURIComponent(shortCode)
    const newLikes = incrementGuestLinkLikes(decoded)
    
    // Supabase에도 업데이트 시도 (에러 무시 fallback)
    try {
      const supabase = await createClient()
      const { data: link } = await supabase.from('links').select('id, likes_count').eq('short_code', decoded).single()
      if (link) {
        await supabase.from('links').update({ likes_count: (link.likes_count || 0) + 1 }).eq('id', link.id)
      }
    } catch {
      // Supabase 미설정/에러 시 로컬 저장소 우선
    }

    revalidatePath(`/${encodeURIComponent(decoded)}`)
    revalidatePath('/dashboard')
    return { success: true, likesCount: newLikes }
  } catch (err: any) {
    console.error('likeStoreAction error:', err)
    return { success: false, likesCount: 0, error: '좋아요 처리에 실패했습니다.' }
  }
}

// 비로그인 게스트가 생성했던 링크를 로그인 후 내 계정으로 귀속(Claim)하는 액션
export async function claimGuestLinksAction(shortCodes: string[]): Promise<{ success: boolean; claimedCount: number; error?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, claimedCount: 0, error: '로그인이 필요합니다.' }
    }

    const claimedCount = claimGuestLinksForUser(user.id, shortCodes)
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/links')
    return { success: true, claimedCount }
  } catch (err: any) {
    console.error('claimGuestLinksAction error:', err)
    return { success: false, claimedCount: 0, error: '소유권 이전에 실패했습니다.' }
  }
}

// 상품 URL 메타데이터 파싱 액션 (쿠팡, 네이버 등 OpenGraph 추출)
// 상품 링크/공유문구 통합 분석 및 실제 상품 이미지 검색 액션
export async function extractAndSearchProduct(rawInput: string): Promise<{
  success: boolean
  url: string
  title: string
  platform: 'coupang' | 'naver' | 'aliexpress' | 'custom'
  images: string[]
  error?: string
}> {
  if (!rawInput || !rawInput.trim()) {
    return { success: false, url: '', title: '', platform: 'custom', images: [], error: '내용을 입력해주세요.' }
  }

  // 1. URL 추출
  const urlMatch = rawInput.match(/(https?:\/\/[^\s]+)/)
  const targetUrl = urlMatch ? urlMatch[0] : ''

  // 2. 다중 줄 / 쿠팡 앱 공유 문구에서 실제 상품명 추출
  const lines = rawInput.split(/[\r\n]+/).map(l => l.trim()).filter(Boolean)
  let extractedTitle = ''

  for (const line of lines) {
    if (line.includes('http://') || line.includes('https://')) continue
    const lower = line.toLowerCase()
    if (
      lower.includes('추천 합니다') || 
      lower.includes('추천합니다') || 
      lower.includes('recommend') ||
      lower.includes('recommendation') ||
      lower.startsWith('쿠팡을') ||
      lower === '쿠팡!' || 
      lower === '[쿠팡]' || 
      lower === '쿠팡' ||
      lower === 'coupang'
    ) continue
    if (line.length > 1) {
      extractedTitle = line.replace(/\[쿠팡\]|쿠팡!|\|\s*/g, '').trim()
      break
    }
  }

  // 3. 플랫폼 감지
  let platform: 'coupang' | 'naver' | 'aliexpress' | 'custom' = 'custom'
  if (targetUrl.includes('coupang.com')) {
    platform = 'coupang'
  } else if (targetUrl.includes('naver.com') || targetUrl.includes('smartstore')) {
    platform = 'naver'
  } else if (targetUrl.includes('aliexpress.com')) {
    platform = 'aliexpress'
  }

  let finalTitle = extractedTitle
  let foundImages: string[] = []

  // 4. 상품명이 없는 경우 (링크만 붙여넣었을 때) 자동 메타데이터/상품명 복원
  if (!finalTitle && targetUrl) {
    // 4-1. 쿠팡 링크인 경우: 302 리다이렉트 확인 후 네이버 검색 인덱스에서 실물 정보 자동 복원
    if (targetUrl.includes('coupang.com')) {
      try {
        let destUrl = targetUrl
        if (targetUrl.includes('link.coupang.com')) {
          const redirectRes = await fetch(targetUrl, {
            redirect: 'manual',
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
          })
          const loc = redirectRes.headers.get('location')
          if (loc) destUrl = loc
        }

        const match = destUrl.match(/products\/(\d+)/)
        const productId = match ? match[1] : ''

        if (productId) {
          const naverRes = await fetch('https://search.naver.com/search.naver?where=nexearch&query=' + encodeURIComponent(`https://www.coupang.com/vp/products/${productId}`), {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
          })
          if (naverRes.ok) {
            const naverHtml = await naverRes.text()
            const altMatches = [...naverHtml.matchAll(/alt="([^"]{4,80})"/g)].map(m => m[1])
            for (const alt of altMatches) {
              if (!alt.includes('네이버') && !alt.includes('로고') && !alt.includes('icon') && alt.length > 5) {
                finalTitle = alt.replace(/\s*\|\s*핫딜.*$/, '').replace(/의\s*이미지.*$/, '').replace(/\[쿠팡\]/, '').trim()
                break
              }
            }
          }
        }
      } catch (err) {
        console.error('Coupang link resolution failed:', err)
      }
    }

    // 4-2. 네이버 또는 일반 웹사이트인 경우: OpenGraph 스크래핑
    if (!finalTitle) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3500)
        const res = await fetch(normalizeUrl(targetUrl), {
          signal: controller.signal,
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          }
        })
        clearTimeout(timeoutId)
        if (res.ok) {
          const html = await res.text()
          const ogTitle = html.match(/<meta[^>]*property=["'](?:og:title|twitter:title)["'][^>]*content=["']([^"']+)["']/i) ||
                          html.match(/<title[^>]*>([^<]+)<\/title>/i)
          if (ogTitle) {
            finalTitle = ogTitle[1].replace(/^쿠팡!\s*-\s*/, '').replace(/\s*:\s*네이버\s*쇼핑$/, '').trim()
          }
          const ogImage = html.match(/<meta[^>]*property=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)["']/i)
          if (ogImage && ogImage[1]) {
            foundImages.push(ogImage[1])
          }
        }
      } catch {
        // ignore
      }
    }
  }

  // 5. 상품명 기반 실제 상품 실물 사진 검색 (Daum 쇼핑 DB 실물 이미지)
  if (finalTitle) {
    try {
      const searchRes = await fetch(`https://search.daum.net/search?w=tot&q=${encodeURIComponent(finalTitle)}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      })
      if (searchRes.ok) {
        const searchHtml = await searchRes.text()
        const matches = searchHtml.match(/https:\/\/search\d\.daumcdn\.net\/thumb\/[^\s"']+\.(?:jpg|jpeg|png|webp)/gi) || []
        const cleanMatches = [...new Set(matches)].filter(u => 
          !u.includes('daum_og') && !u.includes('statics') && !u.includes('common')
        ).slice(0, 4)
        if (cleanMatches.length > 0) {
          foundImages = cleanMatches
        }
      }
    } catch (err) {
      console.error('Image search failed:', err)
    }
  }

  return {
    success: true,
    url: targetUrl,
    title: finalTitle,
    platform,
    images: foundImages
  }
}


// 크리에이터 꿀템 번호판 생성 액션
export async function createProductBoard(data: {
  shortCode: string
  creatorName: string
  creatorDesc?: string
  products: Array<{
    id: string
    itemNumber: number
    title: string
    url: string
    imageUrl?: string
    price?: string
    badge?: string
    platform?: 'coupang' | 'naver' | 'aliexpress' | 'custom'
  }>
}): Promise<{ success?: boolean; error?: string; shortCode?: string; shortUrl?: string }> {
  let shortCode = (data.shortCode || '').trim()
  if (!shortCode) {
    shortCode = generateShortCode()
  } else if (!/^[a-zA-Z0-9-_가-힣]+$/.test(shortCode)) {
    return { error: '단축어는 한글, 영문, 숫자, 하이픈(-), 언더바(_)만 가능합니다.' }
  }

  if (!data.creatorName || !data.creatorName.trim()) {
    return { error: '크리에이터 또는 페이지 이름을 입력해주세요.' }
  }

  if (!data.products || data.products.length === 0) {
    return { error: '최소 1개 이상의 상품을 등록해주세요.' }
  }

  // 대표 URL은 첫 번째 상품 링크
  const primaryUrl = data.products[0]?.url || 'https://1mm.kr'

  try {
    saveGuestLink({
      short_code: shortCode,
      long_url: primaryUrl,
      is_product_board: true,
      creator_name: data.creatorName.trim(),
      creator_desc: data.creatorDesc?.trim() || '영상 속 꿀템 번호(No.)를 검색해 보세요!',
      products: data.products,
      user_id: null
    })

    revalidatePath('/dashboard')
    revalidatePath('/')
    revalidatePath(`/${encodeURIComponent(shortCode)}`)

    return {
      success: true,
      shortCode,
      shortUrl: `/${shortCode}`
    }
  } catch (err: any) {
    console.error('createProductBoard error:', err)
    return { error: '생성에 실패했습니다.' }
  }
}

export async function createDigitalProductAction(data: {
  title: string
  subtitle?: string
  description?: string
  price: number
  fileType?: 'PDF' | 'NOTION' | 'EXCEL' | 'TEMPLATE'
  pageCount?: string
  authorName: string
  triggerKeyword: string
  autoDmMessage?: string
  slug?: string
}): Promise<{
  success?: boolean
  error?: string
  slug?: string
  checkoutUrl?: string
}> {
  if (!data.title || !data.title.trim()) {
    return { error: '전자책 또는 디지털 상품 제목을 입력해주세요.' }
  }

  if (!data.authorName || !data.authorName.trim()) {
    return { error: '크리에이터 또는 저자 이름을 입력해주세요.' }
  }

  if (!data.triggerKeyword || !data.triggerKeyword.trim()) {
    return { error: '인스타그램 댓글 트리거 단어를 입력해주세요. (예: 신청, 비법)' }
  }

  const rawSlug = data.slug || data.title.toLowerCase().replace(/[^a-zA-Z0-9가-힣]+/g, '-').replace(/^-|-$/g, '')
  let cleanSlug = rawSlug.trim()
  if (!cleanSlug) {
    cleanSlug = `book-${Math.random().toString(36).substring(2, 7)}`
  }

  try {
    const { saveDigitalProduct } = await import('@/lib/digitalProducts')
    const saved = saveDigitalProduct({
      slug: cleanSlug,
      title: data.title.trim(),
      subtitle: data.subtitle?.trim() || '인스타그램 댓글 자동화로 판매되는 실전 디지털 리소스',
      description: data.description?.trim() || `${data.title}의 실전 완판본입니다. 결제 즉시 평생 소장 가능한 파일이 제공됩니다.`,
      price: Number(data.price) || 15000,
      originalPrice: (Number(data.price) || 15000) * 3,
      fileType: data.fileType || 'PDF',
      pageCount: data.pageCount || '60페이지+',
      fileSize: '10 MB',
      authorName: data.authorName.trim(),
      authorBio: '1인 지식 크리에이터',
      triggerKeyword: data.triggerKeyword.trim().replace(/^\[|\]$/g, ''),
      autoDmMessage: data.autoDmMessage?.trim() || `안녕하세요! 요청하신 [${data.title}] 결제 및 다운로드 링크입니다.`,
      features: [
        '모바일 카카오페이/토스 1초 결제 지원',
        '결제 즉시 실시간 다운로드 & 이메일 영수증 발송',
        '평생 무료 업데이트 및 모바일 최적화 PDF 뷰어 제공'
      ],
      tableOfContents: [
        '제1장: 핵심 전략 및 마인드셋',
        '제2장: 즉시 적용 가능한 5가지 치트키',
        '제3장: 실패 없는 수익화 실행 로드맵'
      ]
    })

    revalidatePath('/')
    revalidatePath(`/p/${saved.slug}`)

    return {
      success: true,
      slug: saved.slug,
      checkoutUrl: `/p/${saved.slug}`
    }
  } catch (err: any) {
    console.error('createDigitalProductAction error:', err)
    return { error: '디지털 상품 등록에 실패했습니다.' }
  }
}
