import { findDigitalProductBySlug } from '@/lib/digitalProducts'
import { ProductCheckoutClient } from '@/components/ProductCheckoutClient'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = findDigitalProductBySlug(slug)
  if (!product) {
    return {
      title: '상품을 찾을 수 없습니다 | 1mm.kr',
    }
  }

  return {
    title: `${product.title} | 1mm Pay 안전 결제`,
    description: product.subtitle || product.description,
  }
}

export default async function ProductCheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = findDigitalProductBySlug(slug)

  return <ProductCheckoutClient product={product} />
}
