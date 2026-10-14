'use client'

import React, { useState } from 'react'
import { 
  BookOpen, Copy, Check, Sparkles, MessageSquare, 
  TrendingUp, DollarSign, Target, ChevronRight, Zap, ShieldCheck
} from 'lucide-react'

export function PlaybookHub() {
  const [activeSection, setActiveSection] = useState<'copy' | 'dm' | 'ads' | 'pricing'>('copy')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const COPY_TEMPLATES = [
    {
      id: 'template-1',
      tag: '실패 극복형',
      title: '직장 다니며 부업으로 6번 실패 후 월 200 순익 낸 실전 기록',
      text: `직장 다니면서 퇴근 후 부업으로 6번 실패하고, 7번째에 월 200만 원 순수익 낸 노션 가계부 & 지식 비즈니스 템플릿입니다.\n\n크몽에 입점해서 수수료 20% 뜯기지 않고, 인스타 댓글 자동화로 첫 주 만에 50만 원 벌었던 구체적인 실행 순서를 A4 20장으로 정리했습니다.\n\n오늘 딱 24시간 동안만 무료 공개합니다.\n댓글에 [신청]이라고 남겨주시면 DM으로 0.1초 만에 쏴드릴게요!`
    },
    {
      id: 'template-2',
      tag: '업계 비밀 폭로형',
      title: '마케팅 대행사가 절대 안 알려주는 릴스 오프닝 3초 공식 5가지',
      text: `조회수 100회에서 멈추던 계정을 3주 만에 10만 계정으로 키운 실전 대본집입니다.\n\n얼굴 공개 없이 텍스트와 스톡 영상만으로 시청 지속 시간을 90% 이상 유지시키는 오프닝 3초 후킹 공식 5가지를 담았습니다.\n\n필요하신 분은 댓글에 [알고리즘] 남겨주시면 바로 다운로드 링크 보내드립니다.`
    },
    {
      id: 'template-3',
      tag: '24시간 한정 배포형',
      title: '유료 강의 수강생에게만 제공하던 PDF 요약본 무료 배포',
      text: `스마트스토어나 블로그 없이 내 노하우를 15,000원에 팔아 자는 동안 돈 버는 법.\n\n실제 판매에 사용 중인 상세페이지 구조와 가격 책정 템플릿을 오늘 자정까지만 공유합니다.\n\n댓글에 [치트키] 남겨주세요!`
    }
  ]

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl">
      
      {/* 1. 섹션 헤더 */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>1mm Creator Blueprint</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          크리에이터 완판 노하우 플레이북
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          툴만 제공하지 않습니다. 어떤 글을 써서 댓글을 모으고, 어떻게 결제까지 연결하는지 검증된 공식을 모두 공개합니다.
        </p>
      </div>

      {/* 2. 네비게이션 탭 (모바일 스크롤 지원) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSection('copy')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'copy'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          댓글 폭발 후킹 카피 템플릿
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('dm')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'dm'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          전환율 80% DM 대화 공식
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('ads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'ads'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          하루 5,000원 인스타 광고 세팅
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('pricing')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'pricing'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          가격 심리학 & 결제 전환
        </button>
      </div>

      {/* 3. 탭별 실전 가이드 내용 */}
      
      {/* SECTION 1: 후킹 카피 템플릿 */}
      {activeSection === 'copy' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COPY_TEMPLATES.map((tmpl) => (
            <div 
              key={tmpl.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {tmpl.tag}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {tmpl.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line pt-1">
                  {tmpl.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copyText(tmpl.id, tmpl.text)}
                className="w-full h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-98"
              >
                {copiedId === tmpl.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">복사 완료! 인스타에 붙여넣으세요</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>카피 템플릿 전체 복사</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: 80% 전환 DM 시나리오 */}
      {activeSection === 'dm' && (
        <div className="max-w-3xl mx-auto p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-white">
              욕먹지 않고 감사 인사를 들으며 결제시키는 3단계 DM 구조
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              링크만 툭 던지는 DM은 클릭률 15% 미만이지만, 아래 3단계 구조를 적용하면 결제 전환율이 80%까지 치솟습니다.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="font-bold text-indigo-400 block mb-1">1단계: 친근한 인사와 관심에 대한 감사</span>
              <p className="text-slate-400">&ldquo;안녕하세요 OO님! 게시물 보고 댓글 남겨주셔서 감사합니다. 가치 있는 분께 전달드릴 수 있어 기쁩니다.&rdquo;</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="font-bold text-indigo-400 block mb-1">2단계: 1mm 인앱 탈출 다이렉트 결제 링크 제시</span>
              <p className="text-slate-400">&ldquo;요청하신 [실전 치트키 전자책] 소장 링크입니다 👉 https://pay.1mm.kr/p/book1 (스마트폰 카카오페이/토스로 1초 만에 결제 후 즉시 다운로드 가능합니다.)&rdquo;</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="font-bold text-indigo-400 block mb-1">3단계: 손실 회피 및 기한 안내 (오늘 자정 정가 전환)</span>
              <p className="text-slate-400">&ldquo;현재 얼리버드 한정 혜택으로 14,900원에 제공 중이며, 오늘 자정이 지나면 정가(49,000원)로 변경되니 꼭 혜택 챙겨가세요!&rdquo;</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: 하루 5,000원 메타 광고 */}
      {activeSection === 'ads' && (
        <div className="max-w-3xl mx-auto p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-white">
              팔로워 0명이어도 바로 팔리는 메타(Meta) 인스타그램 광고 세팅법
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              팔로워 모으느라 6개월 낭비하지 마세요. 하루 커피 한 잔 값으로 즉시 타겟 고객에게 내 전자책을 노출시킵니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="font-bold text-emerald-400 block">광고 세팅 3원칙</span>
              <ul className="space-y-1.5 text-slate-400">
                <li>• 목표: &apos;메시지 더 받기&apos; 또는 &apos;프로필 방문&apos;</li>
                <li>• 일일 예산: <strong>하루 5,000원</strong> (최소 예산으로 검증)</li>
                <li>• 타겟: 25세~42세, 관심사 (부업, 재테크, 자기계발)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="font-bold text-indigo-400 block">수익 방정식 (ROI 계산)</span>
              <ul className="space-y-1.5 text-slate-400">
                <li>• 하루 지출: 광고비 5,000원</li>
                <li>• 유입 결과: 댓글 25개 ➔ 1mm 자동 DM 25개 발송</li>
                <li>• 판매 성과: 전자책 2권 판매 (15,000원 × 2 = 30,000원)</li>
                <li>• <strong>매일 25,000원 순수익 무한 복사</strong> (수익률 500%)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 가격 심리학 */}
      {activeSection === 'pricing' && (
        <div className="max-w-3xl mx-auto p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-white">
              결제 직전 이탈을 막는 가격 심리학
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              디지털 파일 판매 시 전환율이 가장 높은 가격대와 결제 허들 제거 팁입니다.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-400">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <strong className="text-white block mb-0.5">1. 첫 판매는 14,900원 마지노선</strong>
              <span>치킨 한 마리 값보다 싼 14,900원은 구매자가 고민하지 않고 즉동적으로 결제하는 심리적 스윗스팟입니다.</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <strong className="text-white block mb-0.5">2. 무통장 입금 계좌번호의 치명적 함정</strong>
              <span>계좌번호를 주고 입금을 기다리면 70%가 중간에 잊어버립니다. 무조건 카카오페이/토스 1클릭 결제로 3초 안에 끝내야 합니다.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
