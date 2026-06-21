import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { LinkItem } from "@/components/LinkItem"
import { ClicksChart } from "@/components/ClicksChart"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: links } = await supabase
    .from('links')
    .select('*, clicks(count)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(3) // 최근 3개만 표시

  // 총 클릭 수 (전체 링크를 가져오지 않으므로 한계가 있지만, 요약용으로 최근 3개만 일단 표시하거나 별도 쿼리 필요. 
  // Wait, 요약을 위해 전체 링크 수를 가져와야 하므로 별도 쿼리 필요함.
  
  const { data: allLinks } = await supabase
    .from('links')
    .select('id, clicks(count)')
    .eq('user_id', user?.id)

  const totalClicks = allLinks?.reduce((sum, link) => {
    // @ts-ignore
    return sum + (link.clicks?.[0]?.count || 0)
  }, 0) || 0

  const totalLinksCount = allLinks?.length || 0
  const linkIds = allLinks?.map(l => l.id) || []
  
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

  if (linkIds.length > 0) {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentClicks } = await supabase
      .from('clicks')
      .select('clicked_at')
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
    })
  }

  const chartData = last7Days.map(date => ({
    date: date.substring(5).replace('-', '/'),
    clicks: clicksByDate[date]
  }))

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">대시보드 요약</h1>
        <Link href="/dashboard/links">
          <Button>+ 새 링크 만들기</Button>
        </Link>
      </div>

      {/* Stats & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="flex-1 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary">내 링크 총 클릭 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{totalClicks}</div>
              <p className="text-xs text-slate-500 mt-2">전체 누적 클릭</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">생성된 내 링크</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalLinksCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium text-slate-500">전체 트래픽 요약 (최근 7일)</CardTitle>
          </CardHeader>
          <CardContent>
            <ClicksChart data={chartData} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>최근 생성된 링크</CardTitle>
          <Link href="/dashboard/links" className="text-sm text-primary hover:underline">
            모두 보기 &rarr;
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            {links && links.length > 0 ? (
              links.map((link) => (
                <LinkItem key={link.id} link={link} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                아직 생성된 단축 링크가 없습니다.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
