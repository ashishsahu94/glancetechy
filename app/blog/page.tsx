'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'

interface Blog {
  _id: string
  title: string
  slug: string
  content: string
  category: string
  image: string
  author: string
  status: string
  createdAt: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs/public')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Breadcrumb title="Blog" currentPage="Blog" bgImage="assets/images/breadcrumb-bg.jpg" />

      <div className="home1-blog-section two mb-120">
        <div className="container">

          {loading && (
            <div className="text-center py-5">
              <h4>Loading blogs...</h4>
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-5">
              <h4>No blogs found.</h4>
            </div>
          )}

          <div className="row gy-5 mb-70">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className={`col-lg-4 col-md-6 ${
                  index === 1
                    ? 'd-flex justify-content-lg-center'
                    : index === 2
                    ? 'd-flex justify-content-lg-end'
                    : ''
                }`}
                data-lag={`0.${index + 2}`}
              >
                <div className="blog-card">
                  <Link
                    className="blog-img shape-hover-item"
                    href={`/blog/${blog.slug}`}
                  >
                    <div
                      className="shape-hover-img"
                      data-displacement="/assets/images/hover-img-shape3.png"
                      data-intensity="0.6"
                      data-speedin="1"
                      data-speedout="1"
                    >
                <img
                    className="blog-details-img"
                    src={
                      blog.image && (blog.image.startsWith('http') || blog.image.startsWith('/'))
                        ? blog.image
                        : blog.image
                          ? `/${blog.image}`
                          : '/assets/images/home1-blog-img1.jpg'
                    }
                    alt={blog.title}
                  />
                    </div>
                  </Link>

                  <div className="blog-card-content">
                    <Link
                      className="blog-date"
                      href={`/blog/${blog.slug}`}
                    >
                      <span>
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString(
                              'en-IN',
                              {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              }
                            )
                          : ''}
                      </span>
                    </Link>

                    <ul>
                      <li>
                        <Link className="tag" href="/blog">
                          {blog.category || 'Industry'}
                        </Link>
                      </li>

                      <li>
                        {/* <Link className="tag2" href="/blog">
                          By {blog.author || 'Admin'}
                        </Link> */}
                        <Link className="tag2" href="/blog">
                          By {blog.author}
                        </Link>
                      </li>
                    </ul>

                    <h2>
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="pagination-area-wrap">
                <div className="paginations-button">
                  <a href="#">
                    Previous
                  </a>
                </div>

                <ul className="paginations">
                  <li className="page-item active">
                    <a href="#">01</a>
                  </li>
                </ul>

                <div className="paginations-button">
                  <a href="#">
                    Next
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}