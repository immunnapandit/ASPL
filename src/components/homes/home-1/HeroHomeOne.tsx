import { Link } from 'react-router-dom';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper css
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function HeroHomeOne() {
  return (
    <div className="tv-slider-area">
      <div className="tv-slider-wrap">
        <Swiper
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          autoplay={{ delay: 4500, disableOnInteraction: true }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: (index: number, className: string) =>
              `<span class="${className}">${index + 1}</span>`,
          }}
          modules={[Autoplay, Pagination, EffectFade]}
          className="swiper-container tv-slider-active tv-slider-animation p-relative"
        >
          <SwiperSlide className="swiper-slide">
            <div className="tv-slider-overlay z-index-1 fix p-relative">
              <div
                className="tv-slider-bg"
                style={{
                  backgroundImage: `url(/assets/img/slider/CloudComputing.png)`,
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tv-slider-content z-index-1">
                      <span className="tv-slider-subtitle">
                        Microsoft Technology Experts
                      </span>
                      <h1 className="tv-slider-title p-relative">
                        Transform Your Business with Intelligent Digital Solutions
                      </h1>
                      <div className="tv-slider-text pb-20">
                        <p>
                          AtiSunya helps organizations modernize operations with Microsoft Dynamics 365, 
                          Azure Cloud, and innovative technology solutions designed for scalability and growth.
                        </p>
                      </div>
                      <div className="tv-slider-btn">
                        <Link to="/contact" className="tv-btn-primary">
                          <span className="btn-wrap">
                            <span className="btn-text1">
                              Let’s Talk With Us
                            </span>
                            <span className="btn-text2">
                              Let’s Talk With Us
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="tv-slider-overlay z-index-1 fix p-relative">
              <div
                className="tv-slider-bg"
                style={{
                  backgroundImage: `url(/assets/img/slider/slider-1-2.jpg)`,
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tv-slider-content z-index-1">
                      <span className="tv-slider-subtitle">
                        Microsoft Technology Experts
                      </span>
                      <h1 className="tv-slider-title p-relative">
                        Empowering Businesses with Microsoft Dynamics 365
                      </h1>
                      <div className="tv-slider-text pb-20">
                        <p>
                          Streamline operations, automate processes, and gain real-time insights with powerful ERP and 
                          CRM solutions built on Microsoft Dynamics 365 and Power Platform.
                        </p>
                      </div>
                      <div className="tv-slider-btn">
                        <Link to="/contact" className="tv-btn-primary">
                          <span className="btn-wrap">
                            <span className="btn-text1">
                              Our Solutions
                            </span>
                            <span className="btn-text2">
                              Our Solutions
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="tv-slider-overlay z-index-1 fix p-relative">
              <div
                className="tv-slider-bg"
                style={{
                  backgroundImage: `url(/assets/img/slider/slider-1-3.jpg)`,
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tv-slider-content z-index-1">
                      <span className="tv-slider-subtitle">
                        Microsoft Technology Experts
                      </span>
                      <h1 className="tv-slider-title p-relative">
                        Build Powerful Software for the Future
                      </h1>
                      <div className="tv-slider-text pb-20">
                        <p>
                          From modern web applications to enterprise systems, our expert team develops 
                          scalable solutions using Azure, React, .NET, and the latest technologies.
                        </p>
                      </div>
                      <div className="tv-slider-btn">
                        <Link to="/contact" className="tv-btn-primary">
                          <span className="btn-wrap">
                            <span className="btn-text1">
                              Let’s Talk With Us
                            </span>
                            <span className="btn-text2">
                              Let’s Talk With Us
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <div className="tv-slider-arrow-box d-none d-lg-block">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
