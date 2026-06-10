import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/glancetechy'
const JWT_SECRET = process.env.JWT_SECRET || 'glancetechy-secret-key-2024'

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(MONGO_URI)
}

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'admin' },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email aur password daalo' }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'Email ya password galat hai' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Email ya password galat hai' }, { status: 401 })
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({ token, email: user.email, role: user.role })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}