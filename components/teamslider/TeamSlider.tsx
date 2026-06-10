"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const teamMembers = [
  {
    name: "Ashish Sahu",
    role: "CTO, Founder",
    image: "/assets/images/team-card-img1.jpg",
  },
  {
    name: "Anuj Kumar",
    role: "SEO Manager",
    image: "/assets/images/team-card-img1.jpg",
  },
  {
    name: "Vishal Sharma",
    role: "UI/UX Designer",
    image: "/assets/images/team-card-img2.jpg",
  },
  {
    name: "Kamal Gupta",
    role: "Software Engineer",
    image: "/assets/images/team-card-img1.jpg",
  },
  {
    name: "Olivern James",
    role: "CTO, Founder",
    image: "/assets/images/team-card-img1.jpg",
  },
  {
    name: "Olivern James",
    role: "CTO, Founder",
    image: "/assets/images/team-card-img1.jpg",
  },
];

function LinkedInIcon() {
  return (
    <i className="bi bi-linkedin ms-2"></i>
  );
}

export default function TeamSlider() {
  return (
    <div className="home2-team-section mb-120">
      <div className="container">
        <div className="section-title-and-navigation mb-70">
          <div className="section-title">
            <h2 className="text-anim">Meet the Minds</h2>
            <p>
              We pride ourselves staying at the front of innovation, constantly
              pushing the Digital World Together boundaries and redefining.
            </p>
          </div>

          <div className="slider-btn-grp">
            <div className="slider-btn team-slider-prev">
              <svg width="21" height="12" viewBox="0 0 21 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.75 6.27295C20.1642 6.27295 20.5 5.93716 20.5 5.52295C20.5 5.10874 20.1642 4.77295 19.75 4.77295L19.75 6.27295ZM0.219669 4.99262C-0.0732231 5.28551 -0.0732231 5.76039 0.219669 6.05328L4.99264 10.8263C5.28553 11.1191 5.76041 11.1191 6.0533 10.8263C6.34619 10.5334 6.34619 10.0585 6.0533 9.76559L1.81066 5.52295L6.0533 1.28031C6.34619 0.987416 6.34619 0.512543 6.0533 0.21965C5.76041 -0.0732438 5.28553 -0.0732438 4.99264 0.21965L0.219669 4.99262ZM19.75 4.77295L0.75 4.77295L0.75 6.27295L19.75 6.27295L19.75 4.77295Z" />
              </svg>
            </div>

            <div className="slider-btn team-slider-next">
              <svg width="21" height="12" viewBox="0 0 21 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 4.77295C0.335786 4.77295 0 5.10874 0 5.52295C0 5.93716 0.335786 6.27295 0.75 6.27295L0.75 4.77295ZM20.2803 6.05328C20.5732 5.76039 20.5732 5.28551 20.2803 4.99262L15.5074 0.219648C15.2145 -0.073245 14.7396 -0.073245 14.4467 0.219648C14.1538 0.512542 14.1538 0.987415 14.4467 1.28031L18.6893 5.52295L14.4467 9.76559C14.1538 10.0585 14.1538 10.5334 14.4467 10.8263C14.7396 11.1191 15.2145 11.1191 15.5074 10.8263L20.2803 6.05328ZM0.75 6.27295L19.75 6.27295V4.77295L0.75 4.77295L0.75 6.27295Z" />
              </svg>
            </div>
          </div>
        </div>

        <Swiper
          className="team-card-slider"
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          speed={1500}
          spaceBetween={40}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".team-slider-next",
            prevEl: ".team-slider-prev",
          }}
          breakpoints={{
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 2, spaceBetween: 18 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            992: { slidesPerView: 3, spaceBetween: 24 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
            1400: { slidesPerView: 4 },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="team-card">
                <div className="team-card-img">
                  <img src={member.image} alt={member.name} />

                  <div className="team-card-content">
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                  </div>

                  <ul className="social-list">
                   <li className="d-flex align-items-center">
                      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="row pt-60">
          <div className="col-lg-12 d-flex justify-content-center">
            <a href="/our-team" className="primary-btn1 black-bg fade_anim" data-delay=".4" data-ease="bounce">
              <span>
                View All Team
                <svg viewBox="0 0 13 20">
                  <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5"></polyline>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}