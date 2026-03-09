import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper css
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function TeamHomeOne() {
  return (
    <div
      className="tv-team-area pt-130 pb-130 section-bg footer-bg"
      style={{ backgroundImage: `url(/assets/img/team/team-bg.png)` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-5 col-12">
            <div className="tv-team-slider-area">
              <Swiper
                loop={true}
                spaceBetween={35}
                speed={1500}
                slidesPerView={1}
                direction="horizontal"
                autoplay={{
                  delay: 4500,
                  reverseDirection: true,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: '.tv-team-pagination',
                  clickable: true,
                  renderBullet: (index: number, className: string) => {
                    const images = [
                      '/assets/img/team/team-1-1.png',
                      '/assets/img/team/team-1-2.png',
                      '/assets/img/team/team-1-3.png',
                    ];
                    return `
                  <span class="${className}">
                    <img src="${images[index]}" alt="Thumb ${index + 1}" />
                  </span>
                `;
                  },
                }}
                navigation={{ prevEl: '.arrow-prev', nextEl: '.arrow-next' }}
                modules={[Autoplay, Navigation, Pagination]}
                className="swiper-container tv-team-slide-active"
              >
                <SwiperSlide className="swiper-slide">
                  <div className="single-team-item">
                    <img src="assets/img/team/team-1-1.png" alt="" />
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
                          <Link to="/team-details">Rosy Gaggero</Link>
                        </h2>
                        <p className="designation">Web Developer</p>
                      </div>
                      <div>
                        <div className="round-shape">-</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="single-team-item">
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
                          <Link to="/team-details">Rosy Gaggero</Link>
                        </h2>
                        <p className="designation">Web Developer</p>
                      </div>
                      <div>
                        <div>
                          <div className="round-shape">-</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="single-team-item">
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
                          <Link to="/team-details">Rosy Gaggero</Link>
                        </h2>
                        <p className="designation">Web Developer</p>
                      </div>
                      <div>
                        <div>
                          <div className="round-shape">-</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 col-12 order-md-0">
            <div className="tv-team-right-area">
              <div className="tv-section-title-box mb-40">
                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                  Our Team Members
                </span>
                <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                  Our Team is Ready To Help.
                </h4>
                <p>
                  It is a long established fact that a reader will be distracted
                  the readable content of a page when looking.
                </p>
              </div>
              <div className="tv-team-arrow-box d-flex justify-content-md-end">
                <div>
                  <div
                    className="it-fade-anim"
                    data-fade-from="top"
                    data-ease="bounce"
                    data-delay=".7"
                  >
                    <button className="arrow-next mb-25">
                      <i className="fa-light fa-arrow-left-long"></i>
                    </button>
                  </div>
                  <div
                    className="it-fade-anim"
                    data-fade-from="top"
                    data-ease="bounce"
                    data-delay=".5"
                  >
                    <button className="arrow-prev active">
                      <i className="fa-light fa-arrow-right-long"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="tv-team-pagination d-flex"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
