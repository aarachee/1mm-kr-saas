import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SidebarNav } from "@/components/SidebarNav"

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
            <span className="text-primary">1mm</span>.kr
          </Link>
        </div>
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-6">
          <h2 className="font-semibold text-lg">대시보드</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium hidden sm:inline-block">
              {user.email}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
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
