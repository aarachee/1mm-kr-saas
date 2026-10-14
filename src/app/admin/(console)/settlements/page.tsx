import React from 'react'
import { getAdminData } from '@/lib/adminStorage'
import SettlementManagerClient from './SettlementManagerClient'
import { DollarSign } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminSettlementsPage() {
  const data = getAdminData()

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Settlements Backoffice</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          크리에이터 주간 정산 및 이체 승인
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          1미리페이로 발생한 전자책 & 디지털 상품의 총 판매액에서 3.5% PG 실비 수수료를 공제한 실입금액을 확인하고 입금 승인합니다.
        </p>
      </div>

      <SettlementManagerClient initialSettlements={data.settlements} />
    </div>
  )
}
