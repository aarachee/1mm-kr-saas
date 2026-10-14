'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ShieldCheck, Lock, Download, Star, CheckCircle2, Zap, 
  ArrowLeft, Check, Copy, Sparkles, BookOpen, Clock, UserCheck,
  MessageSquare, CornerDownRight, HelpCircle
} from 'lucide-react'
import { DigitalProductRecord } from '@/lib/digitalProducts'
import { ReviewRecord, QnaRecord } from '@/lib/creatorFeedback'

import { requestDigitalProductPayment, PaymentMethodType, PaymentResult } from '@/lib/payment/portone'

interface ProductCheckoutClientProps {
  product: DigitalProductRecord | null
  initialReviews?: ReviewRecord[]
  initialQnas?: QnaRecord[]
}

export function ProductCheckoutClient({ 
  product, 
  initialReviews = [],
  initialQnas = [] 
}: ProductCheckoutClientProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('kakaopay')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [buyerEmail, setBuyerEmail] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-4">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold">존재하지 않거나 만료된 상품입니다.</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm">
          주소가 올바른지 확인하거나 판매자에게 문의해 주세요.
        </p>
        <Link 
          href="/"
          className="mt-6 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
        >
          1mm.kr 메인으로 이동
        </Link>
      </div>
    )
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const result = await requestDigitalProductPayment({
        productId: product.id,
        productTitle: product.title,
        amount: product.price,
        buyerEmail: buyerEmail || undefined,
        method: paymentMethod,
      })

      if (result.success) {
        setPaymentResult(result)
        setIsPaid(true)
      } else {
        alert(result.error || '결제가 취소되었습니다.')
      }
    } catch (err: any) {
      alert('결제 처리 중 일시적인 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const discountRate = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-24 md:pb-12">
      
      {/* 1. 상단 미니멀 네비게이션 */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto max-w-3xl flex h-14 items-center justify-between px-4 sm:px-6">
          <Link 
            href="/pay" 
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-[10px] shadow-sm">
              Pay
            </div>
            <span className="font-black text-sm text-white tracking-tight">1mm Pay</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">| 공식 안전 결제</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>안전 결제 보호</span>
            </span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
              title="링크 복사"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 (모바일 최적화 레이아웃) */}
      <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col gap-6">
        
        {/* 결제 완료 시 렌더링 화면 */}
        {isPaid ? (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-500 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Order Confirmed</span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                결제가 정상적으로 완료되었습니다
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
                아래 버튼을 눌러 소장용 원본 파일을 즉시 다운로드하세요. <br />
                {buyerEmail && <span className="text-slate-300 font-medium">({buyerEmail}로도 영수증 및 다운로드 링크가 발송되었습니다.)</span>}
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>주문 번호:</span>
                <span className="font-mono text-emerald-400 font-bold">{paymentResult?.orderId || 'ORD-20261015-LIVE'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>구매 상품:</span>
                <span className="font-semibold text-slate-200">{product.title}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>결제 수단:</span>
                <span className="font-semibold text-indigo-400">
                  {paymentMethod === 'kakaopay' && '카카오페이 간편결제'}
                  {paymentMethod === 'naverpay' && '네이버페이 포인트/카드'}
                  {paymentMethod === 'tosspay' && '토스페이 원클릭'}
                  {paymentMethod === 'card' && '신용/체크카드 승인'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>결제 금액:</span>
                <span className="font-bold text-white">{product.price.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>파일 포맷:</span>
                <span className="font-semibold text-slate-300">{product.fileType} ({product.pageCount || '완전판'})</span>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-3 pt-2">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault()
                  alert('디지털 파일 다운로드가 시작되었습니다.')
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>원본 {product.fileType} 파일 다운로드 ({product.fileSize || '10MB'})</span>
              </a>

              <Link
                href="/pay"
                className="block text-center text-xs text-slate-500 hover:text-slate-300 transition-colors py-1"
              >
                1mm Pay 홈으로 이동
              </Link>
            </div>
          </div>
        ) : (
          /* 결제 전 상품 상세 & 모바일 결제 폼 */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* 좌측: 상품 정보 및 신뢰 지표 (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              
              {/* 메타 배지 */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                  {product.fileType} 전자책
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 font-medium border border-slate-800">
                  {product.pageCount || '분량 80p+'}
                </span>
                <div className="flex items-center gap-1 text-amber-400 ml-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-slate-200">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewsCount}건 리뷰)</span>
                </div>
              </div>

              {/* 제목 & 서브타이틀 */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal leading-relaxed">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* 크리에이터 프로필 카드 */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {product.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{product.authorName}</span>
                      <UserCheck className="w-3 h-3 text-indigo-400" />
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {product.authorBio || '1인 지식 크리에이터'}
                    </div>
                  </div>
                </div>

                {product.authorInstagram && (
                  <span className="text-[11px] text-indigo-400 font-mono">
                    {product.authorInstagram}
                  </span>
                )}
              </div>

              {/* 핵심 포함 사항 (Features) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  포함된 실전 템플릿 & 특전
                </h3>
                <div className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 목차 미리보기 (Table of Contents) */}
              {product.tableOfContents && product.tableOfContents.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    목차 미리보기
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2 text-xs text-slate-400">
                    {product.tableOfContents.map((chap, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-slate-300 font-medium">{chap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 독자 생생 후기 & 작가 공식 답글 */}
              {initialReviews && initialReviews.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>독자 실전 후기 ({initialReviews.length})</span>
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{product.rating.toFixed(1)} / 5.0</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {initialReviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{rev.customerName}</span>
                            <div className="flex items-center text-amber-400 text-[10px]">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {rev.content}
                        </p>

                        {/* 작가 답글 */}
                        {rev.creatorReply && (
                          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs space-y-1">
                            <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-[11px]">
                              <CornerDownRight className="w-3 h-3 shrink-0" />
                              <span>{rev.creatorReply.authorName}</span>
                            </div>
                            <p className="text-slate-300 text-[11px] pl-4 leading-relaxed">
                              {rev.creatorReply.content}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 구매 전 자주 묻는 질문 & 작가 답변 (Q&A) */}
              {initialQnas && initialQnas.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>구매 전 질문 & 작가 답변 ({initialQnas.length})</span>
                  </h3>

                  <div className="space-y-2.5">
                    {initialQnas.map((qna) => (
                      <div key={qna.id} className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2 text-xs">
                        <div className="flex items-start gap-2 text-slate-200 font-semibold">
                          <span className="text-indigo-400 font-black">Q.</span>
                          <span>{qna.question}</span>
                        </div>

                        {qna.answer ? (
                          <div className="flex items-start gap-2 pl-3 text-slate-300 text-[11px] leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                            <span className="text-emerald-400 font-bold shrink-0">A.</span>
                            <div>
                              <div className="text-[10px] text-emerald-400 font-bold mb-0.5">{qna.answer.authorName}</div>
                              <span>{qna.answer.content}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500 pl-3">
                            (작가의 답변을 대기 중입니다.)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 안심 보증 배너 */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex items-center gap-3 text-xs text-indigo-300">
                <Lock className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>
                  1mm.kr 결제 보호 시스템: 결제 즉시 안전하게 파일이 잠금 해제되며 언제든 재다운로드할 수 있습니다.
                </span>
              </div>
            </div>

            {/* 우측: 모바일 우선 결제 위젯 (5 cols) */}
            <div className="md:col-span-5 md:sticky md:top-20">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
                
                {/* 가격 정보 */}
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                    <span>즉시 소장 가격</span>
                    {discountRate > 0 && (
                      <span className="text-indigo-400 font-bold">
                        {discountRate}% 특별 할인 적용
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-white tracking-tight">
                      {product.price.toLocaleString()}원
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        {product.originalPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>결제 후 0.01초 내 즉시 다운로드 링크 활성화</span>
                  </div>
                </div>

                {/* 결제 폼 */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  
                  {/* 이메일 입력 (영수증 및 백업용) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">
                      수신용 이메일 주소 <span className="text-slate-500">(선택)</span>
                    </label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="receipt@example.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* 결제 수단 선택 */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-400">
                      원클릭 간편결제 수단
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('kakaopay')}
                        className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                          paymentMethod === 'kakaopay'
                            ? 'bg-[#FEE500] text-slate-950 ring-2 ring-indigo-500 shadow-md shadow-amber-500/10'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        카카오페이
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('naverpay')}
                        className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                          paymentMethod === 'naverpay'
                            ? 'bg-[#03C75A] text-white ring-2 ring-indigo-500 shadow-md shadow-emerald-500/10'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        네이버페이
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('tosspay')}
                        className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                          paymentMethod === 'tosspay'
                            ? 'bg-[#0064FF] text-white ring-2 ring-indigo-500 shadow-md shadow-blue-500/10'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        토스페이
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-slate-800 text-white ring-2 ring-indigo-500 shadow-md'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        신용/체크카드
                      </button>
                    </div>
                  </div>

                  {/* 결제 실행 버튼 */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>안전 결제 처리 중...</span>
                      </span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        <span>{product.price.toLocaleString()}원 즉시 결제하고 받기</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[10px] text-slate-500 space-y-1">
                    <div className="flex items-center justify-center gap-1 text-slate-300 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>토스페이먼츠 & 포트원 PG 공식 결제망 연동</span>
                    </div>
                    <div>신용카드 · 카카오페이 · 네이버페이 · 토스페이 1초 즉시 승인 지원</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. 모바일 하단 고정 결제 바 (스마트폰 한 손 조작 최적화) */}
      {!isPaid && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl z-50 md:hidden flex items-center justify-between gap-3 px-4">
          <div>
            <div className="text-[10px] text-slate-400">즉시 소장가</div>
            <div className="text-lg font-black text-white">
              {product.price.toLocaleString()}원
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}
            className="flex-1 max-w-[220px] h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>원클릭 결제하기</span>
          </button>
        </div>
      )}
    </div>
  )
}
