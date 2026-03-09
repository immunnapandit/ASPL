import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper css
import 'swiper/css';
import 'swiper/css/pagination';

const settings = {
  speed: 1500,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 4500,
  },
  breakpoints: {
    '1400': {
      slidesPerView: 4,
      centeredSlides: true,
    },
    '1200': {
      slidesPerView: 4,
      centeredSlides: true,
    },
    '992': {
      slidesPerView: 3,
      centeredSlides: true,
    },
    '768': {
      slidesPerView: 2,
      centeredSlides: true,
    },
    '576': {
      slidesPerView: 2,
    },
    '0': {
      slidesPerView: 1,
      centeredSlides: true,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

export default function ProjectHomeThree() {
  return (
    <div className="tv-project-area pt-130 pb-130">
      <div className="container">
        <div className="row  justify-content-center">
          <div className="col-12 text-center">
            <div className="tv-section-title-box mb-60">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Project
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                Tech Solutions Driving Global <br /> Connectivity
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="tv-project-slider-wrap">
        <Swiper
          {...settings}
          modules={[Autoplay, Pagination]}
          className="swiper-container tv-project-slider-active"
        >
          <SwiperSlide className="swiper-slide">
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-1.png" alt="" />
              <span className="icon">
                <a href="project-details.html">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-2.png" alt="" />
              <span className="icon">
                <a href="project-details.html">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-3.png" alt="" />
              <span className="icon">
                <a href="project-details.html">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-4.png" alt="" />
              <span className="icon">
                <a href="project-details.html">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="row">
          <div className="col-12 text-center">
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
