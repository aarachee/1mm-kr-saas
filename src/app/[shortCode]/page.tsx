import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Script from 'next/script'
import { headers } from 'next/headers'

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>
}) {
  const { shortCode } = await params
  const decodedShortCode = decodeURIComponent(shortCode)

  // 1. DB에서 shortCode 검색
  const { data: link, error } = await supabase
    .from('links')
    .select('id, long_url, long_url_b, is_active, pixel_id')
    .eq('short_code', decodedShortCode)
    .single()

  if (error || !link || !link.is_active) {
    redirect('/')
  }

  // A/B 테스트 트래픽 분산 엔진 (50:50)
  let targetUrl = link.long_url
  let chosenVariant = 'A'

  if (link.long_url_b) {
    if (Math.random() > 0.5) {
      targetUrl = link.long_url_b
      chosenVariant = 'B'
    }
  }

  // 2. 통계(Click) 데이터 수집
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'
  const referrer = headersList.get('referer') || 'direct'
  
  supabase.from('clicks').insert([{
    link_id: link.id,
    ip_address: ip,
    user_agent: userAgent,
    referrer: referrer,
    variant: chosenVariant
  }]).then()

  // 3. 픽셀 ID가 없으면 즉시 서버 리다이렉트 (가장 빠름)
  if (!link.pixel_id) {
    redirect(targetUrl)
  }

  // 4. 픽셀 ID가 있으면 중간 HTML 페이지를 렌더링하여 픽셀을 실행한 뒤 리다이렉트
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Fallback meta refresh (스크립트가 안 먹히는 환경 대비) */}
      <meta httpEquiv="refresh" content={`1.5;url=${targetUrl}`} />
      
      <div className="text-center animate-in fade-in duration-500">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">목적지로 안전하게 이동 중입니다...</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">잠시만 기다려주세요.</p>
      </div>

      {/* Facebook Pixel Code */}
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
          
          // 픽셀 실행 시간을 확보한 뒤(약 0.6초) 스크립트로 리다이렉트
          setTimeout(function() { window.location.href = "${targetUrl}"; }, 600);
        `}
      </Script>
    </div>
  )
}
