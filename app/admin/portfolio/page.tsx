'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Portfolio = {
  _id: string
  title: string
  slug: string
  category: string
  status: string
  image?: string
  createdAt?: string
}

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => setPortfolios(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Portfolio</h1>

        <Link
          href="/admin/portfolio/new"
          style={{
            background: '#1e40af',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          + New Portfolio
        </Link>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12 }}>
        {loading ? (
          <p style={{ padding: 20 }}>Loading portfolio...</p>
        ) : portfolios.length === 0 ? (
          <p style={{ padding: 20 }}>No portfolio found.</p>
        ) : (
          portfolios.map((item) => (
            <div
              key={item._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 16,
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <img
                src={item.image || '/assets/images/project-img1.jpg'}
                alt={item.title}
                style={{
                  width: 90,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>{item.title}</h3>
                <p style={{ margin: '4px 0', color: '#64748b', fontSize: 13 }}>
                  {item.category} · {item.status}
                </p>
              </div>

              <Link href={`/portfolio/${item.slug}`} target="_blank">
                View
              </Link>

              <Link href={`/admin/portfolio/edit/${item._id}`}>
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}