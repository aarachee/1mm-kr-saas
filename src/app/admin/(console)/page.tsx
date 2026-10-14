import React from 'react'
import Link from 'next/link'
import { getAdminData } from '@/lib/adminStorage'
import { 
  DollarSign, TrendingUp, CreditCard, Users, 
  ArrowRight, ShieldCheck, CheckCircle2, Clock, 
  Download, AlertCircle, FileSpreadsheet, Zap
} from 'lucide-react'

export default function AdminOverviewPage() {
  const data = getAdminData()

  // 계산
  const totalGmv = data.settlements.reduce((sum, s) => sum + s.grossAmount, 0)
  const totalFees = data.settlements.reduce((sum, s) => sum + s.feeAmount, 0)
  const pendingSettlements = data.settlements.filter(s => s.status === 'PENDING')
  const pendingPayoutAmount = pendingSettlements.reduce((sum, s) => sum + s.netPayout, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. 상단 타이틀 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            플랫폼 운영 요약 현황
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            1mm.kr 단축링크 트래픽 및 1미리페이 크리에이터 D2C 결제/정산 현황을 실시간 모니터링합니다.
          </p>
        </div>

        <Link
          href="/admin/settlements"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all self-start sm:self-auto"
        >
          <span>정산 대기 목록 승인하기 ({pendingSettlements.length}건)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. 4대 플랫폼 핵심 메트릭 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 누적 총 거래액 (GMV) */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>누적 총 거래액 (GMV)</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{totalGmv.toLocaleString()}원</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">전자책 & 디지털 상품 결제 총합</div>
          </div>
        </div>

        {/* 1미리 플랫폼 수수료 순매출 */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>1mm 수수료 순매출 (3.5%)</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-indigo-400">{totalFees.toLocaleString()}원</div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">+ Creator Pro 구독 매출 합산</div>
          </div>
        </div>

        {/* 정산 대기 지급액 */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>크리에이터 정산 대기액</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-400">{pendingPayoutAmount.toLocaleString()}원</div>
            <div className="text-[11px] text-rose-400/80 mt-1 font-medium">{pendingSettlements.length}건 대기 중 (월요일 자동 정산)</div>
          </div>
        </div>

        {/* 인앱 탈출 성공률 */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>인앱 탈출 결제 성공률</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-400">99.2%</div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">로그인 풀림 이탈 0건 방어</div>
          </div>
        </div>
      </div>

      {/* 3. 주간 정산 대기 현황 요약 */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">이번 주 크리에이터 정산 대기 목록</h3>
          </div>
          <Link href="/admin/settlements" className="text-xs text-indigo-400 hover:underline">
            전체 관리 &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">정산 대상 크리에이터</th>
                <th className="py-2.5 px-3">판매 상품</th>
                <th className="py-2.5 px-3">총 판매액</th>
                <th className="py-2.5 px-3">수수료 (3.5%)</th>
                <th className="py-2.5 px-3">최종 입금액</th>
                <th className="py-2.5 px-3">입금 계좌 정보</th>
                <th className="py-2.5 px-3 text-right">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data.settlements.map((stl) => (
                <tr key={stl.id} className="hover:bg-slate-900/30">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{stl.creatorName}</div>
                    <div className="text-[10px] text-slate-500">{stl.creatorEmail}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-[200px] truncate">{stl.productTitle}</td>
                  <td className="py-3 px-3 font-medium text-white">{stl.grossAmount.toLocaleString()}원</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">-{stl.feeAmount.toLocaleString()}원</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">{stl.netPayout.toLocaleString()}원</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                    <span className="text-indigo-400 font-semibold">{stl.bankName}</span> {stl.accountNumber} <span className="text-slate-400">({stl.accountHolder})</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {stl.status === 'COMPLETED' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                        정산 완료
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                        승인 대기
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 최근 PG 결제 거래 내역 */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white">최근 승인된 결제 거래 내역 (토스페이먼츠 & 포트원)</h3>
          </div>
          <Link href="/admin/transactions" className="text-xs text-indigo-400 hover:underline">
            전체 거래 보기 &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">주문 번호</th>
                <th className="py-2.5 px-3">구매 상품</th>
                <th className="py-2.5 px-3">구매자 이메일</th>
                <th className="py-2.5 px-3">결제 수단</th>
                <th className="py-2.5 px-3">결제 금액</th>
                <th className="py-2.5 px-3">플랫폼 수수료</th>
                <th className="py-2.5 px-3 text-right">승인 시각</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data.transactions.map((tx) => (
                <tr key={tx.orderId} className="hover:bg-slate-900/30">
                  <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{tx.orderId}</td>
                  <td className="py-3 px-3 text-white max-w-[200px] truncate">{tx.productTitle}</td>
                  <td className="py-3 px-3 text-slate-400">{tx.customerEmail}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-bold uppercase">
                      {tx.method}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">{tx.amount.toLocaleString()}원</td>
                  <td className="py-3 px-3 text-indigo-400 font-mono">+{tx.fee.toLocaleString()}원</td>
                  <td className="py-3 px-3 text-right text-slate-500 font-mono">{new Date(tx.paidAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
