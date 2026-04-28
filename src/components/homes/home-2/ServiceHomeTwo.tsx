import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from '../../../lib/cloudinary';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const services = [
  {
    title: 'Microsoft Dynamics 365',
    desc: 'ERP and CRM solutions designed to streamline operations, improve visibility, and drive smarter business decisions.',
    img: '/assets/img/service/Dynamics365.svg',
    accent: '#2B4DFF',
    href: '/solutions/microsoft-dynamics-365',
  },
  {
    title: 'Microsoft Azure',
    desc: 'Secure, scalable cloud solutions that modernize infrastructure and support enterprise-level growth.',
    img: '/assets/img/service/azure-icon.svg',
    accent: '#6C4DFF',
    href: '/solutions/microsoft-azure',
  },
  {
    title: 'Power Platform',
    desc: 'Build apps, automate workflows, and unlock productivity with low-code Microsoft solutions.',
    img: '/assets/img/service/PowerPlatform.svg',
    accent: '#0EA5E9',
    href: '/solutions/microsoft-power-platform',
  },
  {
    title: 'Microsoft Power BI',
    desc: 'Transform raw data into interactive dashboards and clear insights for better business decisions.',
    img: '/assets/img/service/power-bi-icon.svg',
    accent: '#14B8A6',
    href: '/solutions/microsoft-power-bi',
  },
  {
    title: 'Cloud Technology',
    desc: 'Comprehensive cloud services including migration, infrastructure management, and DevOps automation.',
    img: '/assets/img/service/Cloud.svg',
    accent: '#4F46E5',
    href: '/solutions/cloud-technology',
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Applied AI solutions that automate workflows, generate insights, and help teams make faster decisions.',
    img: '/assets/img/service/aichip.svg',
    accent: '#EC4899',
    href: '/ai-solutions',
  },
  {
    title: 'ERP Implementation',
    desc: 'End-to-end ERP implementation services covering planning, configuration, deployment, and post-go-live support.',
    img: '/assets/img/service/erp-icon.svg',
    accent: '#F97316',
    href: '/what-we-do/erp-implementation',
  },
  {
    title: 'Office 365',
    desc: 'Microsoft 365 and Office 365 services for secure collaboration, productivity, migration, and user enablement.',
    img: '/assets/img/service/Microsoft_365.svg',
    accent: '#2563EB',
    href: '/solutions/office-365',
  },
  {
    title: 'Web Development',
    desc: 'Modern website and web application development focused on performance, usability, integrations, and growth.',
    img: '/assets/img/service/webdevelopment.svg',
    accent: '#10B981',
    href: '/what-we-do/web-development',
  },
] as const;

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
    <section id="services" className="service-premium-section white-bg">
      <div className="container position-relative">
        <motion.div
          className="section-header text-center tv-section-title-box"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="section-kicker tv-section-subtitle tv-spltv-text tv-spltv-in-right"
            variants={fadeUp}
          >
            Our Services
          </motion.span>

          <motion.h2
            className="section-title tv-section-title tv-spltv-text tv-spltv-in-right"
            variants={fadeUp}
          >
            Smart Business Solutions with Dynamics 365
          </motion.h2>

          <motion.div className="service-subtitle-row" variants={fadeUp}>
            <p className="section-subtitle">
              Premium Microsoft technology services built to help your business
              scale with confidence, clarity, and speed.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="slider-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.75,
            ease: 'easeOut',
          }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
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
              992: { slidesPerView: 2, spaceBetween: 22 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
              1440: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="premium-service-swiper"
          >
            {services.map((item) => (
              <SwiperSlide key={item.title} className="service-slide">
                <motion.div
                  className="service-card-premium"
                  style={{ '--accent': item.accent } as CSSProperties}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="service-image-wrap">
                    <div className="image-frame" />
                    <img
                      src={getCloudinaryAssetUrl(
                        item.img,
                        CLOUDINARY_TRANSFORMS.logo,
                      )}
                      alt={item.title}
                      className="service-image"
                    />
                    <div className="service-image-overlay" />
                    <div className="service-corner-glow" />
                    <div className="service-line-shape">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="service-content">
                    <div className="service-mini-line" />

                    <h3 className="service-card-title">
                      <Link to={item.href}>{item.title}</Link>
                    </h3>

                    <p className="service-card-desc">{item.desc}</p>

                    <Link to={item.href} className="service-read-more">
                      Explore Service
                      <span className="arrow" aria-hidden="true">
                        {'\u2192'}
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
