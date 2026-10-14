import { NextRequest, NextResponse } from 'next/server'
import { getAdminData, approveSettlement, toggleSettlementStatus } from '@/lib/adminStorage'

export async function GET() {
  try {
    const data = getAdminData()
    return NextResponse.json(data.settlements)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch settlements' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, settlementId } = body

    if (!settlementId) {
      return NextResponse.json({ error: 'Settlement ID is required' }, { status: 400 })
    }

    if (action === 'approve') {
      const updated = approveSettlement(settlementId)
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json({ success: true, settlement: updated })
    }

    if (action === 'toggle') {
      const updated = toggleSettlementStatus(settlementId)
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json({ success: true, settlement: updated })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
