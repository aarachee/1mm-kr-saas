'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

export async function createShortLink(formData: FormData): Promise<void> {
  const supabase = await createClient()
  
  // 현재 서버(쿠키)에 로그인된 사용자 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('로그인이 필요합니다.')
  }

  const longUrl = formData.get('longUrl') as string
  const pixelId = formData.get('pixelId') as string // 픽셀 ID 추가

  if (!longUrl) {
    throw new Error('URL을 입력해주세요.')
  }

  const shortCode = generateShortCode()

  // Supabase links 테이블에 사용자 ID(user_id)를 포함하여 저장
  const { error } = await supabase
    .from('links')
    .insert([
      { 
        user_id: user.id, 
        long_url: longUrl, 
        short_code: shortCode, 
        pixel_id: pixelId || null 
      }
    ])

  if (error) {
    console.error(error)
    throw new Error('링크 생성에 실패했습니다.')
  }

  revalidatePath('/dashboard')
}
