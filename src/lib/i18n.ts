/**
 * 1mm.kr 다국어(i18n) 사전 및 유틸리티
 * 
 * 원칙: 한국어와 영어를 절대 섞어서 표기하지 않음 (100% 분리).
 * 중복 및 불필요한 마케팅 수식어 배제.
 */

export type Locale = 'ko' | 'en'

export const translations = {
  ko: {
    brandName: '1미리',
    domain: '1mm.kr',
    limitCounterPrefix: '1만명 한정 혜택:',
    limitCounterSuffix: '명 참여',
    login: '로그인',
    dashboard: '대시보드',

    // 메인 헤드라인
    heroTitle: '단축 주소와 미니홈피',
    heroDescription: '긴 주소를 줄여주고, 미니홈피를 제공합니다.',
    
    // 위젯
    inputLabel: '단축할 주소',
    inputPlaceholder: 'https://...',
    clear: '지우기',
    btnGenerate: '생성하기',
    btnGenerating: '생성 중...',
    btnOptionsOpen: '옵션 설정',
    btnOptionsClose: '옵션 닫기',
    help: '안내',
    
    // 옵션
    customSlugLabel: '원하는 단축어 지정 (선택)',
    customSlugHelp: '한글 2자 이상, 영문 3자 이상',
    customSlugPlaceholder: '민수 (또는 abc)',
    pageModeTitle: '미니홈피 생성',
    pageModeDesc: '단순 이동 대신 프로필, 추천 제품 목록, 전자책 결제창이 포함된 모바일 페이지를 제공합니다.',
    profileTitlePlaceholder: '프로필 이름 (예: 민수)',
    profileBioPlaceholder: '한 줄 소개',
    isPublicTitle: '공개 여부',
    isPublicDesc: '체크 시 메인 화면의 최근/인기 주소 목록에 공개 표시됩니다.',

    // 결과
    resultTitle: '단축 주소 생성 완료',
    copy: '복사',
    copied: '복사됨',
    openLink: '주소 열기',
    saveQr: 'QR 코드 저장 (300 DPI)',
    viewDashboardStats: '대시보드로 이동',

    // 유효성/알림
    errInputUrl: '단축할 주소를 입력해주세요.',
    noticeReserved: '[유보어] 프리미엄 예약어입니다 (프로 플랜에서 선점 가능).',
    noticeAvailable: '[사용 가능] 사용 가능한 단축어입니다.',
    noticeMinLen: '영문 단축어는 최소 3글자 이상이어야 합니다 (예: 1mm.kr/abc).',
    noticeMinLenKo: '한글 단축어는 최소 2글자 이상이어야 합니다 (예: 1mm.kr/민수).',

    // 2단 주소 목록 (최근 생성 / 인기)
    recentLinksTitle: '최근 생성된 주소',
    popularLinksTitle: '인기 주소',
    recentBadge: '최신 10개',
    popularBadge: '인기 10개',
    clicksSuffix: '회 클릭',
    noRecentLinks: '아직 공개된 주소가 없습니다.',
    noPopularLinks: '아직 집계된 인기 주소가 없습니다.',
    publicLinksHint: '주소 생성 시 [공개 여부]를 체크하면 이곳에 실시간 노출됩니다.',

    // 하단 서비스 안내 카드 (도움말 대체)
    guideTitle: '1mm.kr 서비스 안내',
    guideSubtitle: '불필요한 과금 유도 없이 핵심 단축 및 전환 기능을 제공합니다.',
    guideItem1Title: '단축 주소',
    guideItem1Desc: '복사된 긴 링크를 깔끔하게 줄여 인스타그램 프로필 바이오와 문자 발송(SMS) 바이트를 절약합니다.',
    guideItem2Title: '인앱 브라우저 자동 탈출',
    guideItem2Desc: '인스타그램이나 카카오톡 내부 웹뷰의 로그인 풀림을 방지하고 사파리, 크롬 브라우저로 0.1초 내 직접 연결합니다.',
    guideItem3Title: '미니홈피',
    guideItem3Desc: '단순 이동 대신 프로필, SNS 멀티링크, 추천 제품 목록, 전자책 결제창이 포함된 모바일 페이지를 생성할 수 있습니다.',
    guideItem4Title: '3개 무료 슬롯 정책',
    guideItem4Desc: '고유 한글 또는 브랜드 주소 1개와 영문/숫자 초단축 주소 2개를 무료로 제공합니다.',

    // 푸터
    footerTop: '맨 위로 ↑',

    // 테마
    themeSystem: '시스템',
    themeLight: '라이트',
    themeDark: '다크',
  },

  en: {
    brandName: '1mm',
    domain: '1mm.kr',
    limitCounterPrefix: 'Limit 10,000 Free:',
    limitCounterSuffix: 'joined',
    login: 'Log in',
    dashboard: 'Dashboard',

    // Main Headline
    heroTitle: 'Short Links & Mini-Page',
    heroDescription: 'Shortens long URLs and provides a mini-homepage.',
    
    // Widget
    inputLabel: 'URL to shorten',
    inputPlaceholder: 'https://...',
    clear: 'Clear',
    btnGenerate: 'Generate',
    btnGenerating: 'Processing...',
    btnOptionsOpen: 'Options',
    btnOptionsClose: 'Close options',
    help: 'Info',
    
    // Options
    customSlugLabel: 'Custom slug (Optional)',
    customSlugHelp: 'Min 2 chars for Korean, 3 chars for English',
    customSlugPlaceholder: 'mybrand (or abc)',
    pageModeTitle: 'Create mini-page',
    pageModeDesc: 'Provides a mobile landing page with profile, recommendations, and digital checkout instead of simple redirection.',
    profileTitlePlaceholder: 'Profile name',
    profileBioPlaceholder: 'Short bio',
    isPublicTitle: 'Make public',
    isPublicDesc: 'When checked, your link is displayed on the main recent and popular lists.',

    // Results
    resultTitle: 'Link created successfully',
    copy: 'Copy',
    copied: 'Copied',
    openLink: 'Open link',
    saveQr: 'Save QR (300 DPI)',
    viewDashboardStats: 'Go to Dashboard',

    // Validation
    errInputUrl: 'Please enter a URL to shorten.',
    noticeReserved: '[Reserved] Premium reserved word (Available in Pro).',
    noticeAvailable: '[Available] This slug is available.',
    noticeMinLen: 'English slug must be at least 3 characters (e.g., 1mm.kr/abc).',
    noticeMinLenKo: 'Korean slug must be at least 2 characters (e.g., 1mm.kr/민수).',

    // 2-Column Links (Recent / Popular)
    recentLinksTitle: 'Recent Links',
    popularLinksTitle: 'Popular Links',
    recentBadge: 'Latest 10',
    popularBadge: 'Top 10',
    clicksSuffix: 'clicks',
    noRecentLinks: 'No public links yet.',
    noPopularLinks: 'No popular links yet.',
    publicLinksHint: 'Check [Make public] when generating a link to display it here.',

    // Service Guide Card
    guideTitle: '1mm.kr Service Guide',
    guideSubtitle: 'Providing ultra-fast mobile short links and mini-page infrastructure.',
    guideItem1Title: 'Short Links',
    guideItem1Desc: 'Shortens long URLs to save space in social media bio and SMS byte limits.',
    guideItem2Title: 'In-App Browser Escape',
    guideItem2Desc: 'Prevents session drops in Instagram and KakaoTalk by launching Safari or Chrome directly.',
    guideItem3Title: 'Mini-Page',
    guideItem3Desc: 'Provides an all-in-one mobile page with profile, multi-links, product recommendations, and digital checkout.',
    guideItem4Title: '3 Free Slots Policy',
    guideItem4Desc: 'Offers 1 custom brand slug and 2 ultra-short alphanumeric slugs for free.',

    // Footer
    footerTop: 'Top ↑',

    // Theme
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
  }
}
