import fs from 'fs'
import path from 'path'

export interface CreatorReply {
  authorName: string
  content: string
  repliedAt: string
}

export interface ReviewRecord {
  id: string
  productId: string
  productTitle: string
  customerName: string
  customerEmail: string
  rating: number
  content: string
  createdAt: string
  isPinned?: boolean
  creatorReply: CreatorReply | null
}

export interface QnaAnswer {
  authorName: string
  content: string
  answeredAt: string
}

export interface QnaRecord {
  id: string
  productId: string
  productTitle: string
  customerName: string
  customerEmail: string
  question: string
  isSecret: boolean
  status: 'pending' | 'answered'
  createdAt: string
  answer: QnaAnswer | null
}

export interface FeedbackData {
  reviews: ReviewRecord[]
  qnas: QnaRecord[]
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const FILE_PATH = path.join(DATA_DIR, 'creator-feedback.json')

function ensureFeedbackFile(): FeedbackData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(FILE_PATH)) {
    const initial: FeedbackData = { reviews: [], qnas: [] }
    fs.writeFileSync(FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8')
    return initial
  }
  try {
    const content = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(content) as FeedbackData
  } catch (err) {
    console.error('Error reading creator feedback:', err)
    return { reviews: [], qnas: [] }
  }
}

function writeFeedbackFile(data: FeedbackData) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing creator feedback:', err)
  }
}

export function getAllFeedback(): FeedbackData {
  return ensureFeedbackFile()
}

export function getReviewsByProduct(productId: string): ReviewRecord[] {
  const data = ensureFeedbackFile()
  return data.reviews.filter(r => r.productId === productId)
}

export function getQnasByProduct(productId: string): QnaRecord[] {
  const data = ensureFeedbackFile()
  return data.qnas.filter(q => q.productId === productId)
}

export function saveReviewReply(reviewId: string, authorName: string, content: string): ReviewRecord | null {
  const data = ensureFeedbackFile()
  const review = data.reviews.find(r => r.id === reviewId)
  if (!review) return null

  review.creatorReply = {
    authorName,
    content,
    repliedAt: new Date().toISOString()
  }

  writeFeedbackFile(data)
  return review
}

export function deleteReviewReply(reviewId: string): boolean {
  const data = ensureFeedbackFile()
  const review = data.reviews.find(r => r.id === reviewId)
  if (!review) return false

  review.creatorReply = null
  writeFeedbackFile(data)
  return true
}

export function saveQnaAnswer(qnaId: string, authorName: string, content: string): QnaRecord | null {
  const data = ensureFeedbackFile()
  const qna = data.qnas.find(q => q.id === qnaId)
  if (!qna) return null

  qna.answer = {
    authorName,
    content,
    answeredAt: new Date().toISOString()
  }
  qna.status = 'answered'

  writeFeedbackFile(data)
  return qna
}

export function deleteQnaAnswer(qnaId: string): boolean {
  const data = ensureFeedbackFile()
  const qna = data.qnas.find(q => q.id === qnaId)
  if (!qna) return false

  qna.answer = null
  qna.status = 'pending'
  writeFeedbackFile(data)
  return true
}
