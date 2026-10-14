'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpen, MessageSquare, Zap, Check, ArrowRight, 
  ExternalLink, Sparkles, ShieldCheck, DollarSign, Send,
  FileText, Smartphone
} from 'lucide-react'
import { createDigitalProductAction } from '@/app/actions'

export function CreatorMachineWidget() {
  const [title, setTitle] = useState('직장인 퇴근 후 1시간, 월 200 부업 치트키 실전서')
  const [authorName, setAuthorName] = useState('김민우 디렉터')
  const [price, setPrice] = useState(14900)
  const [triggerKeyword, setTriggerKeyword] = useState('신청')
  const [fileType, setFileType] = useState<'PDF' | 'NOTION' | 'EXCEL'>('PDF')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdResult, setCreatedResult] = useState<{
    slug: string
    checkoutUrl: string
  } | null>({
    slug: 'side-income-guide',
    checkoutUrl: '/p/side-income-guide'
  })
  const [activeTab, setActiveTab] = useState<'setup' | 'preview'>('setup')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await createDigitalProductAction({
        title,
        authorName,
        price,
        triggerKeyword,
        fileType,
        pageCount: '84페이지',
        autoDmMessage: `안녕하세요! 요청하신 [${title}] 즉시 다운로드 링크입니다.`
      })

      if (res.success && res.slug && res.checkoutUrl) {
        setCreatedResult({
          slug: res.slug,
          checkoutUrl: res.checkoutUrl
        })
        setActiveTab('preview')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generatedDmText = `안녕하세요! 요청하신 [${title || '전자책'}] 즉시 다운로드 링크입니다. 👇\n\nhttps://pay.1mm.kr/p/${createdResult?.slug || 'my-guide'}\n\n(카카오페이/토스로 1초 만에 결제 후 즉시 소장 가능합니다.)`

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl">
      
      {/* 1. 상단 안내 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>1mm Pay 자동 판매 머신</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            인스타·스레드 전자책 & 디지털 상품 자동 판매기
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            파일 업로드 ➔ 카카오페이 결제창 생성 ➔ 댓글 자동 DM 발송까지 단 1분 만에 완성됩니다.
          </p>
        </div>

        {/* 탭 전환 (모바일 고려) */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('setup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'setup'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            설정 에디터
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            실시간 시뮬레이션
          </button>
        </div>
      </div>

      {/* 2. 에디터 및 프리뷰 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 좌측: 1분 세팅 폼 (7 cols) */}
        <div className={`lg:col-span-7 space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 상품 제목 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                전자책 / 디지털 리소스 제목
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 직장인 월 200 부업 치트키 실전서"
                className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 저자 / 크리에이터명 */}
              <div className="sm:col-span-1">
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  크리에이터명
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="예: 김민우 디렉터"
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* 판매 가격 */}
              <div className="sm:col-span-1">
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  판매 가격 (원화)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1000"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-bold"
                  />
                  <span className="absolute right-3.5 top-3 text-xs text-slate-500">원</span>
                </div>
              </div>

              {/* 파일 포맷 */}
              <div className="sm:col-span-1">
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  파일 형식
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as any)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="PDF">PDF 전자책</option>
                  <option value="NOTION">노션 템플릿</option>
                  <option value="EXCEL">엑셀/스프레드시트</option>
                </select>
              </div>
            </div>

            {/* 인스타 댓글 트리거 단어 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>인스타그램 / 스레드 댓글 트리거 설정</span>
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">0.5s Instant Trigger</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 whitespace-nowrap">댓글에</span>
                <input
                  type="text"
                  required
                  value={triggerKeyword}
                  onChange={(e) => setTriggerKeyword(e.target.value)}
                  placeholder="신청"
                  className="w-24 h-10 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-center text-amber-300 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400">라고 작성하면 즉시 결제 링크 DM 발송</span>
              </div>
            </div>

            {/* 생성 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-98 disabled:opacity-50"
            >
              <span>1분 만에 판매 링크 & 자동 DM 세팅하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 기존 데모 상품 바로가기 */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block mb-2">
              실제 동작 중인 모바일 결제창 체험해보기:
            </span>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/p/side-income-guide"
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>부업 치트키 실전서 (14,900원)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>

              <Link
                href="/p/reels-algorithm"
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>릴스 알고리즘 50선 (19,900원)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </Link>
            </div>
          </div>
        </div>

        {/* 우측: 인스타 DM 0.5초 발송 시뮬레이터 (5 cols) */}
        <div className={`lg:col-span-5 ${activeTab === 'setup' ? 'hidden lg:block' : 'block'}`}>
          <div className="w-full max-w-sm mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-4 shadow-2xl space-y-4">
            
            {/* 상단 스마트폰 상태 바 모사 */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-2 pb-1 border-b border-slate-900">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                <span>Instagram Direct Message</span>
              </span>
              <span className="text-emerald-400 font-bold">1mm 봇 연결됨</span>
            </div>

            {/* 인스타 댓글 트리거 시뮬레이션 */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs space-y-1">
              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <span>고객 댓글 감지:</span>
              </div>
              <div className="text-slate-200">
                &ldquo;자료 받아보고 싶습니다! <strong className="text-amber-400 font-bold">[{triggerKeyword || '신청'}]</strong>&rdquo;
              </div>
            </div>

            {/* 0.5초 자동 발송 DM 메시지 버블 */}
            <div className="space-y-1">
              <div className="text-[10px] text-indigo-400 font-semibold pl-1">
                0.5초 즉시 자동 답장 DM:
              </div>
              <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs text-slate-200 space-y-2 leading-relaxed">
                <p className="whitespace-pre-line text-xs font-medium">
                  {generatedDmText}
                </p>
              </div>
            </div>

            {/* 생성된 결제창 원클릭 체험 버튼 */}
            {createdResult && (
              <div className="pt-2 space-y-2">
                <Link
                  href={createdResult.checkoutUrl}
                  target="_blank"
                  className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>내 결제 페이지 미리보기 ({createdResult.slug})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/dashboard/playbook"
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 hover:from-indigo-500/30 hover:to-pink-500/30 border border-indigo-500/30 text-indigo-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>인스타에 올릴 완판 템플릿 복사하기 ➔</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
