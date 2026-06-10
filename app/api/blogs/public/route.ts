import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'

export async function GET() {
  await dbConnect()
  const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 })
  return NextResponse.json(blogs)
}