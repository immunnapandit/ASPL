import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper css
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const settings = {
  speed: 1500,
  loop: true,
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
    delay: 4500,
  },
  breakpoints: {
    '1400': {
      slidesPerView: 4,
    },
    '1200': {
      slidesPerView: 4,
    },
    '992': {
      slidesPerView: 3,
    },
    '768': {
      slidesPerView: 2,
    },
    '576': {
      slidesPerView: 2,
    },
    '0': {
      slidesPerView: 1,
    },
  },
  navigation: {
    prevEl: '.arrow-prev',
    nextEl: '.arrow-next',
  },
};

export default function TeamHomeThree() {
  return (
    <div className="tv-team-area2 pb-130 pt-130">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
            <div className="tv-section-title-box pb-20 pb-md-0">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Team Members
              </span>
              <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                Our Team is Ready To Help.
              </h4>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4">
            <div className="tv-team-arrow-box2 d-flex">
              <div
                className="it-fade-anim"
                data-fade-from="top"
                data-ease="bounce"
                data-delay=".7s"
              >
                <button className="arrow-next">
                  <i className="fa-light fa-arrow-left-long"></i>
                </button>
              </div>
              <div
                className="it-fade-anim"
                data-fade-from="top"
                data-ease="bounce"
                data-delay=".5s"
              >
                <button className="arrow-prev active">
                  <i className="fa-light fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="tv-team-slider-area2">
          <Swiper
            {...settings}
            modules={[Autoplay, Pagination, Navigation]}
            className="swiper-container tv-team-slider-active2"
          >
            <SwiperSlide className="swiper-slide">
              <div className="single-team-item style-2">
                <img src="assets/img/team/team-1-2.png" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <a href="team-details.html">Arush Aggarwal</a>
                    </h2>
                    <p className="designation">Founder & Ceo</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-team-item style-2">
                <img src="assets/img/team/team-1-3.png" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <a href="team-details.html">Marvin McKinney</a>
                    </h2>
                    <p className="designation">Product Designer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-team-item style-2">
                <img src="assets/img/team/team-1-5.png" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <a href="team-details.html">Kevin Martin</a>
                    </h2>
                    <p className="designation">Product Designer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-team-item style-2">
                <img src="assets/img/team/team-1-3.png" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <a href="team-details.html">Sophia Rodriguez</a>
                    </h2>
                    <p className="designation">Creative Director</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-team-item style-2">
                <img src="assets/img/team/team-1-5.png" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <a href="team-details.html">Kevin Martin</a>
                    </h2>
                    <p className="designation">Product Designer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-team-item style-2">
                <img src="assets/img/team/team-1-3.png" alt="" />
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <a href="team-details.html">Sophia Rodriguez</a>
                    </h2>
                    <p className="designation">Creative Director</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
