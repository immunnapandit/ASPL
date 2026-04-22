import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { industryPages } from "../../../data/industry-pages";
import "swiper/css";
import "swiper/css/navigation";
import "../../../styles/scss/layout/_industry.scss";

export default function IndustriesSection() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="industries-section">
      <div className="container">
        <motion.div
          className="industries-header tv-section-title-box"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="industries-subtitle tv-section-subtitle tv-spltv-text tv-spltv-in-right">
            Industries
          </span>

          <h2 className="industries-title tv-section-title tv-spltv-text tv-spltv-in-right">
            Explore Industries
          </h2>

          <p className="industries-description">
            Our cutting-edge technology and business solutions cater to diverse
            industries.
          </p>
        </motion.div>

        <motion.div
          className="industries-slider-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <Swiper
            modules={[Navigation]}
            loop
            loopAddBlankSlides={false}
            speed={800}
            watchOverflow
            onBeforeInit={(swiper: SwiperType) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation = {
                  ...swiper.params.navigation,
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                };
              }
            }}
            onSwiper={(swiper: SwiperType) => {
              setTimeout(() => {
                if (
                  swiper.params.navigation &&
                  typeof swiper.params.navigation !== "boolean"
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
            spaceBetween={24}
            slidesPerGroup={2}
            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
              576: { slidesPerView: 1.2, slidesPerGroup: 1, spaceBetween: 18 },
              768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 22 },
              1200: { slidesPerView: 4, slidesPerGroup: 2, spaceBetween: 24 },
            }}
            className="industries-swiper"
          >
            {industryPages.map((item) => (
              <SwiperSlide key={item.slug} className="industry-slide">
                <article className="industry-card">
                  <Link
                    to={`/industries/${item.slug}`}
                    className="industry-card-image"
                    aria-label={`Open ${item.title} industry page`}
                  >
                    <img src={item.image} alt={item.title} />
                  </Link>

                  <div className="industry-card-content">
                    <h3>{item.cardTitle}</h3>
                    <p>{item.cardDescription}</p>

                    <Link
                      to={`/industries/${item.slug}`}
                      className="industry-read-more"
                    >
                      <span>Read More</span>
                      <ArrowRight size={22} strokeWidth={2.2} />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="industries-nav">
            <button
              ref={prevRef}
              type="button"
              className="industries-nav-btn industries-nav-prev"
              aria-label="Previous industry"
            >
              <ChevronLeft size={24} strokeWidth={2.8} />
            </button>

            <button
              ref={nextRef}
              type="button"
              className="industries-nav-btn industries-nav-next"
              aria-label="Next industry"
            >
              <ChevronRight size={24} strokeWidth={2.8} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
