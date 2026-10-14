import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { 
  ADMIN_COOKIE_NAME, 
  verifyAdminPassword, 
  getExpectedAdminToken 
} from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: '관리자 마스터 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    const token = getExpectedAdminToken()
    const cookieStore = await cookies()
    
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7일 유지
    })

    return NextResponse.json({ success: true, message: '관리자 인증 성공' })
  } catch (err) {
    return NextResponse.json({ error: '인증 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return NextResponse.json({ success: true, message: '관리자 로그아웃 완료' })
}
