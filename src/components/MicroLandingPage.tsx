'use client'

import React, { useState } from 'react'
import { ShortLinkRecord } from '@/lib/linkStorage'
import { 
  ExternalLink, ShieldCheck, Share2, 
  ShoppingBag, Check, Copy, Heart, BookOpen,
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

  const title = link.profile_title || link.creator_name || link.store_name || `1mm.kr/${link.short_code}`
  const bio = link.profile_bio || link.creator_desc || link.store_desc || '1mm 개별 전시 및 판매 페이지입니다.'
  
  // 기본 데모 버튼이 없는 경우 기본값 제공
  const buttons = link.buttons && link.buttons.length > 0 ? link.buttons : [
    { label: '공식 웹사이트 바로가기', url: link.long_url, platform: 'custom' as const, badge: 'OFFICIAL' }
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
    <div className="min-h-screen bg-[#090A0C] text-[#EAECF0] flex flex-col items-center px-4 py-8 selection:bg-[#F04438] selection:text-white relative overflow-hidden">
      
      {/* 정제된 코랄 레드 앰비언트 글로우 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C01025]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* 모바일 컨테이너 (최대 480px) */}
      <main className="w-full max-w-[480px] mx-auto space-y-6 relative z-10">
        
        {/* 1. 상단 유틸리티 바: 인증 뱃지 & 공유/좋아요 */}
        <div className="flex items-center justify-between px-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161B22] border border-[#21262D] text-[11px] font-mono text-[#98A2B3]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F04438]" />
            <span>VERIFIED PROFILE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full border transition-all active:scale-95 flex items-center gap-1 text-xs ${
                liked 
                  ? 'bg-[#C01025]/20 border-[#F04438]/40 text-[#F04438]' 
                  : 'bg-[#161B22] border-[#21262D] text-[#667085] hover:text-[#EAECF0]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current text-[#F04438]' : ''}`} />
              <span className="text-[10px] font-mono font-bold">{likeCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-[#161B22] border border-[#21262D] text-[#667085] hover:text-[#EAECF0] transition-colors active:scale-95 relative"
              title="링크 복사"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#F04438]" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 2. 크리에이터 프로필 카드 */}
        <section className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 text-center space-y-4 shadow-xl">
          {/* 아바타 / 로고 */}
          <div className="relative mx-auto w-18 h-18">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#B42318] to-[#F04438] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0D1117] rounded-[14px] flex items-center justify-center text-white font-black text-2xl font-mono">
                {title.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* 닉네임 & 소개 */}
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs text-[#98A2B3] font-normal leading-relaxed max-w-xs mx-auto">
              {bio}
            </p>
          </div>

          {/* SNS 퀵 아이콘 바 */}
          <div className="flex items-center justify-center gap-2.5 pt-1">
            <a 
              href={link.long_url} 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-[#EAECF0] text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>MAIN URL</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#98A2B3]" />
            </a>
            <button 
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-[#EAECF0] text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>SHARE</span>
              <Copy className="w-3.5 h-3.5 text-[#98A2B3]" />
            </button>
          </div>
        </section>

        {/* 3. 크리에이터 전용 디지털 상품 / 전자책 카드 (1mm Pay) */}
        {digitalProduct && (
          <section className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#21262D] border border-[#30363D] text-[10px] font-mono font-bold text-[#EAECF0]">
                <span>DIGITAL PRODUCT</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#F04438] bg-[#C01025]/10 px-2 py-0.5 rounded border border-[#C01025]/30">
                SPECIAL OFFER
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-14 rounded-xl bg-[#21262D] border border-[#30363D] flex flex-col items-center justify-center text-[#EAECF0] shrink-0">
                <BookOpen className="w-6 h-6 text-[#F04438]" />
                <span className="text-[8px] font-mono font-bold mt-0.5">PDF</span>
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-bold text-white leading-snug">
                  {digitalProduct.title}
                </h3>
                <p className="text-[11px] text-[#98A2B3] line-clamp-2">
                  {digitalProduct.description}
                </p>
                <div className="flex items-baseline gap-2 pt-1 font-mono">
                  <span className="text-base font-bold text-white">
                    {digitalProduct.price.toLocaleString()}원
                  </span>
                  {digitalProduct.original_price && (
                    <span className="text-xs text-[#667085] line-through">
                      {digitalProduct.original_price.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Link
              href={`/p/${link.short_code}`}
              className="w-full py-3 rounded-xl bg-[#F04438] hover:bg-[#D92D20] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>원클릭 안전 결제하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* 4. 멀티 링크 버튼 목록 */}
        <section className="space-y-2.5">
          <h2 className="text-xs font-mono font-bold text-[#667085] px-1 uppercase tracking-wider">
            FEATURED LINKS
          </h2>

          <div className="space-y-2">
            {buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                target="_blank"
                rel="noreferrer"
                className="w-full p-3.5 rounded-xl bg-[#161B22] hover:bg-[#21262D] border border-[#21262D] hover:border-[#30363D] text-[#EAECF0] hover:text-white font-semibold text-xs flex items-center justify-between transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#21262D] flex items-center justify-center text-[#98A2B3]">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span>{btn.label}</span>
                </div>

                {btn.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#21262D] text-[#98A2B3] border border-[#30363D]">
                    {btn.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* 5. 꿀템 번호판 (쇼츠/릴스 추천 제품) */}
        {products.length > 0 && (
          <section className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-1 font-mono">
              <h2 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                ITEM DIRECTORY
              </h2>
              <span className="text-[10px] text-[#98A2B3]">
                TOTAL {products.length}
              </span>
            </div>

            {/* 번호 검색창 */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
              <input
                type="text"
                placeholder="번호 또는 상품명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#161B22] border border-[#30363D] text-xs text-[#EAECF0] placeholder-[#667085] focus:outline-none focus:border-[#F04438] transition-colors"
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
                  className="p-3.5 rounded-xl bg-[#161B22] hover:bg-[#21262D] border border-[#21262D] hover:border-[#30363D] flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#EAECF0] font-mono font-bold text-xs shrink-0">
                      #{prod.itemNumber}
                    </div>

                    <div className="text-left">
                      <div className="text-xs font-semibold text-white line-clamp-1">
                        {prod.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 font-mono">
                        {prod.price && (
                          <span className="text-[11px] text-[#98A2B3]">
                            {prod.price}
                          </span>
                        )}
                        {prod.badge && (
                          <span className="text-[9px] text-[#F04438] bg-[#C01025]/10 px-1.5 py-0.2 rounded border border-[#C01025]/30">
                            {prod.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded bg-[#21262D] flex items-center justify-center text-[#667085] group-hover:text-white transition-colors shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 6. 하단 푸터 배너 */}
        <footer className="pt-6 pb-10 text-center space-y-3 font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#F04438]/50 text-[#98A2B3] hover:text-white text-xs font-semibold transition-colors"
          >
            <div className="w-3.5 h-3.5 rounded bg-[#C01025] flex items-center justify-center text-white text-[8px] font-black">
              1
            </div>
            <span>CREATE FREE 10-CHAR LINK ON 1MM.KR</span>
            <ArrowRight className="w-3 h-3 text-[#F04438]" />
          </Link>

          <p className="text-[10px] text-[#667085]">
            POWERED BY 1MM.KR • ULTRA SHORT LINK INFRASTRUCTURE
          </p>
        </footer>

      </main>
    </div>
  )
}
