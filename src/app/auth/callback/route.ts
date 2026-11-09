import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  // 매크로 및 비정상 연속 로그인 방지 (동일 IP에서 10분 내 최대 5회)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   request.headers.get('x-real-ip') || 
                   'unknown'

  const rateCheck = checkRateLimit(clientIp, 'auth_callback', {
    windowMs: 10 * 60 * 1000, // 10분
    max: 5,                   // 최대 5회
  })

  if (!rateCheck.allowed) {
    console.warn(`[Macro Guard] Rate limit exceeded for IP: ${clientIp}`)
    return NextResponse.redirect(`${origin}/login?error=too_many_requests`)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 에러 발생 시 로그인 페이지로 돌아감
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
