'use client'

import { useEffect, useState } from 'react'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'
import Link from 'next/link'

type Portfolio = {
  _id: string
  title: string
  slug: string
  category: string
  image: string
  tags: string[]
  status: string
  createdAt: string
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio/public')
      .then((res) => res.json())
      .then((data) => {
        setPortfolios(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        setPortfolios([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Breadcrumb
        title="Portfolio"
        currentPage="Portfolio"
        bgImage="/assets/images/breadcrumb-bg.jpg"
      />

      <div className="home2-project-section three mb-120">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <h4>Loading portfolio...</h4>
            </div>
          )}

          {!loading && portfolios.length === 0 && (
            <div className="text-center py-5">
              <h4>No portfolio found.</h4>
            </div>
          )}

          <div className="row gy-4">
            {portfolios.map((portfolio, index) => (
              <div className="col-lg-6" key={portfolio._id}>
                <div
                  className="project-card fade_anim"
                  data-delay={`0.${index + 2}`}
                  data-fade-from="top"
                >
                  <img
                    src={
                      portfolio.image ||
                      '/assets/images/project-img1.jpg'
                    }
                    alt={portfolio.title}
                  />

                  <div className="project-content-wrap">
                    <span>{portfolio.category}</span>

                    <h2>
                      <Link href={`/portfolio/${portfolio.slug}`}>
                        {portfolio.title}
                      </Link>
                    </h2>

                    <div className="project-content">
                      <ul className="tag-list">
                        {portfolio.tags?.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>

                      <Link
                        className="primary-btn1 transparent"
                        href={`/portfolio/${portfolio.slug}`}
                      >
                        <span>
                          View Details
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}