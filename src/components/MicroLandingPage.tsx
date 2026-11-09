'use client'

import React, { useState } from 'react'
import { ShortLinkRecord } from '@/lib/linkStorage'
import { 
  Sparkles, ExternalLink, ShieldCheck, Share2, 
  ShoppingBag, Check, Zap, Copy, Heart, BookOpen,
  ArrowRight, Search
} from 'lucide-react'
import Link from 'next/link'

interface MicroLandingPageProps {
  link: ShortLinkRecord
}

export function MicroLandingPage({ link }: MicroLandingPageProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(link.likes_count || 12)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)

  const title = link.profile_title || link.creator_name || link.store_name || `1mm.kr/${link.short_code}`
  const bio = link.profile_bio || link.creator_desc || link.store_desc || '1mm 개별 전시 및 판매 페이지입니다.'
  
  // 기본 데모 버튼이 없는 경우 기본값 제공
  const buttons = link.buttons && link.buttons.length > 0 ? link.buttons : [
    { label: '공식 웹사이트 바로가기', url: link.long_url, platform: 'custom' as const, badge: '공식' }
  ]

  // 쇼츠/릴스 꿀템 상품 목록
  const products = link.products || []
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.itemNumber.toString().includes(searchQuery)
  )

  // 판매용 디지털 상품 (전자책 / 템플릿)
  const digitalProduct = link.digital_product || {
    title: '크리에이터 시크릿 가이드북 (PDF)',
    price: 19900,
    original_price: 39000,
    description: '단 1mm의 마찰도 없이 매출 3배 높이는 모바일 전환 공식 노하우',
    file_type: 'PDF'
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLike = () => {
    if (!liked) {
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center px-4 py-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* 은은한 배경 앰비언트 글로우 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* 모바일 컨테이너 (최대 480px) */}
      <main className="w-full max-w-[480px] mx-auto space-y-6 relative z-10">
        
        {/* 1. 상단 유틸리티 바: 인증 뱃지 & 공유/좋아요 */}
        <div className="flex items-center justify-between px-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-indigo-300 backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>1mm 공식 인증 프로필</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full border transition-all active:scale-95 flex items-center gap-1 text-xs ${
                liked 
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400' 
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current text-rose-400' : ''}`} />
              <span className="text-[10px] font-bold">{likeCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-all active:scale-95 relative"
              title="링크 복사"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 2. [꾸미기] 크리에이터 프로필 카드 */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 text-center space-y-4 backdrop-blur-xl shadow-xl">
          {/* 아바타 / 로고 */}
          <div className="relative mx-auto w-20 h-20">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-black text-2xl">
                {title.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-500 text-white rounded-full shadow-md">
              <Zap className="w-3 h-3 fill-current" />
            </div>
          </div>

          {/* 닉네임 & 소개 */}
          <div className="space-y-1.5">
            <h1 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>{title}</span>
            </h1>
            <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-xs mx-auto">
              {bio}
            </p>
          </div>

          {/* SNS 퀵 아이콘 바 */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a 
              href={link.long_url} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button 
              onClick={handleShare}
              className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all active:scale-95"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 3. [판매] 크리에이터 전용 디지털 상품 / 전자책 카드 (1mm Pay) */}
        {digitalProduct && (
          <section className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/60 border border-indigo-500/30 rounded-3xl p-5 space-y-4 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-[10px] font-bold text-purple-300">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span>원클릭 다운로드 상품</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                50% 한정 특가
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center text-white shrink-0 shadow-md">
                <BookOpen className="w-6 h-6" />
                <span className="text-[8px] font-black mt-0.5">PDF</span>
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-black text-white leading-snug">
                  {digitalProduct.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {digitalProduct.description}
                </p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-black text-white">
                    {digitalProduct.price.toLocaleString()}원
                  </span>
                  {digitalProduct.original_price && (
                    <span className="text-xs text-slate-500 line-through">
                      {digitalProduct.original_price.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Link
              href={`/p/${link.short_code}`}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>1초 카카오페이 / 토스 구매하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* 4. [전시] 멀티 링크 버튼 목록 */}
        <section className="space-y-2.5">
          <h2 className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1.5 uppercase tracking-wider">
            <span>주요 링크 바로가기</span>
          </h2>

          <div className="space-y-2">
            {buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                target="_blank"
                rel="noreferrer"
                className="w-full p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/40 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-between transition-all shadow-md group active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <span>{btn.label}</span>
                </div>

                {btn.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {btn.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* 5. [전시] 크리에이터 꿀템 번호판 (쇼츠/릴스 추천 제품) */}
        {products.length > 0 && (
          <section className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span>📦 영상 속 꿀템 번호판</span>
              </h2>
              <span className="text-[10px] text-indigo-400 font-semibold">
                총 {products.length}개 상품
              </span>
            </div>

            {/* 번호 검색창 */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="꿀템 번호(예: 1) 또는 상품명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* 번호판 카드 그리드 */}
            <div className="space-y-2">
              {filteredProducts.map((prod) => (
                <a
                  key={prod.id}
                  href={prod.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-800/70 border border-slate-800/80 hover:border-purple-500/40 flex items-center justify-between gap-3 transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    {/* 번호 뱃지 */}
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                      #{prod.itemNumber}
                    </div>

                    <div className="text-left">
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                        {prod.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {prod.price && (
                          <span className="text-[11px] font-bold text-slate-300">
                            {prod.price}
                          </span>
                        )}
                        {prod.badge && (
                          <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            {prod.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 6. 하단 바이럴 배너: 1mm.kr 무료 생성 유도 */}
        <footer className="pt-6 pb-10 text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 text-slate-400 hover:text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <div className="w-4 h-4 rounded-md bg-indigo-500 flex items-center justify-center text-white text-[9px] font-black">
              1
            </div>
            <span>나도 10글자 무료 단축링크 & 전시 미니샵 만들기</span>
            <ArrowRight className="w-3 h-3 text-indigo-400" />
          </Link>

          <p className="text-[10px] text-slate-600">
            Powered by 1mm.kr • 초단축 딥링크 & 모바일 전환 엔진
          </p>
        </footer>

      </main>
    </div>
  )
}
