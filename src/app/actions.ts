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
  const longUrlB = formData.get('longUrlB') as string
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
        long_url_b: longUrlB || null,
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

export async function updateShortCode(linkId: number, newCode: string): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  if (!newCode || !/^[a-zA-Z0-9-_가-힣]+$/.test(newCode)) {
    return { error: '한글, 영문, 숫자, 하이픈(-), 언더바(_)만 사용할 수 있습니다.' }
  }

  const { error } = await supabase
    .from('links')
    .update({ short_code: newCode })
    .eq('id', linkId)
    .eq('user_id', user.id) // 보안: 내 링크만 수정 가능

  if (error) {
    if (error.code === '23505') {
      return { error: `이미 다른 사용자가 선점한 주소입니다: ${newCode}` }
    }
    return { error: '주소 변경에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteShortLink(linkId: number): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', linkId)
    .eq('user_id', user.id) // 보안: 내 링크만 삭제 가능

  if (error) {
    console.error("Delete error:", error)
    return { error: '삭제에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateLinkData(linkId: number, formData: FormData): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const longUrl = formData.get('longUrl') as string
  const longUrlB = formData.get('longUrlB') as string
  const pixelId = formData.get('pixelId') as string 

  if (!longUrl) {
    return { error: '원본 URL은 필수입니다.' }
  }

  const { error } = await supabase
    .from('links')
    .update({ 
      long_url: longUrl, 
      long_url_b: longUrlB || null,
      pixel_id: pixelId || null 
    })
    .eq('id', linkId)
    .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return { error: '링크 수정에 실패했습니다.' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function generateDummyClicks(linkId: number, count: number = 50): Promise<{ error?: string, success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  // 내 링크인지 확인
  const { data: link } = await supabase.from('links').select('id').eq('id', linkId).eq('user_id', user.id).single()
  if (!link) return { error: '권한이 없습니다.' }

  const clicks = []
  const now = new Date()

  // 가상의 브라우저 및 기기 데이터셋
  const userAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', // iOS
    'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', // Android
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', // Windows
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', // Mac
  ]
  const referers = [
    'https://www.google.com/',
    'https://m.naver.com/',
    'https://www.instagram.com/',
    'https://www.daangn.com/',
    null
  ]

  for (let i = 0; i < count; i++) {
    // 최근 7일 내의 랜덤 시간
    const randomDaysAgo = Math.random() * 7
    const randomDate = new Date(now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000)
    
    // A/B 테스트 성과 차이를 주기 위해 A: 55%, B: 45% 로 설정 (대략적으로)
    const variant = Math.random() > 0.45 ? 'A' : 'B'

    clicks.push({
      link_id: linkId,
      clicked_at: randomDate.toISOString(),
      user_agent: userAgents[Math.floor(Math.random() * userAgents.length)],
      referrer: referers[Math.floor(Math.random() * referers.length)],
      variant: variant,
      ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`
    })
  }

  const { error } = await supabase.from('clicks').insert(clicks)

  if (error) {
    console.error(error)
    return { error: `더미 데이터 생성에 실패했습니다: ${error.message}` }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function getABTestStats(linkId: number): Promise<{ A: number, B: number, error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { A: 0, B: 0, error: '로그인이 필요합니다.' }

  const { data, error } = await supabase
    .from('clicks')
    .select('variant')
    .eq('link_id', linkId)

  if (error || !data) {
    return { A: 0, B: 0, error: '통계를 불러오지 못했습니다.' }
  }

  let countA = 0
  let countB = 0
  data.forEach(c => {
    if (c.variant === 'A') countA++
    else if (c.variant === 'B') countB++
  })

  return { A: countA, B: countB }
}
