'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBlog, updateBlog, BlogPayload, Blog } from '@/lib/api'

const CATEGORIES = ['Tech', 'Dev', 'Design', 'Tutorial', 'News', 'Other']

export default function BlogForm({ blog }: { blog?: Blog }) {
  const router = useRouter()
  const isEdit = !!blog

  const [form, setForm] = useState<BlogPayload>({
    title: blog?.title || '',
    content: blog?.content || '',
    category: blog?.category || 'Tech',
    image: blog?.image || '',
    status: blog?.status || 'draft',
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof BlogPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImageUpload(file: File) {
    try {
      setUploading(true)
      setError('')

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Image upload failed')
      }

      if (data.url) {
        update('image', data.url)
      }
    } catch {
      setError('Image upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit() {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required')
      return
    }

    setError('')
    setLoading(true)

    try {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, '-')
        .trim()

      if (isEdit) {
        await updateBlog(blog._id, { ...form, slug })
      } else {
        await createBlog({ ...form, slug })
      }

      router.push('/admin/blogs')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const previewImage =
    form.image && (form.image.startsWith('http') || form.image.startsWith('/'))
      ? form.image
      : form.image
        ? `/${form.image}`
        : ''

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>
          {isEdit ? 'Edit Blog' : 'New Blog'}
        </h1>

        <button onClick={() => router.push('/admin/blogs')} style={outlineBtn}>
          ← Back
        </button>
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: '1.5rem',
        }}
      >
        {error && (
          <div
            style={{
              background: '#fef2f2',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 13,
              marginBottom: '1rem',
              border: '1px solid #fecaca',
            }}
          >
            {error}
          </div>
        )}

        <div style={fieldWrap}>
          <label style={labelStyle}>Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Blog title..."
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: '1rem',
          }}
        >
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value as any)}
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
            type="text"
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="Image URL or uploaded image path"
            style={inputStyle}
          />

          <div
            style={{
              margin: '12px 0',
              textAlign: 'center',
              color: '#64748b',
              fontSize: 13,
            }}
          >
            OR
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />

          {uploading && (
            <p style={{ marginTop: 8, color: '#2563eb', fontSize: 13 }}>
              Uploading image...
            </p>
          )}

          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              style={{
                marginTop: 12,
                width: '100%',
                maxHeight: 250,
                objectFit: 'cover',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
              }}
            />
          )}
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Content *</label>
          <textarea
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
            placeholder="Write blog content here..."
            rows={14}
            style={{
              ...inputStyle,
              resize: 'vertical',
              lineHeight: 1.7,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            style={{
              padding: '10px 20px',
              background: loading || uploading ? '#93c5fd' : '#1e40af',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: loading || uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading
              ? 'Saving...'
              : isEdit
                ? '💾 Update Blog'
                : '🚀 Publish Blog'}
          </button>

          <button onClick={() => router.push('/admin/blogs')} style={outlineBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const fieldWrap: React.CSSProperties = {
  marginBottom: '1rem',
}

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
  fontFamily: 'sans-serif',
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