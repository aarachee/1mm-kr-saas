'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/CopyButton"
import { updateShortCode } from "@/app/actions"

// 루시드 아이콘 (shadcn 기본 내장)
const PencilIcon = () => (
  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

export function LinkItem({ link }: { link: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newCode, setNewCode] = useState(link.short_code)
  const [loading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (newCode === link.short_code) {
      setIsEditing(false)
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const result = await updateShortCode(link.id, newCode)
      if (result.error) {
        setError(result.error)
      } else {
        setIsEditing(false)
        setError(null)
      }
    } catch (err) {
      setError("오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      const { deleteShortLink } = await import("@/app/actions")
      const result = await deleteShortLink(link.id)
      if (result.error) {
        alert(result.error)
        setIsDeleting(false)
        setIsConfirmingDelete(false)
      }
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.")
      setIsDeleting(false)
      setIsConfirmingDelete(false)
    }
  }

  const clickCount = link.clicks?.[0]?.count || 0

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-4">
      <div className="flex flex-col gap-1 w-full sm:w-auto flex-1">
        
        {/* 인라인 수정 모드 */}
        {isEditing ? (
          <div className="flex flex-col gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">1mm.kr/</span>
              <Input 
                value={newCode} 
                onChange={(e) => setNewCode(e.target.value)} 
                className="h-8 w-40 border-primary/30 focus-visible:ring-primary"
                autoFocus
              />
              <Button size="sm" onClick={handleSave} disabled={loading} className="h-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                {loading ? "저장중..." : <CheckIcon />} 
                완료
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setError(null); setNewCode(link.short_code) }} disabled={loading} className="h-8 w-8 p-0 text-slate-400">
                <XIcon />
              </Button>
            </div>
            {error && <span className="text-xs text-red-500 font-medium px-1">{error}</span>}
          </div>
        ) : (
          /* 일반 모드 */
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary text-lg">1mm.kr/{link.short_code}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)} 
              className="h-6 px-2 text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <PencilIcon />
              <span className="text-[10px] font-bold">PRO 커스텀</span>
            </Button>
          </div>
        )}

        <span className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">{link.long_url}</span>
        
        {link.pixel_id && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 w-max mt-1">
            픽셀 활성화됨
          </span>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
        {!isConfirmingDelete && (
          <div className="text-left sm:text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {clickCount} 클릭
            </div>
            <div className="text-xs text-slate-400">
              {new Date(link.created_at).toLocaleDateString()}
            </div>
          </div>
        )}
        
        {!isEditing && !isConfirmingDelete && (
          <div className="flex items-center gap-1">
            <CopyButton shortCode={link.short_code} />
            <button 
              onClick={() => setIsConfirmingDelete(true)} 
              className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="삭제"
            >
              <TrashIcon />
            </button>
          </div>
        )}

        {isConfirmingDelete && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-100 dark:border-red-900/30 animate-in slide-in-from-right-4 duration-300">
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 mr-1">삭제할까요?</span>
            <Button 
              size="sm" 
              variant="destructive" 
              className="h-7 text-xs px-3"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제중..." : "삭제"}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 text-xs px-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              onClick={() => setIsConfirmingDelete(false)}
              disabled={isDeleting}
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
