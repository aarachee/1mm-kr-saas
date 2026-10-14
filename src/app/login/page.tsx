'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  BarChart3, MessageSquare, ShieldCheck, 
  Sparkles, Check, ArrowRight, BookOpen, 
  HelpCircle, Lock, Zap, FileSpreadsheet 
} from 'lucide-react'

function LoginFormContent() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'
  const errorParam = searchParams.get('error')

  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const redirectUri = `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
        },
      })
    } catch (err) {
      console.error('Google login error:', err)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* 배경 앰비언트 글로우 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* 상단 미니멀 네비게이션 */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md z-10">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 max-w-5xl">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-indigo-500/20">
              1mm
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-sm tracking-tight text-white leading-none">
                1미리
              </span>
              <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                1mm.kr
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <Link href="/pay" className="text-slate-400 hover:text-white transition-colors">
              1mm Pay 알아보기
            </Link>
            <Link href="/" className="text-slate-400 hover:text-white transition-colors hidden sm:inline">
              단축링크 도구
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 로그인 박스 & 가치 제안 영역 */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-12 relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* 좌측: 로그인 혜택 및 개인 공간 설명 (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>크리에이터 전용 프라이빗 워크스페이스</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              Google 계정 하나로 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-pink-300">
                나만의 판매 통계와 독자 소통
              </span>을 시작하세요
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              복잡한 회원가입이나 비밀번호 없이 안전한 Google 인증으로 즉시 내 영역에 접근할 수 있습니다.
            </p>

            {/* 4대 로그인 전용 혜택 리스트 */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">실시간 방문자 & 클릭 통계 분석</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">인앱 브라우저 탈출율, 유입 경로, 밤 10시 골든타임 정밀 추적</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">독자 구매 후기 관리 & 작가 공식 답글</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">내 전자책을 읽은 독자들의 감사 후기를 확인하고 작가 답글 작성</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">구매 전/후 실시간 Q&A 답변</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">독자들의 질문에 실시간 답변하여 완판 신뢰도 및 구매 전환율 극대화</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">고객 연락처 DB 엑셀 영구 소장</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">이메일과 휴대폰 번호가 내 컴퓨터에 차곡차곡 안전하게 암호화 보관</div>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: Google 로그인 카드 (5 cols) */}
          <div className="md:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="text-center pb-6 border-b border-slate-800/80">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg mx-auto shadow-lg shadow-indigo-500/25 mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white">회원 전용 로그인</h2>
                <p className="text-xs text-slate-400 mt-1">
                  1초 만에 Google 계정으로 안전하게 인증됩니다.
                </p>
              </div>

              {errorParam && (
                <div className="my-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                  로그인 인증에 실패했습니다. 다시 시도해 주세요.
                </div>
              )}

              <div className="pt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-13 py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Google 계정으로 계속하기</span>
                    </>
                  )}
                </button>

                <div className="space-y-2 pt-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google OAuth 2.0 보안 프로토콜 적용</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다. <br />
                    비밀번호는 일체 저장되지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="border-t border-slate-900 py-6 px-4 sm:px-6 text-xs text-slate-500 text-center">
        <p>© 2026 1mm.kr • 모바일 인앱 탈출 딥링크 & D2C 크리에이터 커머스</p>
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        로딩 중...
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  )
}
