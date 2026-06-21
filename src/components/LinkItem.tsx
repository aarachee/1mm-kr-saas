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

const EditIcon = () => (
  <svg className="w-4 h-4 text-slate-400 hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

export function LinkItem({ link }: { link: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newCode, setNewCode] = useState(link.short_code)
  const [loading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isEditingTarget, setIsEditingTarget] = useState(false)
  const [newLongUrl, setNewLongUrl] = useState(link.long_url)
  const [newLongUrlB, setNewLongUrlB] = useState(link.long_url_b || "")
  const [targetError, setTargetError] = useState<string | null>(null)
  const [targetLoading, setTargetLoading] = useState(false)

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

  const handleSaveTarget = async () => {
    setTargetLoading(true)
    setTargetError(null)
    
    try {
      const { updateLinkData } = await import("@/app/actions")
      const formData = new FormData()
      formData.append('longUrl', newLongUrl)
      if (newLongUrlB) formData.append('longUrlB', newLongUrlB)
      if (link.pixel_id) formData.append('pixelId', link.pixel_id)

      const result = await updateLinkData(link.id, formData)
      if (result.error) {
        setTargetError(result.error)
      } else {
        setIsEditingTarget(false)
      }
    } catch (err) {
      setTargetError("오류가 발생했습니다.")
    } finally {
      setTargetLoading(false)
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

        {isEditingTarget ? (
          <div className="flex flex-col gap-2 mt-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 w-full max-w-lg">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500">원본 주소 A (필수)</label>
              <Input value={newLongUrl} onChange={e => setNewLongUrl(e.target.value)} className="h-8 text-xs" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-[10px] font-bold text-slate-500">도착지 B (A/B 테스트용)</label>
              <Input value={newLongUrlB} onChange={e => setNewLongUrlB(e.target.value)} placeholder="비워두면 A/B 테스트가 중지됩니다." className="h-8 text-xs border-primary/30" />
            </div>
            
            {newLongUrlB && (
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 mb-2">🎯 테스트 종료 및 승자 선택 (클릭 시 자동 적용)</p>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setNewLongUrlB("")} 
                    className="text-xs flex-1 h-8 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                  >
                    A 사이트로 결정
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => { setNewLongUrl(newLongUrlB); setNewLongUrlB(""); }} 
                    className="text-xs flex-1 h-8 hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                  >
                    B 사이트로 결정
                  </Button>
                </div>
              </div>
            )}

            {targetError && <span className="text-xs text-red-500 font-medium mt-1">{targetError}</span>}
            <div className="flex justify-end gap-2 mt-2">
              <Button size="sm" variant="ghost" onClick={() => { setIsEditingTarget(false); setNewLongUrl(link.long_url); setNewLongUrlB(link.long_url_b || ""); }} className="h-7 text-xs" disabled={targetLoading}>취소</Button>
              <Button size="sm" onClick={handleSaveTarget} className="h-7 text-xs bg-primary" disabled={targetLoading}>{targetLoading ? "저장중..." : "저장"}</Button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md mt-1">{link.long_url}</span>
            
            {link.long_url_b && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                  A/B 테스트 중
                </span>
                <span className="text-xs text-slate-400 truncate max-w-xs sm:max-w-xs">B: {link.long_url_b}</span>
              </div>
            )}
          </>
        )}
        
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
        
        {!isEditing && !isEditingTarget && !isConfirmingDelete && (
          <div className="flex items-center gap-1">
            <CopyButton shortCode={link.short_code} />
            <button 
              onClick={() => setIsEditingTarget(true)} 
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="도착지 수정 / A/B 테스트 중지"
            >
              <EditIcon />
            </button>
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
