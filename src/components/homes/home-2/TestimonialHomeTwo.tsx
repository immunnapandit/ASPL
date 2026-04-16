import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Rizwan Ul Haq, Dubai',
    role: 'MCT Certified Trainer',
    linkedinUrl: 'https://www.linkedin.com/in/rizulhaq/',
    avatarUrl: '/assets/img/testimonial/Rizuan.png',
    quote:
      'AtiSunya training program played a key role in my journey to becoming a Microsoft Certified Trainer. The mentorship and practical approach truly made a difference.',
  },
  {
    id: 2,
    name: 'Nishit Parikh, Australia',
    role: 'MCT Certified Trainer',
    linkedinUrl: 'https://www.linkedin.com/in/nishitpparikh/',
    avatarUrl: '/assets/img/testimonial/test-avatar-2-2.png',
    quote:
      'I had an excellent experience with AtiSunya With their clear guidance and professional support, I successfully received my Microsoft Certified Trainer (MCT) certificate. The entire process was smooth, well‑coordinated, and hassle‑free. Their responsiveness and attention to detail made the certification journey straightforward and stress‑free. I would confidently recommend AtiSuny to professionals pursuing Microsoft certifications.',
  },
];
export default function TestimonialHomeTwo() {
  return (
    <div className="tv-testimonial-area2 pt-130 pb-130">
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-xl-5 col-lg-5">
            <div className="tv-section-title-box">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Testimonial
              </span>
              <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                What Our Clients Say About AtiSunya
              </h4>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7">
            <div className="tv-testimonial-nav2 text-end">
              <button className="arrow-next">
                <i className="fa-light fa-arrow-left-long"></i>
              </button>{' '}
              <button className="arrow-prev">
                <i className="fa-light fa-arrow-right-long"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="tv-testiominal2-slider-wrap">
            <Swiper
              loop={testimonials.length > 1}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.arrow-prev',
                nextEl: '.arrow-next',
              }}
              speed={1500}
              autoplay={{
                delay: 4500,
              }}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                '1400': {
                  slidesPerView: 2,
                },
                '1200': {
                  slidesPerView: 2,
                },
                '992': {
                  slidesPerView: 2,
                },
                '768': {
                  slidesPerView: 1,
                },
                '576': {
                  slidesPerView: 1,
                },
                '0': {
                  slidesPerView: 1,
                },
              }}
              className="swiper-container tv-testimonial-slider-active2"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide className="swiper-slide" key={testimonial.id}>
                  <div className="single-testimonial-item2">
                    <div className="icon" aria-label="5 star rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <blockquote className="testimonial-quote">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="author-info">
                      <div className="author-profile">
                        <div className="author-avatar">
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                          />
                        </div>
                        <div className="author-meta">
                          <h2>{testimonial.name}</h2>
                          <span>{testimonial.role}</span>
                          <a
                            className="author-linkedin"
                            href={testimonial.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${testimonial.name} LinkedIn profile`}
                          >
                            <i className="fa-brands fa-linkedin-in"></i>
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-quote-mark" aria-hidden="true">
                      ❞
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
