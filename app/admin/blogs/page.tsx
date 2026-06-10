'use client'
import { useEffect, useState } from 'react'
import { getBlogs, deleteBlog, Blog } from '@/lib/api'
import Link from 'next/link'

export default function BlogsPage() {
  const [blogs,   setBlogs]   = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchBlogs() }, [])

  async function fetchBlogs() {
    try { setBlogs(await getBlogs()) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Yeh blog delete karna chahte ho?')) return
    try {
      await deleteBlog(id)
      setBlogs(prev => prev.filter(b => b._id !== id))
    } catch { alert('Delete nahi hua, dobara try karo') }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>All Blogs</h1>
        <Link href="/admin/blogs/new" style={{
          background: '#1e40af', color: '#fff', padding: '9px 16px',
          borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500,
        }}>
          + New Blog
        </Link>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12 }}>
        {loading ? (
          <p style={{ padding: '2rem', color: '#94a3b8', textAlign: 'center' }}>Loading...</p>
        ) : blogs.length === 0 ? (
          <p style={{ padding: '2rem', color: '#94a3b8', textAlign: 'center' }}>
            Koi blog nahi hai. Pehla blog banao!
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Title', 'Category', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px',
                    color: '#64748b', fontWeight: 500, borderBottom: '1px solid #e2e8f0',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td style={td}><strong>{blog.title}</strong></td>
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
                  <td style={td}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/admin/blogs/${blog._id}`} style={{
                        padding: '6px 12px', borderRadius: 6, fontSize: 13,
                        border: '1px solid #bfdbfe', textDecoration: 'none',
                        color: '#1e40af', background: '#eff6ff',
                      }}>✏️ Edit</Link>
                      <button onClick={() => handleDelete(blog._id)} style={{
                        padding: '6px 12px', borderRadius: 6, fontSize: 13,
                        border: '1px solid #fecaca', cursor: 'pointer',
                        color: '#dc2626', background: '#fef2f2',
                      }}>🗑️ Delete</button>
                    </div>
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

const td: React.CSSProperties = { padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }
