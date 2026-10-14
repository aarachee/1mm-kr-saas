'use client'

import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, Star, CheckCircle2, Clock, 
  Send, Edit3, Trash2, ShieldCheck, Sparkles, 
  HelpCircle, AlertCircle, RefreshCw, Pin, 
  BookOpen, User, CornerDownRight, Check
} from 'lucide-react'
import { ReviewRecord, QnaRecord, FeedbackData } from '@/lib/creatorFeedback'

export default function CreatorFeedbackPage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'qnas'>('reviews')
  const [data, setData] = useState<FeedbackData>({ reviews: [], qnas: [] })
  const [loading, setLoading] = useState(true)
  const [submittingId, setSubmittingId] = useState<string | null>(null)

  // 답글/답변 작성 상태 관리
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
  const [reviewReplyText, setReviewReplyText] = useState('')

  const [editingQnaId, setEditingQnaId] = useState<string | null>(null)
  const [qnaAnswerText, setQnaAnswerText] = useState('')

  // 피드백 데이터 로드
  const fetchFeedback = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/v1/creator/feedback')
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (err) {
      console.error('Failed to load feedback:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  // 후기 답글 등록 / 수정
  const handleSaveReviewReply = async (reviewId: string) => {
    if (!reviewReplyText.trim()) return
    setSubmittingId(reviewId)

    try {
      const res = await fetch('/api/v1/creator/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reply_review',
          id: reviewId,
          content: reviewReplyText,
          authorName: '저자 공식 답변'
        })
      })

      if (res.ok) {
        await fetchFeedback()
        setEditingReviewId(null)
        setReviewReplyText('')
      }
    } catch (err) {
      alert('답글 저장 중 오류가 발생했습니다.')
    } finally {
      setSubmittingId(null)
    }
  }

  // 후기 답글 삭제
  const handleDeleteReviewReply = async (reviewId: string) => {
    if (!confirm('작성하신 공식 답글을 삭제하시겠습니까?')) return
    setSubmittingId(reviewId)

    try {
      const res = await fetch('/api/v1/creator/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_reply',
          id: reviewId
        })
      })

      if (res.ok) {
        await fetchFeedback()
      }
    } catch (err) {
      alert('답글 삭제 중 오류가 발생했습니다.')
    } finally {
      setSubmittingId(null)
    }
  }

  // Q&A 답변 등록 / 수정
  const handleSaveQnaAnswer = async (qnaId: string) => {
    if (!qnaAnswerText.trim()) return
    setSubmittingId(qnaId)

    try {
      const res = await fetch('/api/v1/creator/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer_qna',
          id: qnaId,
          content: qnaAnswerText,
          authorName: '저자 공식 답변'
        })
      })

      if (res.ok) {
        await fetchFeedback()
        setEditingQnaId(null)
        setQnaAnswerText('')
      }
    } catch (err) {
      alert('답변 저장 중 오류가 발생했습니다.')
    } finally {
      setSubmittingId(null)
    }
  }

  // Q&A 답변 삭제
  const handleDeleteQnaAnswer = async (qnaId: string) => {
    if (!confirm('작성하신 답변을 삭제하고 대기 상태로 되돌리시겠습니까?')) return
    setSubmittingId(qnaId)

    try {
      const res = await fetch('/api/v1/creator/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_answer',
          id: qnaId
        })
      })

      if (res.ok) {
        await fetchFeedback()
      }
    } catch (err) {
      alert('답변 삭제 중 오류가 발생했습니다.')
    } finally {
      setSubmittingId(null)
    }
  }

  // 통계 계산
  const totalReviews = data.reviews.length
  const averageRating = totalReviews > 0
    ? (data.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0'
  const repliedReviewsCount = data.reviews.filter(r => r.creatorReply !== null).length

  const totalQnas = data.qnas.length
  const pendingQnasCount = data.qnas.filter(q => q.status === 'pending').length
  const answeredQnasCount = data.qnas.filter(q => q.status === 'answered').length

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 헤더 섹션 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>크리에이터 소통 & 전환 극대화 허브</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            독자 후기 & Q&A 관리
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            구글 로그인된 작가님만의 공간입니다. 독자 후기에 답글을 달고 질문에 답변하여 신뢰도를 높이세요.
          </p>
        </div>

        <button
          onClick={fetchFeedback}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>새로고침</span>
        </button>
      </div>

      {/* 3대 핵심 소통 지표 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">독자 만족도 평점</div>
            <div className="text-2xl font-black text-amber-500 flex items-baseline gap-1 mt-1">
              <span>{averageRating}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">총 {totalReviews}건 중 {repliedReviewsCount}건 답글 완료</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">답변 대기 중인 문의</div>
            <div className="text-2xl font-black text-rose-500 mt-1">
              {pendingQnasCount}건
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {pendingQnasCount > 0 ? '빠른 답변 시 구매 전환율 상승' : '모든 질문 답변 완료됨'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Q&A 총 응답률</div>
            <div className="text-2xl font-black text-emerald-500 mt-1">
              {totalQnas > 0 ? Math.round((answeredQnasCount / totalQnas) * 100) : 100}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">전체 {totalQnas}건 중 {answeredQnasCount}건 응답 완료</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reviews'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>독자 구매 후기 ({totalReviews})</span>
        </button>

        <button
          onClick={() => setActiveTab('qnas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'qnas'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>구매/이용 Q&A 문의 ({totalQnas})</span>
          {pendingQnasCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>
      </div>

      {/* TAB 1: 후기 관리 */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {data.reviews.map((review) => {
            const isEditing = editingReviewId === review.id

            return (
              <div 
                key={review.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                {/* 상단 메타 정보 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{review.customerName}</span>
                    {review.isPinned && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Pin className="w-3 h-3" />
                        <span>베스트 후기</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-medium truncate max-w-[200px]">{review.productTitle}</span>
                    <span>•</span>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* 독자 후기 본문 */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {review.content}
                </p>

                {/* 작가 답글 영역 */}
                {review.creatorReply ? (
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {review.creatorReply.authorName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(review.creatorReply.repliedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingReviewId(review.id)
                            setReviewReplyText(review.creatorReply?.content || '')
                          }}
                          className="text-[11px] text-slate-500 hover:text-indigo-500 flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>수정</span>
                        </button>
                        <button
                          onClick={() => handleDeleteReviewReply(review.id)}
                          disabled={submittingId === review.id}
                          className="text-[11px] text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>삭제</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 pl-5 leading-relaxed">
                      {review.creatorReply.content}
                    </p>
                  </div>
                ) : null}

                {/* 답글 작성 또는 수정 폼 */}
                {isEditing ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-indigo-500/30 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-500">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>작가 공식 답글 작성</span>
                    </div>

                    <textarea
                      value={reviewReplyText}
                      onChange={(e) => setReviewReplyText(e.target.value)}
                      placeholder="독자님께 전할 감사 인사 및 실전 꿀팁을 남겨주세요."
                      rows={3}
                      className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingReviewId(null)
                          setReviewReplyText('')
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleSaveReviewReply(review.id)}
                        disabled={submittingId === review.id || !reviewReplyText.trim()}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1"
                      >
                        {submittingId === review.id ? (
                          <span>저장 중...</span>
                        ) : (
                          <>
                            <Send className="w-3 h-3" />
                            <span>답글 등록하기</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : !review.creatorReply && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setEditingReviewId(review.id)
                        setReviewReplyText('')
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-colors border border-indigo-200/50 dark:border-indigo-500/20"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>작가 공식 답글 달기</span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* TAB 2: Q&A 관리 */}
      {activeTab === 'qnas' && (
        <div className="space-y-4">
          {data.qnas.map((qna) => {
            const isEditing = editingQnaId === qna.id

            return (
              <div 
                key={qna.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                {/* 상단 메타 정보 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    {qna.status === 'answered' ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>답변 완료</span>
                      </span>
                    ) : (
                      <span className="text-[10px] bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>답변 대기 중</span>
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{qna.customerName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-medium truncate max-w-[200px]">{qna.productTitle}</span>
                    <span>•</span>
                    <span>{new Date(qna.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* 독자 질문 */}
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold pt-0.5">
                    {qna.question}
                  </p>
                </div>

                {/* 작가 답변 영역 */}
                {qna.answer ? (
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-500 font-bold text-[11px] flex items-center justify-center">
                          A
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {qna.answer.authorName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(qna.answer.answeredAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingQnaId(qna.id)
                            setQnaAnswerText(qna.answer?.content || '')
                          }}
                          className="text-[11px] text-slate-500 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>수정</span>
                        </button>
                        <button
                          onClick={() => handleDeleteQnaAnswer(qna.id)}
                          disabled={submittingId === qna.id}
                          className="text-[11px] text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>삭제</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 pl-7 leading-relaxed">
                      {qna.answer.content}
                    </p>
                  </div>
                ) : null}

                {/* 답변 등록 또는 수정 폼 */}
                {isEditing ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-500/30 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>독자 질문에 답변 작성</span>
                    </div>

                    <textarea
                      value={qnaAnswerText}
                      onChange={(e) => setQnaAnswerText(e.target.value)}
                      placeholder="호환성, 다운로드 방법 등 궁금해하시는 내용에 친절하게 답변해 주세요."
                      rows={3}
                      className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 resize-none"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingQnaId(null)
                          setQnaAnswerText('')
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleSaveQnaAnswer(qna.id)}
                        disabled={submittingId === qna.id || !qnaAnswerText.trim()}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1"
                      >
                        {submittingId === qna.id ? (
                          <span>등록 중...</span>
                        ) : (
                          <>
                            <Send className="w-3 h-3" />
                            <span>답변 등록하기</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : !qna.answer && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setEditingQnaId(qna.id)
                        setQnaAnswerText('')
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors border border-emerald-200/50 dark:border-emerald-500/20"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>실시간 답변 작성하기</span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}
