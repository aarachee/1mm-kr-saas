import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { findGuestLink, recordGuestClick, ShortLinkRecord } from '@/lib/linkStorage'
import { findDigitalProductBySlug } from '@/lib/digitalProducts'
import { detectInAppBrowser } from '@/lib/inAppEscape'
import Script from 'next/script'
import { ExternalLink, Zap, ShieldCheck } from 'lucide-react'

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>
}) {
  const { shortCode } = await params
  const decodedShortCode = decodeURIComponent(shortCode)

  // 0. 전자책/디지털 상품 슬러그인지 먼저 확인
  const digitalProduct = findDigitalProductBySlug(decodedShortCode)
  if (digitalProduct) {
    redirect(`/p/${digitalProduct.slug}`)
  }

  // 1. 단축 링크 조회
  let targetLink: ShortLinkRecord | null = null

  try {
    const { data: link, error } = await supabase
      .from('links')
      .select('id, long_url, long_url_b, is_active, pixel_id')
      .eq('short_code', decodedShortCode)
      .single()

    if (!error && link && link.is_active) {
      targetLink = link as unknown as ShortLinkRecord
    }
  } catch (err) {
    console.error('Supabase fetch error:', err)
  }

  if (!targetLink) {
    const guest = findGuestLink(decodedShortCode)
    if (guest && guest.is_active) {
      targetLink = guest
      recordGuestClick(decodedShortCode)
    }
  }

  if (!targetLink || !targetLink.is_active) {
    redirect('/')
  }

  const link = targetLink
  let targetUrl = link.long_url
  let chosenVariant = 'A'

  if (link.long_url_b && Math.random() > 0.5) {
    targetUrl = link.long_url_b
    chosenVariant = 'B'
  }

  // 2. 헤더 및 사용자 환경 분석 (인앱브라우저 감지)
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const ip = headersList.get('x-forwarded-for') || 'unknown'
  const referrer = headersList.get('referer') || 'direct'

  // 통계 기록
  if (link.id) {
    supabase.from('clicks').insert([{
      link_id: link.id,
      ip_address: ip,
      user_agent: userAgent,
      referrer: referrer,
      variant: chosenVariant
    }]).then()
  }

  // 3. 인앱 브라우저 탈출 및 앱 딥링크 판별
  const detection = detectInAppBrowser(userAgent, targetUrl)

  // 페이스북 픽셀이 없고, 인앱브라우저가 아닌 일반 브라우저라면 즉시 0.01초 서버 리다이렉트
  if (!link.pixel_id && !detection.isInApp) {
    redirect(targetUrl)
  }

  // 인앱 브라우저이거나 픽셀이 있는 경우: 스마트 탈출 & 앱 다이렉트 런처 렌더링
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 select-none">
      
      {/* Fallback 메타 새로고침 */}
      <meta httpEquiv="refresh" content={`2;url=${detection.directLaunchUrl}`} />

      <div className="w-full max-w-sm mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-2xl backdrop-blur-xl">
        
        {/* 인디케이터 */}
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
          <Zap className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>1mm 인앱 탈출 딥링크 엔진</span>
          </div>
          <h1 className="text-lg font-black text-white tracking-tight">
            전용 앱으로 안전하게 연결 중입니다
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            인앱브라우저 로그인 풀림을 방지하기 위해 스마트폰에 설치된 앱이나 기본 브라우저로 0.1초 내 전환합니다.
          </p>
        </div>

        {/* 수동 다이렉트 열기 버튼 */}
        <div className="space-y-2 pt-2">
          <a
            id="direct-open-btn"
            href={detection.directLaunchUrl}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          >
            <span>앱으로 바로 열기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={targetUrl}
            className="block text-center text-[11px] text-slate-500 hover:text-slate-300 transition-colors py-1"
          >
            기존 웹페이지로 계속 이동하기
          </a>
        </div>
      </div>

      {/* 0.05초 자동 실행 스크립트 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var target = "${detection.directLaunchUrl}";
              window.location.href = target;
            } catch(e) {}
          `
        }}
      />

      {/* 픽셀 코드 */}
      {link.pixel_id && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${link.pixel_id}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </div>
  )
}
