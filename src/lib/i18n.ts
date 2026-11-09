/**
 * 1mm.kr 다국어(i18n) 사전 및 유틸리티
 * 
 * 원칙: 한국어와 영어를 절대 섞어서 표기하지 않음 (100% 분리).
 */

export type Locale = 'ko' | 'en'

export const translations = {
  ko: {
    brandName: '1미리',
    domain: '1mm.kr',
    badgeHeader: '10자 단축 인프라',
    limitCounterPrefix: '1만명 한정 혜택:',
    limitCounterSuffix: '명 참여',
    login: '로그인',
    dashboard: '대시보드',
    dashboardStart: '대시보드 시작',
    heroBadge: '단축 주소 및 개별 페이지 인프라',
    heroTitleLine1: '국내 최단 10자 단축링크,',
    heroTitleLine2: '전시 및 판매 개별 페이지 지원',
    heroDescription: '긴 주소를 10글자로 즉시 단축하고, 프로필 전시와 디지털 상품 판매가 가능한 모바일 최적화 페이지를 제공합니다.',
    
    // 위젯
    inputLabel: '단축할 주소',
    inputPlaceholder: 'https://...',
    clear: '지우기',
    btnGenerate: '생성하기',
    btnGenerating: '생성 중...',
    btnOptionsOpen: '옵션 설정',
    btnOptionsClose: '옵션 닫기',
    help: '도움말',
    helpTitle: '1mm.kr 서비스 이용 안내',
    helpClose: '닫기',
    
    // 옵션
    customSlugLabel: '원하는 단축어 지정 (선택)',
    customSlugHelp: '최소 3자 이상 (한글 지원)',
    customSlugPlaceholder: '민수 (또는 abc)',
    pageModeTitle: '개별 전시 및 판매 페이지 생성',
    pageModeDesc: '단순 이동 대신 프로필, 추천 제품 목록, 전자책 결제창이 포함된 모바일 페이지를 제공합니다.',
    profileTitlePlaceholder: '프로필 이름 (예: 크리에이터 민수)',
    profileBioPlaceholder: '한 줄 소개',

    // 결과
    resultTitle: '단축 주소 생성 완료',
    copy: '복사',
    copied: '복사됨',
    openLink: '주소 열기',
    saveQr: 'QR 코드 저장 (300 DPI)',
    viewDashboardStats: '대시보드에서 통계 확인하기',

    // 유효성/알림
    errInputUrl: '단축할 주소를 입력해주세요.',
    noticeReserved: '[유보어] 프리미엄 예약어입니다 (프로 플랜에서 선점 가능).',
    noticeAvailable: '[사용 가능] 사용 가능한 단축어입니다.',
    noticeMinLen: '최소 3글자 이상이어야 합니다 (예: 1mm.kr/abc).',

    // 3대 특징
    featuresTitle: '전문가를 위한 모바일 전환 인프라',
    featuresSubtitle: '불필요한 과금 유도 없이, 핵심 3대 기능을 표준으로 제공합니다.',
    
    feature1Tag: '슬롯 정책',
    feature1Title: '1인당 3개 무료 슬롯',
    feature1Desc: '고유 한글 또는 브랜드 주소 1개와 영문/숫자 3자리 초단축 주소 2개를 무료로 제공합니다. 인스타그램 프로필과 문자 발송 비용을 절약하세요.',
    
    feature2Tag: '개별 페이지',
    feature2Title: '전시 및 판매 페이지',
    feature2Desc: '단순 리다이렉트를 넘어, 프로필 브랜딩, 멀티링크 연결, 번호별 추천 제품 전시 및 전자책/템플릿 원클릭 결제창을 하나의 주소로 완성합니다.',
    
    feature3Tag: '전환 최적화',
    feature3Title: '인앱 브라우저 자동 탈출',
    feature3Desc: '인스타그램과 카카오톡 웹뷰 환경에서 발생하는 로그인 풀림을 방지하고, 사파리(Safari), 크롬(Chrome), 전용 앱으로 0.1초 내 직접 전환합니다.',

    // CTA
    ctaTitle: 'Google 계정으로 무료 슬롯을 선점하세요',
    ctaSubtitle: '얼리버드 10,000명 한정 무료 혜택이 적용됩니다.',
    ctaButton: '간편 로그인 시작',

    // 푸터
    footerDesc: '1미리 (1mm.kr) • 단축링크 및 개별 페이지 인프라',
    footerTop: '맨 위로 ↑',

    // 테마
    themeSystem: '시스템',
    themeLight: '라이트',
    themeDark: '다크',
  },

  en: {
    brandName: '1mm',
    domain: '1mm.kr',
    badgeHeader: '10-Char Infra',
    limitCounterPrefix: 'Limit 10,000 Free:',
    limitCounterSuffix: 'joined',
    login: 'Log in',
    dashboard: 'Dashboard',
    dashboardStart: 'Start Dashboard',
    heroBadge: 'Short Link & Micro Page Infrastructure',
    heroTitleLine1: 'Shortest 10-Character Link,',
    heroTitleLine2: 'Individual Showcase & Shop Page',
    heroDescription: 'Shorten long URLs to 10 characters in 1 second, and create mobile-optimized showcase and checkout pages.',
    
    // Widget
    inputLabel: 'URL to shorten',
    inputPlaceholder: 'https://...',
    clear: 'Clear',
    btnGenerate: 'Generate',
    btnGenerating: 'Processing...',
    btnOptionsOpen: 'Options',
    btnOptionsClose: 'Close options',
    help: 'Help',
    helpTitle: '1mm.kr Service Guide',
    helpClose: 'Close',
    
    // Options
    customSlugLabel: 'Custom slug (Optional)',
    customSlugHelp: 'Min 3 chars (Letters, numbers)',
    customSlugPlaceholder: 'mybrand (or abc)',
    pageModeTitle: 'Create individual showcase & shop page',
    pageModeDesc: 'Provides a mobile landing page with profile, product directory, and digital checkout.',
    profileTitlePlaceholder: 'Profile name',
    profileBioPlaceholder: 'Short bio',

    // Results
    resultTitle: 'Link created successfully',
    copy: 'Copy',
    copied: 'Copied',
    openLink: 'Open link',
    saveQr: 'Save QR (300 DPI)',
    viewDashboardStats: 'View analytics in dashboard',

    // Validation
    errInputUrl: 'Please enter a URL to shorten.',
    noticeReserved: '[Reserved] Premium reserved word (Available in Pro).',
    noticeAvailable: '[Available] This slug is available.',
    noticeMinLen: 'Must be at least 3 characters (e.g., 1mm.kr/abc).',

    // Features
    featuresTitle: 'Mobile Conversion Infrastructure',
    featuresSubtitle: 'We provide 3 core infrastructure features as standard without unnecessary paywalls.',
    
    feature1Tag: 'Slot Policy',
    feature1Title: '3 Free Slots per User',
    feature1Desc: '1 custom brand slug and 2 ultra-short 3-character slugs provided for free. Save bio character space and SMS costs.',
    
    feature2Tag: 'Micro Page',
    feature2Title: 'Showcase & Commerce Page',
    feature2Desc: 'Goes beyond simple redirection to deliver profile branding, multi-links, numbered product directory, and digital checkout in one link.',
    
    feature3Tag: 'Conversion',
    feature3Title: 'In-App Browser Escape',
    feature3Desc: 'Prevents session drops in Instagram and KakaoTalk in-app webviews by launching Safari, Chrome, or native apps in 0.1 seconds.',

    // CTA
    ctaTitle: 'Claim your free slots with Google account',
    ctaSubtitle: 'Limited to early bird 10,000 accounts.',
    ctaButton: 'Start with Google',

    // Footer
    footerDesc: '1mm.kr • Ultra Short Link & Micro Page Infrastructure',
    footerTop: 'Top ↑',

    // Theme
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
  }
}
