"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const tools = [
  {
    id: 1,
    title: "Collaboration",
    image: "/assets/images/tools-technologies-card-img1.png",
    desc: "We pride ourselves on innovation and collaboration to shape the digital world together.",
  },
  {
    id: 2,
    title: "Cloud Platform",
    image: "/assets/images/tools-technologies-card-img2.png",
    desc: "Modern cloud infrastructure and scalable deployment solutions for businesses.",
  },
  {
    id: 3,
    title: "Network & Connectivity",
    image: "/assets/images/tools-technologies-card-img3.png",
    desc: "Reliable networking and connectivity solutions with secure architecture.",
  },
  {
    id: 4,
    title: "Collaboration",
    image: "/assets/images/tools-technologies-card-img1.png",
    desc: "We help teams work better with powerful tools and smooth workflows.",
  },
  {
    id: 5,
    title: "Cloud Platform",
    image: "/assets/images/tools-technologies-card-img2.png",
    desc: "Scalable cloud services for fast and secure digital transformation.",
  },
  {
    id: 6,
    title: "Network & Connectivity",
    image: "/assets/images/tools-technologies-card-img3.png",
    desc: "Strong network systems for better performance and reliability.",
  },
];

export default function ToolsTechnologies() {
  return (
    <div className="tools-and-technologies-section mb-120">
      <div className="container">
        <div className="row justify-content-center mb-70">
          <div className="col-lg-12">
            <div className="section-title white text-center">
              <span className="fade_anim" data-delay=".3" data-fade-from="top">
                What We Use
              </span>
              <h2 className="text-anim">Tools And Technologies</h2>
            </div>
          </div>
        </div>

        <Swiper
  
  modules={[Autoplay, Navigation]}
  className="home1-service-slider"
  slidesPerView={1}
  speed={1500}
  spaceBetween={24}
  loop={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  navigation={{
    nextEl: ".tools-slider-next",
    prevEl: ".tools-slider-prev",
  }}
  breakpoints={{
    280: {
      slidesPerView: 1,
    },
    386: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  }}
>
          {tools.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tools-technologies-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <img src={item.image} alt={item.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

 <div className="slider-btn-grp">
                    <div className="slider-btn tools-slider-prev">
                        <svg width="21" height="12" viewBox="0 0 21 12" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.75 6.27295C20.1642 6.27295 20.5 5.93716 20.5 5.52295C20.5 5.10874 20.1642 4.77295 19.75 4.77295L19.75 5.52295L19.75 6.27295ZM0.219669 4.99262C-0.0732231 5.28551 -0.0732231 5.76039 0.219669 6.05328L4.99264 10.8263C5.28553 11.1191 5.76041 11.1191 6.0533 10.8263C6.34619 10.5334 6.34619 10.0585 6.0533 9.76559L1.81066 5.52295L6.0533 1.28031C6.34619 0.987416 6.34619 0.512543 6.0533 0.21965C5.76041 -0.0732438 5.28553 -0.0732438 4.99264 0.21965L0.219669 4.99262ZM19.75 5.52295L19.75 4.77295L0.75 4.77295L0.75 5.52295L0.75 6.27295L19.75 6.27295L19.75 5.52295Z" />
                        </svg>
                    </div>
                    <div className="slider-btn tools-slider-next">
                        <svg width="21" height="12" viewBox="0 0 21 12" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.75 4.77295C0.335786 4.77295 0 5.10874 0 5.52295C0 5.93716 0.335786 6.27295 0.75 6.27295L0.75 5.52295L0.75 4.77295ZM20.2803 6.05328C20.5732 5.76039 20.5732 5.28551 20.2803 4.99262L15.5074 0.219648C15.2145 -0.073245 14.7396 -0.073245 14.4467 0.219648C14.1538 0.512542 14.1538 0.987415 14.4467 1.28031L18.6893 5.52295L14.4467 9.76559C14.1538 10.0585 14.1538 10.5334 14.4467 10.8263C14.7396 11.1191 15.2145 11.1191 15.5074 10.8263L20.2803 6.05328ZM0.75 5.52295L0.75 6.27295L19.75 6.27295V5.52295V4.77295L0.75 4.77295L0.75 5.52295Z" />
                        </svg>
                    </div>
                </div>
    </div>
  );
}