import Link from "next/link";

type CaseStudy = {
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  delay: string;
};

const caseStudies: CaseStudy[] = [
  {
    category: "Steel and Metal",
    title: "Increased Organic Traffic in Social Media.",
    description:
      "Discover thousands off easy tour customized themes, templates & CMS products, made by world-class developers.",
    image: "/assets/images/inner-case-card-img1.jpg",
    tags: ["Paid Search", "Paid Social", "SEO", "Social"],
    delay: ".2",
  },
  {
    category: "Banking & Finance",
    title: "This help reade underst scope & complexity.",
    description:
      "Discover thousands off easy tour customized themes, templates & CMS products, made by world-class developers.",
    image: "/assets/images/inner-case-card-img2.jpg",
    tags: ["Paid Search", "Paid Social", "SEO", "Social"],
    delay: ".3",
  },
  {
    category: "Pharmaceuticals",
    title: "Clearly define the probo client was facing.",
    description:
      "Discover thousands off easy tour customized themes, templates & CMS products, made by world-class developers.",
    image: "/assets/images/inner-case-card-img3.jpg",
    tags: ["Paid Search", "Paid Social", "SEO", "Social"],
    delay: ".4",
  },
];

export default function CaseStudySection() {
  return (
    <div className="inner-case-study-section mb-120">
      <div className="container">
        <div className="row justify-content-center mb-70">
          <div className="col-lg-6">
            <div className="section-title text-center">
              <span className="fade_anim" data-delay=".3" data-fade-from="top">
                Case Study
              </span>
              <h2 className="text-anim">Success in Action Case</h2>
            </div>
          </div>
        </div>

        <div className="row gy-5 mb-50">
          {caseStudies.map((item) => (
            <div
              key={item.title}
              className="col-lg-4 col-md-6 fade_anim"
              data-delay={item.delay}
              data-fade-from="top"
            >
              <div className="inner-case-study-card">
                <Link
                  className="case-study-img shape-hover-item"
                  href="/case-study-details"
                >
                  <div
                    className="shape-hover-img"
                    data-displacement="/assets/images/hover-img-shape7.png"
                    data-intensity="0.6"
                    data-speedin="1"
                    data-speedout="1"
                  >
                    <img src={item.image} alt={item.title} />
                  </div>
                </Link>

                <div className="inner-case-study-content-wrap">
                  <div className="inner-case-study-content">
                    <span>{item.category}</span>

                    <h3>
                      <Link href="/case-study-details">{item.title}</Link>
                    </h3>

                    <p>{item.description}</p>
                  </div>

                  <ul className="case-study-list">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Link href="/case-study">{tag}</Link>
                      </li>
                    ))}
                  </ul>

                  <Link className="case-btn" href="/case-study-details">
                    <span>Read Success Stories</span>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.2305 7.72144C10.6052 7.72144 9.12388 6.22144 9.12388 4.57279V3.89711H7.79055V4.57279C7.79055 5.77144 8.30921 6.89576 9.12321 7.72144H3.89722V9.07279H9.12321C8.30921 9.89847 7.79055 11.0228 7.79055 12.2214V12.8971H9.12388V12.2214C9.12388 10.5735 10.6052 9.07279 12.2305 9.07279H12.8972V7.72144H12.2305Z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <Link
              className="primary-btn1 black-bg fade_anim"
              data-delay=".4"
              data-ease="bounce"
              href="/case-study"
            >
              <span>
                View All Case
                <svg viewBox="0 0 13 20">
                  <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}