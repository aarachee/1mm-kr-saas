import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="text-blue-600">1mm</span>.kr
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#features" className="hover:text-blue-600 transition-colors">기능</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">요금제</Link>
            <Link href="#contact" className="hover:text-blue-600 transition-colors">도입 문의</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">로그인</Button>
            <Button>무료로 시작하기</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            가장 완벽한 데이터 분석,<br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              1mm.kr 단축 링크
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            단순한 링크 단축을 넘어 A/B 테스트, 픽셀 삽입, 실시간 통계까지.<br/>
            마케터와 크리에이터를 위한 단 하나의 플랫폼입니다.
          </p>
          
          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
            <Input 
              type="url" 
              placeholder="단축할 긴 URL을 입력하세요 (예: https://example.com/...)" 
              className="h-12 text-base px-4 shadow-sm"
            />
            <Button className="h-12 px-8 text-base shadow-sm">단축하기</Button>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            회원가입 없이 무료로 1개의 링크를 테스트해 보세요.
          </p>
        </section>

        {/* Features Preview */}
        <section id="features" className="bg-white dark:bg-slate-900 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">왜 1mm.kr 인가요?</h2>
              <p className="text-slate-600 dark:text-slate-400">당신의 마케팅 성과를 1mm라도 더 끌어올리기 위한 기능들</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">정교한 A/B 테스트</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">하나의 단축 링크로 트래픽을 분산시켜 어떤 페이지가 더 전환율이 높은지 손쉽게 테스트하세요.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-600">리타겟팅 픽셀</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">단축 링크 클릭 시 찰나의 순간 페이스북/구글 픽셀을 실행하여 잠재 고객 모수를 확보합니다.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">멀티 링크(Link-in-Bio)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">크리에이터를 위한 전용 페이지. 버튼별 데이터 분석이 가능한 나만의 프로필을 만드세요.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 2026 1mm.kr All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
