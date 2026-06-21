import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { LinkCreateForm } from "@/components/LinkCreateForm"
import { LinkItem } from "@/components/LinkItem"

export default async function LinksManagementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: links } = await supabase
    .from('links')
    .select('*, clicks(count)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
        <div className="w-full">
          <h1 className="text-2xl font-bold">새 링크 단축하기</h1>
          <p className="text-slate-500 text-sm mt-1 mb-4">긴 URL을 입력하고 픽셀 아이디를 설정하세요.</p>
          <LinkCreateForm />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>내 링크 관리</CardTitle>
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
