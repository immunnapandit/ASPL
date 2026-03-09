import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper css
import 'swiper/css';

export default function BrandHomeTwo() {
  return (
    <div className="tv-brand-area gray-bg pb-130">
      <div className="container">
        <div className="tv-brand-content pt-80">
          <div className="row">
            <div className="col-12 text-center">
              <p>
                Empowered professionals to connect with top-tier opportunities
              </p>
            </div>
          </div>
        </div>
        <div className="tv-brand-slider ">
          <Swiper
            loop={true}
            spaceBetween={30}
            slidesPerView={5}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1500}
            modules={[Autoplay]}
            breakpoints={{
              '1400': {
                slidesPerView: 5,
              },
              '1200': {
                slidesPerView: 5,
              },
              '992': {
                slidesPerView: 5,
              },
              '768': {
                slidesPerView: 4,
              },
              '576': {
                slidesPerView: 3,
              },
              '0': {
                slidesPerView: 3,
              },
            }}
            className="swiper-container tv-brand-slider-active"
          >
            <SwiperSlide className="swiper-slide">
              <div className="tv-brand-single-item">
                <img src="assets/img/brand/brand-1-1.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tv-brand-single-item">
                <img src="assets/img/brand/brand-1-2.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tv-brand-single-item">
                <img src="assets/img/brand/brand-1-1.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tv-brand-single-item">
                <img src="assets/img/brand/brand-1-4.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tv-brand-single-item">
                <img src="assets/img/brand/brand-1-5.png" alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
