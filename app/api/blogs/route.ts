import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'
import jwt from 'jsonwebtoken'

function verifyToken(req: Request) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '')
  if (!token) throw new Error('Token nahi hai')
  return jwt.verify(token, process.env.JWT_SECRET!)
}

// GET — all blogs (admin)
export async function GET(req: Request) {
  try {
    verifyToken(req)
    await dbConnect()
    const blogs = await Blog.find().sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// POST — new blog banao
export async function POST(req: Request) {
  try {
    verifyToken(req)
    await dbConnect()
    const body = await req.json()

    // Slug auto generate karo title se
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    const blog = await Blog.create({ ...body, slug })
    return NextResponse.json(blog, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}