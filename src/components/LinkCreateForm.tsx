'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createShortLink } from "@/app/actions"
import { useState } from "react"

export function LinkCreateForm() {
  const [error, setError] = useState<string | null>(null)
  const [createdUrl, setCreatedUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isABTest, setIsABTest] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    setCreatedUrl(null)
    setLoading(true)
    try {
      const result = await createShortLink(formData)
      if (result && result.error) {
        setError(result.error) // 서버에서 보낸 에러 메시지 출력
      } else if (result && result.success && result.shortCode) {
        // 성공 시 입력 폼 초기화 및 생성된 URL 표시
        const form = document.getElementById("link-create-form") as HTMLFormElement
        form.reset()
        setIsABTest(false)
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://1mm.kr'
        setCreatedUrl(`${origin}/${result.shortCode}`)
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!createdUrl) return
    navigator.clipboard.writeText(createdUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form id="link-create-form" action={handleSubmit} className="flex flex-col w-full gap-3">
      <div className="flex flex-col sm:flex-row w-full gap-2">
        <div className="flex flex-col w-full sm:flex-1 gap-2">
          <Input name="longUrl" type="url" required placeholder="원본 도착지 A (https://...)" className="w-full" />
          {isABTest && (
            <Input name="longUrlB" type="url" required placeholder="테스트 도착지 B (https://...)" className="w-full border-primary/50 bg-primary/5" autoFocus />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input name="pixelId" type="text" placeholder="FB 픽셀 ID (선택)" className="w-full sm:w-40" />
            <Button type="submit" disabled={loading} className="whitespace-nowrap h-10">
              {loading ? "생성 중..." : "단축 생성"}
            </Button>
          </div>
          <button 
            type="button"
            onClick={() => setIsABTest(!isABTest)}
            className={`text-xs text-left px-1 font-semibold transition-colors w-max ${isABTest ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {isABTest ? "✓ A/B 테스트 라우팅 (켜짐)" : "+ A/B 테스트 설정하기 (PRO)"}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm font-medium px-1">⚠️ {error}</p>}
      {createdUrl && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3 text-xs">
          <div className="truncate">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">생성 완료: </span>
            <span className="font-extrabold text-primary">{createdUrl}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90"
            >
              {copied ? "복사됨! 🎉" : "복사"}
            </button>
            <a
              href={createdUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800"
            >
              테스트
            </a>
          </div>
        </div>
      )}
    </form>
  )
}
