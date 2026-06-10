// scripts/createAdmin.js
// Run: node scripts/createAdmin.js

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI .env mein nahi mila!')
  process.exit(1)
}

// User Schema — apne existing User model ke hisaab se adjust karo
const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'admin' },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ MongoDB connected')

    // Check karo admin already hai ya nahi
    const existing = await User.findOne({ email: 'admin@glancetechy.com' })
    if (existing) {
      console.log('⚠️  Admin already exists!')
      console.log('📧 Email:    admin@glancetechy.com')
      console.log('🔑 Password: Admin@123')
      process.exit(0)
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash('Admin@123', 10)

    // Admin user banao
    const admin = await User.create({
      email:    'admin@glancetechy.com',
      password: hashedPassword,
      role:     'admin',
    })

    console.log('🎉 Admin user ban gaya!')
    console.log('📧 Email:    admin@glancetechy.com')
    console.log('🔑 Password: Admin@123')
    console.log('🆔 ID:', admin._id)

  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

createAdmin()
