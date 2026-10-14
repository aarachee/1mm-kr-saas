'use client'

import React, { useState } from 'react'
import { DollarSign, Calculator, Percent, ArrowRight, ShieldCheck, Check } from 'lucide-react'

interface PlatformFee {
  name: string
  rate: number // %
  desc: string
}

const PLATFORMS: Record<string, PlatformFee> = {
  smartstore: { name: '네이버 스마트스토어', rate: 5.63, desc: '주문관리+네이버쇼핑 연동 수수료 (평균 5.63%)' },
  coupang_market: { name: '쿠팡 마켓플레이스', rate: 10.8, desc: '오픈마켓 카테고리 평균 수수료 (약 10.8%)' },
  coupang_rocket: { name: '쿠팡 로켓배송/그로스', rate: 25.0, desc: '로켓 물류+보관+수수료 합산 (약 25~30%)' },
  gmarket: { name: 'G마켓 / 옥션', rate: 13.0, desc: '카테고리 평균 수수료 (약 13%)' }
}

export function SellerMarginCalculator() {
  const [salesPrice, setSalesPrice] = useState(29900)
  const [costPrice, setCostPrice] = useState(12000)
  const [shippingCost, setShippingCost] = useState(3000)
  const [shippingFeePaidByCustomer, setShippingFeePaidByCustomer] = useState(3000)
  const [selectedPlatform, setSelectedPlatform] = useState('smartstore')

  const platform = PLATFORMS[selectedPlatform]
  const commission = Math.round(salesPrice * (platform.rate / 100))
  const netShipping = shippingFeePaidByCustomer - shippingCost
  const netProfit = salesPrice - costPrice - commission + netShipping
  const marginRate = salesPrice > 0 ? ((netProfit / salesPrice) * 100).toFixed(1) : '0'

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-left shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs font-bold mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>이커머스 셀러 필수 도구</span>
          </div>
          <h3 className="text-xl font-black text-white">
            💰 스마트스토어 · 쿠팡 판매 마진율 계산기
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            판매가, 사입원가, 수수료를 입력하고 실제 내 통장에 입금되는 진짜 순수익을 1초 만에 확인하세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* 좌측 입력 폼 */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 block">
              판매 플랫폼 선택
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(PLATFORMS).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPlatform(key)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border ${
                    selectedPlatform === key
                      ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-md font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div>{item.name}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedPlatform === key ? 'text-slate-800 font-bold' : 'text-slate-500'}`}>
                    수수료 {item.rate}%
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 block">
                소비자 판매가 (원)
              </label>
              <input
                type="number"
                value={salesPrice}
                onChange={(e) => setSalesPrice(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-bold text-white focus:border-emerald-400 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 block">
                상품 매입 원가 (원)
              </label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-bold text-white focus:border-emerald-400 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 block">
                고객 결제 배송비 (원)
              </label>
              <input
                type="number"
                value={shippingFeePaidByCustomer}
                onChange={(e) => setShippingFeePaidByCustomer(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-400 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 block">
                실제 택배 발송 비용 (원)
              </label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-400 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* 우측 계산 결과 카드 */}
        <div className="md:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="text-xs font-black text-emerald-400 uppercase tracking-wider">
            📊 정산 & 마진 분석 결과
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>플랫폼 예상 수수료 ({platform.rate}%):</span>
              <span className="font-mono text-rose-400 font-bold">
                - {commission.toLocaleString()} 원
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span>상품 원가:</span>
              <span className="font-mono text-slate-300">
                - {costPrice.toLocaleString()} 원
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">개당 최종 순마진:</span>
                <span className={`text-xl font-black font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {netProfit.toLocaleString()} 원
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">최종 마진율:</span>
                <span className={`text-lg font-black font-mono ${Number(marginRate) >= 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {marginRate} %
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400">
            {Number(marginRate) >= 30 ? (
              <span className="text-emerald-400 font-bold">🌟 마진율 30% 이상의 우수한 효자 상품입니다!</span>
            ) : Number(marginRate) >= 15 ? (
              <span className="text-amber-400 font-bold">⚖️ 보통 수준의 마진입니다. 광고비 지출에 유의하세요.</span>
            ) : (
              <span className="text-rose-400 font-bold">⚠️ 마진율이 낮습니다. 원가 절감이나 번들 구성을 검토하세요.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
