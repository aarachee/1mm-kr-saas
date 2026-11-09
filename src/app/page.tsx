'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, ShieldCheck, Smartphone, 
  ShoppingBag, Layers
} from 'lucide-react'
import { RevampedShortenerWidget } from '@/components/RevampedShortenerWidget'
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls'
import { Locale, translations } from '@/lib/i18n'

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('ko')
  const t = translations[locale]

  // 얼리버드 참여 인원 카운터 (목표 10,000명 중 7,428명 참여)
  const CURRENT_USERS = 7428
  const MAX_USERS = 10000
  const progressPercent = Math.round((CURRENT_USERS / MAX_USERS) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] dark:bg-[#090A0C] text-[#101828] dark:text-[#EAECF0] selection:bg-[#F04438] selection:text-white transition-colors duration-150">
      
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
              {t.limitCounterPrefix} <strong className="text-[#101828] dark:text-white font-bold">{CURRENT_USERS.toLocaleString()}</strong> / 10,000 {t.limitCounterSuffix}
            </span>
            <div className="w-16 h-1.5 bg-[#E4E7EC] dark:bg-[#21262D] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F04438] rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 우측 컨트롤: 테마 & 언어 스위처 + 로그인 / 대시보드 */}
          <div className="flex items-center gap-2.5">
            <ThemeAndLangControls
              currentLocale={locale}
              onLocaleChange={setLocale}
            />

            <Link
              href="/login"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#344054] dark:text-[#EAECF0] hover:text-[#101828] dark:hover:text-white bg-[#F2F4F7] dark:bg-[#161B22] hover:bg-[#E4E7EC] dark:hover:bg-[#21262D] border border-[#D0D5DD] dark:border-[#30363D] transition-all"
            >
              {t.login}
            </Link>

            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F04438] hover:bg-[#D92D20] text-white transition-all shadow-md active:scale-95"
            >
              {t.dashboardStart}
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션 */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 px-4 sm:px-6">
        
        {/* 정제된 코발트 레드 앰비언트 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#C01025]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-7">
          
          {/* 모바일용 카운터 뱃지 */}
          <div className="inline-flex lg:hidden items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] text-[11px] text-[#667085] dark:text-[#98A2B3] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
            <span>{t.limitCounterPrefix} <strong>{CURRENT_USERS.toLocaleString()}</strong> / 10,000 {t.limitCounterSuffix}</span>
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
      </section>

      {/* 3. 3대 핵심 혜택 섹션 */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E4E7EC] dark:border-[#21262D] bg-[#F2F4F7] dark:bg-[#0D1117] relative transition-colors">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#F04438] uppercase tracking-wider">Features</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101828] dark:text-white">
              {t.featuresTitle}
            </h2>
            <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 혜택 1: 3개 무료 & 3자 단축 */}
            <div className="p-7 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] space-y-4 hover:border-[#F04438]/50 shadow-xs transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] dark:bg-[#21262D] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438]">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#F04438] uppercase tracking-wider">
                  {t.feature1Tag}
                </div>
                <h3 className="text-base font-bold text-[#101828] dark:text-white">
                  {t.feature1Title}
                </h3>
              </div>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                {t.feature1Desc}
              </p>
            </div>

            {/* 혜택 2: 개별 전시 & 판매 페이지 */}
            <div className="p-7 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] space-y-4 hover:border-[#F04438]/50 shadow-xs transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] dark:bg-[#21262D] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#F04438] uppercase tracking-wider">
                  {t.feature2Tag}
                </div>
                <h3 className="text-base font-bold text-[#101828] dark:text-white">
                  {t.feature2Title}
                </h3>
              </div>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                {t.feature2Desc}
              </p>
            </div>

            {/* 혜택 3: 인앱 브라우저 자동 탈출 */}
            <div className="p-7 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#21262D] space-y-4 hover:border-[#F04438]/50 shadow-xs transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] dark:bg-[#21262D] border border-[#E4E7EC] dark:border-[#30363D] flex items-center justify-center text-[#F04438]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#F04438] uppercase tracking-wider">
                  {t.feature3Tag}
                </div>
                <h3 className="text-base font-bold text-[#101828] dark:text-white">
                  {t.feature3Title}
                </h3>
              </div>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                {t.feature3Desc}
              </p>
            </div>

          </div>

          {/* 하단 로그인 유도 CTA 바 */}
          <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs transition-colors">
            <div>
              <h4 className="text-sm font-bold text-[#101828] dark:text-white">
                {t.ctaTitle}
              </h4>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-0.5">
                {t.ctaSubtitle}
              </p>
            </div>

            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-[#F04438] hover:bg-[#D92D20] text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0 transition-all active:scale-95"
            >
              <span>{t.ctaButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. 미니멀 푸터 */}
      <footer className="border-t border-[#E4E7EC] dark:border-[#21262D] py-10 px-4 sm:px-6 bg-white dark:bg-[#090A0C] text-xs text-[#667085] transition-colors">
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
