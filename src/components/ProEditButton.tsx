'use client'

import { Button } from "@/components/ui/button"
import { updateShortCode } from "@/app/actions"
import { useState } from "react"

export function ProEditButton({ linkId, currentCode }: { linkId: number, currentCode: string }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    // 현재는 결제 모듈이 없으므로, PRO 회원이라고 가정하고 바로 변경 프롬프트를 띄웁니다.
    const newCode = window.prompt("새로운 커스텀 주소를 입력하세요 (영문, 숫자, -, _):", currentCode)
    
    // 사용자가 취소했거나 값을 변경하지 않은 경우 무시
    if (newCode === null || newCode === currentCode) return 
    
    setLoading(true)
    try {
      const result = await updateShortCode(linkId, newCode)
      if (result.error) {
        alert(result.error) // 실패 시 에러 알림
      } else {
        // 성공 시 Next.js의 revalidatePath가 호출되어 화면이 자동으로 새로고침됨
      }
    } catch (err) {
      alert("오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleClick} 
      disabled={loading}
      className="text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
    >
      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
      {loading ? "변경 중..." : "커스텀"}
      <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">PRO</span>
    </Button>
  )
}
