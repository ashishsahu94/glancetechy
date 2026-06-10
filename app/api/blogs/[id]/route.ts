import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'
import jwt from 'jsonwebtoken'

function verifyToken(req: Request) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '')

  if (!token) {
    throw new Error('Token not found')
  }

  return jwt.verify(token, process.env.JWT_SECRET!)
}

// GET single blog by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyToken(req)
    await dbConnect()

    const { id } = await params

    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unauthorized' },
      { status: 401 }
    )
  }
}

// PUT — update blog
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyToken(req)
    await dbConnect()

    const { id } = await params
    const body = await req.json()

    const blog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unauthorized' },
      { status: 401 }
    )
  }
}

// DELETE — delete blog
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyToken(req)
    await dbConnect()

    const { id } = await params

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unauthorized' },
      { status: 401 }
    )
  }
}