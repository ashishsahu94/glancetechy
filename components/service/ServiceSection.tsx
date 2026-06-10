"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const services = [
  {
    id: 1,
    number: "01",
    title: "Web & App Development",
    image: "/assets/images/service-section-img1.jpg",
    link: "/service-details",
  },
  {
    id: 2,
    number: "02",
    title: "UI/UX Design",
    image: "/assets/images/home1-service-section-img2.jpg",
    link: "/service-details",
  },
  {
    id: 3,
    number: "03",
    title: "Cloud Solutions",
    image: "/assets/images/home1-service-section-img3.jpg",
    link: "/service-details",
  },
    {
    id: 4,
    number: "04",
    title: "Data Analytics & Management",
    image: "/assets/images/home1-service-section-img3.jpg",
    link: "/service-details",
  },
    {
    id: 5,
    number: "05",
    title: "Cybersecurity Services",
    image: "/assets/images/home1-service-section-img3.jpg",
    link: "/service-details",
  },
    {
    id: 6,
    number: "06",
    title: "IT Consulting",
    image: "/assets/images/service-section-img6.jpg",
    link: "/service-details",
  },
  {
    id: 7,
    number: "07",
    title: "Software Development",
    image: "/assets/images/home1-service-section-img3.jpg",
    link: "/service-details",
  },
    {
    id: 8,
    number: "08",
    title: "E-Commerce Solutions",
    image: "/assets/images/service-section-img8.jpg",
    link: "/service-details",
  },
    {
    id: 9,
    number: "09",
    title: "Website Maintenance & Support",
    image: "/assets/images/home1-service-section-img3.jpg",
    link: "/service-details",
  },
];

export default function ServiceSection() {
  return (
    <div className="home1-service-section mb-120">
      <div className="container">
        <div className="section-title-and-btn mb-70">
          <div className="section-title">
            <span className="black fade_anim" data-delay=".3" data-fade-from="top">
              IT Solutions
            </span>
            <h2 className="text-anim">Future-Ready IT Services</h2>
          </div>

          <a href="/service" className="primary-btn1 black-bg fade_anim">
            <span>View All Service</span>
          </a>
        </div>
      </div>

      <div className="container-fluid">
        <div className="service-wrapper">
          <Swiper
              modules={[Autoplay]}
              className="home1-service-slider"
              slidesPerView={1}
              speed={1500}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 2500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
              breakpoints={{
                280: {
                  slidesPerView: 1,
                },

                386: {
                  slidesPerView: 1,
                },

                576: {
                  slidesPerView: 2,
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

                1600: {
                  slidesPerView: 4,
                },
              }}
            >
            {services.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="service-card">
                  <div className="service-content">
                    <span>{item.number}</span>
                    <h3>
                      <a href={item.link}>{item.title}</a>
                    </h3>
                  </div>

                  <div className="service-img-wrapper">
                      <a className="service-img shape-hover-item" href={item.link}>
                    <div
                      className="shape-hover-img"
                      data-displacement="/assets/images/hover-img-shape7.png"
                      data-intensity="0.6"
                      data-speedin="1"
                      data-speedout="1"
                    >
                      <img src={item.image} alt={item.title} />
                    </div>
                  </a>

                  <a className="text-black" href={item.link}>
                    EXPLORE MORE
                  </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}