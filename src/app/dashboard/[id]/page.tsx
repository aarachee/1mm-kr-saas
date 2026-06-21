import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClicksChart } from "@/components/ClicksChart"
import { StatsBarChart } from "@/components/StatsBarChart"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LinkStatsPage({ params, searchParams }: { params: { id: string }, searchParams: { days?: string } }) {
  const linkId = parseInt(params.id)
  if (isNaN(linkId)) return <div className="p-10">잘못된 링크 ID입니다.</div>

  const days = parseInt(searchParams.days || '7')
  const validDays = isNaN(days) ? 7 : days

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 링크 소유권 확인
  const { data: link, error: linkError } = await supabase
    .from('links')
    .select('*')
    .eq('id', linkId)
    .eq('user_id', user.id)
    .single()

  if (linkError || !link) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-bold text-red-500 mb-4">링크 정보를 불러오지 못했습니다.</h1>
        <pre className="bg-slate-100 p-4 rounded text-xs">{JSON.stringify({ linkId, error: linkError, userId: user.id }, null, 2)}</pre>
      </div>
    )
  }

  // 날짜 범위 계산
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - validDays)

  // 클릭 데이터 가져오기
  const { data: clicks } = await supabase
    .from('clicks')
    .select('clicked_at, user_agent, referrer, ip_address')
    .eq('link_id', linkId)
    .gte('clicked_at', startDate.toISOString())

  // 통계 계산
  const clicksByDate: Record<string, number> = {}
  
  // Date array for chart initialization
  const dateArray = []
  for (let i = validDays - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    clicksByDate[dateStr] = 0
    dateArray.push(dateStr)
  }

  const deviceCounts: Record<string, number> = {
    'iOS (iPhone/iPad)': 0,
    'Android': 0,
    'Windows': 0,
    'Mac OS': 0,
    '기타': 0
  }

  const referrerCounts: Record<string, number> = {
    '직접 접속': 0,
    '네이버': 0,
    '구글': 0,
    '인스타그램': 0,
    '당근마켓': 0,
    '기타 사이트': 0
  }

  const uniqueIps = new Set<string>()

  clicks?.forEach(click => {
    // PV
    const clickDate = new Date(click.clicked_at)
    const year = clickDate.getFullYear()
    const month = String(clickDate.getMonth() + 1).padStart(2, '0')
    const day = String(clickDate.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    
    if (clicksByDate[dateStr] !== undefined) {
      clicksByDate[dateStr]++
    }

    // UV
    if (click.ip_address) {
      uniqueIps.add(click.ip_address)
    }

    // Devices
    const ua = click.user_agent || ''
    if (ua.includes('iPhone') || ua.includes('iPad')) deviceCounts['iOS (iPhone/iPad)']++
    else if (ua.includes('Android')) deviceCounts['Android']++
    else if (ua.includes('Windows')) deviceCounts['Windows']++
    else if (ua.includes('Macintosh') || ua.includes('Mac OS')) deviceCounts['Mac OS']++
    else deviceCounts['기타']++

    // Referrers
    const ref = click.referrer || ''
    if (!ref || ref === 'direct') referrerCounts['직접 접속']++
    else if (ref.includes('naver.com')) referrerCounts['네이버']++
    else if (ref.includes('google.com')) referrerCounts['구글']++
    else if (ref.includes('instagram.com')) referrerCounts['인스타그램']++
    else if (ref.includes('daangn.com')) referrerCounts['당근마켓']++
    else referrerCounts['기타 사이트']++
  })

  const totalClicks = clicks?.length || 0
  const totalUV = uniqueIps.size

  const chartData = dateArray.map(date => ({
    date: date.substring(5).replace('-', '/'),
    clicks: clicksByDate[date]
  }))

  const deviceData = Object.entries(deviceCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const referrerData = Object.entries(referrerCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-primary mb-2 inline-block">
            &larr; 대시보드로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold">상세 통계</h1>
          <p className="text-slate-500 text-sm mt-1">1mm.kr/{link.short_code}</p>
        </div>
        
        {/* Date Filter */}
        <div className="flex gap-2">
          <Link href={`/dashboard/${linkId}?days=1`}>
            <Button variant={validDays === 1 ? "default" : "outline"} size="sm">오늘</Button>
          </Link>
          <Link href={`/dashboard/${linkId}?days=7`}>
            <Button variant={validDays === 7 ? "default" : "outline"} size="sm">7일</Button>
          </Link>
          <Link href={`/dashboard/${linkId}?days=30`}>
            <Button variant={validDays === 30 ? "default" : "outline"} size="sm">30일</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">총 클릭수 (PV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalClicks}</div>
            <p className="text-xs text-slate-500 mt-1">조회 기간 내 발생한 전체 클릭 횟수</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">순방문자 (UV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-500">{totalUV}</div>
            <p className="text-xs text-slate-500 mt-1">중복 클릭을 제외한 고유 접속자 수 (IP 기준)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>일별 클릭 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ClicksChart data={chartData} />
        </CardContent>
      </Card>

      {totalClicks > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-medium text-slate-500">기기 및 운영체제 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsBarChart data={deviceData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-medium text-slate-500">유입 경로 (Referrer)</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsBarChart data={referrerData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
