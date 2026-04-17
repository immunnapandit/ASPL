import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const clientLogos = [
  {
    id: 1,
    name: 'Alpha Variance Solutions',
    logo: '/assets/img/brand/alpha-variance-solutions.svg',
  },
  { id: 2, name: 'SYSCOM', logo: '/assets/img/brand/syscom.svg' },
  {
    id: 3,
    name: 'Alfahhad Holding Group',
    logo: '/assets/img/brand/alfahhad-holding-group.svg',
  },
  { id: 4, name: 'VJ Group', logo: '/assets/img/brand/vj-group.svg' },
  { id: 5, name: 'ADCB', logo: '/assets/img/brand/adcb.svg' },
  { id: 6, name: 'Daikin', logo: '/assets/img/brand/daikin.svg' },
  { id: 7, name: 'Brown Bites', logo: '/assets/img/brand/brown-bites.svg' },
  {
    id: 8,
    name: 'Chartered HighTech',
    logo: '/assets/img/brand/chartered-hightech.svg',
  },
  {
    id: 9,
    name: 'Bharat Seats Limited',
    logo: '/assets/img/brand/bharat-seats-limited.svg',
  },
  {
    id: 10,
    name: 'NetCom Learning',
    logo: '/assets/img/brand/netcom-learning.svg',
  },
  { id: 11, name: 'Hitachi', logo: '/assets/img/brand/hitachi.svg' },
  { id: 12, name: 'Grandmasters', logo: '/assets/img/brand/grandmasters.svg' },
  {
    id: 13,
    name: 'Bhagwati Shuttering Store',
    logo: '/assets/img/brand/bhagwati-shuttering-store.svg',
  },
  {
    id: 14,
    name: 'Tessitura Monti',
    logo: '/assets/img/brand/tessitura-monti.svg',
  },
  {
    id: 15,
    name: 'Global Knowledge',
    logo: '/assets/img/brand/global-knowledge.svg',
  },
  {
    id: 16,
    name: 'Verdant Enterprises',
    logo: '/assets/img/brand/verdant-enterprises.png',
    logoClassName: 'our-client-logo--multiply',
  },
  {
    id: 17,
    name: 'Dakhila',
    logo: '/assets/img/brand/dakhila-campus.png',
  },
  {
    id: 18,
    name: 'Queen Logistics',
    logo: '/assets/img/brand/queen-logistics.png',
  },
  {
    id: 19,
    name: 'Orient Electric',
    logo: '/assets/img/brand/orient-electric.png',
  },
  {
    id: 20,
    name: 'Genius',
    logo: '/assets/img/brand/genius.png',
  },
  {
    id: 21,
    name: 'Ksquare99 Web Services',
    logo: '/assets/img/brand/ksquare99-web-services.png',
  },
];

export default function OurClient() {
  return (
    <>
      <style>{`
        .our-client-area {
          background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
        }

        .our-client-area .tv-brand-content {
          border-top: 1px solid rgba(17, 24, 39, 0.08);
          border-bottom: 1px solid rgba(17, 24, 39, 0.08);
          padding-bottom: 36px;
        }

        .our-client-header {
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }

        .our-client-header .tv-section-title {
          margin-bottom: 18px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .our-client-header p {
          margin-bottom: 0;
          color: #5b6472;
          line-height: 30px;
        }

        .our-client-slider {
          padding-top: 34px;
        }

        .our-client-slider .swiper-wrapper {
          align-items: center;
          transition-timing-function: linear;
        }

        .our-client-item {
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 10px;
          background: transparent;
        }

        .our-client-item img {
          display: block;
          width: auto;
          max-width: 100%;
          max-height: 58px;
          object-fit: contain;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .our-client-item img.our-client-logo--multiply {
          mix-blend-mode: multiply;
        }

        .our-client-item:hover img {
          transform: scale(1.04);
          opacity: 0.9;
        }

        @media (max-width: 767px) {
          .our-client-item {
            min-height: 74px;
          }

          .our-client-item img {
            max-height: 44px;
          }
        }
      `}</style>

      <section className="tv-brand-area our-client-area pb-130">
        <div className="container">
          <div className="tv-brand-content pt-80">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="our-client-header">
                  <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                    Our Clients
                  </span>
                  <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                    Trusted by brands across industries.
                  </h4>
                  <p>
                    From manufacturing and banking to education, retail, and
                    enterprise technology, our clients rely on AtiSunya for
                    transformation and delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="tv-brand-slider our-client-slider">
            <Swiper
              loop={true}
              spaceBetween={36}
              slidesPerView={5}
              speed={3500}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay]}
              breakpoints={{
                1400: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 5,
                },
                992: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },
                576: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              className="swiper-container tv-brand-slider-active"
            >
              {clientLogos.map((client) => (
                <SwiperSlide className="swiper-slide" key={client.id}>
                  <div className="tv-brand-single-item our-client-item">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className={client.logoClassName}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
