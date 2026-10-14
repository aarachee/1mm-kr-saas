'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Lock, ArrowRight, Sparkles, KeyRound } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/v1/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || '관리자 비밀번호가 일치하지 않습니다.')
      }
    } catch (err) {
      setError('서버 연결 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 개발 및 테스트용 원클릭 패스코드 입력
  const handleQuickFill = () => {
    setPassword('admin1mm2026!')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white relative overflow-hidden">
      
      {/* 앰비언트 글로우 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-rose-600/15 via-purple-600/15 to-indigo-600/15 blur-[130px] rounded-full pointer-events-none" />

      {/* 상단 미니 헤더 */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <span>&larr; 1mm.kr 메인으로 돌아가기</span>
        </Link>
      </header>

      {/* 중앙 로그인 카드 */}
      <main className="container mx-auto max-w-md px-4 relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center pb-6 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-rose-500/20 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full mb-1">
              <span>Super Administrator Only</span>
            </div>
            <h1 className="text-xl font-black text-white mt-1">1미리 관리자 백오피스</h1>
            <p className="text-xs text-slate-400 mt-1">
              플랫폼 전체 매출 통계, 크리에이터 정산 승인, 결제 로그 관리
            </p>
          </div>

          <form onSubmit={handleLogin} className="pt-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>마스터 패스코드 (Master Key)</span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[10px] text-indigo-400 hover:underline"
                >
                  기본키 자동입력
                </button>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="관리자 보안 비밀번호 입력"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 pr-10"
                />
                <KeyRound className="w-4 h-4 text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>관리자 콘솔 접속하기</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            관리자 승인 권한이 없는 계정의 접속 시도는 보안 로그에 기록됩니다.
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="p-6 text-center text-[11px] text-slate-600">
        © 2026 1mm.kr Platform Super Admin Console
      </footer>
    </div>
  )
}
