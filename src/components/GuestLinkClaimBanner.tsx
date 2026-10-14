'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, ShieldCheck, Check, ArrowRight, RefreshCw } from 'lucide-react'
import { claimGuestLinksAction } from '@/app/actions'

export function GuestLinkClaimBanner() {
  const [unclaimedCodes, setUnclaimedCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [claimedSuccess, setClaimedSuccess] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('1mm_guest_links') || '[]')
      if (Array.isArray(saved) && saved.length > 0) {
        setUnclaimedCodes(saved)
      }
    } catch (e) {}
  }, [])

  if (unclaimedCodes.length === 0 && !claimedSuccess) {
    return null
  }

  const handleClaim = async () => {
    setLoading(true)
    try {
      const res = await claimGuestLinksAction(unclaimedCodes)
      if (res.success) {
        setClaimedSuccess(true)
        localStorage.removeItem('1mm_guest_links')
        setUnclaimedCodes([])
        setTimeout(() => {
          window.location.reload()
        }, 1200)
      } else {
        alert(res.error || '소유권 이전에 실패했습니다.')
      }
    } catch (err) {
      alert('소유권 이전 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (claimedSuccess) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-3 animate-fadeIn">
        <Check className="w-5 h-5 text-emerald-500 shrink-0" />
        <span className="text-xs font-bold">
          🎉 비회원 생성 링크가 사장님의 계정으로 성공적으로 영구 귀속되었습니다!
        </span>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-primary/15 border-2 border-amber-400/40 text-slate-900 dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-fadeIn">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">
              비회원 생성 링크 감지됨
            </span>
            <span className="text-[10px] bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.2 rounded-full">
              {unclaimedCodes.length}개 링크
            </span>
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
            로그인 전에 만드신 <strong className="text-primary">{unclaimedCodes.map(c => `1mm.kr/${c}`).join(', ')}</strong> 주소를 사장님 계정에 영구 귀속할 수 있습니다.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClaim}
        disabled={loading}
        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-95 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>귀속 처리 중...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>내 계정으로 1초 귀속하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  )
}
