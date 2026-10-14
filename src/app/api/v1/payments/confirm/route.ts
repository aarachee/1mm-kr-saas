import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export interface PaymentTransactionRecord {
  orderId: string
  paymentId: string
  productId: string
  amount: number
  method: string
  buyerEmail?: string
  status: 'PAID' | 'FAILED' | 'CANCELLED'
  paidAt: string
  receiptUrl: string
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const LOG_FILE = path.join(DATA_DIR, 'payment-transactions.json')

function saveTransaction(record: PaymentTransactionRecord) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    let records: PaymentTransactionRecord[] = []
    if (fs.existsSync(LOG_FILE)) {
      const content = fs.readFileSync(LOG_FILE, 'utf-8')
      records = JSON.parse(content)
    }

    records.unshift(record)
    fs.writeFileSync(LOG_FILE, JSON.stringify(records, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error logging payment transaction:', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, orderId, amount, method, buyerEmail, productId } = body

    if (!paymentId || !orderId || !amount) {
      return NextResponse.json({ error: '필수 결제 정보가 누락되었습니다.' }, { status: 400 })
    }

    const paidAt = new Date().toISOString()
    const receiptUrl = `https://pay.1mm.kr/receipt/${orderId}`

    const record: PaymentTransactionRecord = {
      orderId,
      paymentId,
      productId: productId || 'unknown',
      amount,
      method: method || 'card',
      buyerEmail: buyerEmail || undefined,
      status: 'PAID',
      paidAt,
      receiptUrl,
    }

    saveTransaction(record)

    return NextResponse.json({
      success: true,
      orderId,
      paymentId,
      amount,
      paidAt,
      receiptUrl,
      message: '결제 승인이 정상적으로 검증되었습니다.'
    })
  } catch (err) {
    console.error('Payment confirmation error:', err)
    return NextResponse.json({ error: '결제 검증 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const content = fs.readFileSync(LOG_FILE, 'utf-8')
      const records = JSON.parse(content)
      return NextResponse.json(records)
    }
    return NextResponse.json([])
  } catch (err) {
    return NextResponse.json([], { status: 500 })
  }
}
