import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Rizwan Ul Haq, Dubai',
    role: 'Microsoft Certified Trainer',
    linkedinUrl: 'https://www.linkedin.com/in/rizulhaq/',
    quote:
      'AtiSunya training program played a key role in my journey to becoming a Microsoft Certified Trainer. The mentorship and practical approach truly made a difference.',
  },
  {
    id: 2,
    name: 'Nishit Parikh, Australia',
    role: 'Microsoft Certified Trainer',
    linkedinUrl: 'https://www.linkedin.com/in/nishitpparikh/',
    quote:
      'I had an excellent experience with AtiSunya With their clear guidance and professional support, I successfully received my Microsoft Certified Trainer (MCT) certificate. The entire process was smooth, well‑coordinated, and hassle‑free. Their responsiveness and attention to detail made the certification journey straightforward and stress‑free. I would confidently recommend AtiSuny to professionals pursuing Microsoft certifications.',
  },
];

function QuoteIcon() {
  return (
    <svg
      width="29"
      height="18"
      viewBox="0 0 29 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.7322 0C28.0224 0 28.2833 0.190865 28.3617 0.47398C28.4488 0.788786 28.2823 1.11838 27.9743 1.23956C25.9286 2.04564 24.4263 3.42739 23.4993 5.35314C26.3364 6.07635 28.3847 8.61705 28.3847 11.5714C28.3847 15.1163 25.4563 18 21.8569 18C18.2575 18 15.3294 15.1163 15.3294 11.5714C15.324 11.5228 14.7478 1.93828 27.6333 0.00720024C27.6665 0.00218582 27.6994 0 27.7322 0ZM21.8569 16.7143C24.7362 16.7143 27.0784 14.4071 27.0784 11.5714C27.0784 8.98181 25.1111 6.78954 22.5026 6.47254C22.3037 6.44805 22.127 6.33536 22.0237 6.16648C21.92 5.9976 21.9009 5.79137 21.972 5.60681C22.4959 4.24421 23.2415 3.08751 24.202 2.14361C16.2363 4.88578 16.6283 11.4487 16.6337 11.5237C16.6356 14.4071 18.9779 16.7143 21.8569 16.7143Z"
        fill="white"
      />
      <path
        d="M12.408 0C12.6982 0 12.959 0.190865 13.0375 0.47398C13.1246 0.788786 12.9581 1.11838 12.6501 1.23956C10.6044 2.04564 9.1021 3.42739 8.17507 5.35314C11.0122 6.07635 13.0604 8.61705 13.0604 11.5714C13.0604 15.1163 10.132 18 6.53266 18C2.93327 18 0.0051899 15.1163 0.0051899 11.5714C-0.000229836 11.5228 -0.576456 1.93828 12.3091 0.00720024C12.3423 0.00218582 12.3752 0 12.408 0ZM6.53266 16.7143C9.41196 16.7143 11.7542 14.4071 11.7542 11.5714C11.7542 8.98181 9.78692 6.78954 7.17843 6.47254C6.97945 6.44805 6.80275 6.33536 6.69944 6.16648C6.5958 5.9976 6.57667 5.79137 6.64778 5.60681C7.1717 4.24421 7.91732 3.08751 8.87779 2.14361C0.912106 4.88578 1.30405 11.4487 1.30947 11.5237C1.31143 14.4071 3.65368 16.7143 6.53266 16.7143Z"
        fill="white"
      />
    </svg>
  );
}

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
                    <div className="shap">
                      <span>
                        <QuoteIcon />
                      </span>
                    </div>
                    <div className="icon">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <p>"{testimonial.quote}"</p>
                    <div className="author-info">
                      <div className="author-profile">
                        <a
                          className="author-avatar-linkedin"
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${testimonial.name} LinkedIn profile`}
                        >
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <div>
                          <h2>
                            {testimonial.name} <span>{testimonial.role}</span>
                          </h2>
                        </div>
                      </div>
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
