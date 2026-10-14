import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllFeedback, 
  saveReviewReply, 
  deleteReviewReply, 
  saveQnaAnswer, 
  deleteQnaAnswer 
} from '@/lib/creatorFeedback'

export async function GET(request: NextRequest) {
  try {
    const data = getAllFeedback()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, id, content, authorName } = body

    if (action === 'reply_review') {
      if (!id || !content) {
        return NextResponse.json({ error: 'Review ID and content are required' }, { status: 400 })
      }
      const updated = saveReviewReply(id, authorName || '공식 작가', content)
      if (!updated) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, review: updated })
    }

    if (action === 'delete_reply') {
      if (!id) {
        return NextResponse.json({ error: 'Review ID is required' }, { status: 400 })
      }
      const success = deleteReviewReply(id)
      return NextResponse.json({ success })
    }

    if (action === 'answer_qna') {
      if (!id || !content) {
        return NextResponse.json({ error: 'QnA ID and content are required' }, { status: 400 })
      }
      const updated = saveQnaAnswer(id, authorName || '공식 작가', content)
      if (!updated) {
        return NextResponse.json({ error: 'QnA not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, qna: updated })
    }

    if (action === 'delete_answer') {
      if (!id) {
        return NextResponse.json({ error: 'QnA ID is required' }, { status: 400 })
      }
      const success = deleteQnaAnswer(id)
      return NextResponse.json({ success })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
