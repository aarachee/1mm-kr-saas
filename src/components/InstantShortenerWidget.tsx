'use client'

import React, { useState } from 'react'
import { createShortLink } from '@/app/actions'
import { 
  Link2, Sparkles, Check, Copy, ExternalLink, 
  ArrowRight, ShieldCheck, QrCode, SlidersHorizontal, RefreshCw 
} from 'lucide-react'

export function InstantShortenerWidget() {
  const [longUrl, setLongUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // 생성 성공 결과 상태
  const [result, setResult] = useState<{
    shortCode: string
    shortUrl: string
    longUrl: string
    fullUrl: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!longUrl.trim()) {
      setError('단축할 URL을 입력해주세요.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('longUrl', longUrl.trim())
      if (customCode.trim()) {
        formData.append('customCode', customCode.trim())
      }

      const res = await createShortLink(formData)

      if (res.error) {
        setError(res.error)
      } else if (res.success && res.shortCode) {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://1mm.kr'
        const fullUrl = `${origin}/${res.shortCode}`

        setResult({
          shortCode: res.shortCode,
          shortUrl: res.shortUrl || `/${res.shortCode}`,
          longUrl: res.longUrl || longUrl,
          fullUrl,
        })
      }
    } catch (err: any) {
      setError(err.message || '단축 링크 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result.fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setLongUrl('')
    setCustomCode('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!result ? (
        /* 1. 입력 폼 */
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-2xl border-2 border-primary/40 focus-within:border-amber-400 transition-all">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full flex items-center">
              <Link2 className="w-5 h-5 text-primary ml-3 shrink-0" />
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="단축할 긴 URL을 입력하세요 (예: https://blog.naver.com/...)"
                className="w-full px-3 py-3 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-extrabold text-sm shrink-0 shadow-md shadow-primary/30 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>단축 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>1초 단축 생성</span>
                </>
              )}
            </button>
          </div>

          {/* 고급 설정 토글 (커스텀 단축어) */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs px-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-semibold transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showAdvanced ? '옵션 접기' : '원하는 주소 직접 지정 (예: 1mm.kr/내단축어)'}
            </button>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 무료 즉시 발급
            </span>
          </div>

          {showAdvanced && (
            <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2 animate-fadeIn text-xs">
              <span className="text-slate-500 font-bold shrink-0">1mm.kr/</span>
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="원하는단축어 (예: myevent, 맛집할인)"
                className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          )}

          {error && (
            <p className="text-rose-500 text-xs font-bold mt-2 px-2 animate-fadeIn">
              ⚠️ {error}
            </p>
          )}
        </form>
      ) : (
        /* 2. 생성 성공 결과 카드 */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-emerald-400 dark:border-emerald-500 animate-scaleIn text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black">
              <Check className="w-4 h-4 stroke-[3]" />
              1mm 단축 주소 생성 완료!
            </span>
            <span className="text-xs text-slate-400 font-medium">
              즉시 작동 보증
            </span>
          </div>

          {/* 단축된 URL 강조 박스 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="overflow-hidden">
              <div className="text-[11px] text-slate-400 font-semibold mb-0.5">내 단축 링크</div>
              <div className="text-lg sm:text-xl font-black text-primary tracking-tight truncate">
                {result.fullUrl}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5 max-w-md">
                원문: {result.longUrl}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '복사 완료! 🎉' : '주소 복사'}
              </button>

              <a
                href={result.fullUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>테스트 열기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 7일 주소 독점 임시 예약 & 1초 로그인 영구 소유 넛지 */}
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 text-amber-950 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-black text-xs">
              <span className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                🚨 [{result.shortCode}] 단축어 독점 임시 예약 중
              </span>
              <span className="text-rose-600 dark:text-rose-400 font-extrabold bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 rounded-full text-[10px]">
                만료 D-7일
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
              비로그인 상태에서는 <strong>7일 동안만 이 단축어가 임시 예약</strong>됩니다. 
              다른 사용자에게 주소를 뺏기지 않고 평생 관리하려면 지금 무료 로그인하세요!
            </p>
            <div className="pt-0.5">
              <a
                href="/login"
                className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>🔑 1초 무료 로그인하고 이 주소 평생 소유하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 평생 안심 인쇄 보증 배너 */}
          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">1mm 평생 안심 인쇄 보증: </strong>
              전단지나 명함에 인쇄해도 목적지 이동은 평생 정상 유지됩니다.
            </div>
          </div>

          {/* 안심 태그 및 다른 링크 단축 버튼 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-xs text-slate-500">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>악성 스팸 검사 통과 / 클린 1mm 링크 등록됨</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-primary hover:underline font-bold"
            >
              + 다른 링크 또 단축하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
