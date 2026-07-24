import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { awardsAndCertifications } from '../../../data/awards';
import '../../../styles/scss/layout/_awards.scss';

import 'swiper/css';

const availableAwards = awardsAndCertifications.filter((item) => item.image);

const REPEAT_COUNT = 4;
const marqueeAwards = Array.from({ length: REPEAT_COUNT }, (_, repeatIndex) =>
  availableAwards.map((item) => ({ ...item, key: `${item.id}-${repeatIndex}` })),
).flat();

export default function AwardsRecognition() {
  return (
    <section className="tv-awards-area">
      <div className="container">
        <motion.div
          className="tv-awards-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <span className="tv-section-subtitle">Awards, Recognition &amp; Certifications</span>
          <h2 className="tv-section-title">Certifications That Back Our Delivery</h2>
          <p>
            Recognitions and certifications that reflect our commitment to
            quality, security, and reliable Microsoft-led delivery.
          </p>
        </motion.div>

        <Swiper
          loop={true}
          spaceBetween={30}
          slidesPerView="auto"
          speed={4500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="swiper-container tv-awards-slider"
        >
          {marqueeAwards.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.key}>
              <div className="tv-award-badge">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
