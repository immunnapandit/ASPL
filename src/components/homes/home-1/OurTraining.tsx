import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "../../../styles/scss/layout/_trainings.scss";
import "swiper/css";
import "swiper/css/navigation";

const trainings = [
  {
    title: "Microsoft Dynamics 365 F&O",
    desc: "Enterprise ERP solutions for finance, operations, supply chain workflows, and process optimization across growing organizations.",
    logo: "/assets/img/service/Dynamics365.svg",
    href: "/solutions/d365-for-finance-and-operations",
  },
  {
    title: "Microsoft Azure",
    desc: "Cloud computing, infrastructure services, security, scalability, and modern application deployment for digital transformation initiatives.",
    logo: "/assets/img/service/azure-icon.svg",
    href: "/solutions/microsoft-azure",
  },
  {
    title: "Power BI & Data Analytics",
    desc: "Business intelligence, interactive dashboards, reporting, and data visualization to turn raw data into practical decisions.",
    logo: "/assets/img/service/power-bi-icon.svg",
    href: "/solutions/microsoft-power-bi",
  },
  {
    title: "Business Central",
    desc: "Integrated business management training covering finance, sales, operations, and customer service for streamlined performance.",
    logo: "/assets/img/service/BusinessCentral.svg",
    href: "/solutions/business-central",
  },
  {
    title: "Cloud Technology",
    desc: "Hands-on learning for cloud foundations, CI/CD pipelines, deployment practices, and automation-driven operational efficiency.",
    logo: "/assets/img/service/cloud.png",
    href: "/solutions/cloud-technology",
  },
  {
    title: "Microsoft Power Platform",
    desc: "Low-code tools for app development, workflow automation, dashboards, and business process improvement at scale.",
    logo: "/assets/img/service/PowerPlatform.svg",
    href: "/solutions/microsoft-power-platform",
  },
];

export default function TrainingsSection() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="training-area">
      <div className="container">
        <motion.div
          className="training-heading tv-section-title-box"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="training-subtitle tv-section-subtitle tv-spltv-text tv-spltv-in-right">
            Trainings
          </span>

          <h2 className="training-title tv-section-title tv-spltv-text tv-spltv-in-right">
            Our Training Programs
          </h2>

          <p className="training-text">
            We provide industry-focused training programs designed to enhance your
            skills in cloud, ERP, and modern business technologies.
          </p>
        </motion.div>

        <motion.div
          className="training-slider-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <Swiper
            modules={[Navigation]}
            loop
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
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              576: { slidesPerView: 1.2, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 22 },
              1200: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="training-swiper"
          >
            {trainings.map((item) => (
              <SwiperSlide key={item.href} className="training-slide">
                <article className="training-card">
                  <Link
                    to={item.href}
                    className="training-card-image"
                    aria-label={`Open ${item.title} training page`}
                  >
                    <img src={item.logo} alt={item.title} className="training-logo" />
                  </Link>

                  <div className="training-card-content">
                    <h3 className="training-name">{item.title}</h3>

                    <p className="training-desc">{item.desc}</p>

                    <Link to={item.href} className="learn-more">
                      <span>Learn More</span>
                      <ArrowRight size={22} strokeWidth={2.2} />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="training-nav">
            <button
              ref={prevRef}
              type="button"
              className="training-nav-btn training-nav-prev"
              aria-label="Previous training"
            >
              <ChevronLeft size={24} strokeWidth={2.8} />
            </button>

            <button
              ref={nextRef}
              type="button"
              className="training-nav-btn training-nav-next"
              aria-label="Next training"
            >
              <ChevronRight size={24} strokeWidth={2.8} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
