import { getAllDigitalProducts } from '@/lib/digitalProducts'
import { DashboardPlaybookHub } from '@/components/DashboardPlaybookHub'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '완판 템플릿 & 퍼널 치트키 | 1mm Pay',
  description: '스레드, 인스타그램 릴스, 엑스용 카피라이팅 템플릿과 고객 연락처 DB 수익화 퍼널 가이드',
}

export default async function PlaybookDashboardPage() {
  const products = getAllDigitalProducts()

  return (
    <div className="space-y-6">
      <DashboardPlaybookHub products={products} />
    </div>
  )
}
