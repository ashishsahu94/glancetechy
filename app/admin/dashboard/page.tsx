'use client'
import { useEffect, useState } from 'react'
import { getBlogs, Blog } from '@/lib/api'
import Link from 'next/link'

export default function DashboardPage() {
  const [blogs,   setBlogs]   = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs().then(setBlogs).catch(console.error).finally(() => setLoading(false))
  }, [])

  const published = blogs.filter(b => b.status === 'published').length
  const drafts    = blogs.filter(b => b.status === 'draft').length

  const stats = [
    { label: 'Total Blogs', value: blogs.length, color: '#1e40af' },
    { label: 'Published',   value: published,     color: '#15803d' },
    { label: 'Drafts',      value: drafts,         color: '#b45309' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: '1.5rem' }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: '2rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: '1.25rem',
          }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>
              {loading ? '—' : s.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600 }}>Recent Blogs</h2>
          <Link href="/admin/blogs/new" style={{
            background: '#1e40af', color: '#fff', padding: '7px 14px',
            borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500,
          }}>
            + New Blog
          </Link>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Loading...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Title', 'Category', 'Status', 'Date'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '8px 12px',
                    color: '#64748b', fontWeight: 500, borderBottom: '1px solid #e2e8f0',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.slice(0, 5).map(blog => (
                <tr key={blog._id}>
                  <td style={td}>{blog.title}</td>
                  <td style={{ ...td, color: '#64748b' }}>{blog.category}</td>
                  <td style={td}>
                    <span style={{
                      fontSize: 12, padding: '3px 10px', borderRadius: 99,
                      background: blog.status === 'published' ? '#dcfce7' : '#fef9c3',
                      color:      blog.status === 'published' ? '#15803d' : '#a16207',
                    }}>
                      {blog.status}
                    </span>
                  </td>
                  <td style={{ ...td, color: '#64748b' }}>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const td: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }
