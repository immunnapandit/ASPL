import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const solutions = [
  {
    key: 'Dynamics 365',
    title: 'Transform Your Business with Dynamics 365',
    desc: 'Transform your operations with Microsoft technologies to drive better outcomes, enabling a more agile, efficient, and growth-focused business.',
    button: 'Know More',
    href: '/solutions/microsoft-dynamics-365',
    image: '/assets/img/service/MicrosoftD365.jpg',
  },
  {
    key: 'Business Central',
    title: 'Run Your Business Smarter with Business Central',
    desc: 'Manage your finances, operations, and sales seamlessly with Dynamics 365 Business Central, giving you real-time insights and the flexibility to make faster, smarter business decisions.',
    button: 'Know More',
    href: '/solutions/business-central',
    image: '/assets/img/service/Business Central.avif',
  },
  {
    key: 'Salesforce',
    title: 'Grow Faster with Salesforce',
    desc: 'Unify your teams, automate workflows, and deliver personalized customer experiences with Salesforce, helping you build stronger relationships and drive consistent business growth.',
    button: 'Know More',
    href: '/solutions/salesforce',
    image: '/assets/img/service/Salesforce.png',
  },
  {
    key: 'AWS',
    title: 'Scale Smarter with AWS',
    desc: 'Build, scale, and secure your applications with AWS, enabling faster innovation, reliable performance, and a flexible cloud infrastructure that grows with your business.',
    button: 'Know More',
    href: '/solutions/aws',
    image: '/assets/img/service/saas-concept-collage.jpg',
  },
  {
    key: 'Azure',
    title: 'Innovate Faster with Microsoft Azure',
    desc: 'Unlock the full potential of Microsoft Azure to build, scale, and manage applications with speed and security, empowering your business with intelligent cloud capabilities, seamless integration, and continuous innovation.',
    button: 'Know More',
    href: '/solutions/microsoft-azure',
    image: '/assets/img/service/Azure.png',
  },
] as const;

const panelVariants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -60,
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -40,
  },
};

const imageVariants = {
  initial: {
    opacity: 0,
    x: 28,
    scale: 0.995,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    x: -28,
    scale: 0.995,
  },
};

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = solutions[activeTab];

  useEffect(() => {
    solutions.forEach((item) => {
      const image = new Image();
      image.src = item.image;
    });
  }, []);

  return (
    <section id="solutions" className="solutions-section">
      <div className="container">
        <div className="solutions-tabs-wrap">
          <div
            className="solutions-tabs"
            role="tablist"
            aria-label="Solutions categories"
          >
            {solutions.map((item, index) => (
              <motion.button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                className={`solution-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {item.key}
              </motion.button>
            ))}
          </div>
          <div className="tabs-line" />
        </div>

        <div className="solutions-content-area">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={active.key}
              className="solutions-panel"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="solutions-text"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="solutions-title">{active.title}</h2>
                <p className="solutions-desc">{active.desc}</p>

                <Link to={active.href} className="solutions-btn">
                  {active.button}
                  <span>&rsaquo;</span>
                </Link>
              </motion.div>

              <motion.div
                className="solutions-visual"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="visual-circle" />
                <div className="visual-glow" />

                <motion.div
                  className="visual-card"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={active.image}
                    alt={active.key}
                    className="visual-image"
                    loading="eager"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
