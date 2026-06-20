'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CopyButton({ shortCode }: { shortCode: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // 현재 접속 중인 도메인(localhost 또는 실서버 도메인)을 자동으로 가져와서 단축 코드를 붙입니다.
      const fullUrl = `${window.location.origin}/${shortCode}`
      await navigator.clipboard.writeText(fullUrl)
      
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2초 뒤 원래 상태로 복구
    } catch (err) {
      console.error('Failed to copy', err)
      alert('복사에 실패했습니다. 브라우저 설정을 확인해주세요.')
    }
  }

  return (
    <Button 
      variant={copied ? "default" : "outline"} 
      size="sm" 
      onClick={handleCopy}
      className={`w-20 transition-all ${copied ? 'bg-green-600 hover:bg-green-700 text-white border-transparent' : ''}`}
    >
      {copied ? "✓ 복사됨" : "복사"}
    </Button>
  )
}
