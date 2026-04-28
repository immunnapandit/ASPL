import { Link } from 'react-router-dom';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from '../../../lib/cloudinary';

// swiper css
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const heroSlides = [
  {
    backgroundImage: getCloudinaryAssetUrl(
      '/assets/img/slider/financilabuilding.jpg',
      CLOUDINARY_TRANSFORMS.hero,
    ),
    subtitle: 'Microsoft Technology Experts',
    title: 'Transform Your Business with Intelligent Digital Solutions',
    description:
      'AtiSunya helps organizations modernize operations with Microsoft Dynamics 365, Azure Cloud, and innovative technology solutions designed for scalability and growth.',
  },
  {
    backgroundImage: getCloudinaryAssetUrl(
      '/assets/img/slider/Businees.jpg',
      CLOUDINARY_TRANSFORMS.hero,
    ),
    subtitle: 'Microsoft Technology Experts',
    title: 'Empowering Businesses with Microsoft Dynamics 365',
    description:
      'Streamline operations, automate processes, and gain real-time insights with powerful ERP and CRM solutions built on Microsoft Dynamics 365 and Power Platform.',
  },
  {
    backgroundImage: getCloudinaryAssetUrl(
      '/assets/img/slider/cloud4.png',
      CLOUDINARY_TRANSFORMS.hero,
    ),
    subtitle: 'Microsoft Technology Experts',
    title: 'Build Powerful Solutions for the Future',
    description:
      'From modern web applications to enterprise systems, our expert team develops scalable solutions using Azure, React, .NET, and the latest technologies.',
  },
];

export default function HeroHomeOne() {
  return (
    <div className="tv-slider-area">
      <div className="tv-slider-wrap">
        <Swiper
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
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
          {heroSlides.map((slide) => (
            <SwiperSlide className="swiper-slide" key={slide.title}>
              <div className="tv-slider-overlay z-index-1 fix p-relative">
                <div
                  className="tv-slider-bg"
                  style={{
                    backgroundImage: `url(${slide.backgroundImage})`,
                  }}
                ></div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6">
                      <div className="tv-slider-content z-index-1">
                        <span className="tv-slider-subtitle">{slide.subtitle}</span>
                        <h1
                          className="tv-slider-title p-relative"
                          style={{
                            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                            lineHeight: 1.15,
                          }}
                        >
                          {slide.title}
                        </h1>
                        <div className="tv-slider-text pb-20">
                          <p>{slide.description}</p>
                        </div>
                        <div className="tv-slider-btn">
                          <Link to="/contact" className="tv-btn-primary">
                            <span className="btn-wrap">
                              <span className="btn-text1">Let's Talk</span>
                              <span className="btn-text2">Let's Talk</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="tv-slider-arrow-box d-none d-lg-block">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
