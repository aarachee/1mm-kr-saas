import fs from 'fs'
import path from 'path'
import os from 'os'

export interface MultiLinkButton {
  platform: 'daangn' | 'naver' | 'baemin' | 'instagram' | 'call' | 'custom'
  label: string
  url: string
  badge?: string
}

export interface NumberedProductItem {
  id: string
  itemNumber: number // e.g. 1, 2, 3, 24
  title: string      // e.g. "기름 안 튀는 3단 실리콘 프라이팬 덮개"
  url: string        // e.g. https://link.coupang.com/...
  imageUrl?: string  // e.g. thumbnail image
  price?: string     // e.g. "12,900원"
  badge?: string     // e.g. "로켓배송", "영상 속 꿀템", "최저가"
  platform?: 'coupang' | 'naver' | 'aliexpress' | 'custom'
}

export interface ShortLinkRecord {
  id: string
  short_code: string
  long_url: string
  long_url_b?: string | null
  title?: string | null
  pixel_id?: string | null
  is_active: boolean
  is_public?: boolean
  created_at: string
  user_id?: string | null
  clicks_count?: number
  likes_count?: number
  is_multilink?: boolean
  store_name?: string
  store_desc?: string
  store_category?: string
  buttons?: MultiLinkButton[]
  // 쇼츠/릴스 크리에이터 꿀템 번호판 필드
  is_product_board?: boolean
  creator_name?: string
  creator_desc?: string
  products?: NumberedProductItem[]
  // 1mm 개별 마이크로 페이지 (꾸미기, 전시, 판매)
  page_mode?: boolean
  profile_title?: string
  profile_bio?: string
  profile_image?: string
  theme?: 'dark' | 'light' | 'neon'
  social_links?: {
    instagram?: string
    youtube?: string
    tiktok?: string
    kakao?: string
    blog?: string
  }
  digital_product?: {
    title: string
    price: number
    original_price?: number
    description?: string
    file_type?: string
  }
}

// 번들된 읽기 전용 시드 파일 경로
const BUNDLED_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'guest-links.json')

// Vercel / AWS 람다 환경에서는 /tmp 만 쓰기 가능
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production')
const WRITABLE_DIR = isServerless ? os.tmpdir() : path.join(process.cwd(), 'src', 'data')
const WRITABLE_FILE_PATH = path.join(WRITABLE_DIR, 'guest-links.json')

// 인메모리 캐시 (서버리스 인스턴스 생명주기 동안 보존)
let memoryStore: ShortLinkRecord[] | null = null

// 저장소 파일 안전 보장
function ensureDataFile() {
  try {
    if (!fs.existsSync(WRITABLE_DIR)) {
      fs.mkdirSync(WRITABLE_DIR, { recursive: true })
    }
    if (!fs.existsSync(WRITABLE_FILE_PATH)) {
      let initialData = '[]'
      try {
        if (fs.existsSync(BUNDLED_FILE_PATH)) {
          initialData = fs.readFileSync(BUNDLED_FILE_PATH, 'utf-8')
        }
      } catch (seedErr) {
        console.warn('Could not read bundled seed file:', seedErr)
      }
      fs.writeFileSync(WRITABLE_FILE_PATH, initialData, 'utf-8')
    }
  } catch (err) {
    console.warn('ensureDataFile fallback to memory:', err)
  }
}

// 모든 게스트 링크 안전 조회
export function getAllGuestLinks(): ShortLinkRecord[] {
  try {
    ensureDataFile()
    if (fs.existsSync(WRITABLE_FILE_PATH)) {
      const content = fs.readFileSync(WRITABLE_FILE_PATH, 'utf-8')
      const parsed = JSON.parse(content || '[]')
      memoryStore = parsed
      return parsed
    }
    if (fs.existsSync(BUNDLED_FILE_PATH)) {
      const content = fs.readFileSync(BUNDLED_FILE_PATH, 'utf-8')
      const parsed = JSON.parse(content || '[]')
      memoryStore = parsed
      return parsed
    }
  } catch (err) {
    console.warn('Failed to read file from disk, using memory store:', err)
  }
  return memoryStore || []
}

function writeLinksSafely(links: ShortLinkRecord[]) {
  memoryStore = links
  try {
    ensureDataFile()
    fs.writeFileSync(WRITABLE_FILE_PATH, JSON.stringify(links, null, 2), 'utf-8')
  } catch (err) {
    console.warn('writeLinksSafely warning (persisted in memory only):', err)
  }
}

// Save a guest link (or multi-link profile) - NEVER throws
export function saveGuestLink(record: Omit<ShortLinkRecord, 'id' | 'created_at' | 'is_active'>): ShortLinkRecord {
  try {
    const links = getAllGuestLinks()
    const existingIndex = links.findIndex(l => l.short_code === record.short_code)

    const newLink: ShortLinkRecord = {
      id: `guest-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...record,
      is_active: true,
      created_at: new Date().toISOString(),
      clicks_count: 0
    }

    if (existingIndex >= 0) {
      links[existingIndex] = newLink
    } else {
      links.unshift(newLink)
    }

    const trimmed = links.slice(0, 1000)
    writeLinksSafely(trimmed)
    return newLink
  } catch (err) {
    console.error('saveGuestLink error fallback:', err)
    return {
      id: `guest-${Date.now()}`,
      ...record,
      is_active: true,
      created_at: new Date().toISOString(),
      clicks_count: 0
    }
  }
}

// Find link by short_code - NEVER throws
export function findGuestLink(shortCode: string): ShortLinkRecord | null {
  try {
    const links = getAllGuestLinks()
    const found = links.find(l => l.short_code === shortCode && l.is_active)
    return found || null
  } catch (err) {
    console.warn('findGuestLink error:', err)
    return null
  }
}

// Increment clicks for guest link
export function recordGuestClick(shortCode: string) {
  try {
    const links = getAllGuestLinks()
    const found = links.find(l => l.short_code === shortCode)
    if (found) {
      found.clicks_count = (found.clicks_count || 0) + 1
      writeLinksSafely(links)
    }
  } catch (err) {
    console.warn('Failed to record guest click:', err)
  }
}

// Increment likes for guest link
export function incrementGuestLinkLikes(shortCode: string): number {
  try {
    const links = getAllGuestLinks()
    const found = links.find(l => l.short_code === shortCode)
    if (found) {
      found.likes_count = (found.likes_count || 0) + 1
      writeLinksSafely(links)
      return found.likes_count
    }
  } catch (err) {
    console.warn('Failed to increment guest likes:', err)
  }
  return 1
}

// Claim guest links to logged in user
export function claimGuestLinksForUser(userId: string, shortCodes: string[]): number {
  try {
    const links = getAllGuestLinks()
    let claimedCount = 0
    links.forEach(l => {
      if (shortCodes.includes(l.short_code) && !l.user_id) {
        l.user_id = userId
        claimedCount++
      }
    })
    if (claimedCount > 0) {
      writeLinksSafely(links)
    }
    return claimedCount
  } catch (err) {
    console.warn('Failed to claim guest links:', err)
    return 0
  }
}
