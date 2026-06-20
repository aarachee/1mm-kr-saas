'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

export async function createShortLink(formData: FormData): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  
  // 로그인 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '로그인이 필요합니다.' }
  }

  const longUrl = formData.get('longUrl') as string
  const pixelId = formData.get('pixelId') as string 

  if (!longUrl) {
    return { error: 'URL을 입력해주세요.' }
  }

  // 무조건 무작위 코드로 생성 (커스텀은 추후 수정 기능으로)
  let shortCode = generateShortCode()

  // DB 저장
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

  // 에러 처리
  if (error) {
    console.error(error)
    // 23505는 PostgreSQL의 고유 키 제약 조건 위반(Unique Violation) 에러 코드입니다.
    if (error.code === '23505') {
      return { error: `이미 다른 사용자가 선점한 주소입니다: ${shortCode}` }
    }
    return { error: '링크 생성에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
