'use client'

import React, { useState } from 'react'
import { 
  Link2, Copy, Check, ExternalLink, 
  ArrowRight, QrCode, SlidersHorizontal, 
  Layers, HelpCircle, X
} from 'lucide-react'
import QRCode from 'qrcode'
import { createShortLink } from '@/app/actions'
import { validateCustomSlug } from '@/lib/reservedWords'
import { Locale, translations } from '@/lib/i18n'
import Link from 'next/link'

interface RevampedShortenerWidgetProps {
  locale?: Locale
}

export function RevampedShortenerWidget({ locale = 'ko' }: RevampedShortenerWidgetProps) {
  const t = translations[locale]

  const [longUrl, setLongUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [isPageMode, setIsPageMode] = useState(false)
  const [profileTitle, setProfileTitle] = useState('')
  const [profileBio, setProfileBio] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  
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
          
          {/* 간소화된 URL 입력창 헤더: '단축할 주소'만 표기 + 별도 도움말 버튼 */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#101828] dark:text-[#EAECF0]">
                {t.inputLabel}
              </label>

              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="inline-flex items-center gap-1 text-[11px] text-[#667085] dark:text-[#98A2B3] hover:text-[#F04438] transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.help}</span>
              </button>
            </div>

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

              {/* 개별 마이크로 페이지 모드 토글 */}
              <div className="pt-2 border-t border-[#E4E7EC] dark:border-[#21262D] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#101828] dark:text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#F04438]" />
                      <span>{t.pageModeTitle}</span>
                    </div>
                    <p className="text-[11px] text-[#667085] dark:text-[#98A2B3] mt-0.5">
                      {t.pageModeDesc}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={isPageMode}
                    onChange={(e) => setIsPageMode(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#F04438] cursor-pointer"
                  />
                </div>

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

      {/* 3. 별도 제공 도움말 모달 (서비스 제공에 필요한 글자 외 상세 설명) */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] dark:border-[#21262D] pb-3">
              <h3 className="text-base font-bold text-[#101828] dark:text-white">
                {t.helpTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-[#667085] hover:text-[#101828] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#475467] dark:text-[#98A2B3] leading-relaxed">
              <div className="space-y-1">
                <div className="font-bold text-[#101828] dark:text-[#EAECF0]">
                  {locale === 'ko' ? '1. 10자 초단축 주소' : '1. 10-Character Short Links'}
                </div>
                <p>
                  {locale === 'ko' 
                    ? '복사된 긴 링크를 10글자로 줄여 인스타그램 프로필 바이오와 문자 발송(SMS) 바이트를 낭비 없이 절약합니다.' 
                    : 'Shortens long URLs to 10 characters to save bio character space and SMS carrier byte costs.'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#101828] dark:text-[#EAECF0]">
                  {locale === 'ko' ? '2. 인앱 브라우저 자동 탈출' : '2. In-App Browser Escape'}
                </div>
                <p>
                  {locale === 'ko' 
                    ? '인스타그램이나 카카오톡 내부 웹뷰에서 링크를 열었을 때 발생하는 로그인 풀림을 방지하고, 스마트폰의 사파리나 크롬 브라우저로 직접 연결합니다.' 
                    : 'Prevents webview session drops in Instagram and KakaoTalk by launching Safari or Chrome directly.'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#101828] dark:text-[#EAECF0]">
                  {locale === 'ko' ? '3. 개별 전시 및 판매 페이지' : '3. Individual Showcase & Shop'}
                </div>
                <p>
                  {locale === 'ko' 
                    ? '단순 이동 대신 내 프로필, SNS 멀티링크, 번호별 추천 제품 목록, 전자책/디지털 파일 원클릭 결제창이 포함된 모바일 미니샵을 링크 하나로 생성할 수 있습니다.' 
                    : 'Provides an all-in-one mobile page with profile branding, multi-links, numbered product directory, and digital file checkout.'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#101828] dark:text-[#EAECF0]">
                  {locale === 'ko' ? '4. 1인당 3개 무료 슬롯 정책' : '4. 3 Free Slots Policy'}
                </div>
                <p>
                  {locale === 'ko' 
                    ? '얼리버드 10,000명 한정으로 계정당 고유 브랜드/한글 1개와 3자리 초단축 2개가 무료로 제공됩니다.' 
                    : 'Early bird accounts receive 1 custom brand slug and 2 ultra-short 3-character slugs for free.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#F2F4F7] dark:bg-[#21262D] hover:bg-[#E4E7EC] dark:hover:bg-[#30363D] text-[#101828] dark:text-white font-semibold text-xs transition-colors"
            >
              {t.helpClose}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
