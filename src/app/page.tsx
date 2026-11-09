'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { RevampedShortenerWidget } from '@/components/RevampedShortenerWidget'
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls'
import { Locale, translations } from '@/lib/i18n'
import { getEarlyBirdStats } from '@/app/actions'
import { createClient } from '@/utils/supabase/client'

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('ko')
  const t = translations[locale]

  // 실제 얼리버드 참여 인원 상태 (목표 10,000명)
  const [userCount, setUserCount] = useState<number | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const MAX_USERS = 10000

  useEffect(() => {
    // 1. 실제 얼리버드 참여 통계 조회
    getEarlyBirdStats().then((res) => {
      if (typeof res?.count === 'number') {
        setUserCount(res.count)
      }
    })

    // 2. 로그인 상태 조회
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
  }, [])

  const countDisplay = userCount !== null ? userCount.toLocaleString() : '...'
  const progressPercent = userCount !== null
    ? Math.min(100, Math.max(userCount > 0 ? 1 : 0, Math.round((userCount / MAX_USERS) * 100)))
    : 0

  return (
    <div id="top" className="flex min-h-screen flex-col justify-between bg-[#F9FAFB] dark:bg-[#090A0C] text-[#101828] dark:text-[#EAECF0] selection:bg-[#F04438] selection:text-white transition-colors duration-150">
      
      {/* 1. 상단 글로벌 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] dark:border-[#21262D] bg-white/90 dark:bg-[#090A0C]/90 backdrop-blur-md transition-colors">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-5xl">
          
          {/* 브랜드 로고 */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#C01025] flex items-center justify-center text-white font-black text-xs shadow-md group-hover:bg-[#F04438] transition-colors">
              1mm
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-base tracking-tight text-[#101828] dark:text-white group-hover:text-[#F04438] transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[10px] bg-[#F2F4F7] dark:bg-[#21262D] text-[#667085] dark:text-[#98A2B3] px-1.5 py-0.5 rounded border border-[#E4E7EC] dark:border-[#30363D] hidden sm:inline-block">
                  {t.badgeHeader}
                </span>
              </div>
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

          {/* 우측 컨트롤: 테마 & 언어 스위처 + 단일 일관된 액션 버튼 */}
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
      <main className="flex-1 relative overflow-hidden pt-12 sm:pt-16 pb-20 px-4 sm:px-6">
        
        {/* 정제된 코발트 레드 앰비언트 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#C01025]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-7">
          
          {/* 모바일용 카운터 뱃지 */}
          <div className="inline-flex lg:hidden items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] text-[11px] text-[#667085] dark:text-[#98A2B3] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
            <span>{t.limitCounterPrefix} <strong>{countDisplay}</strong> / {MAX_USERS.toLocaleString()} {t.limitCounterSuffix}</span>
          </div>

          {/* 메인 헤드라인 */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F04438]/10 border border-[#F04438]/30 text-[#F04438] text-xs font-bold">
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[#101828] dark:text-white max-w-3xl mx-auto">
              {t.heroTitleLine1} <br />
              <span className="text-[#F04438]">
                {t.heroTitleLine2}
              </span>
            </h1>

            <p className="text-[#667085] dark:text-[#98A2B3] text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed pt-1">
              {t.heroDescription}
            </p>
          </div>

          {/* 메인 단축 위젯 */}
          <div className="pt-2">
            <RevampedShortenerWidget locale={locale} />
          </div>

        </div>
      </main>

      {/* 3. 미니멀 푸터 */}
      <footer className="border-t border-[#E4E7EC] dark:border-[#21262D] py-8 px-4 sm:px-6 bg-white dark:bg-[#090A0C] text-xs text-[#667085] transition-colors">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#101828] dark:text-[#EAECF0]">{t.brandName} ({t.domain})</span>
            <span>•</span>
            <span>{t.footerDesc}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-[#101828] dark:hover:text-[#EAECF0] transition-colors">
              {t.login}
            </Link>
            <Link href="/dashboard" className="hover:text-[#101828] dark:hover:text-[#EAECF0] transition-colors">
              {t.dashboard}
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
