import { notFound } from 'next/navigation'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb'
import dbConnect from '@/lib/dbConnect'
import Portfolio from '@/models/Portfolio'

type Props = {
  params: Promise<{
    slug: string
  }>
}

function imgPath(image?: string) {
  if (!image) return '/assets/images/portfolio-details-big-img.jpg'
  if (image.startsWith('http') || image.startsWith('/')) return image
  return `/${image}`
}

export default async function PortfolioDetailsPage({ params }: Props) {
  const { slug } = await params

  await dbConnect()

  const portfolio = await Portfolio.findOne({
    slug,
    status: 'published',
  }).lean()

  if (!portfolio) {
    notFound()
  }

  return (
    <>
      <Breadcrumb
        title={portfolio.title}
        currentPage="Portfolio Details"
        bgImage="/assets/images/breadcrumb-bg.jpg"
      />

      <div className="portfolio-details-page mb-120">
        <div className="container">
          <img
            className="portfolio-big-img"
            src={imgPath(portfolio.image)}
            alt={portfolio.title}
          />

          <div className="row g-lg-4 gy-5 mb-80">
            <div className="col-lg-8">
              <div className="details-content-wrapper">
                <h2>{portfolio.title}</h2>

                <span className="line-break"></span>

                <div
                  dangerouslySetInnerHTML={{
                    __html: portfolio.content || '',
                  }}
                />

                {portfolio.tags && portfolio.tags.length > 0 && (
                  <>
                    <span className="line-break"></span>
                    <ul className="list-area column">
                      {portfolio.tags.map((tag: string) => (
                        <li key={tag}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                          >
                            <path d="M0.376831 8.16821C-0.247095 8.54593 -0.0579659 9.49862 0.662688 9.60837C1.24211 9.69666 1.52052 10.3701 1.17304 10.8431C0.740845 11.4312 1.27942 12.2389 1.98713 12.0639C2.55609 11.9231 3.07065 12.4387 2.9302 13.0088C2.75556 13.718 3.56158 14.2577 4.14855 13.8246C4.62054 13.4764 5.29275 13.7554 5.38073 14.336C5.49024 15.0581 6.44099 15.2476 6.81798 14.6224C7.12107 14.1198 7.84864 14.1198 8.15171 14.6224C8.52867 15.2476 9.47943 15.0581 9.58896 14.336C9.67707 13.7554 10.3492 13.4764 10.8211 13.8246C11.4081 14.2577 12.2142 13.718 12.0395 13.0088C11.899 12.4387 12.4136 11.9231 12.9826 12.0639C13.6903 12.2389 14.2289 11.4312 13.7967 10.8431C13.4492 10.3701 13.7276 9.69653 14.307 9.60837C15.0276 9.49864 15.2168 8.54597 14.5929 8.16821C14.0912 7.86452 14.0912 7.13547 14.5929 6.83178C15.2168 6.45407 15.0277 5.50138 14.307 5.39162C13.7276 5.30334 13.4492 4.62989 13.7967 4.15695C14.2289 3.56879 13.6903 2.76112 12.9826 2.93613C12.4136 3.07687 11.8991 2.5613 12.0395 1.99115C12.2141 1.28199 11.4081 0.742345 10.8211 1.17541C10.3492 1.52356 9.67695 1.2446 9.58896 0.664029C9.47945 -0.0580599 8.5287 -0.247606 8.15171 0.377594C7.84863 0.880237 7.12106 0.880237 6.81798 0.377594C6.44103 -0.247596 5.49027 -0.0580833 5.38073 0.664029C5.29263 1.24462 4.62054 1.5236 4.14855 1.17541C3.56158 0.742345 2.75554 1.28201 2.9302 1.99115C3.07065 2.56126 2.55612 3.07686 1.98713 2.93613C1.2794 2.76113 0.740845 3.56879 1.17304 4.15695C1.52049 4.62989 1.24209 5.30346 0.662688 5.39162C-0.0579425 5.50136 -0.247105 6.45403 0.376831 6.83178C0.878459 7.13548 0.878459 7.86453 0.376831 8.16821Z" />
                          </svg>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="project-details-sidebar">
                <div className="project-info-wrap mb-35">
                  <ul className="project-info">
                    <li>
                      <div className="content">
                        <span>Client:</span>
                        <h4>{portfolio.client || 'GlanceTechy'}</h4>
                      </div>
                    </li>

                    <li>
                      <div className="content">
                        <span>Company:</span>
                        <h4>{portfolio.company || 'GlanceTechy'}</h4>
                      </div>
                    </li>

                    <li>
                      <div className="content">
                        <span>Category:</span>
                        <h4>{portfolio.category}</h4>
                      </div>
                    </li>

                    {portfolio.projectUrl && (
                      <li>
                        <div className="content">
                          <span>Project URL:</span>
                          <h4>
                            <a
                              href={portfolio.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website
                            </a>
                          </h4>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}