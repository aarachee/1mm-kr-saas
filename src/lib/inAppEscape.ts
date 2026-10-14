/**
 * 1mm.kr 인앱브라우저 탈출 및 앱 딥링크 유틸리티
 * 인스타그램, 카카오톡, 네이버, 스레드, 유튜브 등의 인앱브라우저를 감지하고
 * 쿠팡 앱, 네이버 앱, 또는 시스템 기본 브라우저(사파리/크롬)로 다이렉트 전환합니다.
 */

export interface InAppDetectionResult {
  isInApp: boolean
  browserType: 'kakaotalk' | 'instagram' | 'facebook' | 'naver' | 'threads' | 'line' | 'other_inapp' | 'none'
  os: 'ios' | 'android' | 'other'
  targetAppScheme: string | null
  directLaunchUrl: string
}

export function detectInAppBrowser(userAgent: string, targetUrl: string): InAppDetectionResult {
  const ua = userAgent || ''
  const isAndroid = /android/i.test(ua)
  const isIOS = /iphone|ipad|ipod/i.test(ua)
  const os: 'ios' | 'android' | 'other' = isAndroid ? 'android' : isIOS ? 'ios' : 'other'

  let browserType: InAppDetectionResult['browserType'] = 'none'
  let isInApp = false

  if (/kakaotalk/i.test(ua)) {
    browserType = 'kakaotalk'
    isInApp = true
  } else if (/instagram/i.test(ua)) {
    browserType = 'instagram'
    isInApp = true
  } else if (/fban|fbav/i.test(ua)) {
    browserType = 'facebook'
    isInApp = true
  } else if (/naver\(inapp/i.test(ua) || /naversearchapp/i.test(ua)) {
    browserType = 'naver'
    isInApp = true
  } else if (/threads/i.test(ua)) {
    browserType = 'threads'
    isInApp = true
  } else if (/line/i.test(ua)) {
    browserType = 'line'
    isInApp = true
  }

  // 타겟 URL이 특정 쇼핑몰/플랫폼 앱인 경우 스킴 매핑
  let targetAppScheme: string | null = null
  let directLaunchUrl = targetUrl

  try {
    const parsed = new URL(targetUrl)
    const hostname = parsed.hostname.toLowerCase()

    // 1. 쿠팡 링크 (coupang.com or link.coupang.com)
    if (hostname.includes('coupang.com')) {
      // 쿠팡 네이티브 앱 스킴
      targetAppScheme = `coupang://`
      if (isAndroid) {
        // 안드로이드 크롬 인텐트로 쿠팡 앱 강제 호출
        directLaunchUrl = `intent://${parsed.host}${parsed.pathname}${parsed.search}#Intent;scheme=https;package=com.coupang.mobile;end`
      } else if (isIOS) {
        directLaunchUrl = `coupang://${parsed.pathname.replace(/^\//, '')}${parsed.search}`
      }
    }
    // 2. 네이버 스마트스토어
    else if (hostname.includes('smartstore.naver.com') || hostname.includes('shopping.naver.com')) {
      targetAppScheme = `naversearchapp://`
      if (isAndroid) {
        directLaunchUrl = `intent://${parsed.host}${parsed.pathname}${parsed.search}#Intent;scheme=https;package=com.nhn.android.search;end`
      }
    }
    // 3. 유튜브
    else if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      targetAppScheme = `vnd.youtube://`
      if (isAndroid) {
        directLaunchUrl = `intent://${parsed.host}${parsed.pathname}${parsed.search}#Intent;scheme=https;package=com.google.android.youtube;end`
      }
    }
    // 4. 일반 웹페이지인데 인앱브라우저인 경우: 기본 사파리/크롬으로 탈출
    else if (isInApp) {
      if (isAndroid) {
        // 안드로이드 크롬 강제 실행 인텐트
        directLaunchUrl = `intent://${parsed.host}${parsed.pathname}${parsed.search}#Intent;scheme=https;package=com.android.chrome;end`
      } else if (browserType === 'kakaotalk') {
        // 카카오톡 외부 브라우저 호출 스킴
        directLaunchUrl = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`
      }
    }
  } catch (e) {
    // URL 파싱 에러 시 원본 유지
  }

  return {
    isInApp,
    browserType,
    os,
    targetAppScheme,
    directLaunchUrl
  }
}
