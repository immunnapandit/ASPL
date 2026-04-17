import { motion } from 'framer-motion';
import '../../../styles/scss/layout/_dynamics-ecosystem.scss';

const textVariants = {
  hidden: {
    opacity: 0,
    x: -36,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    x: 36,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
};

export default function Dynamics365EcosystemSection() {
  return (
    <section className="dynamics-ecosystem-section">
      <div className="container">
        <div className="dynamics-ecosystem-panel">
          <motion.div
            className="dynamics-ecosystem-text"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dynamics-ecosystem-heading training-heading tv-section-title-box">
              <span className="dynamics-ecosystem-kicker training-subtitle tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Ecosystem
              </span>

              <h2 className="dynamics-ecosystem-title training-title tv-section-title tv-spltv-text tv-spltv-in-right">
                Dynamics 365 Ecosystem
              </h2>
            </div>

            <p className="dynamics-ecosystem-desc training-text">
              Bring your CRM, ERP, customer service, finance, sales, and operations
              together with the Dynamics 365 ecosystem. We help businesses connect
              Microsoft applications into one streamlined platform so teams can work
              smarter, automate faster, and deliver more connected experiences at every
              stage of growth.
            </p>
          </motion.div>

          <motion.div
            className="dynamics-ecosystem-visual"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dynamics-ecosystem-circle" />
            <div className="dynamics-ecosystem-glow" />

            <motion.div
              className="dynamics-ecosystem-card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src="/assets/img/service/Dynamics365Ecosystem.png"
                alt="Dynamics 365 Ecosystem"
                className="dynamics-ecosystem-image"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
