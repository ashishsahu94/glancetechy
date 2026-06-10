'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/lib/api'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin() {
    if (!email || !password) { setError('Email aur password daalo'); return }
    setError(''); setLoading(true)
    try {
      const data = await loginAdmin(email, password)
      Cookies.set('admin_token', data.token, { expires: 7 })
      localStorage.setItem('admin_token', data.token)
      router.push('/admin/dashboard')
    } catch {
      setError('Email ya password galat hai')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#f8fafc',
    }}>
      <div style={{
        background: '#fff', borderRadius: 12,
        border: '1px solid #e2e8f0', padding: '2rem',
        width: '100%', maxWidth: 380,
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>✍️ Blog Admin</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
          Apne account mein login karo
        </p>

        {error && (
          <div style={{
            background: '#fef2f2', color: '#dc2626', padding: '10px 14px',
            borderRadius: 8, fontSize: 13, marginBottom: '1rem', border: '1px solid #fecaca',
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@example.com" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Password</label>
          <input type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••" style={inputStyle}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>

        <button onClick={handleLogin} disabled={loading} style={{
          width: '100%', padding: '11px',
          background: loading ? '#93c5fd' : '#1e40af',
          color: '#fff', border: 'none', borderRadius: 8,
          fontSize: 15, fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Login ho raha hai...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: 13, color: '#475569', display: 'block', marginBottom: 5, fontWeight: 500,
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0',
  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
}
