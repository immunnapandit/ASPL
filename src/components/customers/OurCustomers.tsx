import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  customerIndustries,
  customerTestimonials,
  customers,
  type Industry,
} from '../../data/customers';
import CustomerCard from './CustomerCard';
import IndustryFilter from './IndustryFilter';
import StatsCard from './StatsCard';
import TestimonialCard from './TestimonialCard';

const stats = [
  {
    value: 100,
    suffix: '+',
    label: 'Clients',
    description: 'Organizations supported across business-critical programs.',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Industries',
    description: 'Deep delivery experience across varied operating models.',
  },
  {
    value: 95,
    suffix: '%',
    label: 'Client Retention',
    description: 'Long-term partnerships built on trust and outcomes.',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'Practical expertise in Microsoft-led transformation.',
  },
];

const sectionAnimation = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55 },
};

export default function OurCustomers() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>('All');

  const filteredCustomers = useMemo(() => {
    if (activeIndustry === 'All') {
      return customers;
    }

    return customers.filter((customer) => customer.industry === activeIndustry);
  }, [activeIndustry]);

  return (
    <main className="tv-customers-page">
      <section className="tv-customers-hero">
        <div className="container">
          <motion.div className="tv-customers-hero-content" {...sectionAnimation}>
            <span className="tv-section-subtitle">Our Customers</span>
            <h1 className="tv-section-title">Trusted by Businesses Across Industries</h1>
            <p>
              We help organizations across multiple industries build secure,
              scalable, and innovative digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="tv-customers-stats" aria-label="Customer success statistics">
        <div className="container">
          <div className="tv-customers-stat-grid">
            {stats.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="tv-customers-directory">
        <div className="container">
          <motion.div className="tv-customers-section-heading" {...sectionAnimation}>
            <span className="tv-section-subtitle">Client Directory</span>
            <h2 className="tv-section-title">Customers by Industry</h2>
            <p>
              Explore a representative sample of organizations that trust
              AtiSunya for technology consulting, implementation, and support.
            </p>
          </motion.div>

          <IndustryFilter
            industries={customerIndustries}
            activeIndustry={activeIndustry}
            onChange={setActiveIndustry}
          />

          <motion.div
            className="tv-customer-grid"
            layout
            aria-live="polite"
            aria-label={`${filteredCustomers.length} customers shown`}
          >
            {filteredCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <CustomerCard customer={customer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="tv-customer-testimonials">
        <div className="container">
          <motion.div className="tv-customers-section-heading" {...sectionAnimation}>
            <span className="tv-section-subtitle">Testimonials</span>
            <h2 className="tv-section-title">What Customers Say</h2>
          </motion.div>

          <div className="tv-customer-testimonial-grid">
            {customerTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="tv-customers-cta">
        <div className="container">
          <div className="tv-customers-cta-inner">
            <div>
              <span className="tv-section-subtitle">Let us build together</span>
              <h2>Ready to Become Our Next Success Story?</h2>
            </div>
            <div className="tv-customers-cta-actions">
              <Link className="tv-btn-primary" to="/contact">
                <span>Contact Us</span>
              </Link>
              <Link className="tv-btn-secondary" to="/contact">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
