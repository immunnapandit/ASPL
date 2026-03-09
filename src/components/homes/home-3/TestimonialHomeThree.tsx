import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// swiper css
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const settings = {
  speed: 1500,
  loop: true,
  slidesPerView: 2,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
  },
  breakpoints: {
    '1400': {
      slidesPerView: 2,
      centeredSlides: true,
    },
    '1200': {
      slidesPerView: 2,
      centeredSlides: true,
    },
    '992': {
      slidesPerView: 2,
      centeredSlides: true,
    },
    '768': {
      slidesPerView: 1,
      centeredSlides: true,
    },
    '576': {
      slidesPerView: 1,
      centeredSlides: true,
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

export default function TestimonialHomeThree() {
  return (
    <div className="tv-testimonial-area3 pb-130 pt-130">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="tv-section-title-box mb-60">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Testimonial
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                What Our Clients Ask <br /> About Techor
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="tv-testmonial-wrap3">
        <Swiper
          {...settings}
          modules={[Autoplay, Pagination]}
          className="swiper-container tv-testi-slider-active3"
        >
          <SwiperSlide className="swiper-slide">
            <div className="single-testi-slider-item style-3">
              <div className="rating">
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
              </div>
              <p>
                “ Working with several word themes and templates the last years
                only can say this is best in every level use it for my reviews
                that I have already are company and the reviews that I have
                already are all excellent. Not only the design but the code ”
              </p>
              <div className="author-info d-flex  align-items-center">
                <img src="assets/img/testimonial/testi-avatar-1.png" alt="" />
                <h5>
                  Marvin McKinney<span>Product Manager</span>
                </h5>
              </div>
              <img
                src="assets/img/testimonial/testi-shap-1.png"
                alt=""
                className="shap-icon"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-testi-slider-item style-3">
              <div className="rating">
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
              </div>
              <p>
                “ Working with several word themes and templates the last years
                only can say this is best in every level use it for my reviews
                that I have already are company and the reviews that I have
                already are all excellent. Not only the design but the code ”
              </p>
              <div className="author-info d-flex  align-items-center">
                <img src="assets/img/testimonial/testi-avatar-1.png" alt="" />
                <h5>
                  Marvin McKinney<span>Product Manager</span>
                </h5>
              </div>
              <img
                src="assets/img/testimonial/testi-shap-1.png"
                alt=""
                className="shap-icon"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-testi-slider-item style-3">
              <div className="rating">
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
              </div>
              <p>
                “ Working with several word themes and templates the last years
                only can say this is best in every level use it for my reviews
                that I have already are company and the reviews that I have
                already are all excellent. Not only the design but the code ”
              </p>
              <div className="author-info  d-flex  align-items-center">
                <img src="assets/img/testimonial/testi-avatar-1.png" alt="" />
                <h5>
                  Marvin McKinney<span>Product Manager</span>
                </h5>
              </div>
              <img
                src="assets/img/testimonial/testi-shap-1.png"
                alt=""
                className="shap-icon"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="single-testi-slider-item style-3">
              <div className="rating">
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
              </div>
              <p>
                “ Working with several word themes and templates the last years
                only can say this is best in every level use it for my reviews
                that I have already are company and the reviews that I have
                already are all excellent. Not only the design but the code ”
              </p>
              <div className="author-info  d-flex  align-items-center">
                <img src="assets/img/testimonial/testi-avatar-1.png" alt="" />
                <h5>
                  Marvin McKinney<span>Product Manager</span>
                </h5>
              </div>
              <img
                src="assets/img/testimonial/testi-shap-1.png"
                alt=""
                className="shap-icon"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
