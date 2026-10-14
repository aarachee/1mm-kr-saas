import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { LinkItem } from "@/components/LinkItem"
import { ClicksChart } from "@/components/ClicksChart"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 병렬(Parallel) 호출로 핑 지연시간 단축
  const [
    { data: links },
    { data: allLinks }
  ] = await Promise.all([
    supabase.from('links').select('*, clicks(count)').eq('user_id', user?.id).order('created_at', { ascending: false }).limit(3),
    supabase.from('links').select('id, clicks(count)').eq('user_id', user?.id)
  ])

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

      {/* 크리에이터 독자 소통 허브 배너 */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">독자 후기 답글 & 실시간 Q&A 관리</h3>
              <span className="text-[10px] bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold">
                답변 대기 2건
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              구글 인증 작가님만의 공간입니다. 독자 후기에 답글을 달고 질문에 답변하여 신뢰도를 높여보세요.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/feedback"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 shrink-0"
        >
          소통 허브 바로가기 &rarr;
        </Link>
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
