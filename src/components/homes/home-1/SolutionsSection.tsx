import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const solutions = [
  {
    key: 'Dynamics 365',
    title: 'Solutions across Microsoft product suite',
    desc: 'Microsoft technologies can transform how you operate and the outcomes you achieve. As a trusted Microsoft partner, we ensure this transformation happens without a hiccup so your business can be more agile, fast, and productive.',
    button: 'Know More',
    image: '/assets/img/service/Microsoft.svg',
  },
  {
    key: 'SAP',
    title: 'Solutions across SAP product suite',
    desc: 'Modern SAP solutions help simplify operations, improve process visibility, and support smarter enterprise decisions with confidence.',
    button: 'Know More',
    image: '/assets/img/solutions/sap-banner.png',
  },
  {
    key: 'Salesforce',
    title: 'Solutions across Salesforce product suite',
    desc: 'Salesforce solutions can connect teams, automate workflows, and create better customer experiences across your business.',
    button: 'Know More',
    image: '/assets/img/solutions/salesforce-banner.png',
  },
  {
    key: 'ServiceNow',
    title: 'Solutions across ServiceNow product suite',
    desc: 'ServiceNow can streamline service delivery, reduce manual work, and improve visibility across your enterprise operations.',
    button: 'Know More',
    image: '/assets/img/solutions/servicenow-banner.png',
  },
  {
    key: 'AWS',
    title: 'Solutions across AWS product suite',
    desc: 'AWS cloud solutions help you scale securely, modernize infrastructure, and build resilient digital experiences faster.',
    button: 'Know More',
    image: '/assets/img/solutions/aws-banner.png',
  },
];

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = solutions[activeTab];

  return (
    <section className="solutions-section">
      <div className="container">
        <div className="solutions-tabs-wrap">
          <div className="solutions-tabs" role="tablist" aria-label="Solutions categories">
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

        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            className="solutions-content"
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="solutions-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="solutions-title">{active.title}</h2>
              <p className="solutions-desc">{active.desc}</p>

              <Link to="/service-details" className="solutions-btn">
                {active.button}
                <span>›</span>
              </Link>
            </motion.div>

            <motion.div
              className="solutions-visual"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="visual-circle" />

              <motion.div
                className="visual-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt={active.key}
                  className="visual-image"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}