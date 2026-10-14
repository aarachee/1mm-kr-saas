'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Zap, ShieldCheck, ArrowRight, Check, Sparkles, 
  DollarSign, MessageSquare, Download, Lock, ExternalLink,
  Smartphone, Award, HeartHandshake, Layers, TrendingUp,
  Users, Mail, Phone, Clock, FileSpreadsheet, BarChart3,
  HelpCircle, CheckCircle2
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
            <a href="#simulation" className="hover:text-indigo-400 transition-colors text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>1주일 140만 원 실전 증명</span>
            </a>
            <a href="#playbook" className="hover:text-indigo-400 transition-colors">
              완판 플레이북
            </a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">
              요금제
            </a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">
              FAQ
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

      {/* 4.5 실전 완판 시뮬레이션 섹션 (1주일 140만 원 무인 완판 케이스 & 대시보드 통계 활용) */}
      <section id="simulation" className="py-20 px-4 sm:px-6 border-t border-slate-800 bg-slate-950 relative overflow-hidden">
        {/* 은은한 배경 오로라 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          
          {/* 섹션 헤더 */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>실전 완판 시뮬레이션 증명</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              평범한 직장인은 어떻게 스레드 글 하나로 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-indigo-300">
                1주일 만에 1,405,600원을 벌었을까?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              크몽 20% 수수료와 인앱 브라우저 결제 이탈에 좌절했던 32세 김서준 님이 <br className="hidden sm:inline" />
              1mm Pay의 <strong>8단계 무인 파이프라인</strong>과 <strong>통계 기반 2차 고단가 업셀링</strong>으로 달성한 실제 시뮬레이션입니다.
            </p>
          </div>

          {/* 1. 8단계 엔드투엔드 파이프라인 타임라인 */}
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                  8-Step Automated Funnel Journey
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                소요시간: 셋업 1분 ➔ 24시간 전자동
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { step: '01', title: '1mm Pay 가입', desc: '크몽 20% 대비 3.5% 확인 후 1분 가입', icon: Zap, color: 'text-amber-400' },
                { step: '02', title: '결제창 1분 생성', desc: '0원 무료본 + 14,900원 완판본 설정', icon: Layers, color: 'text-indigo-400' },
                { step: '03', title: '원클릭 템플릿 복사', desc: '내 링크와 [치트키] 키워드 자동 합성', icon: MessageSquare, color: 'text-purple-400' },
                { step: '04', title: '스레드 포스팅', desc: '댓글 120개 폭발 ("치트키" 쇄도)', icon: TrendingUp, color: 'text-pink-400' },
                { step: '05', title: '0.5초 자동 DM', desc: '개인 맞춤 결제 링크 자동 전송', icon: Mail, color: 'text-blue-400' },
                { step: '06', title: '1초 결제 & 0원 수령', desc: '인앱 탈출 ➔ 카카오페이 원클릭 완료', icon: Smartphone, color: 'text-emerald-400' },
                { step: '07', title: '대시보드 통계 분석', desc: '골든타임 밤 10시·스레드 84% 파악', icon: BarChart3, color: 'text-amber-400' },
                { step: '08', title: '2차 고단가 완판', desc: '이메일 드립 & 휴대폰 번호 1:1 코칭', icon: Award, color: 'text-rose-400' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/60 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-500">STEP {item.step}</span>
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 3단계 수익 파이프라인 실적 & 총결산 배너 */}
          <div className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              
              {/* 단계 1 */}
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                      1단계: 즉시 결제
                    </span>
                    <span className="text-xs text-slate-400">포스팅 첫날</span>
                  </div>
                  <h4 className="text-base font-bold text-white">스레드 1초 카카오페이 완판</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    무료본 받으러 온 94명 중 <strong>26명이 1초 업셀 팝업</strong>을 보고 14,900원 완판본 즉시 결제
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">26권 × 14,900원</span>
                  <span className="text-lg font-black text-indigo-400">387,400원</span>
                </div>
              </div>

              {/* 단계 2 */}
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      2단계: 이메일 회수
                    </span>
                    <span className="text-xs text-slate-400">3일 차</span>
                  </div>
                  <h4 className="text-base font-bold text-white">5일 자동 이메일 시퀀스</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    0원 무료본만 받고 이탈했던 68명에게 Day 3 한정 혜택 메일 발송 ➔ <strong>18명 추가 결제</strong>
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">18권 × 14,900원</span>
                  <span className="text-lg font-black text-purple-400">+268,200원</span>
                </div>
              </div>

              {/* 단계 3 */}
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      3단계: 고단가 코칭
                    </span>
                    <span className="text-xs text-slate-400">2주 차</span>
                  </div>
                  <h4 className="text-base font-bold text-white">휴대폰 번호 DB 1:1 줌 코칭</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    이미 구매한 충성 고객 26명에게 알림톡 1통 ➔ <strong>15만 원 1:1 코칭 5명 선착순 10분 완판</strong>
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">5명 × 150,000원</span>
                  <span className="text-lg font-black text-emerald-400">+750,000원</span>
                </div>
              </div>
            </div>

            {/* 총 순수익 결산 배너 */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-indigo-600/20 to-purple-600/20 border-2 border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-amber-500/5">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    Total Net Profit (광고비 0원 무인 순수익)
                  </div>
                  <div className="text-xl sm:text-3xl font-black text-white mt-0.5">
                    총 순수익 <span className="text-amber-300">1,405,600원</span> 달성
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">
                  영구 소장 자산: <strong>이메일 94명 + 휴대폰 번호 26명</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 3. 대시보드 통계 & 엑셀 DB 실물 프리뷰 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  Creator Analytics & CRM
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  돈이 되는 대시보드 정밀 통계 & 엑셀 고객 DB
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>실시간 자동 동기화</span>
                </span>
              </div>
            </div>

            {/* 통계 4대 KPI 카드 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>총 클릭수 / 순방문자</span>
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-xl font-black text-white mt-1">142회 <span className="text-xs font-normal text-slate-400">(UV 120명)</span></div>
                <div className="text-[10px] text-emerald-400 mt-1 font-semibold">댓글 작성자 100% 도달</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>무료 요약본 수령 (DB)</span>
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 mt-1">94명 <span className="text-xs font-normal text-slate-400">(전환율 78.3%)</span></div>
                <div className="text-[10px] text-indigo-400 mt-1 font-semibold">이메일 DB 즉시 축적</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>골든 타임 분석</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xl font-black text-amber-300 mt-1">22:00 ~ 23:30</div>
                <div className="text-[10px] text-slate-400 mt-1">취침 전 결제 45% 집중</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>인앱 탈출 성공률</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 mt-1">99.2%</div>
                <div className="text-[10px] text-emerald-400 mt-1 font-semibold">로그인 풀림 이탈 0건</div>
              </div>
            </div>

            {/* 엑셀 고객 DB 프리뷰 테이블 */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">고객 연락처 DB 엑셀 리스트 (서준 님 실시간 축적 화면)</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Excel(.xlsx) 다운로드</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] text-slate-300">
                  <thead className="bg-slate-900/40 text-slate-400 border-b border-slate-800/80">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">No</th>
                      <th className="py-2.5 px-3 font-semibold">고객명</th>
                      <th className="py-2.5 px-3 font-semibold">이메일</th>
                      <th className="py-2.5 px-3 font-semibold">휴대폰 번호</th>
                      <th className="py-2.5 px-3 font-semibold">구매 내역</th>
                      <th className="py-2.5 px-3 font-semibold">결제 금액</th>
                      <th className="py-2.5 px-3 font-semibold text-right">수령 일시</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    <tr className="hover:bg-slate-900/30">
                      <td className="py-2 px-3 text-slate-500">1</td>
                      <td className="py-2 px-3 font-medium text-white">김민지</td>
                      <td className="py-2 px-3 text-slate-300">minji***@gmail.com</td>
                      <td className="py-2 px-3 text-emerald-400 font-mono">010-9876-****</td>
                      <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">실전 완판본</span></td>
                      <td className="py-2 px-3 font-bold text-white">14,900원 (카카오페이)</td>
                      <td className="py-2 px-3 text-right text-slate-500">2026-10-14 20:12</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="py-2 px-3 text-slate-500">2</td>
                      <td className="py-2 px-3 font-medium text-white">박성현</td>
                      <td className="py-2 px-3 text-slate-300">shpark***@naver.com</td>
                      <td className="py-2 px-3 text-emerald-400 font-mono">010-3342-****</td>
                      <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">실전 완판본</span></td>
                      <td className="py-2 px-3 font-bold text-white">14,900원 (토스페이)</td>
                      <td className="py-2 px-3 text-right text-slate-500">2026-10-14 20:15</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="py-2 px-3 text-slate-500">3</td>
                      <td className="py-2 px-3 font-medium text-white">이수진</td>
                      <td className="py-2 px-3 text-slate-300">sujin***@daum.net</td>
                      <td className="py-2 px-3 text-slate-500 font-mono">─ (무료수령)</td>
                      <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">무료 요약본</span></td>
                      <td className="py-2 px-3 font-medium text-slate-400">0원 (이메일 확보)</td>
                      <td className="py-2 px-3 text-right text-slate-500">2026-10-14 20:18</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 bg-slate-950 text-center text-[11px] text-slate-500 border-t border-slate-800/80">
                ... 외 91명의 고객 연락처가 안전하게 암호화되어 내 컴퓨터에 저장되었습니다.
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

      {/* 7. 자주 묻는 질문 (FAQ) */}
      <section id="faq" className="py-20 px-4 sm:px-6 border-t border-slate-800 bg-slate-950 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              자주 묻는 질문
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              크리에이터분들이 가장 많이 질문하시는 핵심 사항을 정리했습니다.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '사업자등록증이 없는 개인/부업 직장인도 이용할 수 있나요?',
                a: '네, 100% 가능합니다! 1인 지식 크리에이터, 부업 직장인, 프리랜서 누구나 별도 복잡한 심사나 서류 제출 없이 가입 즉시 개인 결제 링크를 생성해 인스타·스레드·블로그에서 바로 판매를 시작하실 수 있습니다.'
              },
              {
                q: '카카오페이나 토스로 결제된 돈은 어떻게 정산받나요?',
                a: '고객이 결제한 금액은 대표님 명의의 국내 모든 은행 계좌로 정기 정산일에 안전하게 자동 입금됩니다. 크몽처럼 20%의 과도한 수수료를 떼지 않고, 업계 최저 3.5% 수준의 실비만 공제된 전액을 투명하게 정산해 드립니다.'
              },
              {
                q: '글쓰기나 마케팅을 잘 못하는데 포스팅은 어떻게 올려야 하나요?',
                a: '걱정하지 마세요! 1mm Pay 대시보드 내 [완판 플레이북 & 템플릿] 메뉴에서 이미 수억 원 매출로 검증된 스레드, 인스타 릴스 떡상 카피 템플릿 30선을 무료 제공합니다. 버튼 한 번만 누르면 대표님의 링크와 키워드가 자동 합성되어 스마트폰 클립보드에 복사됩니다.'
              },
              {
                q: '외주 플랫폼이나 스마트스토어보다 전환율이 왜 훨씬 높나요?',
                a: '스마트폰 인앱 브라우저에서 발생하는 "로그인 풀림" 현상을 1mm의 딥링크 엔진이 99.2% 자동으로 탈출시켜 주기 때문입니다. 손님이 아이디와 비밀번호를 찾다가 이탈하지 않고, 카카오페이/토스 지문 인식으로 1초 만에 결제하므로 전환율이 극대화됩니다.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-3">
                  <span className="text-indigo-400 font-mono shrink-0">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 파이널 클로징 CTA 배너 */}
      <section className="py-20 px-4 sm:px-6 border-t border-slate-800 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 relative overflow-hidden text-center">
        {/* 앰비언트 글로우 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>지금 바로 내 24시간 무인 판매기를 가동하세요</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            오늘 밤 올린 스레드 댓글 하나가, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-pink-300">
              내일 아침 140만 원의 입금으로 바뀝니다
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            더 이상 크몽에 20%의 피땀 흘린 수수료를 바치지 마세요. <br className="hidden sm:inline" />
            더 이상 로그인 풀림으로 손님을 허공으로 날려 보내지 마세요.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white transition-all shadow-xl shadow-indigo-500/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>지금 무료로 내 판매기 시작하기 (1분 소요)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#creator-machine"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-300 transition-colors"
            >
              인터랙티브 판매기 체험하기
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> 가입 즉시 결제 링크 발급</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> 월 고정비 0원 무료 시작</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> 카카오페이 / 토스페이 지원</span>
          </div>
        </div>
      </section>

      {/* 9. 푸터 */}
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
