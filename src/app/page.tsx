'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, ShieldCheck, Smartphone, 
  ShoppingBag, Check, Layers
} from 'lucide-react'
import { RevampedShortenerWidget } from '@/components/RevampedShortenerWidget'

export default function HomePage() {
  // 얼리버드 참여 인원 카운터 (목표 10,000명 중 7,428명 참여)
  const CURRENT_USERS = 7428
  const MAX_USERS = 10000
  const progressPercent = Math.round((CURRENT_USERS / MAX_USERS) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-[#090A0C] text-[#EAECF0] selection:bg-[#F04438] selection:text-white">
      
      {/* 1. 상단 미니멀 글로벌 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b border-[#21262D] bg-[#090A0C]/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-5xl">
          
          {/* 브랜드 로고 */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#C01025] flex items-center justify-center text-white font-black text-xs shadow-md group-hover:bg-[#F04438] transition-colors">
              1mm
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-[#F04438] transition-colors">
                  1미리
                </span>
                <span className="text-[10px] bg-[#21262D] text-[#98A2B3] font-mono px-1.5 py-0.5 rounded border border-[#30363D] hidden sm:inline-block">
                  10-CHAR INFRA
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#667085] tracking-wider mt-0.5">
                1mm.kr
              </span>
            </div>
          </Link>

          {/* 중앙: 얼리버드 카운터 바 (데스크톱) */}
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#161B22] border border-[#21262D] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#F04438] animate-pulse" />
            <span className="text-[#98A2B3] font-medium font-mono">
              [LIMIT 10,000] <strong className="text-white font-bold">{CURRENT_USERS.toLocaleString()}</strong> / 10,000명
            </span>
            <div className="w-16 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F04438] rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 우측 CTA: 로그인 / 대시보드 */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#EAECF0] hover:text-white bg-[#161B22] hover:bg-[#21262D] border border-[#30363D] transition-all"
            >
              로그인
            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F04438] hover:bg-[#D92D20] text-white transition-all shadow-md active:scale-95"
            >
              대시보드 시작
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션 */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 px-4 sm:px-6">
        
        {/* 정제된 코랄 레드 배경 앰비언트 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C01025]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-7">
          
          {/* 모바일용 카운터 뱃지 */}
          <div className="inline-flex md:hidden items-center gap-2 px-3 py-1 rounded-full bg-[#161B22] border border-[#30363D] text-[11px] text-[#98A2B3] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
            <span>LIMIT 10,000 : <strong>{CURRENT_USERS.toLocaleString()}</strong> / 10,000</span>
          </div>

          {/* 메인 헤드라인 */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F04438]/10 border border-[#F04438]/30 text-[#F04438] text-xs font-bold font-mono">
              <span>ULTRA SHORT LINK & MICRO PAGE ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
              국내 최단 10자 단축링크, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAECF0] to-[#F04438]">
                전시 및 판매 개별 페이지 지원
              </span>
            </h1>

            <p className="text-[#98A2B3] text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed pt-1">
              긴 URL을 1초 만에 10글자로 단축하고, <br className="hidden sm:inline" />
              SNS 멀티링크, 추천 제품 전시, 디지털 상품 판매가 가능한 <strong>개별 페이지</strong>를 구성하세요.
            </p>
          </div>

          {/* 메인 단축 위젯 */}
          <div className="pt-2">
            <RevampedShortenerWidget />
          </div>

        </div>
      </section>

      {/* 3. 3대 핵심 혜택 섹션 */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#21262D] bg-[#0D1117] relative">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold text-[#F04438] uppercase tracking-wider">Features</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              전문가를 위한 모바일 전환 인프라
            </h2>
            <p className="text-xs text-[#98A2B3]">
              불필요한 과금 유도 없이, 핵심 3대 기능을 표준으로 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 혜택 1: 3개 무료 & 3자 단축 */}
            <div className="p-7 rounded-2xl bg-[#161B22] border border-[#21262D] space-y-4 hover:border-[#F04438]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438]">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#F04438] uppercase tracking-wider">
                  Slot Policy
                </div>
                <h3 className="text-base font-bold text-white">1인당 3개 무료 슬롯</h3>
              </div>
              <p className="text-xs text-[#98A2B3] leading-relaxed">
                나만의 고유 한글/브랜드 골드 링크 1개와 영문/숫자 3자리 초단축 실버 링크 2개를 제공합니다. 인스타그램 프로필과 SMS 바이트를 절약하세요.
              </p>
              <div className="pt-2 border-t border-[#21262D] flex items-center gap-2 text-[11px] text-[#667085] font-mono">
                <span className="text-[#EAECF0]">1mm.kr/민수</span>
                <span>•</span>
                <span className="text-[#EAECF0]">1mm.kr/a7x</span>
              </div>
            </div>

            {/* 혜택 2: 개별 전시 & 판매 페이지 */}
            <div className="p-7 rounded-2xl bg-[#161B22] border border-[#21262D] space-y-4 hover:border-[#F04438]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#F04438] uppercase tracking-wider">
                  Micro Landing Page
                </div>
                <h3 className="text-base font-bold text-white">개별 전시 및 판매 페이지</h3>
              </div>
              <p className="text-xs text-[#98A2B3] leading-relaxed">
                단순 리다이렉트를 넘어, 프로필 브랜딩, SNS 멀티링크, 번호별 추천 제품 전시 및 전자책/템플릿 원클릭 결제창을 하나의 주소로 완성합니다.
              </p>
              <div className="pt-2 border-t border-[#21262D] flex items-center gap-2 text-[11px] text-[#98A2B3] font-mono">
                <span>프로필 브랜딩 + 원클릭 결제창 통합</span>
              </div>
            </div>

            {/* 혜택 3: 인앱 브라우저 자동 탈출 */}
            <div className="p-7 rounded-2xl bg-[#161B22] border border-[#21262D] space-y-4 hover:border-[#F04438]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#F04438] uppercase tracking-wider">
                  Conversion Engine
                </div>
                <h3 className="text-base font-bold text-white">인앱 브라우저 자동 탈출</h3>
              </div>
              <p className="text-xs text-[#98A2B3] leading-relaxed">
                인스타그램·카카오톡 웹뷰 환경에서 발생하는 로그인 풀림을 방지하고, 사파리(Safari), 크롬(Chrome), 전용 앱으로 0.1초 내 전환합니다.
              </p>
              <div className="pt-2 border-t border-[#21262D] flex items-center gap-2 text-[11px] text-[#98A2B3] font-mono">
                <span>모바일 웹뷰 이탈 방지 엔진 내장</span>
              </div>
            </div>

          </div>

          {/* 하단 로그인 유도 CTA 바 */}
          <div className="mt-12 p-6 rounded-2xl bg-[#161B22] border border-[#30363D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-white">
                Google 계정으로 무료 슬롯을 선점하세요
              </h4>
              <p className="text-xs text-[#98A2B3] mt-0.5">
                얼리버드 10,000명 한정 무료 혜택이 적용됩니다.
              </p>
            </div>

            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-[#F04438] hover:bg-[#D92D20] text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0 transition-all active:scale-95"
            >
              <span>간편 로그인 시작</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. 미니멀 푸터 */}
      <footer className="border-t border-[#21262D] py-10 px-4 sm:px-6 bg-[#090A0C] text-xs text-[#667085]">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#EAECF0]">1미리 (1mm.kr)</span>
            <span>•</span>
            <span>국내 최단 10자 단축링크 & 개별 페이지 인프라</span>
          </div>

          <div className="flex items-center gap-6 font-mono">
            <Link href="/login" className="hover:text-[#EAECF0] transition-colors">
              LOGIN
            </Link>
            <Link href="/dashboard" className="hover:text-[#EAECF0] transition-colors">
              DASHBOARD
            </Link>
            <a href="#top" className="hover:text-[#EAECF0] transition-colors">
              TOP ↑
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
