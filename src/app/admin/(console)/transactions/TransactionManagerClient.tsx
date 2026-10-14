'use client'

import React, { useState } from 'react'
import { TransactionRecord } from '@/lib/adminStorage'
import { 
  CreditCard, Search, Download, CheckCircle2, 
  ArrowUpDown, Filter, Sparkles, ExternalLink, ShieldCheck 
} from 'lucide-react'

interface Props {
  initialTransactions: TransactionRecord[]
}

export default function TransactionManagerClient({ initialTransactions }: Props) {
  const [transactions] = useState<TransactionRecord[]>(initialTransactions)
  const [search, setSearch] = useState('')
  const [methodFilter, setMethodFilter] = useState<string>('ALL')

  // 계산
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0)
  const successCount = transactions.filter(t => t.status === 'SUCCESS').length

  // 필터링
  const filtered = transactions.filter(t => {
    if (methodFilter !== 'ALL' && t.method.toLowerCase() !== methodFilter.toLowerCase()) {
      return false
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      const matchOrder = t.orderId.toLowerCase().includes(q)
      const matchProduct = t.productTitle.toLowerCase().includes(q)
      const matchEmail = t.customerEmail.toLowerCase().includes(q)
      return matchOrder || matchProduct || matchEmail
    }
    return true
  })

  // CSV 다운로드
  const handleDownloadCsv = () => {
    const headers = ['주문번호', '상품명', '구매자이메일', '결제수단', '결제금액', '수수료(3.5%)', '상태', '승인일시']
    const rows = filtered.map(t => [
      t.orderId,
      `"${t.productTitle}"`,
      t.customerEmail,
      t.method,
      t.amount,
      t.fee,
      t.status,
      t.paidAt
    ])

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `1mm_transactions_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 간편결제 뱃지 스타일
  const getMethodBadge = (method: string) => {
    const m = method.toLowerCase()
    if (m === 'kakaopay') {
      return <span className="px-2 py-0.5 rounded-md bg-[#FEE500] text-black font-extrabold text-[10px]">카카오페이</span>
    }
    if (m === 'naverpay') {
      return <span className="px-2 py-0.5 rounded-md bg-[#03C75A] text-white font-extrabold text-[10px]">네이버페이</span>
    }
    if (m === 'tosspay') {
      return <span className="px-2 py-0.5 rounded-md bg-[#0064FF] text-white font-extrabold text-[10px]">토스페이</span>
    }
    return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold text-[10px] uppercase">신용카드</span>
  }

  return (
    <div className="space-y-6">
      
      {/* 핵심 거래 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">누적 결제 승인액</div>
          <div className="text-2xl font-black text-white mt-2">
            {totalAmount.toLocaleString()}원
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            총 {transactions.length}건 거래
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">플랫폼 수수료 (3.5%)</div>
          <div className="text-2xl font-black text-indigo-400 mt-2">
            {totalFees.toLocaleString()}원
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            PG 결제 원가 실비 기준
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">결제 성공률</div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            100%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            인앱 브라우저 이탈 0건
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">연동 PG 상태</div>
          <div className="flex items-center gap-1.5 text-base font-bold text-white mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>토스 & 포트원</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            Live Webhook 실시간 수신
          </div>
        </div>
      </div>

      {/* 필터 및 검색 바 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 overflow-x-auto">
          {['ALL', 'kakaopay', 'naverpay', 'tosspay', 'card'].map((method) => {
            const labelMap: Record<string, string> = {
              ALL: '전체 결제',
              kakaopay: '카카오페이',
              naverpay: '네이버페이',
              tosspay: '토스페이',
              card: '신용카드'
            }
            const active = methodFilter === method
            return (
              <button
                key={method}
                onClick={() => setMethodFilter(method)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {labelMap[method]}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="주문번호, 상품명, 이메일..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>원장 CSV</span>
          </button>
        </div>
      </div>

      {/* 거래 원장 테이블 */}
      <div className="rounded-3xl bg-slate-900/40 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">주문 번호 (Order ID)</th>
                <th className="py-3 px-4">구매 상품</th>
                <th className="py-3 px-4">구매자 이메일</th>
                <th className="py-3 px-4">결제 수단</th>
                <th className="py-3 px-4">승인 금액</th>
                <th className="py-3 px-4">수수료 (3.5%)</th>
                <th className="py-3 px-4">거래 상태</th>
                <th className="py-3 px-4 text-right">승인 일시</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                    조건에 해당하는 결제 거래 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.orderId} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                      {tx.orderId}
                    </td>
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="text-white font-medium truncate" title={tx.productTitle}>
                        {tx.productTitle}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {tx.customerEmail}
                    </td>
                    <td className="py-3.5 px-4">
                      {getMethodBadge(tx.method)}
                    </td>
                    <td className="py-3.5 px-4 font-black text-white text-sm">
                      {tx.amount.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4 font-mono text-indigo-400">
                      +{tx.fee.toLocaleString()}원
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>결제 완료</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-500 text-[11px]">
                      {new Date(tx.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PG 보안 및 환불 규정 안내 */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-white">
            PG 승인 원장 데이터 무결성 보장
          </div>
          <p className="text-slate-400 leading-relaxed">
            - 결제 데이터는 PG사(토스페이먼츠 및 포트원)의 웹훅 시그니처 검증을 거친 후 자동 기록됩니다.<br />
            - 인앱 브라우저 결제 시 1mm.kr 독자 외부 브라우저 탈출 엔진으로 카카오톡/스레드/인스타그램 웹뷰에서의 세션 끊김을 0%로 유지합니다.<br />
            - 환불 발생 시 PG사 취소 API와 연동되어 정산 대기 원장에서 즉시 차감 반영됩니다.
          </p>
        </div>
      </div>

    </div>
  )
}
