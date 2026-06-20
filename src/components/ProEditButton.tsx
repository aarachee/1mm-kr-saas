'use client'

import { Button } from "@/components/ui/button"

export function ProEditButton() {
  const handleClick = () => {
    alert("🚀 커스텀 단축 주소 기능은 Pro 요금제 전용입니다.\n(추후 결제 시스템 연동 예정)")
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleClick} 
      className="text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
    >
      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
      커스텀
      <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">PRO</span>
    </Button>
  )
}
