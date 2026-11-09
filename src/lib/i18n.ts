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
    customSlugHelp: '한글 2자 이상, 영문 3자 이상',
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
    viewDashboardStats: '대시보드로 이동',

    // 유효성/알림
    errInputUrl: '단축할 주소를 입력해주세요.',
    noticeReserved: '[유보어] 프리미엄 예약어입니다 (프로 플랜에서 선점 가능).',
    noticeAvailable: '[사용 가능] 사용 가능한 단축어입니다.',
    noticeMinLen: '영문 단축어는 최소 3글자 이상이어야 합니다 (예: 1mm.kr/abc).',
    noticeMinLenKo: '한글 단축어는 최소 2글자 이상이어야 합니다 (예: 1mm.kr/민수).',

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
    customSlugHelp: 'Min 2 chars for Korean, 3 chars for English',
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
    viewDashboardStats: 'Go to Dashboard',

    // Validation
    errInputUrl: 'Please enter a URL to shorten.',
    noticeReserved: '[Reserved] Premium reserved word (Available in Pro).',
    noticeAvailable: '[Available] This slug is available.',
    noticeMinLen: 'English slug must be at least 3 characters (e.g., 1mm.kr/abc).',
    noticeMinLenKo: 'Korean slug must be at least 2 characters (e.g., 1mm.kr/민수).',

    // Footer
    footerDesc: '1mm.kr • Ultra Short Link & Micro Page Infrastructure',
    footerTop: 'Top ↑',

    // Theme
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
  }
}

