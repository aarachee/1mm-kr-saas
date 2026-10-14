import fs from 'fs'
import path from 'path'

export interface DigitalProductRecord {
  id: string
  slug: string
  title: string
  subtitle?: string
  description: string
  price: number
  originalPrice?: number
  fileType: 'PDF' | 'NOTION' | 'EXCEL' | 'TEMPLATE'
  pageCount?: string
  fileSize?: string
  authorName: string
  authorBio?: string
  authorInstagram?: string
  triggerKeyword: string
  autoDmMessage?: string
  salesCount: number
  rating: number
  reviewsCount: number
  features: string[]
  tableOfContents?: string[]
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const FILE_PATH = path.join(DATA_DIR, 'digital-products.json')

const INITIAL_PRODUCTS: DigitalProductRecord[] = [
  {
    id: 'prod_side_income_01',
    slug: 'side-income-guide',
    title: '직장인 퇴근 후 1시간, 월 200 부업 치트키 실전서',
    subtitle: '크몽·스마트스토어 없이 인스타 댓글 자동화로 첫 주 만에 50만 원 번 현실적인 노하우',
    description: '유튜브의 뜬구름 잡는 소리는 뺐습니다. 사업자등록 없이도 개인 지식과 노션 템플릿을 인스타 DM으로 100% 자동 판매하는 구체적인 실천 로드맵을 제공합니다.',
    price: 14900,
    originalPrice: 49000,
    fileType: 'PDF',
    pageCount: '84페이지',
    fileSize: '12.4 MB',
    authorName: '김민우 디렉터',
    authorBio: '전) 이커머스 마케터, 현) 1인 지식 크리에이터 (누적 판매 1,200부+)',
    authorInstagram: '@minwoo.creator',
    triggerKeyword: '신청',
    autoDmMessage: '안녕하세요! 요청하신 [월 200 부업 치트키 실전서] 다운로드 링크입니다. 오늘 자정까지 얼리버드 할인가로 소장하실 수 있습니다.',
    salesCount: 384,
    rating: 4.95,
    reviewsCount: 142,
    features: [
      '팔로워 0명으로 시작하는 스레드/인스타 타겟팅 공식',
      '댓글 100개 터지는 30가지 검증된 후킹 카피 모음집',
      '카카오페이/토스로 1초 만에 결제받는 시스템 셋업 가이드',
      '환불율 0%를 만드는 고가치 PDF 구조화 템플릿'
    ],
    tableOfContents: [
      '제1장: 왜 크몽에서 팔면 수수료 20% 뜯기고 망하는가?',
      '제2장: 내 평범한 경험을 15,000원짜리 전자책으로 바꾸는 법',
      '제3장: 인스타 릴스와 스레드로 무료 트래픽 긁어모으기',
      '제4장: 댓글 달리면 0.1초 만에 DM 쏴주는 자동화 머신 구축',
      '제5장: 하루 5,000원 광고로 매일 10만 원 순익 복사하기'
    ],
    createdAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'prod_reels_algo_02',
    slug: 'reels-algorithm',
    title: '인스타 릴스 100만 뷰 알고리즘 & 후킹 스크립트 50선',
    subtitle: '조회수 100회에서 멈추던 계정을 3주 만에 10만 계정으로 키운 실전 대본집',
    description: '얼굴 공개 없이, 텍스트와 스톡 영상만으로 시청 지속 시간을 90% 이상 유지시키는 오프닝 3초 후킹 공식과 50개의 실전 템플릿을 드립니다.',
    price: 19900,
    originalPrice: 59000,
    fileType: 'PDF',
    pageCount: '62페이지',
    fileSize: '8.7 MB',
    authorName: '박세은 크리에이티브',
    authorBio: '인스타그램 릴스 누적 조회수 4,500만 회 달성 크리에이터',
    authorInstagram: '@seeun_reels',
    triggerKeyword: '알고리즘',
    autoDmMessage: '릴스 대본집 링크 보내드립니다! 3주 안에 첫 10만 뷰를 터뜨리는 비밀을 확인하세요.',
    salesCount: 612,
    rating: 4.98,
    reviewsCount: 209,
    features: [
      '오프닝 3초 만에 엄지손가락을 멈추게 하는 50가지 문장',
      '저작권 걱정 없는 고화질 무료 B-roll 영상 소스 사이트 10선',
      '알고리즘이 반응하는 인게이지먼트 유도 댓글 설계법'
    ],
    tableOfContents: [
      '제1장: 2026년 인스타그램 알고리즘의 핵심 지표 3가지',
      '제2장: 1초 만에 넘겨지지 않는 킬러 오프닝 템플릿 50선',
      '제3장: 댓글에 [신청]을 달게 만드는 콜투액션(CTA) 심리학'
    ],
    createdAt: '2026-10-05T00:00:00Z'
  }
]

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8')
  }
}

export function getAllDigitalProducts(): DigitalProductRecord[] {
  try {
    ensureDataFile()
    const content = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(content) as DigitalProductRecord[]
  } catch (err) {
    console.error('Error reading digital products:', err)
    return INITIAL_PRODUCTS
  }
}

export function findDigitalProductBySlug(slug: string): DigitalProductRecord | null {
  const products = getAllDigitalProducts()
  return products.find(p => p.slug === slug || p.id === slug) || null
}

export function saveDigitalProduct(product: Omit<DigitalProductRecord, 'id' | 'createdAt' | 'salesCount' | 'rating' | 'reviewsCount'>): DigitalProductRecord {
  ensureDataFile()
  const products = getAllDigitalProducts()
  
  const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
  const newProduct: DigitalProductRecord = {
    ...product,
    id,
    salesCount: 1,
    rating: 5.0,
    reviewsCount: 1,
    createdAt: new Date().toISOString()
  }

  // 중복 슬러그 방지
  const existingIndex = products.findIndex(p => p.slug === product.slug)
  if (existingIndex >= 0) {
    products[existingIndex] = { ...products[existingIndex], ...newProduct }
  } else {
    products.unshift(newProduct)
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(products, null, 2), 'utf-8')
  return newProduct
}
