import Link from "next/link";

type BreadcrumbProps = {
  title: string;
  currentPage: string;
  bgImage?: string;
};

export default function Breadcrumb({
  title,
  currentPage,
  bgImage,
}: BreadcrumbProps) {
  return (
    <div
      className="breadcrumb-section mb-120"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-content">
              <h1>{title}</h1>

              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">HOME</Link>
                  <span>/</span>
                </li>
                <li>{currentPage}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}