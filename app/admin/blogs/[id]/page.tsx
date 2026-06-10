'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getBlogById, Blog } from '@/lib/api'
import BlogForm from '../BlogForm'

export default function EditBlogPage() {
  const params = useParams()
  const id = params?.id as string

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      setError('Blog ID not found')
      setLoading(false)
      return
    }

    getBlogById(id)
      .then((data) => {
        setBlog(data)
        setError('')
      })
      .catch(() => {
        setError('Blog not found')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <p style={{ padding: '2rem', color: '#94a3b8' }}>
        Loading blog...
      </p>
    )
  }

  if (error || !blog) {
    return (
      <p style={{ padding: '2rem', color: '#dc2626' }}>
        {error || 'Blog not found'}
      </p>
    )
  }

  return <BlogForm blog={blog} />
}