import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { LinkCreateForm } from "@/components/LinkCreateForm"
import { LinkItem } from "@/components/LinkItem"

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">내 링크 총 클릭 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalClicks}</div>
            <p className="text-xs text-slate-500 mt-1">내가 만든 모든 링크의 클릭 합계</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">생성된 내 링크</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{links?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">전환된 픽셀 데이터</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-slate-500 mt-1">Facebook & Google 타겟팅용 (준비중)</p>
          </CardContent>
        </Card>
      </div>

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
