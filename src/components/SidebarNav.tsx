'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { 
  LayoutDashboard, 
  Link2, 
  KeyRound, 
  BarChart3, 
  Wrench, 
  Settings 
} from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { name: '대시보드 홈', href: '/dashboard', exact: true, icon: LayoutDashboard },
    { name: '단축 링크 관리', href: '/dashboard/links', icon: Link2 },
    { name: 'API 키 & 플랜', href: '/dashboard/api-keys', icon: KeyRound, badge: 'B2B' },
    { name: '클릭 통계 및 분석', href: '/dashboard/analytics', icon: BarChart3 },
    { name: '스마트 도구함', href: '/#toolkit', icon: Wrench },
    { name: '환경 설정', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <nav className="flex-1 px-4 py-6 space-y-1.5">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname.startsWith(item.href)

        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive 
                ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4 opacity-80" />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded font-black">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
