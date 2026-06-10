'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PortfolioPayload = {
  title: string
  category: string
  image: string
  content: string
  client: string
  company: string
  projectUrl: string
  tags: string
  status: string
}

export default function PortfolioForm() {
  const router = useRouter()

  const [form, setForm] = useState<PortfolioPayload>({
    title: '',
    category: 'Website',
    image: '',
    content: '',
    client: '',
    company: '',
    projectUrl: '',
    tags: '',
    status: 'draft',
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof PortfolioPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImageUpload(file: File) {
    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.url) {
        update('image', data.url)
      }
    } catch {
      setError('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit() {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required')
      return
    }

    setLoading(true)
    setError('')

    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    const payload = {
      ...form,
      slug,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token') || ''}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed')

      router.push('/admin/portfolio')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>New Portfolio</h1>

        <button onClick={() => router.push('/admin/portfolio')} style={outlineBtn}>
          ← Back
        </button>
      </div>

      <div style={card}>
        {error && <div style={errorBox}>{error}</div>}

        <div style={fieldWrap}>
          <label style={labelStyle}>Title *</label>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Portfolio title"
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Category</label>
            <input
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Status</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              style={inputStyle}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Cover Image</label>
          <input
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="Image URL or uploaded path"
            style={inputStyle}
          />

          <div style={{ margin: '12px 0', textAlign: 'center', color: '#64748b' }}>OR</div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
            }}
            style={inputStyle}
          />

          {uploading && <p>Uploading image...</p>}

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              style={{
                marginTop: 12,
                width: '100%',
                maxHeight: 260,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Client</label>
            <input
              value={form.client}
              onChange={(e) => update('client', e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Company</label>
            <input
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Project URL</label>
          <input
            value={form.projectUrl}
            onChange={(e) => update('projectUrl', e.target.value)}
            placeholder="https://example.com"
            style={inputStyle}
          />
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Tags</label>
          <input
            value={form.tags}
            onChange={(e) => update('tags', e.target.value)}
            placeholder="Website, UI Design, Next.js"
            style={inputStyle}
          />
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Content *</label>
          <textarea
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
            rows={12}
            placeholder="Portfolio details content"
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            style={primaryBtn}
          >
            {loading ? 'Saving...' : '🚀 Save Portfolio'}
          </button>

          <button onClick={() => router.push('/admin/portfolio')} style={outlineBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '1.5rem',
}

const fieldWrap: React.CSSProperties = { marginBottom: '1rem' }

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#475569',
  display: 'block',
  marginBottom: 5,
  fontWeight: 500,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
}

const outlineBtn: React.CSSProperties = {
  padding: '9px 16px',
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontSize: 14,
  cursor: 'pointer',
  color: '#475569',
}

const primaryBtn: React.CSSProperties = {
  padding: '10px 20px',
  background: '#1e40af',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
}

const errorBox: React.CSSProperties = {
  background: '#fef2f2',
  color: '#dc2626',
  padding: '10px 14px',
  borderRadius: 8,
  fontSize: 13,
  marginBottom: '1rem',
  border: '1px solid #fecaca',
}