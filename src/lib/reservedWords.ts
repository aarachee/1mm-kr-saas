/**
 * 1mm.kr 커스텀 단축 슬러그 금칙어(Blocked) 및 유보어(Reserved/Premium) 통합 사전
 * 
 * [정책 기준]
 * 1. 금칙어 (Blocked): 유료 결제 여부와 무관하게 영구 생성 불가 (시스템 보호, 사칭 방지, 불법/유해물 차단)
 * 2. 유보어 (Reserved/Premium): 일반 무료 생성은 불가하나, 유료 플랜/별도 구독 시 소유 및 독점 사용 가능
 */

// ============================================================================
// 1. 금칙어 (BLOCKED WORDS) - 유료 제공 영구 불가
// ============================================================================

/**
 * 1-1. 시스템 라우트, 기술 인프라 및 파일명 충돌 방지
 */
export const BLOCKED_SYSTEM_ROUTES = new Set([
  // Next.js 라우트 및 앱 페이지
  'admin', 'api', 'dashboard', 'pay', 'p', 'login', 'logout', 'signin', 'signup',
  'register', 'auth', 'callback', 'user', 'users', 'account', 'profile', 'settings',
  'checkout', 'billing', 'order', 'orders', 'transaction', 'transactions', 'settlement',
  'settlements', 'feedback', 'analytics', 'api-keys', 'links', 'link', 'playbook',
  'ultracall', 'carinfo', 'guest', 'public', 'static', 'assets', 'images', 'img',
  '_next', '_vercel', 'node_modules', 'cdn', 'cache',
  // 법적/문서/시스템 파일명
  'terms', 'privacy', 'policy', 'sitemap', 'sitemap.xml', 'robots', 'robots.txt',
  'favicon', 'favicon.ico', 'ads', 'ads.txt', 'manifest', 'manifest.json',
  'app-ads', 'app-ads.txt', 'security', 'security.txt', 'humans', 'humans.txt',
  // 서버/네트워크/프로토콜
  'www', 'web', 'mail', 'email', 'smtp', 'pop3', 'imap', 'ftp', 'sftp', 'ssh',
  'ns', 'ns1', 'ns2', 'dns', 'ssl', 'tls', 'cert', 'proxy', 'gateway', 'router',
  'server', 'localhost', 'dev', 'stage', 'staging', 'prod', 'production', 'test',
  'health', 'ping', 'status', 'metrics', 'socket', 'ws', 'wss', 'graphql', 'rest',
  'rss', 'atom', 'feed', 'webhook', 'webhooks', 'null', 'undefined', 'void',
])

/**
 * 1-2. 1mm 플랫폼 고유 자산 및 공식 계정/관리자 사칭 방지
 */
export const BLOCKED_IMPERSONATION = new Set([
  // 1mm 플랫폼 고유 브랜드
  '1mm', '1mmkr', '1mm_kr', '1mm-kr', '1mm_pay', '1mmpay', '1미리', '1미리페이',
  '1밀리', '1밀리미터', '일미리', '일미리페이', 'ilmm', 'onemm',
  // 관리자 및 공식 지원 사칭
  'root', 'master', 'admin', 'administrator', 'superadmin', 'manager', 'mod',
  'moderator', 'operator', 'staff', 'team', 'support', 'help', 'helpdesk',
  'service', 'contact', 'customer', 'cs', 'official', 'notice', 'announcement',
  'guide', 'info', 'inquiry', 'center', 'system', 'sysadmin', 'host',
  // 공공기관 / 사법 / 공권력 사칭
  'police', 'gov', 'court', 'prosecutor', 'tax', 'nts', 'kisa', 'fss',
  '경찰', '경찰청', '검찰', '검찰청', '법원', '국세청', '세무서', '금융감독원',
  '금감원', '청와대', '정부', '대통령실', '시청', '구청', '동사무소', '주민센터',
])

/**
 * 1-3. 유명 플랫폼, IT 대기업 및 금융사 상표권/피싱 사칭 방지
 */
export const BLOCKED_TRADEMARKS_AND_FINANCE = new Set([
  // 국내 빅테크 및 플랫폼
  'naver', 'kakao', 'daangn', 'baemin', 'toss', 'coupang', 'line', 'band', 'nate',
  'kurly', 'yanolja', 'goodchoice', 'zigbang', 'dabang', 'kream', 'musinsa', 'ably',
  'zigzag', 'carrot', 'yogiyo', 'bunjang', 'joonggonara',
  '네이버', '카카오', '당근', '당근마켓', '배민', '배달의민족', '토스', '쿠팡', '라인',
  '밴드', '컬리', '야놀자', '여기어때', '직방', '다방', '크림', '무신사', '에이블리',
  '지그재그', '요기요', '번개장터', '중고나라',
  // 글로벌 빅테크 및 SNS
  'google', 'youtube', 'facebook', 'instagram', 'meta', 'apple', 'microsoft',
  'amazon', 'netflix', 'tiktok', 'twitter', 'threads', 'chatgpt', 'openai',
  'telegram', 'whatsapp', 'discord', 'linkedin', 'github', 'zoom', 'spotify',
  '구글', '유튜브', '페이스북', '인스타', '인스타그램', '메타', '애플', '마이크로소프트',
  '아마존', '넷플릭스', '틱톡', '트위터', '스레드', '챗지피티', '텔레그램', '디스코드',
  // 은행 및 금융/카드/결제
  'bank', 'kakaobank', 'tossbank', 'kbank', 'kb', 'kookmin', 'shinhan', 'woori',
  'hana', 'nh', 'nonghyup', 'ibk', 'sc', 'citi', 'card', 'kbcard', 'shinhancard',
  'samsungcard', 'hyundaicard', 'lottecard', 'pay', 'kakaopay', 'tosspay',
  'naverpay', 'samsungpay', 'applepay', 'payco', 'zero-pay',
  '은행', '카카오뱅크', '토스뱅크', '케이뱅크', '국민은행', '신한은행', '우리은행',
  '하나은행', '농협', '기업은행', '국민카드', '신한카드', '삼성카드', '현대카드',
  '롯데카드', '카카오페이', '토스페이', '네이버페이', '삼성페이', '애플페이', '페이코',
])

/**
 * 1-4. 불법 도박, 사행성, 성인/음란, 마약, 금융사기 및 유해 단어
 */
export const BLOCKED_ILLEGAL_AND_HARMFUL = new Set([
  // 불법 도박 / 사행성
  'toto', 'bet', 'bet365', 'casino', 'baccarat', 'holdem', 'poker', 'slot',
  'powerball', 'sadari', 'ladder', 'relay',
  '토토', '사설토토', '스포츠토토', '프로토', '배팅', '카지노', '바카라', '홀덤',
  '포커', '슬롯', '슬롯머신', '파워볼', '사다리', '네임드', '릴게임', '도박',
  '섯다', '맞고', '고스톱', '경마', '경륜', '경정',
  // 성인 / 음란 / 조건만남
  'porn', 'sex', 'adult', 'xxx', 'xvideo', 'pornhub', 'jav', 'av', 'ero',
  'cam', 'camcord', 'nude', 'strip', 'massage', 'escort',
  '야동', '야설', '포르노', '음란', '섹스', '성인', '19금', '조건', '조건만남',
  '출장마사지', '출장샵', '오피', '안마', '키스방', '휴게텔', '립카페', '유흥',
  '룸살롱', '룸싸롱', '셔츠룸', '레깅스룸', '호빠', '호스트바', '스웨디시',
  // 마약 / 불법 약물 / 사기 / 대출
  'drug', 'weed', 'cannabis', 'meth', 'ice', 'ecstasy', 'propofol',
  '마약', '대마초', '필로폰', '작대기', '아이스', '떨', '엑스터시', '프로포폴',
  '졸피뎀', '펜타닐', '사기', '피싱', '보이스피싱', '스미싱', '불법대출', '사채',
  '일수', '달돈', '작업대출', '통장매매', '대포통장', '대포폰',
  // 비속어 및 혐오 표현 (축약/대표형)
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick',
  '시발', '씨발', '개새끼', '병신', '지랄', '존나', '좆', '창녀', '느금마',
])

/**
 * 전체 금칙어 Set (빠른 O(1) 조회용)
 */
export const ALL_BLOCKED_SLUGS: Set<string> = new Set([
  ...BLOCKED_SYSTEM_ROUTES,
  ...BLOCKED_IMPERSONATION,
  ...BLOCKED_TRADEMARKS_AND_FINANCE,
  ...BLOCKED_ILLEGAL_AND_HARMFUL,
])


// ============================================================================
// 2. 유보어 (RESERVED / PREMIUM WORDS) - 유료 구독/구매 시 제공 가능
// ============================================================================

/**
 * 2-1. 요식업 / 카페 / 외식업 대표 키워드
 */
export const PREMIUM_FOOD_AND_BEVERAGE = new Set([
  '맛집', '카페', '커피', '술집', '식당', '밥집', '디저트', '베이커리', '빵집',
  '고깃집', '삼겹살', '소고기', '한우', '갈비', '치킨', '피자', '버거', '햄버거',
  '횟집', '초밥', '스시', '참치', '해산물', '조개구이', '한식', '중식', '일식',
  '양식', '분식', '마라탕', '쌀국수', '라멘', '우동', '파스타', '스테이크',
  '냉면', '칼국수', '국밥', '순대국', '해장국', '찌개', '김치찌개', '된장찌개',
  '포차', '이자카야', '와인', '맥주', '위스키', '펍', '바', '브런치', '도시락',
  '반찬', '케이크', '떡집', '마카롱', '밀키트', '정육점', '과일', '야식', '배달',
])

/**
 * 2-2. 뷰티 / 헤어 / 헬스 / 피트니스 대표 키워드
 */
export const PREMIUM_BEAUTY_AND_HEALTH = new Set([
  '미용실', '헤어', '헤어샵', '바버샵', '네일', '네일아트', '네일샵', '패디',
  '속눈썹', '속눈썹펌', '속눈썹연장', '반영구', '눈썹문신', '타투', '피부',
  '피부관리', '에스테틱', '왁싱', '브라질리언왁싱', '체형교정', '마사지',
  '헬스', '헬스장', '피트니스', 'pt', '피티', '요가', '필라테스', '기구필라테스',
  '크로스핏', '골프', '골프연습장', '스크린골프', '골프레슨', '테니스', '수영',
  '클라이밍', '다이어트', '바디프로필', '태닝', '스파', '사우나',
])

/**
 * 2-3. 전문직 / 병원 / 법률 / 세무 대표 키워드
 */
export const PREMIUM_PROFESSIONAL_AND_MEDICAL = new Set([
  '병원', '의원', '내과', '이비인후과', '안과', '피부과', '성형외과', '정형외과',
  '치과', '임플란트', '치아교정', '소아과', '산부인과', '비뇨기과', '한의원',
  '약국', '동물병원', '정신과', '재활의학과', '도수치료', '물리치료',
  '변호사', '법무사', '법무법인', '로펌', '세무사', '회계사', '세무법인',
  '노무사', '변리사', '감정평가사', '행정사', '손해사정사', '공인중개사',
])

/**
 * 2-4. 생활 / 인테리어 / 부동산 / 일상 서비스 대표 키워드
 */
export const PREMIUM_LIVING_AND_SERVICES = new Set([
  '부동산', '공인중개', '원룸', '투룸', '오피스텔', '아파트', '빌라', '상가',
  '토지', '분양', '입주', '재건축', '재개발', '경매',
  '인테리어', '리모델링', '도배', '장판', '타일', '욕실', '주방', '싱크대',
  '철물점', '가구', '조명', '커튼', '블라인드', '에어컨', '에어컨청소',
  '청소', '입주청소', '이사청소', '방역', '소독', '누수', '방수', '설비',
  '이사', '포장이사', '용달', '원룸이사', '사다리차', '세탁', '세탁소', '빨래방',
  '꽃집', '플라워', '화원', '스튜디오', '사진관', '스냅', '웨딩', '렌탈',
  '정비', '카센터', '타이어', '세차', '출장세차', '광택', '썬팅', '대리운전',
  '렌터카', '중고차', '폐차', '열쇠', '도어락', '애견', '애견미용', '애견호텔',
])

/**
 * 2-5. 교육 / 학원 / 시험 대표 키워드
 */
export const PREMIUM_EDUCATION = new Set([
  '학원', '영어', '영어학원', '수학', '수학학원', '국어', '논술', '입시',
  '보습학원', '과외', '독서실', '스터디카페', '스카', '독학재수', '재수학원',
  '음악학원', '피아노', '바이올린', '미술학원', '무용', '발레', '태권도',
  '유도', '검도', '수영학원', '운전면허', '운전학원', '컴퓨터학원', '코딩',
  '토익', '토플', '오픽', '어학원', '유학원', '자격증', '공무원', '고시원',
])

/**
 * 2-6. 마케팅 / 이커머스 / 프로모션 킬러 키워드
 */
export const PREMIUM_MARKETING_AND_CONVERSION = new Set([
  '쿠폰', '할인', '이벤트', '특가', '세일', '핫딜', '무료', '예약', '선물',
  '사은품', '혜택', '공구', '공동구매', '라이브', '마켓', '스토어', '쇼핑',
  '최저가', '멤버십', 'vip', 'vvip', '프리미엄', '골드', '시크릿', '초대',
  '신청', '상담', '문의', '사전예약', '체험단', '리뷰', '당첨', '추천',
])

/**
 * 2-7. 초인기 영문 3~4자 프리미엄 숏키워드
 */
export const PREMIUM_ENGLISH_SHORT_WORDS = new Set([
  'vip', 'pro', 'ceo', 'top', 'hot', 'one', 'app', 'car', 'job', 'fit',
  'gym', 'law', 'med', 'bar', 'pub', 'tea', 'box', 'day', 'fun', 'win',
  'all', 'now', 'buy', 'biz', 'pet', 'art', 'lab', 'hub', 'tv', 'me',
  'star', 'best', 'link', 'shop', 'sale', 'free', 'gift', 'deal', 'food',
  'cafe', 'club', 'play', 'live', 'real', 'home', 'tour', 'book', 'trip',
])

/**
 * 전체 유보어 Set (빠른 O(1) 조회용)
 */
export const ALL_PREMIUM_RESERVED_SLUGS: Set<string> = new Set([
  ...PREMIUM_FOOD_AND_BEVERAGE,
  ...PREMIUM_BEAUTY_AND_HEALTH,
  ...PREMIUM_PROFESSIONAL_AND_MEDICAL,
  ...PREMIUM_LIVING_AND_SERVICES,
  ...PREMIUM_EDUCATION,
  ...PREMIUM_MARKETING_AND_CONVERSION,
  ...PREMIUM_ENGLISH_SHORT_WORDS,
])


// ============================================================================
// 3. 검증 및 판별 유틸리티 함수 (API & 컴포넌트 연동용)
// ============================================================================

export interface SlugValidationOptions {
  /**
   * 유료 플랜 회원이거나 프리미엄 유보어 구매자인 경우 true로 전달
   */
  allowPremium?: boolean
}

export interface SlugValidationResult {
  valid: boolean
  code?: string
  reason?: string
  isBlocked?: boolean
  isPremiumReserved?: boolean
  category?: 'system' | 'impersonation' | 'trademark' | 'illegal' | 'premium' | 'format'
}

/**
 * 주어진 슬러그가 '금칙어(유료로도 불가)'인지 정밀 판별합니다.
 */
export function checkBlockedSlug(rawSlug: string): { blocked: boolean; reason?: string; category?: SlugValidationResult['category'] } {
  const slug = (rawSlug || '').trim().toLowerCase()

  if (BLOCKED_SYSTEM_ROUTES.has(slug)) {
    return {
      blocked: true,
      category: 'system',
      reason: `'${rawSlug}'은(는) 1mm.kr 시스템 핵심 경로로 어떤 경우에도 사용이 불가합니다.`,
    }
  }

  if (BLOCKED_IMPERSONATION.has(slug)) {
    return {
      blocked: true,
      category: 'impersonation',
      reason: `'${rawSlug}'은(는) 공식 관리자 사칭 및 공공기관 보호 단어로 사용이 불가합니다.`,
    }
  }

  if (BLOCKED_TRADEMARKS_AND_FINANCE.has(slug)) {
    return {
      blocked: true,
      category: 'trademark',
      reason: `'${rawSlug}'은(는) 상표권 보호 및 금융/플랫폼 사칭 방지를 위해 사용이 불가합니다.`,
    }
  }

  if (BLOCKED_ILLEGAL_AND_HARMFUL.has(slug)) {
    return {
      blocked: true,
      category: 'illegal',
      reason: `'${rawSlug}'은(는) 불법/사행성/성인 유해 정책 위반으로 영구 차단된 단어입니다.`,
    }
  }

  return { blocked: false }
}

/**
 * 주어진 슬러그가 '유보어(유료 제공 가능)'인지 판별합니다.
 */
export function checkPremiumReservedSlug(rawSlug: string): { reserved: boolean; category?: string; message?: string } {
  const slug = (rawSlug || '').trim().toLowerCase()

  if (ALL_PREMIUM_RESERVED_SLUGS.has(slug)) {
    return {
      reserved: true,
      category: 'premium',
      message: `'${rawSlug}'은(는) 1mm.kr 골드 프리미엄 유보어입니다. 프로 요금제 또는 전용 라이선스에서 독점 선점하실 수 있습니다.`,
    }
  }

  return { reserved: false }
}

/**
 * 사용자가 입력한 커스텀 단축 슬러그의 유효성을 통합 검사합니다.
 */
export function validateCustomSlug(
  rawSlug: string,
  options: SlugValidationOptions = {}
): SlugValidationResult {
  const slug = (rawSlug || '').trim().toLowerCase()

  // 1. 빈 값 검사
  if (!slug) {
    return {
      valid: false,
      category: 'format',
      reason: '단축어를 입력해주세요.',
    }
  }

  // 2. 글자 수 검사 (한글은 2글자 이상, 영문/숫자는 3글자 이상 지원)
  const hasKorean = /[가-힣]/.test(slug)
  const minLength = hasKorean ? 2 : 3
  if (slug.length < minLength) {
    return {
      valid: false,
      category: 'format',
      reason: hasKorean
        ? '한글 단축어는 최소 2글자 이상이어야 합니다 (예: 1mm.kr/민수).'
        : '영문 단축어는 최소 3글자 이상이어야 합니다 (예: 1mm.kr/abc).',
    }
  }

  // 3. 최대 글자 수 검사
  if (slug.length > 30) {
    return {
      valid: false,
      category: 'format',
      reason: '단축어는 최대 30자 이하로 입력해주세요.',
    }
  }

  // 4. 허용 문자셋 검증: 한글, 영문, 숫자, 하이픈(-), 언더바(_)
  const validPattern = /^[a-zA-Z0-9\-_가-힣]+$/
  if (!validPattern.test(slug)) {
    return {
      valid: false,
      category: 'format',
      reason: '단축어는 한글, 영문, 숫자, 하이픈(-), 언더바(_)만 사용할 수 있습니다.',
    }
  }

  // 5. [금칙어 판별] 유료 결제 회원이라도 영구 차단
  const blockedCheck = checkBlockedSlug(slug)
  if (blockedCheck.blocked) {
    return {
      valid: false,
      isBlocked: true,
      category: blockedCheck.category,
      reason: blockedCheck.reason,
    }
  }

  // 6. [유보어 판별] 일반 무료 회원은 차단, 유료/승인 회원은 허용
  const premiumCheck = checkPremiumReservedSlug(slug)
  if (premiumCheck.reserved) {
    if (!options.allowPremium) {
      return {
        valid: false,
        isPremiumReserved: true,
        category: 'premium',
        reason: premiumCheck.message,
      }
    }
  }

  // 모든 검증 통과
  return {
    valid: true,
    code: slug,
    isPremiumReserved: premiumCheck.reserved,
  }
}
