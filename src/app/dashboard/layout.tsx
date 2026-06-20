import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  // 로그인하지 않은 사용자는 로그인 페이지로 강제 튕겨냄
  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-slate-900 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b font-bold text-xl tracking-tight">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-blue-600">1mm</span>.kr
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-3 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 rounded-md font-medium">
            대시보드 홈
          </Link>
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-md font-medium transition-colors">
            링크 관리
          </Link>
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-md font-medium transition-colors">
            통계 및 분석
          </Link>
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-md font-medium transition-colors">
            설정
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-6">
          <h2 className="font-semibold text-lg">대시보드</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium hidden sm:inline-block">
              {user.email}
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <form action={async () => {
              'use server'
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect('/login')
            }}>
              <button type="submit" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors ml-2">
                로그아웃
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
