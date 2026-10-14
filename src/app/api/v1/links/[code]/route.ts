import { NextRequest, NextResponse } from 'next/server'
import { findGuestLink } from '@/lib/linkStorage'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  if (!code) {
    return NextResponse.json({ error: 'Short code is required' }, { status: 400 })
  }

  const link = findGuestLink(code)
  if (!link) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  const host = req.headers.get('host') || '1mm.kr'
  const protocol = host.includes('localhost') ? 'http' : 'https'

  return NextResponse.json({
    success: true,
    shortCode: link.short_code,
    shortUrl: `${protocol}://${host}/${link.short_code}`,
    longUrl: link.long_url,
    clicks: link.clicks_count || 0,
    createdAt: link.created_at
  })
}
