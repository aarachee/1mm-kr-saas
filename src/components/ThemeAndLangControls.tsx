'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Laptop } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface ThemeAndLangControlsProps {
  currentLocale: Locale
  onLocaleChange: (loc: Locale) => void
}

export function ThemeAndLangControls({
  currentLocale,
  onLocaleChange,
}: ThemeAndLangControlsProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center gap-2">
      
      {/* 1. 언어 토글 (KO | EN) - 엄격한 분리 */}
      <div className="flex items-center rounded-lg bg-[#F2F4F7] dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] p-0.5 text-xs font-mono">
        <button
          type="button"
          onClick={() => onLocaleChange('ko')}
          className={`px-2 py-1 rounded-md transition-all ${
            currentLocale === 'ko'
              ? 'bg-white dark:bg-[#21262D] text-[#F04438] font-bold shadow-xs'
              : 'text-[#667085] dark:text-[#98A2B3] hover:text-[#101828] dark:hover:text-white'
          }`}
          title="한국어"
        >
          KO
        </button>
        <button
          type="button"
          onClick={() => onLocaleChange('en')}
          className={`px-2 py-1 rounded-md transition-all ${
            currentLocale === 'en'
              ? 'bg-white dark:bg-[#21262D] text-[#F04438] font-bold shadow-xs'
              : 'text-[#667085] dark:text-[#98A2B3] hover:text-[#101828] dark:hover:text-white'
          }`}
          title="English"
        >
          EN
        </button>
      </div>

      {/* 2. 테마 토글 (라이트 / 다크 / 시스템) */}
      {mounted && (
        <div className="flex items-center rounded-lg bg-[#F2F4F7] dark:bg-[#161B22] border border-[#E4E7EC] dark:border-[#30363D] p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-md transition-all ${
              theme === 'light'
                ? 'bg-white text-[#F04438] shadow-xs'
                : 'text-[#667085] dark:text-[#98A2B3] hover:text-[#101828] dark:hover:text-white'
            }`}
            title={currentLocale === 'ko' ? '라이트 모드' : 'Light mode'}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-md transition-all ${
              theme === 'dark'
                ? 'bg-[#21262D] text-[#F04438] shadow-xs'
                : 'text-[#667085] dark:text-[#98A2B3] hover:text-[#101828] dark:hover:text-white'
            }`}
            title={currentLocale === 'ko' ? '다크 모드' : 'Dark mode'}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setTheme('system')}
            className={`p-1.5 rounded-md transition-all ${
              theme === 'system'
                ? 'bg-white dark:bg-[#21262D] text-[#F04438] shadow-xs'
                : 'text-[#667085] dark:text-[#98A2B3] hover:text-[#101828] dark:hover:text-white'
            }`}
            title={currentLocale === 'ko' ? '시스템 테마 연동' : 'System theme'}
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  )
}

