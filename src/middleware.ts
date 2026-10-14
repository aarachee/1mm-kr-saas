import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // pay.1mm.kr 또는 로컬 개발환경 pay.localhost 대응
  const isPaySubdomain = host.startsWith('pay.')

  if (isPaySubdomain) {
    // 1. pay.1mm.kr/ 접근 시 크리에이터 결제 전용 랜딩(/pay)으로 내부 리라이트
    if (url.pathname === '/') {
      url.pathname = '/pay'
      return NextResponse.rewrite(url)
    }

    // 2. pay.1mm.kr/[slug] 접근 시 /p/[slug] 체크아웃 페이지로 내부 리라이트
    // (정적 에셋, API, /p/, /admin, /dashboard, /login 제외)
    if (
      !url.pathname.startsWith('/api') &&
      !url.pathname.startsWith('/_next') &&
      !url.pathname.startsWith('/pay') &&
      !url.pathname.startsWith('/p/') &&
      !url.pathname.startsWith('/admin') &&
      !url.pathname.startsWith('/dashboard') &&
      !url.pathname.startsWith('/login') &&
      !url.pathname.includes('.')
    ) {
      url.pathname = `/p${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 요청에 미들웨어 적용:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico, ads.txt 등 확장자가 있는 정적 리소스
     */
    '/((?!api|_next/static|_next/image|favicon.ico|ads.txt).*)',
  ],
}
