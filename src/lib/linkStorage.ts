import fs from 'fs'
import path from 'path'

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
  pixel_id?: string | null
  is_active: boolean
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
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const FILE_PATH = path.join(DATA_DIR, 'guest-links.json')

// Ensure directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf-8')
  }
}

// Read all guest links
export function getAllGuestLinks(): ShortLinkRecord[] {
  try {
    ensureDataFile()
    const content = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(content || '[]')
  } catch (err) {
    console.error('Failed to read guest links:', err)
    return []
  }
}

// Save a guest link (or multi-link profile)
export function saveGuestLink(record: Omit<ShortLinkRecord, 'id' | 'created_at' | 'is_active'>): ShortLinkRecord {
  ensureDataFile()
  const links = getAllGuestLinks()

  // Check duplicate short_code
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

  // Keep last 1000 guest links
  const trimmed = links.slice(0, 1000)
  fs.writeFileSync(FILE_PATH, JSON.stringify(trimmed, null, 2), 'utf-8')
  return newLink
}

// Find link by short_code
export function findGuestLink(shortCode: string): ShortLinkRecord | null {
  const links = getAllGuestLinks()
  const found = links.find(l => l.short_code === shortCode && l.is_active)
  return found || null
}

// Increment clicks for guest link
export function recordGuestClick(shortCode: string) {
  try {
    ensureDataFile()
    const links = getAllGuestLinks()
    const found = links.find(l => l.short_code === shortCode)
    if (found) {
      found.clicks_count = (found.clicks_count || 0) + 1
      fs.writeFileSync(FILE_PATH, JSON.stringify(links, null, 2), 'utf-8')
    }
  } catch (err) {
    console.error('Failed to record guest click:', err)
  }
}

// Increment likes for guest link
export function incrementGuestLinkLikes(shortCode: string): number {
  try {
    ensureDataFile()
    const links = getAllGuestLinks()
    const found = links.find(l => l.short_code === shortCode)
    if (found) {
      found.likes_count = (found.likes_count || 0) + 1
      fs.writeFileSync(FILE_PATH, JSON.stringify(links, null, 2), 'utf-8')
      return found.likes_count
    }
  } catch (err) {
    console.error('Failed to increment guest likes:', err)
  }
  return 1
}

// Claim guest links to logged in user
export function claimGuestLinksForUser(userId: string, shortCodes: string[]): number {
  try {
    ensureDataFile()
    const links = getAllGuestLinks()
    let claimedCount = 0
    links.forEach(l => {
      if (shortCodes.includes(l.short_code) && !l.user_id) {
        l.user_id = userId
        claimedCount++
      }
    })
    if (claimedCount > 0) {
      fs.writeFileSync(FILE_PATH, JSON.stringify(links, null, 2), 'utf-8')
    }
    return claimedCount
  } catch (err) {
    console.error('Failed to claim guest links:', err)
    return 0
  }
}

