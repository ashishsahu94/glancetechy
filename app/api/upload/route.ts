import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filePath = path.join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}