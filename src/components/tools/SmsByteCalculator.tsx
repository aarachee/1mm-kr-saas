'use client'

import React, { useState, useMemo } from 'react'
import { MessageSquare, AlertTriangle, CheckCircle2, TrendingDown, Sparkles, Copy, Check } from 'lucide-react'

// EUC-KR / 한글 2바이트 바이트 계산 함수
function getByteLength(str: string): number {
  let byteLen = 0
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // 한글 및 2바이트 특수문자
    if (code > 127) {
      byteLen += 2
    } else {
      byteLen += 1
    }
  }
  return byteLen
}

export function SmsByteCalculator() {
  const [text, setText] = useState(
    `[특별혜택] 오늘 단 하루! 전상품 30% 즉시 할인 쿠폰이 도착했습니다. 지금 바로 확인해 보세요! https://1mm.kr/sale`
  )
  const [monthlyCount, setMonthlyCount] = useState(10000)
  const [copied, setCopied] = useState(false)

  const byteLength = useMemo(() => getByteLength(text), [text])
  const charLength = text.length
  const isSms = byteLength <= 90

  // 요금 계산 (단문 10원, 장문 35원 기준)
  const currentCostPerMessage = isSms ? 10 : 35
  const totalMonthlyCost = monthlyCount * currentCostPerMessage
  const smsOnlyMonthlyCost = monthlyCount * 10
  const savedMonthlyAmount = isSms ? 0 : totalMonthlyCost - smsOnlyMonthlyCost

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-left shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold mb-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>대량 문자 발송비 70% 절감 솔루션</span>
          </div>
          <h3 className="text-xl font-black text-white">
            💬 문자(SMS) 90Byte 검사기 & 발송비 절감 시뮬레이터
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            한글 45자(90바이트) 초과 시 단문(10원)에서 장문(35원)으로 3.5배 요금이 뜁니다. 1mm 단축 URL로 비용을 아끼세요.
          </p>
        </div>

        {/* 상태 배지 */}
        <div className="flex items-center gap-2">
          {isSms ? (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>단문(SMS) 90B 이내 · 건당 10원</span>
            </div>
          ) : (
            <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>장문(LMS) 초과! · 건당 35원 (3.5배 과금)</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 좌측: 실시간 텍스트 입력창 & 바이트 게이지 */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
              <span>문자 발송 내용 입력</span>
              <span className="text-slate-400 font-mono">
                글자수: {charLength}자
              </span>
            </div>
            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="문자 발송 문구를 붙여넣으세요..."
              className="w-full p-4 bg-slate-950 border border-slate-700 rounded-2xl text-sm font-medium text-white focus:border-amber-400 outline-none leading-relaxed resize-none"
            />
          </div>

          {/* 바이트 프로그레스 게이지 */}
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span>현재 용량:</span>
                <span className={`text-base font-mono ${isSms ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {byteLength} Byte
                </span>
                <span className="text-slate-500 font-normal">/ 90 Byte</span>
              </span>
              <span className={isSms ? 'text-emerald-400' : 'text-rose-400'}>
                {isSms ? `${90 - byteLength} Byte 여유` : `${byteLength - 90} Byte 초과!`}
              </span>
            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 ${
                  isSms ? 'bg-emerald-400' : 'bg-gradient-to-r from-amber-400 to-rose-500'
                }`}
                style={{ width: `${Math.min(100, (byteLength / 90) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 우측: 요금 절감 시뮬레이터 카드 */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" />
            <span>우리 회사 문자 발송비 시뮬레이션</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 block">
              월간 예상 문자 발송 건수
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={monthlyCount}
                onChange={(e) => setMonthlyCount(Math.max(1, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:border-amber-400 outline-none font-mono"
              />
              <span className="text-xs font-bold text-slate-400 shrink-0">건</span>
            </div>
          </div>

          {/* 비용 비교 박스 */}
          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>현재 설정 기준 월 발송비:</span>
              <span className="font-mono font-bold text-white text-sm">
                {totalMonthlyCost.toLocaleString()} 원
              </span>
            </div>

            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>90B 단문(SMS) 유지 시:</span>
              <span className="font-mono text-sm">
                {smsOnlyMonthlyCost.toLocaleString()} 원
              </span>
            </div>

            {!isSms && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl mt-2 text-center">
                <span className="text-[11px] text-rose-300 font-bold block mb-0.5">
                  긴 URL 때문에 매달 낭비되는 금액
                </span>
                <span className="text-lg font-black text-rose-400 font-mono">
                  - {savedMonthlyAmount.toLocaleString()} 원
                </span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800/80">
            💡 <strong>1mm 단축 주소(13자)</strong>를 넣으면 긴 원본 링크를 줄여 단문(SMS) 규격에 쉽게 맞출 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
