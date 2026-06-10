import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  await dbConnect()
  const blog = await Blog.findOne({ slug: params.slug, status: 'published' })
  if (!blog) return NextResponse.json({ error: 'Blog nahi mila' }, { status: 404 })
  return NextResponse.json(blog)
}