'use client'

import React, { useState } from 'react'
import { 
  Link2, Sparkles, Copy, Check, ExternalLink, 
  ArrowRight, ShieldCheck, QrCode, SlidersHorizontal, 
  Zap, ShoppingBag, Eye, Lock
} from 'lucide-react'
import QRCode from 'qrcode'
import { createShortLink } from '@/app/actions'
import { validateCustomSlug } from '@/lib/reservedWords'
import Link from 'next/link'

export function RevampedShortenerWidget() {
  const [longUrl, setLongUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [isPageMode, setIsPageMode] = useState(false)
  const [profileTitle, setProfileTitle] = useState('')
  const [profileBio, setProfileBio] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [slugNotice, setSlugNotice] = useState<{ isWarning?: boolean; message: string } | null>(null)

  // 생성 완료 상태
  const [shortResult, setShortResult] = useState<{
    shortUrl: string
    shortCode: string
    isPageMode: boolean
    qrDataUrl?: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const [mountedTs, setMountedTs] = useState<number>(0)

  React.useEffect(() => {
    setMountedTs(Date.now())
  }, [])

  // 커스텀 단축어 실시간 유효성 피드백
  const handleCustomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    setCustomCode(val)
    setErrorMessage(null)

    if (!val) {
      setSlugNotice(null)
      return
    }

    if (val.length < 3) {
      setSlugNotice({ isWarning: true, message: '최소 3글자 이상이어야 합니다 (예: 1mm.kr/abc)' })
      return
    }

    const check = validateCustomSlug(val)
    if (!check.valid) {
      setSlugNotice({ isWarning: true, message: check.reason || '사용할 수 없는 단축어입니다.' })
    } else if (check.isPremiumReserved) {
      setSlugNotice({ isWarning: true, message: '💎 골드 프리미엄 유보어입니다 (프로 플랜에서 선점 가능).' })
    } else {
      setSlugNotice({ isWarning: false, message: `✨ '1mm.kr/${val}' 사용 가능한 주소입니다!` })
    }
  }

  // 단축 생성 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!longUrl.trim()) {
      setErrorMessage('단축할 URL을 입력해주세요.')
      return
    }

    if (customCode.trim()) {
      const check = validateCustomSlug(customCode.trim())
      if (!check.valid) {
        setErrorMessage(check.reason || '단축어를 확인해주세요.')
        return
      }
    }

    setErrorMessage(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('longUrl', longUrl.trim())
      formData.append('_ts', mountedTs.toString())
      if (customCode.trim()) {
        formData.append('customCode', customCode.trim())
      }
      if (isPageMode) {
        formData.append('pageMode', 'true')
        if (profileTitle.trim()) formData.append('profileTitle', profileTitle.trim())
        if (profileBio.trim()) formData.append('profileBio', profileBio.trim())
      }

      const res = await createShortLink(formData)

      if (res.error) {
        setErrorMessage(res.error)
      } else if (res.shortCode) {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://1mm.kr'
        const fullShortUrl = `${origin}/${res.shortCode}`
        
        // QR 코드 동시 생성
        const qr = await QRCode.toDataURL(fullShortUrl, {
          width: 400,
          margin: 2,
          color: { dark: '#020617', light: '#ffffff' }
        })

        setShortResult({
          shortUrl: fullShortUrl,
          shortCode: res.shortCode,
          isPageMode: isPageMode,
          qrDataUrl: qr
        })
      }
    } catch (err: any) {
      setErrorMessage(err.message || '링크 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!shortResult) return
    navigator.clipboard.writeText(shortResult.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* 1. 단축 생성 메인 카드 */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* 장식용 글로우 */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 매크로 방어용 허니팟 트랩 (인간에게는 보이지 않음) */}
          <input
            type="text"
            name="hp_trap"
            value=""
            readOnly
            tabIndex={-1}
            autoComplete="off"
            className="hidden opacity-0 absolute -z-50 h-0 w-0 pointer-events-none"
            aria-hidden="true"
          />
          
          {/* URL 인풋창 */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>단축할 긴 URL 입력</span>
              </span>
              <span className="text-[11px] font-normal text-slate-400">
                카톡/인스타/쿠팡 링크 자동 정제
              </span>
            </label>

            <div className="relative">
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-path..."
                required
                className="w-full h-13 pl-4 pr-12 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner font-mono"
              />
              {longUrl && (
                <button
                  type="button"
                  onClick={() => setLongUrl('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 p-1"
                >
                  지우기
                </button>
              )}
            </div>
          </div>

          {/* 고급 옵션 토글 버튼 (커스텀 단축어 & 개별 페이지 모드) */}
          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvanced ? '옵션 접기 ▲' : '나만의 주소(단어) 지정 & 개별 페이지 꾸미기 ▼'}</span>
            </button>

            <span className="text-[11px] text-slate-500 hidden sm:inline-block">
              영문/숫자 3자 또는 한글 1개 무료
            </span>
          </div>

          {/* 펼쳐지는 고급 설정 패널 */}
          {showAdvanced && (
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4 text-left animate-in fade-in duration-200">
              
              {/* 커스텀 단축어 지정 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>원하는 단축어 지정 (선택)</span>
                  <span className="text-[10px] text-indigo-400">최소 3자 이상 (한글 가능)</span>
                </label>

                <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 px-3 h-11 focus-within:border-indigo-500 transition-colors">
                  <span className="text-xs font-mono font-bold text-slate-500 select-none">
                    1mm.kr/
                  </span>
                  <input
                    type="text"
                    value={customCode}
                    onChange={handleCustomCodeChange}
                    placeholder="민수 (또는 abc)"
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none pl-1"
                  />
                </div>

                {slugNotice && (
                  <p className={`text-[11px] font-medium mt-1 ${
                    slugNotice.isWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {slugNotice.message}
                  </p>
                )}
              </div>

              {/* 개별 마이크로 페이지 모드 토글 */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>1mm 개별 전시 & 판매 페이지 생성</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      단순 리다이렉트 대신 프로필, 꿀템 번호판, 전자책 결제창이 포함된 모바일 미니샵을 띄웁니다.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={isPageMode}
                    onChange={(e) => setIsPageMode(e.target.checked)}
                    className="w-5 h-5 rounded-lg accent-indigo-500 cursor-pointer"
                  />
                </div>

                {isPageMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="프로필 타이틀 (예: 크리에이터 민수)"
                      value={profileTitle}
                      onChange={(e) => setProfileTitle(e.target.value)}
                      className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="한 줄 소개 (Bio)"
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold text-left">
              {errorMessage}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>국내 최단 링크 생성 중...</span>
              </span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>3초 만에 무료 단축하기</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 2. 생성 완료 결과 카드 */}
        {shortResult && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  단축 링크 생성 완료
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {shortResult.shortUrl.length}글자 초단축
              </span>
            </div>

            {/* 단축 URL & 복사 버튼 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="font-mono text-sm sm:text-base font-black text-white select-all break-all">
                {shortResult.shortUrl}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="ml-3 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-md shadow-indigo-500/20"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨!' : '링크 복사'}</span>
              </button>
            </div>

            {/* 바로가기 및 QR 코드 다운로드 */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <a
                  href={shortResult.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>내 링크 열어보기</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {shortResult.qrDataUrl && (
                  <a
                    href={shortResult.qrDataUrl}
                    download={`1mm_qr_${shortResult.shortCode}.png`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <QrCode className="w-3 h-3 text-purple-400" />
                    <span>QR 저장 (300 DPI)</span>
                  </a>
                )}
              </div>

              <Link
                href="/login"
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors"
              >
                <span>대시보드에 영구 보관 & 실시간 통계 보기</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* 3. 하단 신뢰 및 보안 태그 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>인스타·카톡 로그인 풀림 없는 인앱 탈출 딥링크</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>개별 전시 & 전자책 판매 페이지 지원</span>
        </span>
      </div>

    </div>
  )
}

