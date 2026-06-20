'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createShortLink } from "@/app/actions"
import { useState } from "react"

export function LinkCreateForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    setLoading(true)
    try {
      const result = await createShortLink(formData)
      if (result && result.error) {
        setError(result.error) // 서버에서 보낸 에러 메시지 출력
      } else {
        // 성공 시 입력 폼 초기화
        const form = document.getElementById("link-create-form") as HTMLFormElement
        form.reset()
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="link-create-form" action={handleSubmit} className="flex flex-col w-full gap-3">
      <div className="flex flex-col sm:flex-row w-full gap-2">
        <Input name="longUrl" type="url" required placeholder="원본 주소 (https://...)" className="w-full sm:flex-1" />
        <Input name="customCode" type="text" placeholder="커스텀 주소 (예: mentor)" className="w-full sm:w-48 border-blue-200 focus-visible:ring-blue-500" />
        <Input name="pixelId" type="text" placeholder="FB 픽셀 ID" className="w-full sm:w-32" />
        <Button type="submit" disabled={loading} className="whitespace-nowrap">
          {loading ? "생성 중..." : "단축 생성"}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm font-medium px-1">{error}</p>}
    </form>
  )
}
