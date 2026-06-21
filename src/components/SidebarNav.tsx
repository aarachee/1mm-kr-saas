'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { name: '대시보드 홈', href: '/dashboard', exact: true },
    { name: '링크 관리', href: '/dashboard/links' },
    { name: '통계 및 분석', href: '/dashboard/analytics' },
    { name: '환경 설정', href: '/dashboard/settings' },
  ]

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {navItems.map((item) => {
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname.startsWith(item.href)

        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex items-center px-4 py-3 rounded-md font-medium transition-colors ${
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
