'use client'

import React, { useState } from 'react'
import { SettlementRecord } from '@/lib/adminStorage'
import { 
  DollarSign, CheckCircle2, Clock, Download, 
  Search, ArrowUpDown, RefreshCw, AlertCircle, 
  ExternalLink, Building2, UserCheck, ShieldCheck
} from 'lucide-react'

interface Props {
  initialSettlements: SettlementRecord[]
}

export default function SettlementManagerClient({ initialSettlements }: Props) {
  const [settlements, setSettlements] = useState<SettlementRecord[]>(initialSettlements)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL')
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  // 통계 계산
  const totalGross = settlements.reduce((sum, s) => sum + s.grossAmount, 0)
  const totalFees = settlements.reduce((sum, s) => sum + s.feeAmount, 0)
  const pendingItems = settlements.filter(s => s.status === 'PENDING')
  const pendingAmount = pendingItems.reduce((sum, s) => sum + s.netPayout, 0)
  const completedItems = settlements.filter(s => s.status === 'COMPLETED')
  const completedAmount = completedItems.reduce((sum, s) => sum + s.netPayout, 0)

  // 필터링
  const filteredSettlements = settlements.filter(s => {
    if (filter === 'PENDING' && s.status !== 'PENDING') return false
    if (filter === 'COMPLETED' && s.status !== 'COMPLETED') return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const matchName = s.creatorName.toLowerCase().includes(q)
      const matchEmail = s.creatorEmail.toLowerCase().includes(q)
      const matchProduct = s.productTitle.toLowerCase().includes(q)
      const matchBank = s.bankName.toLowerCase().includes(q)
      return matchName || matchEmail || matchProduct || matchBank
    }
    return true
  })

  // 정산 승인 / 상태 토글 핸들러
  const handleToggleStatus = async (settlementId: string, currentStatus: string) => {
    setLoadingId(settlementId)
    try {
      const res = await fetch('/api/v1/admin/settlements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle',
          settlementId
        })
      })

      if (!res.ok) throw new Error('승인 처리에 실패했습니다.')
      const data = await res.json()

      setSettlements(prev => prev.map(s => s.id === settlementId ? data.settlement : s))
      
      const newStatus = data.settlement.status
      setNotification(
        newStatus === 'COMPLETED' 
          ? `[정산 완료] ${data.settlement.creatorName}님에게 ${data.settlement.netPayout.toLocaleString()}원 입금 승인 처리되었습니다.`
          : `[대기 복구] ${data.settlement.creatorName}님의 정산이 '승인 대기' 상태로 전환되었습니다.`
      )
      setTimeout(() => setNotification(null), 4000)
    } catch (err: any) {
      alert(err.message || '오류가 발생했습니다.')
    } finally {
      setLoadingId(null)
    }
  }

  // 은행 대량이체용 CSV 다운로드
  const handleDownloadCsv = () => {
    const headers = ['정산ID', '크리에이터명', '이메일', '상품명', '정산기간', '총판매액', '수수료(3.5%)', '실입금액', '은행명', '계좌번호', '예금주', '정산상태', '완료일시']
    const rows = filteredSettlements.map(s => [
      s.id,
      `"${s.creatorName}"`,
      s.creatorEmail,
      `"${s.productTitle}"`,
      s.period,
      s.grossAmount,
      s.feeAmount,
      s.netPayout,
      s.bankName,
      `'${s.accountNumber}`,
      `"${s.accountHolder}"`,
      s.status,
      s.completedAt || '-'
    ])

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `1mm_settlements_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      
      {/* 알림 토스트 */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-white ml-4">✕</button>
        </div>
      )}

      {/* 3대 정산 핵심 지표 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>이번 주 정산 대기액</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            {pendingAmount.toLocaleString()}원
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            대기 건수: {pendingItems.length}명 크리에이터
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>누적 정산 완료액</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {completedAmount.toLocaleString()}원
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            지급 완료 건수: {completedItems.length}건
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>플랫폼 수수료 집계 (3.5%)</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-400 mt-2">
            {totalFees.toLocaleString()}원
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            총 판매 거래액: {totalGross.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 필터, 검색, 엑셀 다운로드 바 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        {/* 필터 탭 */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 self-start">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            전체 ({settlements.length})
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'PENDING'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            대기 중 ({pendingItems.length})
          </button>
          <button
            onClick={() => setFilter('COMPLETED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'COMPLETED'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            정산 완료 ({completedItems.length})
          </button>
        </div>

        {/* 검색 및 엑셀 다운로드 */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="크리에이터명, 상품, 은행 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shrink-0"
            title="은행 대량이체용 CSV 파일 다운로드"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>대량이체 CSV</span>
          </button>
        </div>
      </div>

      {/* 정산 데이터 테이블 */}
      <div className="rounded-3xl bg-slate-900/40 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">정산 대상 크리에이터</th>
                <th className="py-3 px-4">상품명 / 정산 기간</th>
                <th className="py-3 px-4">총 판매액 (GMV)</th>
                <th className="py-3 px-4">수수료 (3.5%)</th>
                <th className="py-3 px-4">최종 지급액</th>
                <th className="py-3 px-4">입금 은행 및 계좌</th>
                <th className="py-3 px-4">상태</th>
                <th className="py-3 px-4 text-center">승인 관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredSettlements.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                    조건에 해당하는 정산 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredSettlements.map((stl) => {
                  const isLoading = loadingId === stl.id
                  const isPending = stl.status === 'PENDING'

                  return (
                    <tr key={stl.id} className="hover:bg-slate-900/50 transition-colors">
                      {/* 크리에이터 */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{stl.creatorName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({stl.id})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">{stl.creatorEmail}</div>
                      </td>

                      {/* 상품 및 기간 */}
                      <td className="py-3.5 px-4 max-w-[220px]">
                        <div className="text-white font-medium truncate" title={stl.productTitle}>
                          {stl.productTitle}
                        </div>
                        <div className="text-[10px] text-indigo-400 font-mono mt-0.5">
                          {stl.period}
                        </div>
                      </td>

                      {/* 총 판매액 */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {stl.grossAmount.toLocaleString()}원
                      </td>

                      {/* 수수료 */}
                      <td className="py-3.5 px-4 text-rose-400/90 font-mono">
                        -{stl.feeAmount.toLocaleString()}원
                        <span className="text-[10px] text-slate-500 ml-1">({(stl.feeRate * 100).toFixed(1)}%)</span>
                      </td>

                      {/* 실 지급액 */}
                      <td className="py-3.5 px-4">
                        <div className="text-sm font-black text-emerald-400">
                          {stl.netPayout.toLocaleString()}원
                        </div>
                      </td>

                      {/* 계좌 정보 */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-white font-medium">
                          <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="text-indigo-300 font-bold">{stl.bankName}</span>
                          <span className="font-mono text-xs">{stl.accountNumber}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          예금주: <span className="text-slate-200 font-semibold">{stl.accountHolder}</span>
                        </div>
                      </td>

                      {/* 상태 */}
                      <td className="py-3.5 px-4">
                        {isPending ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                            <span>승인 대기</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>입금 완료</span>
                          </div>
                        )}
                        {stl.completedAt && (
                          <div className="text-[9px] text-slate-500 mt-1 font-mono">
                            {new Date(stl.completedAt).toLocaleDateString()} 승인
                          </div>
                        )}
                      </td>

                      {/* 액션 버튼 */}
                      <td className="py-3.5 px-4 text-center">
                        {isPending ? (
                          <button
                            onClick={() => handleToggleStatus(stl.id, stl.status)}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                          >
                            {isLoading ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>송금 승인</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(stl.id, stl.status)}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-semibold border border-slate-700 transition-colors disabled:opacity-50"
                            title="대기 상태로 되돌리기"
                          >
                            <span>상태 되돌리기</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 정산 운영 안내 가이드 */}
      <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-indigo-300">
            1미리페이 주간 자동 정산 원칙 (매주 월요일 지급)
          </div>
          <p className="text-slate-400 leading-relaxed">
            - 정산 주기: 전주 월요일 00:00 ~ 일요일 23:59까지 확정된 결제 건을 차주 월요일 14:00에 등록된 크리에이터 실명 계좌로 입금합니다.<br />
            - 수수료율: 토스/카카오/네이버페이 원가 실비 3.5%만 원천 공제되며, 남은 순매출 96.5%가 전액 정산됩니다.<br />
            - 위 [대량이체 CSV] 버튼을 통해 기업은행/신한은행 펌뱅킹 대량이체 포맷에 맞는 파일을 즉시 내려받으실 수 있습니다.
          </p>
        </div>
      </div>

    </div>
  )
}
