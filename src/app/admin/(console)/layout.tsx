import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { 
  ADMIN_COOKIE_NAME, 
  getExpectedAdminToken 
} from '@/lib/adminAuth'
import { getAdminData } from '@/lib/adminStorage'
import { 
  ShieldCheck, LayoutDashboard, DollarSign, 
  CreditCard, ExternalLink, LogOut, CheckCircle2, 
  Layers, Users, Sparkles 
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  // 관리자 인증 토큰 검증
  const expectedToken = getExpectedAdminToken()
  const isAuthenticated = token === expectedToken

  // 비로그인 상태일 때 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  // 실시간 정산 대기 건수 확인
  const adminData = getAdminData()
  const pendingCount = adminData.settlements.filter(s => s.status === 'PENDING').length

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      
      {/* 1. 관리자 좌측 사이드바 */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 hidden md:flex flex-col justify-between">
        <div>
          {/* 사이드바 상단 로고 */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                Admin
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-sm tracking-tight text-white leading-none">
                  1미리 백오피스
                </span>
                <span className="text-[9px] font-mono text-rose-400 font-bold mt-0.5">
                  SUPER ADMIN
                </span>
              </div>
            </Link>
          </div>

          {/* 사이드바 네비게이션 메뉴 */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-rose-400" />
              <span>플랫폼 요약 현황</span>
            </Link>

            <Link
              href="/admin/settlements"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>크리에이터 정산 관리</span>
              </div>
              {pendingCount > 0 ? (
                <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.2 rounded font-bold">
                  {pendingCount}건
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                  0건
                </span>
              )}
            </Link>

            <Link
              href="/admin/transactions"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-indigo-400" />
              <span>전체 PG 결제 거래 내역</span>
            </Link>
          </nav>
        </div>

        {/* 사이드바 하단 외부 링크 및 상태 */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>시스템 정상 운영 중</span>
            </div>
            <div>PG사(포트원/토스) 승인 연동 완료</div>
          </div>

          <div className="space-y-1 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <span>1mm.kr 서비스 열기</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>
            <Link
              href="/pay"
              target="_blank"
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <span>1미리페이 열기</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 상단 글로벌 헤더 */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* 모바일 퀵 네비 */}
            <div className="flex items-center gap-1.5 md:hidden">
              <Link href="/admin" className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <LayoutDashboard className="w-4 h-4 text-rose-400" />
              </Link>
              <Link href="/admin/settlements" className="p-1.5 rounded-lg bg-slate-800 text-slate-300 relative">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </Link>
              <Link href="/admin/transactions" className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <CreditCard className="w-4 h-4 text-indigo-400" />
              </Link>
            </div>

            <h2 className="font-bold text-sm text-white hidden sm:block">
              1미리 플랫폼 총괄 백오피스
            </h2>
            <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold">
              Production Admin
            </span>
          </div>

          {/* 우측 로그아웃 */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              master@1mm.kr
            </span>

            <form action={async () => {
              'use server'
              const cookieStore = await cookies()
              cookieStore.delete(ADMIN_COOKIE_NAME)
              redirect('/admin/login')
            }}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </form>
          </div>
        </header>

        {/* 실제 페이지 내용 */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  )
}
