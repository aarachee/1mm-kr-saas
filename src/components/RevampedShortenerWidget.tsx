'use client'

import React, { useState, useEffect } from 'react'
import { 
  Link2, Copy, Check, ExternalLink, 
  ArrowRight, QrCode, SlidersHorizontal, 
  Layers, HelpCircle, X, Lock, ShieldCheck, BarChart3
} from 'lucide-react'
import QRCode from 'qrcode'
import { createShortLink } from '@/app/actions'
import { validateCustomSlug } from '@/lib/reservedWords'
import { Locale, translations } from '@/lib/i18n'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

interface RevampedShortenerWidgetProps {
  locale?: Locale
  onSuccess?: () => void
}

export function RevampedShortenerWidget({ locale = 'ko', onSuccess }: RevampedShortenerWidgetProps) {
  const t = translations[locale]

  const [longUrl, setLongUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [isPageMode, setIsPageMode] = useState(false)
  const [profileTitle, setProfileTitle] = useState('')
  const [profileBio, setProfileBio] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showPageModeHelp, setShowPageModeHelp] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [slugNotice, setSlugNotice] = useState<{ isWarning?: boolean; message: string } | null>(null)

  // 사용자 로그인 및 조건 모달 상태
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const supabase = createClient()

  // 생성 완료 상태
  const [shortResult, setShortResult] = useState<{
    shortUrl: string
    shortCode: string
    isPageMode: boolean
    qrDataUrl?: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const [mountedTs, setMountedTs] = useState<number>(0)

  useEffect(() => {
    setMountedTs(Date.now())

    // 1. 현재 로그인 사용자 확인
    supabase.auth.getUser().then(({ data }) => {
      const user = data?.user || null
      setCurrentUser(user)

      // 2. 로그인 후 돌아왔을 때 임시 저장된 폼 데이터 복원
      if (user) {
        try {
          const saved = sessionStorage.getItem('1mm_pending_shortlink')
          if (saved) {
            const parsed = JSON.parse(saved)
            if (parsed.longUrl) setLongUrl(parsed.longUrl)
            if (parsed.customCode) setCustomCode(parsed.customCode)
            if (typeof parsed.isPageMode === 'boolean') setIsPageMode(parsed.isPageMode)
            if (parsed.profileTitle) setProfileTitle(parsed.profileTitle)
            if (parsed.profileBio) setProfileBio(parsed.profileBio)
            if (typeof parsed.isPublic === 'boolean') setIsPublic(parsed.isPublic)
            sessionStorage.removeItem('1mm_pending_shortlink')
          }
        } catch {}
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase])

  // 커스텀 단축어 실시간 유효성 피드백
  const handleCustomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    setCustomCode(val)
    setErrorMessage(null)

    if (!val) {
      setSlugNotice(null)
      return
    }

    const hasKorean = /[가-힣]/.test(val)
    const minLength = hasKorean ? 2 : 3
    if (val.length < minLength) {
      setSlugNotice({ 
        isWarning: true, 
        message: hasKorean ? t.noticeMinLenKo : t.noticeMinLen 
      })
      return
    }

    const check = validateCustomSlug(val)
    if (!check.valid) {
      setSlugNotice({ isWarning: true, message: check.reason || t.noticeReserved })
    } else if (check.isPremiumReserved) {
      setSlugNotice({ isWarning: true, message: t.noticeReserved })
    } else {
      setSlugNotice({ isWarning: false, message: t.noticeAvailable })
    }
  }

  // 단축 생성 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!longUrl.trim()) {
      setErrorMessage(t.errInputUrl)
      return
    }

    if (customCode.trim()) {
      const check = validateCustomSlug(customCode.trim())
      if (!check.valid) {
        setErrorMessage(check.reason || t.noticeReserved)
        return
      }
    }

    setErrorMessage(null)

    // 비로그인 상태일 경우: 로그인 절차 및 생성 조건 안내 모달 오픈
    if (!currentUser) {
      try {
        sessionStorage.setItem('1mm_pending_shortlink', JSON.stringify({
          longUrl: longUrl.trim(),
          customCode: customCode.trim(),
          isPageMode,
          profileTitle: profileTitle.trim(),
          profileBio: profileBio.trim(),
          isPublic
        }))
      } catch {}
      setShowLoginModal(true)
      return
    }

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
      formData.append('isPublic', isPublic ? 'true' : 'false')

      const res = await createShortLink(formData)

      if (res.requireLogin) {
        setShowLoginModal(true)
        return
      }

      if (res.error) {
        setErrorMessage(res.error)
      } else if (res.shortCode) {
        onSuccess?.()
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://1mm.kr'
        const fullShortUrl = `${origin}/${res.shortCode}`
        
        // QR 코드 동시 생성
        const qr = await QRCode.toDataURL(fullShortUrl, {
          width: 400,
          margin: 2,
          color: { dark: '#090A0C', light: '#ffffff' }
        })

        setShortResult({
          shortUrl: fullShortUrl,
          shortCode: res.shortCode,
          isPageMode: isPageMode,
          qrDataUrl: qr
        })
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while creating short link.')
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

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true)
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://1mm.kr'
      const redirectUri = `${origin}/auth/callback?next=${encodeURIComponent('/')}`
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
        },
      })
    } catch (err: any) {
      console.error('Google login error:', err)
      setErrorMessage(err.message || 'Error occurred during login.')
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* 1. 단축 생성 메인 카드 */}
      <div className="bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] rounded-2xl p-5 sm:p-7 shadow-lg dark:shadow-xl relative overflow-hidden transition-colors">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 매크로 방어용 허니팟 트랩 */}
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
          
          {/* 간소화된 URL 입력창: '단축할 주소'만 표기 */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-[#101828] dark:text-[#EAECF0]">
              {t.inputLabel}
            </label>

            <div className="relative">
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder={t.inputPlaceholder}
                required
                className="w-full h-12 pl-4 pr-16 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#D0D5DD] dark:border-[#30363D] focus:border-[#F04438] text-sm text-[#101828] dark:text-[#EAECF0] placeholder-[#98A2B3] dark:placeholder-[#667085] focus:outline-none transition-colors font-mono shadow-inner"
              />
              {longUrl && (
                <button
                  type="button"
                  onClick={() => setLongUrl('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#98A2B3] hover:text-[#101828] dark:hover:text-[#EAECF0] p-1 font-mono"
                >
                  {t.clear}
                </button>
              )}
            </div>
          </div>

          {/* 옵션 토글 버튼 (간소화) */}
          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F04438] hover:text-[#D92D20] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvanced ? t.btnOptionsClose : t.btnOptionsOpen}</span>
            </button>
          </div>

          {/* 펼쳐지는 고급 설정 패널 */}
          {showAdvanced && (
            <div className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#E4E7EC] dark:border-[#30363D] space-y-4 text-left transition-colors">
              
              {/* 커스텀 단축어 지정 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#101828] dark:text-[#EAECF0] flex items-center justify-between">
                  <span>{t.customSlugLabel}</span>
                  <span className="text-[10px] text-[#667085] dark:text-[#98A2B3]">{t.customSlugHelp}</span>
                </label>

                <div className="flex items-center rounded-lg bg-white dark:bg-[#161B22] border border-[#D0D5DD] dark:border-[#30363D] px-3 h-10 focus-within:border-[#F04438] transition-colors">
                  <span className="text-xs font-mono font-bold text-[#667085] select-none">
                    1mm.kr/
                  </span>
                  <input
                    type="text"
                    value={customCode}
                    onChange={handleCustomCodeChange}
                    placeholder={t.customSlugPlaceholder}
                    className="flex-1 bg-transparent border-none text-xs text-[#101828] dark:text-[#EAECF0] placeholder-[#98A2B3] dark:placeholder-[#667085] focus:outline-none pl-1"
                  />
                </div>

                {slugNotice && (
                  <p className={`text-[11px] font-medium font-mono mt-1 ${
                    slugNotice.isWarning ? 'text-[#F04438]' : 'text-[#101828] dark:text-[#EAECF0]'
                  }`}>
                    {slugNotice.message}
                  </p>
                )}
              </div>

              {/* 미니홈피 생성 토글 */}
              <div className="pt-2 border-t border-[#E4E7EC] dark:border-[#21262D] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <label 
                      htmlFor="page-mode-checkbox" 
                      className="text-xs font-bold text-[#101828] dark:text-white flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#F04438]" />
                      <span>{t.pageModeTitle}</span>
                    </label>

                    {/* ⓘ 안내 버튼 */}
                    <button
                      type="button"
                      onClick={() => setShowPageModeHelp(!showPageModeHelp)}
                      className="text-[#667085] hover:text-[#101828] dark:text-[#98A2B3] dark:hover:text-white transition-colors p-0.5 rounded focus:outline-none"
                      title={t.help}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    id="page-mode-checkbox"
                    type="checkbox"
                    checked={isPageMode}
                    onChange={(e) => setIsPageMode(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#F04438] cursor-pointer"
                  />
                </div>

                {/* ⓘ 클릭 시에만 노출되는 상세 안내 */}
                {showPageModeHelp && (
                  <div className="p-2.5 rounded-lg bg-[#F2F4F7] dark:bg-[#21262D] border border-[#E4E7EC] dark:border-[#30363D] text-[11px] text-[#475467] dark:text-[#D0D5DD] leading-relaxed transition-all">
                    {t.pageModeDesc}
                  </div>
                )}

                {isPageMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <input
                      type="text"
                      placeholder={t.profileTitlePlaceholder}
                      value={profileTitle}
                      onChange={(e) => setProfileTitle(e.target.value)}
                      className="h-9 px-3 rounded-lg bg-white dark:bg-[#161B22] border border-[#D0D5DD] dark:border-[#30363D] text-xs text-[#101828] dark:text-[#EAECF0] placeholder-[#98A2B3] dark:placeholder-[#667085] focus:outline-none focus:border-[#F04438]"
                    />
                    <input
                      type="text"
                      placeholder={t.profileBioPlaceholder}
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="h-9 px-3 rounded-lg bg-white dark:bg-[#161B22] border border-[#D0D5DD] dark:border-[#30363D] text-xs text-[#101828] dark:text-[#EAECF0] placeholder-[#98A2B3] dark:placeholder-[#667085] focus:outline-none focus:border-[#F04438]"
                    />
                  </div>
                )}
              </div>

              {/* 공개 여부 설정 */}
              <div className="pt-2 border-t border-[#E4E7EC] dark:border-[#21262D] flex items-center justify-between">
                <div>
                  <label 
                    htmlFor="is-public-checkbox"
                    className="text-xs font-bold text-[#101828] dark:text-white flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>{t.isPublicTitle}</span>
                  </label>
                  <p className="text-[11px] text-[#667085] dark:text-[#98A2B3] mt-0.5">
                    {t.isPublicDesc}
                  </p>
                </div>

                <input
                  id="is-public-checkbox"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#F04438] cursor-pointer"
                />
              </div>

            </div>
          )}

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#C01025]/10 border border-[#C01025]/30 text-[#F04438] text-xs font-medium text-left">
              {errorMessage}
            </div>
          )}

          {/* 간소화된 제출 버튼: '생성하기'만 표기 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#F04438] hover:bg-[#D92D20] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t.btnGenerating}</span>
              </span>
            ) : (
              <span>{t.btnGenerate}</span>
            )}
          </button>
        </form>

        {/* 2. 생성 완료 결과 카드 */}
        {shortResult && (
          <div className="mt-6 p-5 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#E4E7EC] dark:border-[#30363D] text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#F04438]/15 text-[#F04438] flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold text-[#101828] dark:text-[#EAECF0] uppercase tracking-wider">
                  {t.resultTitle}
                </span>
              </div>
              <span className="text-[10px] text-[#667085] font-mono">
                {shortResult.shortUrl.length} CHARS
              </span>
            </div>

            {/* 단축 URL & 복사 버튼 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#161B22] border border-[#D0D5DD] dark:border-[#21262D]">
              <span className="font-mono text-sm sm:text-base font-bold text-[#101828] dark:text-white select-all break-all">
                {shortResult.shortUrl}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="ml-3 px-3 py-1.5 rounded-lg bg-[#F04438] hover:bg-[#D92D20] text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? t.copied : t.copy}</span>
              </button>
            </div>

            {/* 바로가기 및 QR 코드 다운로드 */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <a
                  href={shortResult.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#EAECF0] dark:bg-[#21262D] hover:bg-[#D0D5DD] dark:hover:bg-[#30363D] text-[#101828] dark:text-[#EAECF0] font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{t.openLink}</span>
                  <ExternalLink className="w-3 h-3 text-[#667085] dark:text-[#98A2B3]" />
                </a>

                {shortResult.qrDataUrl && (
                  <a
                    href={shortResult.qrDataUrl}
                    download={`1mm_qr_${shortResult.shortCode}.png`}
                    className="px-3 py-1.5 rounded-lg bg-[#EAECF0] dark:bg-[#21262D] hover:bg-[#D0D5DD] dark:hover:bg-[#30363D] text-[#101828] dark:text-[#EAECF0] font-medium flex items-center gap-1 transition-colors"
                  >
                    <QrCode className="w-3 h-3 text-[#F04438]" />
                    <span>{t.saveQr}</span>
                  </a>
                )}
              </div>

              <Link
                href="/login"
                className="text-[#F04438] hover:text-[#D92D20] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>{t.viewDashboardStats}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* 3. 로그인 절차 및 생성 조건 안내 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] rounded-2xl p-6 sm:p-7 shadow-2xl relative text-left">
            
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#667085] hover:text-[#101828] dark:hover:text-white hover:bg-[#F2F4F7] dark:hover:bg-[#21262D] transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>

            {/* 헤더 아이콘 & 타이틀 */}
            <div className="text-center pb-4 border-b border-[#F2F4F7] dark:border-[#21262D]">
              <div className="w-12 h-12 rounded-xl bg-[#F2F4F7] dark:bg-[#21262D] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438] mx-auto shadow-xs mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#101828] dark:text-white">
                {t.loginModalTitle}
              </h3>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-1 leading-relaxed">
                {t.loginModalSubtitle}
              </p>
            </div>

            {/* 생성 조건 3대 원칙 카드 */}
            <div className="py-4 space-y-2.5">
              <div className="p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#090A0C] border border-[#E4E7EC] dark:border-[#21262D] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101828] dark:text-white">
                    {t.loginCondition1Title}
                  </div>
                  <div className="text-[11px] text-[#667085] dark:text-[#98A2B3] mt-0.5 leading-relaxed">
                    {t.loginCondition1Desc}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#090A0C] border border-[#E4E7EC] dark:border-[#21262D] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101828] dark:text-white">
                    {t.loginCondition2Title}
                  </div>
                  <div className="text-[11px] text-[#667085] dark:text-[#98A2B3] mt-0.5 leading-relaxed">
                    {t.loginCondition2Desc}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#090A0C] border border-[#E4E7EC] dark:border-[#21262D] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101828] dark:text-white">
                    {t.loginCondition3Title}
                  </div>
                  <div className="text-[11px] text-[#667085] dark:text-[#98A2B3] mt-0.5 leading-relaxed">
                    {t.loginCondition3Desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Google 계정 로그인 액션 버튼 */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="w-full h-11 py-2.5 px-4 rounded-xl bg-[#090A0C] hover:bg-[#161B22] dark:bg-white dark:hover:bg-[#EAECF0] text-white dark:text-[#090A0C] font-bold text-xs shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isLoggingIn ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>{t.continueWithGoogle}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-full py-2 text-center text-xs text-[#667085] dark:text-[#98A2B3] hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
