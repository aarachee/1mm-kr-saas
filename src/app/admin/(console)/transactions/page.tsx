import React from 'react'
import { getAdminData } from '@/lib/adminStorage'
import TransactionManagerClient from './TransactionManagerClient'
import { CreditCard } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminTransactionsPage() {
  const data = getAdminData()

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payment Ledger Audit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          전체 PG 결제 거래 원장
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          카카오페이, 네이버페이, 토스페이, 신용카드 등 1미리페이로 승인된 모든 결제 내역과 3.5% 수수료를 실시간 조회합니다.
        </p>
      </div>

      <TransactionManagerClient initialTransactions={data.transactions} />
    </div>
  )
}
