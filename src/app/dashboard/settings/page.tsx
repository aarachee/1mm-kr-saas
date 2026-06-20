'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // hydration error 방지
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold">환경 설정</h1>
        <p className="text-slate-500 text-sm mt-1">대시보드 테마와 기본 환경을 설정하세요.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>테마 색상 변경</CardTitle>
          <CardDescription>
            내 비즈니스 브랜드와 가장 잘 어울리는 색상 팔레트를 선택하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => setTheme('trust')}
            className={`flex flex-col items-start p-4 border rounded-xl text-left transition-all ${theme === 'trust' ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'hover:border-slate-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 mb-3 shadow-sm"></div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Trust Blue</div>
            <div className="text-xs text-slate-500 mt-1">신뢰감 높은 기본 테마</div>
          </button>

          <button 
            onClick={() => setTheme('modern')}
            className={`flex flex-col items-start p-4 border rounded-xl text-left transition-all ${theme === 'modern' ? 'border-slate-900 ring-1 ring-slate-900 bg-slate-50 dark:border-white dark:ring-white dark:bg-slate-800' : 'hover:border-slate-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white mb-3 shadow-sm border"></div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Modern Black</div>
            <div className="text-xs text-slate-500 mt-1">모던하고 미니멀한 테마</div>
          </button>

          <button 
            onClick={() => setTheme('creative')}
            className={`flex flex-col items-start p-4 border rounded-xl text-left transition-all ${theme === 'creative' ? 'border-purple-600 ring-1 ring-purple-600 bg-purple-50/50 dark:bg-purple-900/20' : 'hover:border-slate-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 mb-3 shadow-sm"></div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Creative Purple</div>
            <div className="text-xs text-slate-500 mt-1">창의적이고 세련된 테마</div>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
