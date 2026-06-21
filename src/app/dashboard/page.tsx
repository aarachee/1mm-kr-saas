import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { LinkCreateForm } from "@/components/LinkCreateForm"
import { LinkItem } from "@/components/LinkItem"
import { ClicksChart } from "@/components/ClicksChart"
import { StatsPieChart } from "@/components/StatsPieChart"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 1. 내 계정(user.id)으로 만든 링크만 가져오기
  const { data: links } = await supabase
    .from('links')
    .select('*, clicks(count)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(50) // 최근 50개까지 표시

  // 2. 내 링크들의 총 클릭 수 합산하기
  const totalClicks = links?.reduce((sum, link) => {
    // @ts-ignore
    return sum + (link.clicks?.[0]?.count || 0)
  }, 0) || 0

  // 3. 차트 데이터 생성 (최근 7일)
  const linkIds = links?.map(l => l.id) || []
  
  // 지난 7일간의 날짜 배열 생성 (YYYY-MM-DD)
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
    date: date.substring(5).replace('-', '/'), // MM/DD
    clicks: clicksByDate[date]
  }))

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">새 링크 단축하기</h1>
          <p className="text-slate-500 text-sm mt-1 mb-4">긴 URL을 입력하고 픽셀 아이디를 설정하세요.</p>
          <LinkCreateForm />
        </div>
      </div>

      {/* Stats & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Stats Cards */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="flex-1 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary">내 링크 총 클릭 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{totalClicks}</div>
              <p className="text-xs text-slate-500 mt-2">내가 만든 모든 링크의 클릭 합계</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">생성된 내 링크</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{links?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Right Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium text-slate-500">최근 7일 트래픽 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <ClicksChart data={chartData} />
          </CardContent>
        </Card>
      </div>

      {/* Deep Analytics Pie Charts */}
      {totalClicks > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-medium text-slate-500">기기 및 운영체제 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsPieChart data={deviceData} colors={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-medium text-slate-500">유입 경로 (Referrer)</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsPieChart data={referrerData} colors={['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#64748b']} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Links */}
      <Card>
        <CardHeader>
          <CardTitle>최근 생성된 내 링크</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {links && links.length > 0 ? (
              links.map((link) => (
                <LinkItem key={link.id} link={link} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                아직 생성된 단축 링크가 없습니다. 첫 링크를 만들어 보세요!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
