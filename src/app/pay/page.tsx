'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Zap, ShieldCheck, ArrowRight, Check, Sparkles, 
  DollarSign, MessageSquare, Download, Lock, ExternalLink,
  Smartphone, Award, HeartHandshake, Layers
} from 'lucide-react'
import { CreatorMachineWidget } from '@/components/CreatorMachineWidget'
import { PlaybookHub } from '@/components/PlaybookHub'

export default function PayLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. 상단 글로벌 네비게이션 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-6xl">
          
          {/* 브랜드 로고 */}
          <Link href="/pay" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              Pay
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white">1mm Pay</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/20 hidden sm:inline-block">
                크리에이터 D2C 결제 솔루션
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#creator-machine" className="hover:text-indigo-400 transition-colors">
              인스타 자동 판매기
            </a>
            <a href="#comparison" className="hover:text-indigo-400 transition-colors">
              수수료 비교
            </a>
            <a href="#playbook" className="hover:text-indigo-400 transition-colors">
              완판 플레이북
            </a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">
              요금제
            </a>
          </nav>

          {/* 우측 CTA */}
          <div className="flex items-center gap-2.5">
            {/* 단축링크 툴로 이동하는 크로스 도메인 링크 */}
            <a
              href="https://1mm.kr"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              <span>1mm 단축링크·QR</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white transition-all shadow-md shadow-indigo-500/25 active:scale-95"
            >
              내 판매기 시작
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션 */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6">
        {/* 앰비언트 글로우 배경 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-pink-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          
          {/* 상단 뱃지 */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>댓글 하나로 자는 동안 팔리는 크리에이터 자동화 엔진</span>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
            인스타·스레드 댓글이 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-pink-300">
              1초 만에 계좌 입금으로 바뀝니다
            </span>
          </h1>

          {/* 서브 카피 */}
          <p className="mt-5 text-slate-400 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            크몽 수수료 20%에 피땀 흘린 수익을 뺏기지 마세요. <br className="hidden sm:inline" />
            게시물에 댓글만 달리면 <strong>초개인화 결제창 링크가 자동 DM으로 발송</strong>되고, <br className="hidden sm:inline" />
            카카오페이·토스 원클릭 결제 후 <strong>PDF·노션 템플릿이 즉시 다운로드</strong>됩니다.
          </p>

          {/* 4대 핵심 신뢰 지표 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>카카오페이 / 토스 1초 결제</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>크몽 대비 1/6 수수료 (3.5%)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>인스타·스레드 댓글 자동 DM</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>결제 즉시 실시간 파일 전달</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 인터랙티브 체험: 판매 머신 위젯 */}
      <section id="creator-machine" className="py-12 px-4 sm:px-6 border-t border-slate-800/80 bg-slate-950/90 relative">
        <div className="container mx-auto max-w-5xl">
          <CreatorMachineWidget />
        </div>
      </section>

      {/* 4. 수수료 및 편의성 비교 섹션 */}
      <section id="comparison" className="py-20 px-4 sm:px-6 border-t border-slate-800 bg-slate-900/20 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>수익 극대화의 비밀</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              왜 1인 창업자는 크몽을 떠나 1mm Pay로 올까요?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              전자책 15,000원짜리 100권(150만 원)을 팔았을 때 통장에 꽂히는 실제 금액입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 타사 1: 크몽/탈잉 */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-400">외주 플랫폼</span>
                <h3 className="text-lg font-bold text-white mt-1">크몽 / 탈잉</h3>
                <div className="my-4 pt-3 border-t border-slate-900">
                  <div className="text-xs text-slate-400">판매 수수료</div>
                  <div className="text-2xl font-black text-rose-400">약 20%</div>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>• 150만 원 판매 시 수수료 30만 원 차감</li>
                  <li>• 정산 대기 기간 1~2주 소요</li>
                  <li>• 구매자 연락처/이메일 DB 확보 불가</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-xs text-slate-500">
                실수령액: <strong>약 120만 원</strong>
              </div>
            </div>

            {/* 타사 2: 스마트스토어 */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-400">쇼핑몰 플랫폼</span>
                <h3 className="text-lg font-bold text-white mt-1">스마트스토어</h3>
                <div className="my-4 pt-3 border-t border-slate-900">
                  <div className="text-xs text-slate-400">수수료는 낮으나 (3.7~5.8%)</div>
                  <div className="text-2xl font-black text-amber-400">이탈률 심각</div>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>• 모바일 인앱 브라우저에서 로그인 풀림</li>
                  <li>• 네이버 로그인 강제로 결제 포기 다수</li>
                  <li>• 수동으로 PDF 이메일 발송해야 하는 번거로움</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-xs text-slate-500">
                인스타 구매 전환율 <strong>5% 미만</strong>
              </div>
            </div>

            {/* 1mm Pay (BEST) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between relative shadow-xl shadow-indigo-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-black text-[10px] tracking-wider uppercase">
                Best Choice
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-400">1인 D2C 결제 엔진</span>
                <h3 className="text-lg font-bold text-white mt-1">1mm Pay</h3>
                <div className="my-4 pt-3 border-t border-slate-800">
                  <div className="text-xs text-indigo-300">업계 최저 수수료</div>
                  <div className="text-2xl font-black text-white">3.5%</div>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>150만 원 판매 시 순수익 144.7만 원</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>인앱 브라우저 탈출로 1초 카카오페이 결제</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>구매자 이메일/전화번호 100% 내 소유</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>결제 즉시 파일 자동 전송 (24시간 무인화)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-emerald-400 font-bold">
                실수령액: <strong>약 144만 7,500원 (크몽 대비 +24만 원 이득)</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 실전 완판 플레이북 */}
      <section id="playbook" className="py-20 px-4 sm:px-6 border-t border-slate-800 bg-slate-950 relative">
        <div className="container mx-auto max-w-5xl">
          <PlaybookHub />
        </div>
      </section>

      {/* 6. 크리에이터 전용 요금제 */}
      <section id="pricing" className="py-20 px-4 sm:px-6 border-t border-slate-800 bg-slate-900/30 relative">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Transparent Creator Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              합리적인 크리에이터 플랜
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              무료로 시작하고, 월 매출이 생기면 Pro 플랜으로 수수료를 1/6로 낮추세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* PLAN 1: STARTER FREE */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Starter Free</h3>
                  <p className="text-xs text-slate-400 mt-1">첫 전자책 판매 테스트용</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">0원</span>
                  <span className="text-xs text-slate-500">/ 월 고정비 0원</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>판매 건당 수수료 8%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>카카오페이 / 토스페이 모바일 결제창</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>결제 즉시 파일 자동 다운로드</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <span>인스타 자동 DM 월 30건 제한</span>
                  </li>
                </ul>
              </div>

              <a
                href="#creator-machine"
                className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors"
              >
                무료로 시작하기
              </a>
            </div>

            {/* PLAN 2: CREATOR PRO (BEST) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between space-y-6 relative shadow-xl shadow-indigo-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-black text-[10px] tracking-wider uppercase">
                Most Popular
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Creator Pro</h3>
                  <p className="text-xs text-indigo-300 mt-1">월 매출 50만 원 이상 필수</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">29,000원</span>
                  <span className="text-xs text-slate-400">/ 월</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>판매 수수료 3.5% (크몽 대비 1/6)</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>인스타·스레드 자동 DM 무제한 발송</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>구매자 이메일 & 연락처 DB 엑셀 다운로드</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>완판 플레이북 & 카피 템플릿 30선 전체 열람</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>메타 픽셀 & 구글 애널리틱스 연동</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 transition-all active:scale-95"
              >
                <span>Creator Pro 시작하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* PLAN 3: AGENCY / B2B */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Agency / MCN</h3>
                  <p className="text-xs text-slate-400 mt-1">인플루언서 에이전시 및 다계정 셀러</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">79,000원</span>
                  <span className="text-xs text-slate-500">/ 월</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Creator Pro 모든 혜택 포함</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>최대 5개 크리에이터 계정 통합 관리</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>판매 정산 내역 자동 분배 리포트</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>전담 카카오톡 1:1 기술 지원</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors"
              >
                에이전시 도입 문의
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 푸터 */}
      <footer className="border-t border-slate-900 py-10 px-4 sm:px-6 bg-slate-950 text-xs text-slate-500">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">1mm Pay</span>
            <span>•</span>
            <span>크리에이터 원클릭 D2C 결제 엔진</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://1mm.kr" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <span>1mm.kr 단축링크 & QR</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
              셀러 대시보드
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
