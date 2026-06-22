import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/scss/layout/_becomemct.scss';

const upcomingBatches = [
  ['22-06-2026', '24-06-2026'],
  ['25-06-2026', '26-06-2026'],
  ['29-06-2026', '30-06-2026'],
];

const pageVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 26 },
  show: {
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroImageVariants: Variants = {
  hidden: { scale: 1.06 },
  show: {
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function BecomeMct() {
  const [openIndex, setOpenIndex] = useState(0);

  const heroHighlights = [
    { icon: Clock3, label: '2-day live readiness program' },
    { icon: Globe2, label: 'Upcoming global batches' },
    { icon: CheckCircle2, label: 'Microsoft ISCP aligned' },
  ];

  const sections = [
    {
      title: 'Program Overview',
      subtitle: 'A structured path to becoming MCT-ready.',
      content: (
        <>
          <p>
            AtiSunya helps IT professionals and aspiring educators grow into
            confident, certified trainers. Our MCT Readiness Program is designed
            to strengthen your instructional skills, improve delivery quality,
            and help you step into the Microsoft training ecosystem with
            confidence and recognition.
          </p>
          <p className="mb-0">
            The course focuses on practical presentation skills, learner
            engagement, and professional delivery for onsite, remote, and hybrid
            environments.
          </p>
        </>
      ),
    },
    {
      title: 'MCT Requirement',
      subtitle: 'A clear view of the requirement flow.',
      content: (
        <>
          <p>
            Review the MCT requirement flow to understand the key readiness
            steps before moving ahead with your Microsoft Certified Trainer
            journey.
          </p>

          <figure className="pm-requirement-chart">
            <img
              src="assets/img/service/flow chart.png"
              alt="MCT requirement flow chart"
            />
          </figure>
        </>
      ),
    },
    {
      title: 'Why Choose AtiSunya',
      subtitle: 'A guided and professional learning experience.',
      content: (
        <>
          <p>
            As an official Microsoft-approved Instructional Skills Certification
            Provider (ISCP), we help you meet one of the key requirements for
            the Microsoft Certified Trainer program.
          </p>

          <div className="pm-grid">
            <div className="pm-mini-card">
              <h6>Microsoft-aligned guidance</h6>
              <p>Learn with a structured certification-focused approach.</p>
            </div>
            <div className="pm-mini-card">
              <h6>Practical learning</h6>
              <p>Gain confidence through live practice and feedback.</p>
            </div>
            <div className="pm-mini-card">
              <h6>Better delivery</h6>
              <p>Improve communication, clarity, and audience engagement.</p>
            </div>
            <div className="pm-mini-card">
              <h6>Career growth</h6>
              <p>Build a stronger profile for training opportunities.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'What You Will Learn',
      subtitle: 'Skills that improve your teaching impact.',
      content: (
        <>
          <p>
            Our Instructional Skills for Technical Trainers course equips you to
            deliver high-quality Microsoft training in onsite, remote, or hybrid
            settings.
          </p>

          <ul className="pm-list">
            <li>Introduce yourself and engage learners effectively</li>
            <li>Understand audience needs and learning styles</li>
            <li>Participate in group discussions and peer reviews</li>
            <li>Deliver short teach-back sessions with confidence</li>
            <li>Receive one-on-one coaching and improvement feedback</li>
            <li>Track progress with guided support</li>
            <li>Measure performance and learner-focused outcomes</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Who Should Join',
      subtitle: 'Ideal for future trainers and technical presenters.',
      content: (
        <>
          <p>
            This program is ideal for professionals who want to move into
            training or improve the way they deliver technical content.
          </p>

          <div className="pm-grid">
            <div className="pm-mini-card">
              <h6>Technical professionals</h6>
              <p>
                Perfect for people transitioning from development or support.
              </p>
            </div>
            <div className="pm-mini-card">
              <h6>Existing trainers</h6>
              <p>Helpful for trainers preparing for MCT eligibility.</p>
            </div>
            <div className="pm-mini-card">
              <h6>Corporate educators</h6>
              <p>
                Useful for those delivering learning sessions in organizations.
              </p>
            </div>
            <div className="pm-mini-card">
              <h6>Career upgraders</h6>
              <p>Great for IT professionals building a training profile.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Program Outcome',
      subtitle: 'A stronger and more confident trainer profile.',
      content: (
        <>
          <p>
            By the end of the program, you will be better prepared to present
            confidently, engage your audience, and deliver professional
            Microsoft training experiences that create real impact for learners
            and organizations.
          </p>
          <p className="mb-0">
            You will leave with stronger communication, improved stage presence,
            and a clear path toward becoming a respected Microsoft trainer.
          </p>
        </>
      ),
    },
    {
      title: 'Next Steps',
      subtitle: 'Start your MCT journey with confidence.',
      content: (
        <>
          <p>
            Take the next step toward becoming a professional Microsoft trainer
            with a program built to improve your delivery, sharpen your skills,
            and support your growth.
          </p>

          <div className="pm-cta-box">
            <h5>Build confidence. Improve delivery. Become MCT-ready.</h5>
            <p className="mb-0">
              Join a structured learning path designed for aspiring Microsoft
              trainers.
            </p>
          </div>
        </>
      ),
    },
  ];

  const toggleSection = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <motion.div
      className="pm-page"
      initial="hidden"
      animate="show"
      variants={pageVariants}
    >
      <div className="container">
        <motion.div className="pm-hero" variants={fadeUpVariants}>
          <motion.img
            src="assets/img/project/project-details.png"
            alt="Become a Microsoft Certified Trainer"
            className="pm-hero-img"
            variants={heroImageVariants}
          />

          <motion.div className="pm-hero-overlay" variants={pageVariants}>
            <motion.span className="pm-badge" variants={fadeUpVariants}>
              Microsoft Instructional Skills Certification Program
            </motion.span>
            <motion.h1 variants={fadeUpVariants}>
              Become a Microsoft Certified Trainer (MCT)
            </motion.h1>
            <motion.p variants={fadeUpVariants}>
              Unlock your potential with AtiSunya - a trusted Microsoft
              Instructional Skills Certification Provider (ISCP).
            </motion.p>

            <motion.div className="pm-hero-highlights" variants={fadeUpVariants}>
              {heroHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <span key={item.label}>
                    <Icon size={18} strokeWidth={2} />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.div className="pm-actions" variants={fadeUpVariants}>
              <Link to="/pay-now" className="pm-btn pm-btn-primary">
                Pay Now
                <ArrowRight size={18} />
              </Link>
              <Link to="/become-mct/enroll" className="pm-btn pm-btn-secondary">
                Enroll Now
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="row g-4">
          <div className="col-xl-8 col-lg-8 col-12">
            <motion.div className="pm-content-card" variants={fadeUpVariants}>
              <div className="pm-intro">
                <span className="pm-kicker">MCT Program</span>
                <h2>Become a Microsoft Certified Trainer (MCT)</h2>
                <p>
                  Unlock your potential with AtiSunya - a trusted Microsoft
                  Instructional Skills Certification Provider (ISCP)
                </p>
              </div>

              <div className="pm-sections">
                {sections.map((section, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <motion.article
                      key={section.title}
                      className={`pm-section-card ${isOpen ? 'active' : ''}`}
                      variants={fadeUpVariants}
                      whileHover={{ y: -2 }}
                    >
                      <button
                        type="button"
                        className="pm-section-head"
                        onClick={() => toggleSection(index)}
                        aria-expanded={isOpen}
                      >
                        <div>
                          <h3>{section.title}</h3>
                          <p>{section.subtitle}</p>
                        </div>
                        <span className={`pm-toggle ${isOpen ? 'open' : ''}`}>
                          {isOpen ? '-' : '+'}
                        </span>
                      </button>

                      <div
                        className={`pm-section-body ${isOpen ? 'open' : ''}`}
                      >
                        <div className="pm-section-inner">
                          {section.content}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="col-xl-4 col-lg-4 col-12">
            <motion.div className="pm-sidebar" variants={pageVariants}>
              <motion.div
                className="pm-sidebar-card pm-details-card"
                variants={fadeUpVariants}
              >
                <h4>Program Details</h4>
                <div className="pm-info">
                  <div>
                    <span>Program</span>
                    <strong>ISCP - Instructional Skills Certification Provider</strong>
                  </div>
                  <div>
                    <span>Category</span>
                    <strong>Certification Training</strong>
                  </div>
                  <div>
                    <span>Format</span>
                    <strong>Online / Hybrid / Onsite</strong>
                  </div>
                  <div>
                    <span>Primary Language</span>
                    <strong>English</strong>
                  </div>
                  <div>
                    <span>Secondary Languages</span>
                    <strong>
                      Bangla (India); Gujarati; Hindi; Kannada; Malayalam;
                      Marathi; Tamil (India); Telugu; Urdu
                    </strong>
                  </div>
                  <div>
                    <span>Website</span>
                    <strong>atisunya.co</strong>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pm-sidebar-card pm-batch-card"
                variants={fadeUpVariants}
              >
                <div className="pm-card-titlebar">
                  <h4>Upcoming Batches</h4>
                </div>

                <div className="pm-batch-list">
                  {upcomingBatches.map(([leftDate, rightDate]) => (
                    <div
                      key={`${leftDate}-${rightDate}`}
                      className="pm-batch-row"
                    >
                      <span>{leftDate}</span>
                      <span aria-hidden="true" className="pm-batch-divider" />
                      <span>{rightDate}</span>
                    </div>
                  ))}
                </div>

                <p className="pm-batch-note">
                  Microsoft is introducing a new MCT onboarding experience
                  starting from 1st July 2026.
                </p>
              </motion.div>

              <motion.div
                className="pm-sidebar-card pm-fee-card"
                variants={fadeUpVariants}
              >
                <div className="pm-card-titlebar">
                  <h4>Course Fee</h4>
                </div>

                <div className="pm-fee-box">
                  <div className="pm-fee-line">
                    <span>Course Fee:</span>
                    <div className="pm-fee-values">
                      <strong>USD 382</strong>
                      <strong>INR 35,400</strong>
                    </div>
                  </div>

                  <p className="mb-0">
                    Includes trainer-led sessions, practice support, and guided
                    learning for MCT readiness.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
