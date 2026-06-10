import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Portfolio from '@/models/Portfolio'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect()

  const { slug } = await params

  const portfolio = await Portfolio.findOne({
    slug,
    status: 'published',
  })

  if (!portfolio) {
    return NextResponse.json(
      { error: 'Portfolio not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(portfolio)
}