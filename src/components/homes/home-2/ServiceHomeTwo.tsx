import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const services = [
  {
    title: 'Microsoft Dynamics 365',
    desc: 'ERP and CRM solutions designed to streamline operations, improve visibility, and drive smarter business decisions.',
    img: '/assets/img/service/Dynamics365.svg',
    accent: '#5e5bff',
    bg: 'linear-gradient(135deg, #eef0ff 0%, #dfe4ff 52%, #d7ecff 100%)',
  },
  {
    title: 'Microsoft Azure',
    desc: 'Secure, scalable cloud solutions that modernize infrastructure and support enterprise-level growth.',
    img: '/assets/img/service/azure-icon.svg',
    accent: '#78a9ff',
    bg: 'linear-gradient(135deg, #e8ebff 0%, #d7e0ff 45%, #c9ebff 100%)',
  },
  {
    title: 'Power Platform',
    desc: 'Build apps, automate workflows, and unlock productivity with low-code Microsoft solutions.',
    img: '/assets/img/service/PowerPlatform.svg',
    accent: '#7ad6d1',
    bg: 'linear-gradient(135deg, #dff4f6 0%, #d8eeff 45%, #c9e4ff 100%)',
  },
  {
    title: 'Microsoft Power BI',
    desc: 'Transform raw data into interactive dashboards and clear insights for better business decisions.',
    img: '/assets/img/service/power-bi-icon.svg',
    accent: '#9edccf',
    bg: 'linear-gradient(135deg, #def3f0 0%, #dbeeff 45%, #cfe7ff 100%)',
  },
  {
    title: 'Cloud Technology',
    desc: 'Comprehensive cloud services including migration, infrastructure management, and DevOps automation.',
    img: '/assets/img/service/Cloud.svg',
    accent: '#8fb1ff',
    bg: 'linear-gradient(135deg, #edf2ff 0%, #dbe4ff 50%, #d5f1ff 100%)',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export default function ServiceHomeTwo() {
  return (
    <section className="tv-service2-area pt-130 pb-130">
      <div className="container">
        <motion.div
          className="row justify-content-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="col-xl-8 col-lg-10 col-12 text-center">
            <div className="tv-section-title-box mb-60">
              <motion.span
                className="tv-section-subtitle tv-spltv-text tv-spltv-in-right"
                variants={fadeUp}
              >
                Our Services
              </motion.span>
              <motion.h4
                className="tv-section-title tv-spltv-text tv-spltv-in-right"
                variants={fadeUp}
              >
                Smart Business Solutions
                <br />
                with Dynamics 365
              </motion.h4>
              <motion.p variants={fadeUp}>
                Premium Microsoft technology services built to help your business
                scale with confidence, clarity, and speed.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="tv-service2-slider-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
            }}
            loop
            speed={1100}
            pagination={{ clickable: true, el: '.service-pagination' }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              576: { slidesPerView: 1, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 22 },
              1200: { slidesPerView: 4, spaceBetween: 24 },
              1440: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="premium-service-swiper"
          >
            {services.map((item) => (
              <SwiperSlide key={item.title} className="service-slide">
                <motion.div
                  className="service-card-premium"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    className="service-image-wrap"
                    style={{ background: item.bg }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="service-image"
                    />
                    <div className="service-image-cut" />
                  </div>

                  <div className="service-content">
                    <div
                      className="service-mini-line"
                      style={{ background: item.accent }}
                    />

                    <h3 className="service-card-title">
                      <Link to="/service-details">{item.title}</Link>
                    </h3>

                    <p className="service-card-desc">{item.desc}</p>

                    <Link
                      to="/service-details"
                      className="service-read-more"
                      style={{ color: item.accent }}
                    >
                      Explore Service
                      <span
                        className="service-read-more-icon"
                        style={{ background: `${item.accent}20`, color: item.accent }}
                      >
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="service-pagination" />
        </motion.div>
      </div>
    </section>
  );
}
