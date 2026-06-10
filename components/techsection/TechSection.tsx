"use client";

const techItems = [
  { img: "/assets/images/home1-tech-img1.svg", name: "HTML" },
  { img: "/assets/images/home1-tech-img2.svg", name: "Angular" },
  { img: "/assets/images/home1-tech-img3.svg", name: "CSS" },
  { img: "/assets/images/home1-tech-img4.svg", name: "Bootstrap" },
  { img: "/assets/images/home1-tech-img5.svg", name: "Vue JS" },
  { img: "/assets/images/home1-tech-img6.svg", name: "Tailwind" },
  { img: "/assets/images/home1-tech-img7.svg", name: "jQuery" },
  { img: "/assets/images/home1-tech-img8.svg", name: "GraphQL" },
  { img: "/assets/images/home1-tech-img9.svg", name: "React JS" },
  { img: "/assets/images/home1-tech-img10.svg", name: "Sass" },
];

const tabs = [
  { id: "frontend", label: "Front-End" },
  { id: "backend", label: "Back-End" },
  { id: "mobile-develop", label: "Mobile Develop" },
];

export default function TechSection() {
  return (
    <div className="home1-tech-section mb-120">
      <div className="container">
        <div className="row justify-content-center mb-70">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="black fade_anim" data-delay=".3" data-fade-from="top">
                Advance TECHNOLOGY
              </span>
              <h2 className="text-anim">Tech talk trends and tips</h2>
            </div>
          </div>
        </div>

        <div className="tech-wrapper fade_anim" data-delay=".3" data-fade-from="bottom">
          <div className="tap-wrapper-area">
            <div className="d-flex align-items-start g-0">
              <div
                className="nav nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`nav-link ${index === 0 ? "active" : ""}`}
                    id={`v-pills-${tab.id}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#v-pills-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-controls={`v-pills-${tab.id}`}
                    aria-selected={index === 0 ? "true" : "false"}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tab-content" id="v-pills-tabContent">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                  id={`v-pills-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`v-pills-${tab.id}-tab`}
                >
                  <ul className="tech-list">
                    {techItems.map((item) => (
                      <li key={item.name}>
                        <img src={item.img} alt={item.name} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}