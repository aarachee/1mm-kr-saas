import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { ClicksChart } from "@/components/ClicksChart"
import { StatsBarChart } from "@/components/StatsBarChart"

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: links } = await supabase
    .from('links')
    .select('id, clicks(count)')
    .eq('user_id', user?.id)

  const totalClicks = links?.reduce((sum, link) => {
    // @ts-ignore
    return sum + (link.clicks?.[0]?.count || 0)
  }, 0) || 0

  const linkIds = links?.map(l => l.id) || []
  
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  })

  const clicksByDate = last7Days.reduce((acc, date) => {
    acc[date] = 0
    return acc
  }, {} as Record<string, number>)

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

  if (linkIds.length > 0) {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentClicks } = await supabase
      .from('clicks')
      .select('clicked_at, user_agent, referrer')
      .in('link_id', linkIds)
      .gte('clicked_at', sevenDaysAgo.toISOString())

    recentClicks?.forEach(click => {
      const clickDate = new Date(click.clicked_at)
      const year = clickDate.getFullYear()
      const month = String(clickDate.getMonth() + 1).padStart(2, '0')
      const day = String(clickDate.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      
      if (clicksByDate[dateStr] !== undefined) {
        clicksByDate[dateStr]++
      }

      const ua = click.user_agent || ''
      if (ua.includes('iPhone') || ua.includes('iPad')) deviceCounts['iOS (iPhone/iPad)']++
      else if (ua.includes('Android')) deviceCounts['Android']++
      else if (ua.includes('Windows')) deviceCounts['Windows']++
      else if (ua.includes('Macintosh') || ua.includes('Mac OS')) deviceCounts['Mac OS']++
      else deviceCounts['기타']++

      const ref = click.referrer || ''
      if (!ref || ref === 'direct') referrerCounts['직접 접속']++
      else if (ref.includes('naver.com')) referrerCounts['네이버']++
      else if (ref.includes('google.com')) referrerCounts['구글']++
      else if (ref.includes('instagram.com')) referrerCounts['인스타그램']++
      else if (ref.includes('daangn.com')) referrerCounts['당근마켓']++
      else referrerCounts['기타 사이트']++
    })
  }

  const deviceData = Object.entries(deviceCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const referrerData = Object.entries(referrerCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const chartData = last7Days.map(date => ({
    date: date.substring(5).replace('-', '/'),
    clicks: clicksByDate[date]
  }))

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">전체 통계 및 분석</h1>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium text-slate-500">최근 7일 전체 트래픽 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ClicksChart data={chartData} />
        </CardContent>
      </Card>

      {totalClicks > 0 ? (
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
      ) : (
        <div className="text-center py-10 text-slate-500 bg-white dark:bg-slate-900 rounded-xl border">
          통계 데이터가 충분하지 않습니다. 링크를 공유하여 클릭을 모아보세요.
        </div>
      )}
    </div>
  )
}
