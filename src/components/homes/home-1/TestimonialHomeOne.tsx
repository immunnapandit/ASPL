import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

const settings = {
  speed: 1500,
  loop: true,
  effect: 'cards',
  slidesPerView: 1,
  spaceBetween: 35,
  autoplay: {
    delay: 4500,
  },
  navigation: {
    prevEl: '.arrow-prev',
    nextEl: '.arrow-next',
  },
};

const testimonials = [
  {
    quote:
      'I had an excellent experience with AtiSunya, With their clear guidance and professional support, I successfully received my Microsoft Certified Trainer (MCT) certificate.',
    name: 'Nishit Parikh, Australia',
    role: 'MCT Certified Trainer',
  },
  {
    quote:
      'AtiSunya training program played a key role in my journey to becoming a Microsoft Certified Trainer. The mentorship and practical approach truly made a difference.',
    name: 'Rizwan Ul Haq, Dubai',
    role: 'MCT Certified Trainer',
  },
] as const;

export default function TestimonialHomeOne() {
  return (
    <div
      className="tv-testimonial-area pt-130 pb-130"
      style={{
        backgroundImage: 'url(/assets/img/testimonial/testi-bg-1-1.png)',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-4 col-xl-5 col-lg-6 col">
            <div className="testimonial-left-content">
              <div className="tv-section-title-box mb-40">
                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                  Testimonial
                </span>
                <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                  What Our Clients Say About Us
                </h4>
                <p>
                  Real feedback from organizations that trust AtiSunya for
                  transformation, implementation, and long-term support.
                </p>
              </div>
              <div className="tv-testi-arrow-box d-flex">
                <div className="it-fade-anim">
                  <button className="arrow-next">
                    <i className="fa-light fa-arrow-left-long"></i>
                  </button>
                </div>
                <div className="it-fade-anim">
                  <button className="arrow-prev active">
                    <i className="fa-light fa-arrow-right-long"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-8 col-xl-7 col-lg-6 col">
            <div className="tv-testmonial-wrap">
              <Swiper
                {...settings}
                modules={[Navigation]}
                className="swiper-container tv-testi-slider-active"
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide
                    className="swiper-slide"
                    key={`${item.name}-${index}`}
                  >
                    <div className="single-testi-slider-item">
                      <div className="rating">
                        <i className="fa-solid fa-star-sharp"></i>
                        <i className="fa-solid fa-star-sharp"></i>
                        <i className="fa-solid fa-star-sharp"></i>
                        <i className="fa-solid fa-star-sharp"></i>
                        <i className="fa-solid fa-star-sharp"></i>
                      </div>
                      <p>"{item.quote}"</p>
                      <div className="author-info d-flex align-items-center">
                        {/* <img
                          src="assets/img/testimonial/testi-avatar-1.png"
                          alt={item.name}
                        /> */}
                        <h5>
                          {item.name}
                          <span>{item.role}</span>
                        </h5>
                      </div>
                      <img
                        src="assets/img/testimonial/testi-shap-1.png"
                        alt=""
                        className="shap-icon"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
