'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

export async function createShortLink(formData: FormData) {
  const supabase = await createClient()
  
  // 현재 서버(쿠키)에 로그인된 사용자 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '로그인이 필요합니다.' }
  }

  const longUrl = formData.get('longUrl') as string
  const pixelId = formData.get('pixelId') as string // 픽셀 ID 추가

  if (!longUrl) return { error: 'URL을 입력해주세요.' }

  const shortCode = generateShortCode()

  // Supabase links 테이블에 사용자 ID(user_id)를 포함하여 저장
  const { data, error } = await supabase
    .from('links')
    .insert([
      { 
        user_id: user.id, // 가장 중요한 부분: 내 계정 정보와 링크를 연결!
        long_url: longUrl, 
        short_code: shortCode, 
        pixel_id: pixelId || null 
      }
    ])

  if (error) {
    console.error(error)
    return { error: '링크 생성에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true, shortCode }
}
