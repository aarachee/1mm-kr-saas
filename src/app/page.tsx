'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Link2, QrCode as QrIcon, ShieldCheck, Zap, ArrowRight, Check, 
  ExternalLink, TrendingUp, Sparkles, Lock, Layers, BarChart3,
  Smartphone, Share2, Compass
} from 'lucide-react'
import { InstantEscapeWidget } from '@/components/InstantEscapeWidget'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. 글로벌 네비게이션 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-6xl">
          
          {/* 브랜드 로고 */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              1mm
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white">1mm.kr</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/20 hidden sm:inline-block">
                모바일 전환 인프라
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#escape-shortener" className="hover:text-indigo-400 transition-colors">
              인앱 탈출 단축 & QR
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              주요 기능
            </a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">
              요금제
            </a>
            {/* 1mm Pay 분리 서브서비스 바로가기 */}
            <Link 
              href="/pay" 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/30 text-purple-300 hover:text-white transition-all hover:scale-105"
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>1mm Pay (크리에이터 결제)</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </nav>

          {/* 우측 CTA */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/pay"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800"
            >
              <span>전자책 판매 ➔</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white transition-all shadow-md shadow-indigo-500/20 active:scale-95"
            >
              대시보드 시작
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션: 1mm 인앱 탈출 단축주소 & QR 스튜디오 */}
      <section id="escape-shortener" className="relative overflow-hidden pt-12 sm:pt-16 pb-16 px-4 sm:px-6">
        
        {/* 은은한 배경 앰비언트 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          
          {/* 상단 뱃지 */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold mb-5">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>국내 최단 13자 인앱 탈출 딥링크 & 300 DPI QR 스튜디오</span>
          </div>

          {/* 헤드라인 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
            단 1mm의 마찰도 없는 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-indigo-300">
              초단축 딥링크 & 모바일 전환 엔진
            </span>
          </h1>

          {/* 서브 카피 */}
          <p className="mt-4 text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
            인스타·카톡 로그인 풀림을 깨부수는 <strong>13자 인앱 탈출 단축링크</strong>와 <br className="hidden sm:inline" />
            인쇄물에 깨짐 없는 <strong>300 DPI 초고해상도 QR코드</strong>를 1초 만에 무료 생성하세요.
          </p>

          {/* 무료 미끼: 인앱 탈출 단축기 & QR 스튜디오 위젯 */}
          <div className="mt-8">
            <InstantEscapeWidget />
          </div>

          {/* 구글 애드센스 슬롯 */}
          <div className="mt-8 max-w-2xl mx-auto bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 text-center relative overflow-hidden">
            <div className="text-[10px] text-slate-500 font-bold mb-1 flex items-center justify-between px-1">
              <span>SPONSORED</span>
              <span className="text-slate-600 text-[9px]">Google AdSense (pub-7685551023610074)</span>
            </div>
            
            <div className="min-h-[75px] w-full bg-slate-950/60 border border-slate-800/60 rounded-xl flex flex-col items-center justify-center p-3 text-center">
              <span className="text-xs font-semibold text-indigo-400 mb-0.5">
                클라우드 인프라 & 고성능 모바일 마케팅 솔루션
              </span>
              <p className="text-[11px] text-slate-400 max-w-md">
                대량 알림톡 발송 및 초저지연 CDN 호스팅을 위한 최적화 플랫폼
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 단축링크 & 인앱 탈출 3대 핵심 특장점 */}
      <section id="features" className="py-16 px-4 sm:px-6 border-t border-slate-800/80 bg-slate-950/60 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Features</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              왜 마케터는 일반 단축링크 대신 1mm를 쓸까요?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. 인앱 탈출 */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">인앱 브라우저 자동 탈출</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                인스타그램·카카오톡·스레드 앱 내 웹뷰에서 발생하는 로그인 풀림을 방지하고, 사파리(Safari)나 크롬(Chrome), 쿠팡 앱으로 즉시 연결합니다.
              </p>
            </div>

            {/* 2. 300 DPI QR */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <QrIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">300 DPI 인쇄용 고해상도 QR</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                전단지, 배너, 제품 패키지에 인쇄해도 전혀 번지거나 깨지지 않는 1200x1200px 초고해상도 벡터 QR코드를 즉시 생성하고 PNG로 저장하세요.
              </p>
            </div>

            {/* 3. 픽셀 & A/B 테스트 */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">메타 픽셀 & A/B 테스트</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                단축링크를 누른 잠재고객을 메타(Facebook) 픽셀 모수로 수집하고, 도착지 URL을 50:50으로 무작위 분산하여 랜딩페이지 전환율을 테스트하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. [신규 브릿지 배너] 1mm Pay 크리에이터 솔루션 연계 안내 */}
      <section className="py-14 px-4 sm:px-6 border-t border-slate-800/80 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border border-indigo-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>지식 창업자 & 인스타 크리에이터이신가요?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                댓글 하나로 자는 동안 팔리는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">1mm Pay</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                전자책·노션 템플릿 판매에 크몽 20% 수수료를 낼 필요가 없습니다. <br className="hidden sm:inline" />
                인스타 댓글 자동 DM부터 카카오페이/토스 원클릭 결제창까지 단 1분 만에 세팅하세요.
              </p>
            </div>

            <Link
              href="/pay"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all shrink-0 active:scale-95"
            >
              <span>1mm Pay 솔루션 확인하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 투명한 단축링크 SaaS 전용 요금제 */}
      <section id="pricing" className="py-20 px-4 sm:px-6 border-t border-slate-800 relative">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Transparent Link Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              합리적인 단축링크 요금제
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              무료 13자 인앱 탈출 단축주소부터 퍼포먼스 마케팅용 A/B 분산 엔진까지 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* PLAN 1: FREE */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Starter Free</h3>
                  <p className="text-xs text-slate-400 mt-1">단축주소 및 QR 무료 생성용</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">0원</span>
                  <span className="text-xs text-slate-500">/ 평생 무료</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>13자 인앱 탈출 단축링크 무제한</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>300 DPI 인쇄용 고해상도 QR코드</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>기본 실시간 클릭수 집계</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <span>메타 픽셀 및 A/B 테스트 미지원</span>
                  </li>
                </ul>
              </div>

              <a
                href="#escape-shortener"
                className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors"
              >
                무료로 시작하기
              </a>
            </div>

            {/* PLAN 2: PRO MARKETER (BEST) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between space-y-6 relative shadow-xl shadow-indigo-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-[10px] tracking-wider uppercase">
                Most Popular
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Pro Marketer</h3>
                  <p className="text-xs text-indigo-300 mt-1">퍼포먼스 마케팅 & 제휴 셀러</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">9,900원</span>
                  <span className="text-xs text-slate-400">/ 월</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>메타(Meta) / 구글 / 틱톡 픽셀 무제한 연동</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>A/B 테스트 50:50 무작위 트래픽 분산</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>유입 채널(Referrer) 및 OS/기기별 상세 통계</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>한글 커스텀 슬러그 (예: 1mm.kr/멘토)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>중간 광고 배너 100% 제거</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 transition-all active:scale-95"
              >
                <span>Pro Marketer 시작하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* PLAN 3: AGENCY / ENTERPRISE */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Agency / B2B</h3>
                  <p className="text-xs text-slate-400 mt-1">대행사 및 다계정 마케팅팀</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">29,000원</span>
                  <span className="text-xs text-slate-500">/ 월</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pro Marketer 모든 기능 포함</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>비밀번호 보호 링크 & 링크 만료일 설정</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>대량 링크 생성 API 키 발급</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>팀원 계정 초대 및 데이터 권한 관리</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors"
              >
                도입 문의하기
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. 푸터 */}
      <footer className="border-t border-slate-900 py-10 px-4 sm:px-6 bg-slate-950 text-xs text-slate-500">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">1mm.kr</span>
            <span>•</span>
            <span>초단축 딥링크 & 모바일 전환 최적화 인프라</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/pay" className="hover:text-purple-400 transition-colors flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>1mm Pay (크리에이터 결제)</span>
            </Link>
            <a href="#escape-shortener" className="hover:text-slate-300 transition-colors">
              단축주소 생성기
            </a>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
              대시보드
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
