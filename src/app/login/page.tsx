'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  BarChart3, MessageSquare, ShieldCheck, 
  HelpCircle, Lock, FileSpreadsheet, ArrowRight
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
    <div className="min-h-screen flex flex-col justify-between bg-[#090A0C] text-[#EAECF0] selection:bg-[#F04438] selection:text-white relative overflow-hidden">
      
      {/* 정제된 코발트 레드 앰비언트 글로우 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C01025]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* 상단 미니멀 네비게이션 */}
      <header className="w-full border-b border-[#21262D] bg-[#090A0C]/80 backdrop-blur-md z-10">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 max-w-5xl">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[#C01025] flex items-center justify-center text-white font-bold text-xs shadow-md">
              1mm
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm tracking-tight text-white leading-none">
                1미리
              </span>
              <span className="text-[9px] font-mono text-[#667085] tracking-wider">
                1mm.kr
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs font-mono">
            <Link href="/" className="text-[#98A2B3] hover:text-white transition-colors">
              HOME ➔
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 로그인 박스 & 가치 제안 영역 */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-12 relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* 좌측: 로그인 혜택 설명 (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161B22] border border-[#30363D] text-[#F04438] text-xs font-mono font-semibold">
              <span>MEMBER WORKSPACE</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              Google 계정으로 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAECF0] to-[#F04438]">
                실시간 분석 및 슬롯 관리
              </span>를 시작하세요
            </h1>

            <p className="text-xs sm:text-sm text-[#98A2B3] leading-relaxed font-normal">
              복잡한 회원가입 절차 없이 안전한 Google OAuth 인증을 통해 내 단축 주소와 개별 페이지를 관리할 수 있습니다.
            </p>

            {/* 4대 로그인 전용 혜택 리스트 */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#21262D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">실시간 유입 채널 & 기기별 상세 통계</div>
                  <div className="text-[11px] text-[#98A2B3] mt-0.5">인앱 브라우저 탈출율, 유입 레퍼러(인스타, 카톡 등) 실시간 확인</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#21262D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">단축 링크 목적지(URL) 실시간 수정</div>
                  <div className="text-[11px] text-[#98A2B3] mt-0.5">프로필 링크를 변경하지 않고도 대시보드에서 도착지 주소 즉시 갱신</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#21262D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">개별 전시 미니샵 & 전자책 결제 연동</div>
                  <div className="text-[11px] text-[#98A2B3] mt-0.5">프로필 꾸미기, 꿀템 번호판, 1mm Pay 원클릭 결제창 통합 제어</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#21262D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438] shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">얼리버드 3개 무료 슬롯 영구 보관</div>
                  <div className="text-[11px] text-[#98A2B3] mt-0.5">나만의 한글/브랜드 단축어와 3자리 희귀 슬러그를 안전하게 보관</div>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: Google 로그인 카드 (5 cols) */}
          <div className="md:col-span-5">
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 shadow-xl relative">
              <div className="text-center pb-6 border-b border-[#21262D]">
                <div className="w-12 h-12 rounded-xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#F04438] mx-auto shadow-md mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white">회원 로그인</h2>
                <p className="text-xs text-[#98A2B3] mt-1 font-mono">
                  Google 계정으로 안전하게 인증됩니다.
                </p>
              </div>

              {errorParam && (
                <div className="my-4 p-3 rounded-xl bg-[#C01025]/10 border border-[#C01025]/30 text-[#F04438] text-xs text-center font-medium font-mono leading-relaxed">
                  {errorParam === 'too_many_requests' ? (
                    <span>[NOTICE] 단시간 내 연속 로그인이 감지되었습니다. 잠시 후 다시 시도해 주세요.</span>
                  ) : (
                    <span>[ERROR] 로그인 인증에 실패했습니다. 다시 시도해 주세요.</span>
                  )}
                </div>
              )}

              <div className="pt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-12 py-3 px-4 rounded-xl bg-white hover:bg-[#EAECF0] text-[#090A0C] font-bold text-xs shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-[#090A0C] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#667085] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F04438]" />
                    <span>GOOGLE OAUTH 2.0 ENCRYPTED</span>
                  </div>
                  <p className="text-[10px] text-[#667085] leading-relaxed">
                    로그인 시 1mm.kr의 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="border-t border-[#21262D] py-6 px-4 text-center text-xs text-[#667085] font-mono">
        <span>© 1mm.kr • ULTRA SHORT LINK INFRASTRUCTURE</span>
      </footer>

    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090A0C] flex items-center justify-center text-xs text-[#98A2B3] font-mono">
        LOADING WORKSPACE...
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  )
}
