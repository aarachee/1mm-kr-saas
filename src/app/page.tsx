'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { 
  Clock, TrendingUp, ExternalLink, Link2, 
  Smartphone, Layers, ShieldCheck 
} from 'lucide-react'
import { RevampedShortenerWidget } from '@/components/RevampedShortenerWidget'
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls'
import { Locale, translations } from '@/lib/i18n'
import { getEarlyBirdStats, getPublicLinks, PublicLinkItem } from '@/app/actions'
import { createClient } from '@/utils/supabase/client'

function formatRelativeTime(dateStr: string, locale: Locale): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / (60 * 1000))
    if (minutes < 1) return locale === 'ko' ? '방금 전' : 'just now'
    if (minutes < 60) return locale === 'ko' ? `${minutes}분 전` : `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return locale === 'ko' ? `${hours}시간 전` : `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return locale === 'ko' ? `${days}일 전` : `${days}d ago`
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}/${d.getDate()}`
  } catch {
    return ''
  }
}

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('ko')
  const t = translations[locale]

  // 실제 얼리버드 참여 인원 상태 (목표 10,000명)
  const [userCount, setUserCount] = useState<number | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const MAX_USERS = 10000

  // 최근 생성 주소 10개 및 인기 주소 10개 상태
  const [publicLinks, setPublicLinks] = useState<{
    recent: PublicLinkItem[]
    popular: PublicLinkItem[]
  }>({
    recent: [],
    popular: [],
  })

  const loadData = useCallback(() => {
    // 1. 얼리버드 참여 통계 조회
    getEarlyBirdStats().then((res) => {
      if (typeof res?.count === 'number') {
        setUserCount(res.count)
      }
    })

    // 2. 공개 링크 목록 (최근 10개, 인기 10개) 조회
    getPublicLinks().then((res) => {
      if (res && res.recent && res.popular) {
        setPublicLinks(res)
      }
    })
  }, [])

  useEffect(() => {
    loadData()

    // 3. 로그인 상태 조회
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user) {
          setIsLoggedIn(true)
        }
      })
    } catch {
      // 오류 시 기본 로그인 버튼 유지
    }
  }, [loadData])

  const countDisplay = userCount !== null ? userCount.toLocaleString() : '...'
  const progressPercent = userCount !== null
    ? Math.min(100, Math.max(userCount > 0 ? 1 : 0, Math.round((userCount / MAX_USERS) * 100)))
    : 0

  return (
    <div id="top" className="flex min-h-screen flex-col justify-between bg-[#F9FAFB] dark:bg-[#090A0C] text-[#101828] dark:text-[#EAECF0] selection:bg-[#F04438] selection:text-white transition-colors duration-150">
      
      {/* 1. 상단 글로벌 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] dark:border-[#21262D] bg-white/90 dark:bg-[#090A0C]/90 backdrop-blur-md transition-colors">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-5xl">
          
          {/* 브랜드 로고 (마케팅 수식어 배제) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#C01025] flex items-center justify-center text-white font-black text-xs shadow-md group-hover:bg-[#F04438] transition-colors">
              1mm
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-base tracking-tight text-[#101828] dark:text-white group-hover:text-[#F04438] transition-colors leading-none">
                {t.brandName}
              </span>
              <span className="text-[10px] font-mono text-[#667085] tracking-wider mt-0.5">
                {t.domain}
              </span>
            </div>
          </Link>

          {/* 중앙: 얼리버드 카운터 바 (데스크톱) */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] text-xs shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F04438] animate-pulse" />
            <span className="text-[#667085] dark:text-[#98A2B3] font-medium">
              {t.limitCounterPrefix} <strong className="text-[#101828] dark:text-white font-bold">{countDisplay}</strong> / {MAX_USERS.toLocaleString()} {t.limitCounterSuffix}
            </span>
            <div className="w-16 h-1.5 bg-[#E4E7EC] dark:bg-[#21262D] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F04438] rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 우측 컨트롤: 테마 & 언어 스위처 + 단일 액션 버튼 (중복 배제) */}
          <div className="flex items-center gap-2.5">
            <ThemeAndLangControls
              currentLocale={locale}
              onLocaleChange={setLocale}
            />

            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F04438] hover:bg-[#D92D20] text-white transition-all shadow-md active:scale-95"
            >
              {isLoggedIn ? t.dashboard : t.login}
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션 */}
      <main className="flex-1 relative overflow-hidden pt-12 sm:pt-16 pb-12 px-4 sm:px-6">
        
        {/* 정제된 코발트 레드 앰비언트 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#C01025]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-6">
          
          {/* 모바일용 카운터 뱃지 */}
          <div className="inline-flex lg:hidden items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] text-[11px] text-[#667085] dark:text-[#98A2B3] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
            <span>{t.limitCounterPrefix} <strong>{countDisplay}</strong> / {MAX_USERS.toLocaleString()} {t.limitCounterSuffix}</span>
          </div>

          {/* 메인 헤드라인 및 설명 */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[#101828] dark:text-white max-w-2xl mx-auto">
              {t.heroTitle}
            </h1>

            <p className="text-[#667085] dark:text-[#98A2B3] text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed pt-0.5">
              {t.heroDescription}
            </p>
          </div>

          {/* 메인 단축 위젯 (공개 체크박스 포함, 생성 시 목록 리프레시) */}
          <div className="pt-2">
            <RevampedShortenerWidget locale={locale} onSuccess={loadData} />
          </div>

        </div>
      </main>

      {/* 3. 공개 주소 2단 섹션 (최근 생성 10개 | 인기 주소 10개) */}
      <section className="py-6 px-4 sm:px-6 bg-[#F9FAFB] dark:bg-[#090A0C]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 좌측: 최근 생성된 주소 10개 */}
            <div className="rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] dark:border-[#21262D]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F04438]" />
                    <h2 className="text-sm font-bold text-[#101828] dark:text-white">
                      {t.recentLinksTitle}
                    </h2>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F2F4F7] dark:bg-[#21262D] text-[#667085] dark:text-[#98A2B3] border border-[#E4E7EC] dark:border-[#30363D]">
                    {t.recentBadge}
                  </span>
                </div>

                <div className="divide-y divide-[#F2F4F7] dark:divide-[#21262D]/60 mt-1">
                  {publicLinks.recent.length > 0 ? (
                    publicLinks.recent.map((item, idx) => (
                      <div key={item.id || idx} className="py-2.5 flex items-center justify-between gap-3 text-left">
                        <div className="min-w-0 flex-1">
                          <a
                            href={`/${item.shortCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono font-bold text-xs text-[#F04438] hover:underline"
                          >
                            <span>1mm.kr/{item.shortCode}</span>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </a>
                          <p className="text-[11px] text-[#667085] dark:text-[#98A2B3] truncate mt-0.5">
                            {item.title ? `${item.title} • ` : ''}{item.longUrl}
                          </p>
                        </div>
                        <span className="text-[10px] text-[#98A2B3] font-mono shrink-0">
                          {formatRelativeTime(item.createdAt, locale)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-[#667085] dark:text-[#98A2B3] space-y-1">
                      <p>{t.noRecentLinks}</p>
                      <p className="text-[11px] text-[#98A2B3] dark:text-[#667085]">
                        {t.publicLinksHint}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 우측: 인기 주소 10개 */}
            <div className="rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] dark:border-[#21262D]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#F04438]" />
                    <h2 className="text-sm font-bold text-[#101828] dark:text-white">
                      {t.popularLinksTitle}
                    </h2>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F2F4F7] dark:bg-[#21262D] text-[#667085] dark:text-[#98A2B3] border border-[#E4E7EC] dark:border-[#30363D]">
                    {t.popularBadge}
                  </span>
                </div>

                <div className="divide-y divide-[#F2F4F7] dark:divide-[#21262D]/60 mt-1">
                  {publicLinks.popular.length > 0 ? (
                    publicLinks.popular.map((item, idx) => (
                      <div key={item.id || idx} className="py-2.5 flex items-center justify-between gap-3 text-left">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            idx === 0 
                              ? 'bg-[#F04438] text-white' 
                              : idx < 3 
                              ? 'bg-[#C01025]/15 text-[#F04438]' 
                              : 'bg-[#F2F4F7] dark:bg-[#21262D] text-[#667085] dark:text-[#98A2B3]'
                          }`}>
                            {idx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <a
                              href={`/${item.shortCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono font-bold text-xs text-[#101828] dark:text-white hover:text-[#F04438] transition-colors"
                            >
                              <span>1mm.kr/{item.shortCode}</span>
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                            <p className="text-[11px] text-[#667085] dark:text-[#98A2B3] truncate mt-0.5">
                              {item.title ? `${item.title} • ` : ''}{item.longUrl}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-[#F04438] bg-[#F04438]/10 px-2 py-0.5 rounded-md font-mono shrink-0">
                          {item.clicksCount} {t.clicksSuffix}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-[#667085] dark:text-[#98A2B3] space-y-1">
                      <p>{t.noPopularLinks}</p>
                      <p className="text-[11px] text-[#98A2B3] dark:text-[#667085]">
                        {t.publicLinksHint}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 서비스 이용 안내 카드 (도움말 모달 대신 하단 카드 제공) */}
      <section className="py-8 px-4 sm:px-6 bg-[#F9FAFB] dark:bg-[#090A0C]">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] p-6 sm:p-8 shadow-xs space-y-5">
            
            <div className="border-b border-[#E4E7EC] dark:border-[#21262D] pb-3 text-left">
              <h3 className="text-sm sm:text-base font-bold text-[#101828] dark:text-white">
                {t.guideTitle}
              </h3>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-1">
                {t.guideSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {/* 안내 1: 단축 주소 */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#E4E7EC] dark:border-[#21262D] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-[#101828] dark:text-white">
                  <Link2 className="w-4 h-4 text-[#F04438]" />
                  <span>1. {t.guideItem1Title}</span>
                </div>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed pl-6">
                  {t.guideItem1Desc}
                </p>
              </div>

              {/* 안내 2: 인앱 브라우저 탈출 */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#E4E7EC] dark:border-[#21262D] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-[#101828] dark:text-white">
                  <Smartphone className="w-4 h-4 text-[#F04438]" />
                  <span>2. {t.guideItem2Title}</span>
                </div>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed pl-6">
                  {t.guideItem2Desc}
                </p>
              </div>

              {/* 안내 3: 미니홈피 */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#E4E7EC] dark:border-[#21262D] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-[#101828] dark:text-white">
                  <Layers className="w-4 h-4 text-[#F04438]" />
                  <span>3. {t.guideItem3Title}</span>
                </div>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed pl-6">
                  {t.guideItem3Desc}
                </p>
              </div>

              {/* 안내 4: 3개 무료 슬롯 정책 */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0D1117] border border-[#E4E7EC] dark:border-[#21262D] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-[#101828] dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-[#F04438]" />
                  <span>4. {t.guideItem4Title}</span>
                </div>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed pl-6">
                  {t.guideItem4Desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. 미니멀 푸터 (중복 없는 단일 표기 및 링크) */}
      <footer className="border-t border-[#E4E7EC] dark:border-[#21262D] py-6 px-4 sm:px-6 bg-white dark:bg-[#090A0C] text-xs text-[#667085] transition-colors">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-[#101828] dark:text-[#EAECF0]">{t.domain}</span>

          <div className="flex items-center gap-6">
            <Link 
              href={isLoggedIn ? "/dashboard" : "/login"} 
              className="hover:text-[#101828] dark:hover:text-[#EAECF0] transition-colors"
            >
              {isLoggedIn ? t.dashboard : t.login}
            </Link>
            <a href="#top" className="hover:text-[#101828] dark:hover:text-[#EAECF0] transition-colors">
              {t.footerTop}
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
