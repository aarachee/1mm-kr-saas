'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Sparkles, Zap, ShieldCheck, ArrowRight, Check,
  Smartphone, ShoppingBag, LayoutTemplate, Flame, Users
} from 'lucide-react'
import { RevampedShortenerWidget } from '@/components/RevampedShortenerWidget'

export default function HomePage() {
  // 얼리버드 참여 인원 카운터 (목표 10,000명 중 7,428명 참여)
  const CURRENT_USERS = 7428
  const MAX_USERS = 10000
  const progressPercent = Math.round((CURRENT_USERS / MAX_USERS) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. 상단 미니멀 글로벌 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-5xl">
          
          {/* 브랜드 로고 */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              1mm
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  1미리
                </span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-bold px-1.5 py-0.5 rounded-full border border-indigo-500/20 hidden sm:inline-block">
                  10자 초단축 인프라
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider mt-0.5">
                1mm.kr
              </span>
            </div>
          </Link>

          {/* 중앙: 얼리버드 카운터 바 (데스크톱) */}
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-slate-300 font-medium">
              얼리버드 1만명 한정 무료: <strong className="text-white font-bold">{CURRENT_USERS.toLocaleString()}</strong> / 10,000명
            </span>
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 우측 CTA: 로그인 / 대시보드 */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all active:scale-95"
            >
              로그인
            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white transition-all shadow-md shadow-indigo-500/20 active:scale-95"
            >
              대시보드 시작 ➔
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션 */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-16 px-4 sm:px-6">
        
        {/* 배경 앰비언트 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-8">
          
          {/* 모바일용 카운터 뱃지 */}
          <div className="inline-flex md:hidden items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>얼리버드 1만명 한정 [ <strong>{CURRENT_USERS.toLocaleString()}</strong> / 10,000명 ]</span>
          </div>

          {/* 메인 헤드라인 */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>단 1mm의 마찰도 없는 10자 단축링크</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
              국내에서 가장 짧은 단축링크, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-indigo-300">
                나만의 전시·판매 페이지까지 무료
              </span>
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed pt-1">
              긴 링크를 1초 만에 10글자로 줄이고, <br className="hidden sm:inline" />
              SNS 멀티링크·영상 속 꿀템 번호판·전자책 결제창을 갖춘 <strong>개별 페이지</strong>를 무료로 만드세요.
            </p>
          </div>

          {/* 메인 단축 위젯 */}
          <div className="pt-2">
            <RevampedShortenerWidget />
          </div>

        </div>
      </section>

      {/* 3. 3대 핵심 혜택 섹션 (크고 깔끔한 카드) */}
      <section className="py-16 px-4 sm:px-6 border-t border-slate-800/80 bg-slate-950/70 relative">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Features</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              왜 마케터와 크리에이터는 1mm를 쓸까요?
            </h2>
            <p className="text-xs text-slate-400">
              복잡한 요금제나 군더더기 없이, 꼭 필요한 3대 혜택을 무료로 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 혜택 1: 3개 무료 & 3자 단축 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Flame className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Scarcity & Speed</div>
                <h3 className="text-lg font-black text-white">1인당 3개 평생 무료</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                나만의 한글/브랜드 골드 링크 1개와 영문/숫자 3자리 초단축 실버 링크 2개를 제공합니다. 인스타 바이오와 SMS 바이트를 낭비 없이 절약하세요.
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-300 font-mono">
                <span className="text-indigo-400 font-bold">1mm.kr/민수</span>
                <span>•</span>
                <span className="text-indigo-400 font-bold">1mm.kr/a7x</span>
              </div>
            </div>

            {/* 혜택 2: 개별 전시 & 판매 페이지 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Mini Profile & Shop</div>
                <h3 className="text-lg font-black text-white">개별 전시 & 판매 페이지</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                단순 리다이렉트를 넘어, 프로필 꾸미기, SNS 멀티링크, 쇼츠/릴스 꿀템 번호판, 전자책/템플릿 원클릭 결제창까지 링크 하나로 해결합니다.
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-300">
                <span className="text-purple-400 font-bold">Linktree + 전자책 판매창 올인원</span>
              </div>
            </div>

            {/* 혜택 3: 인앱 브라우저 자동 탈출 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Conversion Engine</div>
                <h3 className="text-lg font-black text-white">인앱 브라우저 자동 탈출</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                인스타그램·카카오톡 웹뷰에서 발생하는 로그인 풀림을 깨부수고, 사파리(Safari), 크롬(Chrome), 쿠팡 앱으로 0.1초 만에 즉시 전환합니다.
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-300">
                <span className="text-emerald-400 font-bold">로그인 이탈률 70% 감소</span>
              </div>
            </div>

          </div>

          {/* 하단 로그인 유도 CTA 바 */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-base font-black text-white">
                지금 Google로 1초 만에 무료 슬롯을 선점하세요
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                얼리버드 10,000명 마감 시 평생 무료 혜택이 종료될 수 있습니다.
              </p>
            </div>

            <Link
              href="/login"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 shrink-0 transition-all active:scale-95"
            >
              <span>1초 간편 로그인 시작</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. 미니멀 푸터 */}
      <footer className="border-t border-slate-900 py-10 px-4 sm:px-6 bg-slate-950 text-xs text-slate-500">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">1미리 (1mm.kr)</span>
            <span>•</span>
            <span>국내 최단 10자 단축링크 & 개별 미니샵 인프라</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              로그인
            </Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
              대시보드
            </Link>
            <a href="#top" className="hover:text-slate-300 transition-colors">
              맨 위로 ↑
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
