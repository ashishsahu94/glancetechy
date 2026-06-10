import Link from "next/link";
import NewsletterForm from "../newsletter/NewsletterForm";

export default function Footer() {
  return (
    <footer className="footer-section style-2 bg-light">
        <div className="container">
            <div className="contact-area-and-logo-wrapper">
                <a href="index.html"><img src="/assets/images/logo.svg" alt="" /></a>
                <ul className="contact-area-and-logo">
                    <li>
                        <div className="single-contact">
                            <div className="icon">
                                <svg width="33" height="33" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path d="M21.1025 0.50293C21.2645 0.499596 21.4279 0.499593 21.5898 0.50293C25.3686 0.580127 28.7664 2.59489 30.6826 5.90137C32.6423 9.28327 32.6961 13.3412 30.8271 16.7627L22.6445 31.7383C22.6407 31.7452 22.6397 31.7482 22.6387 31.75L22.6377 31.751C22.3667 32.222 21.8866 32.5 21.3457 32.5C20.8048 32.4999 20.3247 32.222 20.0537 31.751V31.75L20.0469 31.7383H20.0459L11.8652 16.7627C9.99601 13.3412 10.049 9.28336 12.0088 5.90137C13.9251 2.59472 17.3236 0.580017 21.1025 0.50293ZM21.3457 5.17188C18.5108 5.17195 16.2051 7.47756 16.2051 10.3125C16.2051 13.1475 18.5108 15.4531 21.3457 15.4531C24.1808 15.4531 26.4863 13.1475 26.4863 10.3125C26.4863 7.47752 24.1807 5.17188 21.3457 5.17188Z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="content">
                                <span>Address</span>
                                <h3><a href="https://www.google.com/maps">Lucknow, India</a></h3>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="single-contact">
                            <div className="icon">
                                <svg width="33" height="33" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path d="M16.8169 26.3799L13.4897 30.9082C13.4232 30.9969 13.3308 31.0631 13.2251 31.0967C13.1186 31.1305 13.0041 31.1295 12.8979 31.0947C12.7918 31.0599 12.6991 30.9927 12.6333 30.9023C12.5841 30.8347 12.552 30.7566 12.5386 30.6748L12.5317 30.5918V24.915L16.8169 26.3799ZM32.0054 0.500977C32.0787 0.506037 32.1497 0.526817 32.2144 0.560547L32.2769 0.598633C32.3568 0.655612 32.4191 0.733891 32.4575 0.824219C32.4958 0.914475 32.509 1.01336 32.4946 1.11035L28.7134 26.5449C28.7015 26.6219 28.6736 26.6959 28.6304 26.7607C28.5871 26.8255 28.5299 26.8803 28.4634 26.9209C28.3967 26.9615 28.3212 26.9874 28.2437 26.9961C28.1663 27.0047 28.087 26.9955 28.0132 26.9707L14.2886 22.2793L27.9985 5.76172L27.2896 5.0625L9.18896 20.5381L0.861816 17.6914C0.76364 17.6572 0.67715 17.5951 0.61377 17.5127C0.550527 17.4303 0.513204 17.3311 0.505371 17.2275C0.497563 17.124 0.519726 17.0206 0.569824 16.9297C0.619588 16.8396 0.69397 16.7644 0.784668 16.7158L0.785645 16.7168L31.7231 0.560547C31.81 0.515227 31.9076 0.49424 32.0054 0.500977Z"></path>
                                    </g>
                                </svg>

                            </div>
                            <div className="content">
                                <span>SAY HELLO</span>
                                <h3><a href="mailto:flancetechy@gmail.com">flancetechy@gmail.com</a></h3>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="footer-menu">
                <div className="row justify-content-between gy-5">
                    <div className="col-lg-4 col-md-12">
                        <div className="text-and-rating-area">
                            <div className="content">
                                <p>Welcome to Qleviq, where innovation meets our passion in a journey that
                                    started with a simple idea and a shared dream.</p>
                            </div>
                            <ul className="rating-area-wrap">
                                <li>
                                    <a href="https://clutch.co/" className="single-rating">
                                        <div className="review">
                                            <span>Review On</span>
                                            <img src="/assets/images/clutch-logo-white.svg" alt="" />
                                        </div>
                                        <div className="rating">
                                            <ul className="star">
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-half"></i></li>
                                            </ul>
                                            <span>(50 reviews)</span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.google.com/" className="single-rating google">
                                        <div className="review">
                                            <span>Review On</span>
                                            <img src="/assets/images/google-icon.svg" alt="" />
                                        </div>
                                        <div className="rating">
                                            <ul className="star">
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-fill"></i></li>
                                                <li><i className="bi bi-star-half"></i></li>
                                            </ul>
                                            <span>(50 reviews)</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="social-area">
                                <h4>View On Social Media</h4>
                                <ul className="social-list">
                                    <li>
                                        <a href="https://www.linkedin.com/">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/">
                                            <i className="bi bi-twitter-x"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/">
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-5 d-flex justify-content-lg-center">
                        <div className="footer-widget">
                            <div className="widget-title">
                                <h5>Solutions</h5>
                            </div>
                            <div className="menu-container">
                                <ul className="widget-list">
                                    <li>
                                        <a href="service-details.html">
                                            Custom Software
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="service-details.html">
                                            Cloud Solutions
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="service-details.html">
                                            Web and Mobile App
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="service-details.html">
                                            Enterprise Software
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="service-details.html">
                                            Data Solutions
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="service-details.html">
                                            Cyber Security
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 d-flex justify-content-lg-end">
                        <div className="footer-widget">
                            <div className="widget-title">
                                <h5>Company</h5>
                            </div>
                            <div className="menu-container">
                                <ul className="widget-list">
                                    <li>
                                        <a href="about-us.html">
                                            About us
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="case-study.html">
                                            Case Study
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="blog-grid.html">
                                            Blogs
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pricing.html">
                                            Pricing
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="contact.html">
                                            Contact Us
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-5 d-flex justify-content-lg-end">
                        <div className="footer-widget">
                            <div className="widget-title">
                                <h5>Support</h5>
                            </div>
                            <div className="menu-container">
                                <ul className="widget-list">
                                    <li>
                                        <a href="#">
                                            Technical Support
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Customer Support
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Development Support
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Security Support
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Consulting Services
                                            <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z">
                                                </path>
                                                <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom-wrap">
            <div className="container">
                <div className="footer-bottom">
                    <div className="copyright-area">
                        <p>© Copyright 2025 Glancetechy. All Rights Reserved.</p>
                    </div>
                    <ul>
                        <li><a href="#">Support Policy</a></li>
                        <li><a href="terms-and-condition.html">Terms &amp; Conditions</a></li>
                        <li><a href="terms-and-condition.html">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

  );
}