import fs from 'fs'
import path from 'path'

export interface SettlementRecord {
  id: string
  creatorName: string
  creatorEmail: string
  productTitle: string
  period: string
  grossAmount: number
  feeRate: number
  feeAmount: number
  netPayout: number
  bankName: string
  accountNumber: string
  accountHolder: string
  status: 'PENDING' | 'COMPLETED'
  scheduledDate: string
  completedAt: string | null
}

export interface TransactionRecord {
  orderId: string
  productTitle: string
  customerEmail: string
  method: string
  amount: number
  fee: number
  status: 'SUCCESS' | 'CANCELLED'
  paidAt: string
}

export interface AdminData {
  settlements: SettlementRecord[]
  transactions: TransactionRecord[]
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const FILE_PATH = path.join(DATA_DIR, 'admin-data.json')

function ensureAdminData(): AdminData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(FILE_PATH)) {
    const initial: AdminData = { settlements: [], transactions: [] }
    fs.writeFileSync(FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8')
    return initial
  }
  try {
    const content = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(content) as AdminData
  } catch (err) {
    console.error('Error reading admin data:', err)
    return { settlements: [], transactions: [] }
  }
}

function writeAdminData(data: AdminData) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing admin data:', err)
  }
}

export function getAdminData(): AdminData {
  return ensureAdminData()
}

export function approveSettlement(settlementId: string): SettlementRecord | null {
  const data = ensureAdminData()
  const item = data.settlements.find(s => s.id === settlementId)
  if (!item) return null

  item.status = 'COMPLETED'
  item.completedAt = new Date().toISOString()
  writeAdminData(data)
  return item
}

export function toggleSettlementStatus(settlementId: string): SettlementRecord | null {
  const data = ensureAdminData()
  const item = data.settlements.find(s => s.id === settlementId)
  if (!item) return null

  if (item.status === 'PENDING') {
    item.status = 'COMPLETED'
    item.completedAt = new Date().toISOString()
  } else {
    item.status = 'PENDING'
    item.completedAt = null
  }

  writeAdminData(data)
  return item
}
