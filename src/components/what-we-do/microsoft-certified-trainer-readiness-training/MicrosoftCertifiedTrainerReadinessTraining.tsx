import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import pageConfig from './pageConfig';

type UpcomingBatch = {
  leftDate: Date;
  rightDate?: Date;
};

const batchWeekdays = new Set([1, 3, 4, 5]);

const buildUpcomingBatches = (today = new Date()): UpcomingBatch[] => {
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const batchDates: Date[] = [];
  const dateCursor = new Date(currentDate);

  while (batchDates.length < 10) {
    if (batchWeekdays.has(dateCursor.getDay())) {
      batchDates.push(new Date(dateCursor));
    }

    dateCursor.setDate(dateCursor.getDate() + 1);
  }

  return Array.from({ length: Math.ceil(batchDates.length / 2) }, (_, index) => {
    const pairIndex = index * 2;

    return {
      leftDate: batchDates[pairIndex],
      rightDate: batchDates[pairIndex + 1],
    };
  });
};

const formatBatchDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}-${month}-${date.getFullYear()}`;
};

const getBatchKey = ({ leftDate, rightDate }: UpcomingBatch) => {
  return `${formatBatchDate(leftDate)}-${rightDate ? formatBatchDate(rightDate) : 'single'}`;
};

const overviewBenefits = [
  'Build the confidence to conduct structured technical sessions for corporate and professional learners.',
  'Prepare for the readiness evaluation with stronger command over your Microsoft Associate or Expert-level subject area.',
  'Earn a readiness certificate after successfully demonstrating your instructional capability.',
];

const outcomePoints = [
  'Plan learner-focused sessions with clear objectives and practical teaching methods.',
  'Explain technical concepts through demonstrations, examples, and guided problem solving.',
  'Communicate complex Microsoft topics with better structure, pacing, and clarity.',
  'Handle classroom conversations, learner questions, timing, and transitions with confidence.',
  'Present as a professional trainer in virtual, classroom, and hybrid delivery formats.',
  'Use demos, whiteboarding, and interactive techniques to keep learners engaged.',
];

const highlightCards = [
  {
    accent: 'blue',
    text: 'Hands-on trainer readiness experience designed around real technical classroom situations.',
  },
  {
    accent: 'gold',
    text: 'Personalized guidance from AtiSunya trainers to improve delivery confidence and session control.',
  },
  {
    accent: 'red',
    text: 'Competency-based practice that helps participants demonstrate instructional skills, not just theory.',
  },
  {
    accent: 'teal',
    text: 'Microsoft-aligned readiness guidance for certified professionals preparing for the MCT pathway.',
  },
  {
    accent: 'amber',
    text: 'Delivery techniques for online, onsite, and blended learning environments used by modern teams.',
  },
  {
    accent: 'orange',
    text: 'Clear next-step support so participants understand what to do after completing the readiness session.',
  },
];

const attendeePoints = [
  'Certified professionals who enjoy teaching and want to grow into confident Microsoft technology trainers.',
  'Consultants, developers, administrators, and subject matter experts preparing to deliver technical learning sessions.',
  'Participants with strong knowledge of an Associate or Expert-level Microsoft certification area and at least one relevant credential.',
];

const programStats = [
  {
    value: '8 hrs',
    label: 'Live readiness session',
  },
  {
    value: 'Global',
    label: 'Virtual and classroom batches',
  },
  {
    value: 'MCTRC',
    label: 'Readiness evaluation support',
  },
];

const prerequisitePoints = [
  'An active Microsoft Associate or Expert-level certification that matches your training focus.',
  'Practical understanding of the certification content, labs, scenarios, and learner questions you may need to explain.',
];

const whyAtiSunyaPoints = [
  'AtiSunya combines Microsoft technology consulting experience with practical training delivery expertise.',
  'Our readiness sessions are structured, instructor-led, and focused on measurable improvement in presentation quality.',
  'We help participants strengthen confidence, learner engagement, demo handling, and professional training presence.',
];

const processSteps = [
  'Register for the AtiSunya MCT readiness session and receive guidance on how to prepare for the training day.',
  'Attend the live instructor-led program where the trainer explains expectations, delivery standards, and the MCT application flow.',
  'Practice presenting a Microsoft certification topic with attention to clarity, structure, learner engagement, and technical accuracy.',
  'Complete the readiness evaluation by delivering your session and receiving professional review from the trainer.',
  'Receive the MCTRC readiness certificate after successfully meeting the evaluation expectations.',
  'Use the application guidance shared in the program to continue with the Microsoft MCT registration process.',
  'After Microsoft completes the review and confirmation steps, proceed toward your official MCT enrollment.',
];

const viewport = {
  once: true,
  amount: 0.18,
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function MicrosoftCertifiedTrainerReadinessTraining() {
  const upcomingBatches = useMemo(() => buildUpcomingBatches(), []);

  return (
    <main className="mctrt-page">
      <section className="mctrt-course-overview">
        <div className="container">
          <motion.div
            className="mctrt-overview-grid"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerVariants}
          >
            <motion.div
              className="mctrt-overview-copy"
              variants={fadeUpVariants}
            >
              <h1>Microsoft Certified Trainer Readiness - Course Overview</h1>

              <p>
                AtiSunya&apos;s Microsoft Certified Trainer Readiness Training
                is built for certified technology professionals who want to
                teach with more confidence, structure, and impact. The program
                helps participants prepare for the readiness evaluation while
                strengthening the practical skills expected from modern
                technical trainers.
              </p>

              <p>
                Through instructor-led guidance, participants work on
                communication, session planning, learner engagement, demo
                delivery, classroom presence, and the ability to explain
                Microsoft technologies in a clear and professional way.
              </p>

              <h2>
                Key advantages of completing the Microsoft Certified Trainer
                Readiness Course with AtiSunya:
              </h2>

              <ul className="mctrt-dot-list">
                {overviewBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                The training is suitable for professionals preparing to deliver
                Microsoft learning experiences for organizations, teams,
                partners, or public classroom audiences.
              </p>

              <p className="mctrt-emphasis">
                AtiSunya supports flexible delivery models, including virtual
                sessions for global learners and classroom-style sessions for
                group or enterprise batches.
              </p>

              <p className="mctrt-language-note">
                Standard delivery is available in English. Additional language
                support can be discussed for corporate, regional, or group
                training requirements.
              </p>
            </motion.div>

            <motion.aside
              className="mctrt-batch-card"
              variants={fadeUpVariants}
            >
              <div className="mctrt-batch-card-head">
                <h2>Upcoming Global Batches</h2>
              </div>
              <div className="mctrt-batch-list">
                {upcomingBatches.map((batch) => (
                  <div key={getBatchKey(batch)} className="mctrt-batch-row">
                    <span>{formatBatchDate(batch.leftDate)}</span>
                    <i aria-hidden="true" />
                    <span>
                      {batch.rightDate ? formatBatchDate(batch.rightDate) : ''}
                    </span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      <section className="mctrt-snapshot-section">
        <div className="container">
          <motion.div
            className="mctrt-snapshot-card"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerVariants}
          >
            <motion.div className="mctrt-snapshot-copy" variants={fadeUpVariants}>
              <span>AtiSunya Program Snapshot</span>
              <h2>Practical preparation for trainers who need to deliver, not just present.</h2>
            </motion.div>

            <div className="mctrt-snapshot-stats">
              {programStats.map((item) => (
                <motion.article key={item.label} variants={fadeUpVariants}>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mctrt-section">
        <div className="container">
          <motion.div
            className="mctrt-outcomes-card"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <h2>
              After completing AtiSunya&apos;s Microsoft Certified Trainer
              Readiness course, participants will be able to:
            </h2>
            <ul className="mctrt-check-list">
              {outcomePoints.map((item) => (
                <li key={item}>
                  <Check size={18} strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mctrt-heading-block"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <h2>Main Highlights of MCT Readiness Course (MCTRC)</h2>
          </motion.div>

          <motion.div
            className="mctrt-highlight-grid"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerVariants}
          >
            {highlightCards.map((item) => (
              <motion.article
                key={item.text}
                className={`mctrt-highlight-card mctrt-accent-${item.accent}`}
                variants={fadeUpVariants}
                whileHover={{ y: -4 }}
              >
                <p>{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mctrt-section mctrt-section-tight">
        <div className="container">
          <motion.div
            className="mctrt-heading-block"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <h2>Who Should Attend MCT Readiness Course (MCTRC)</h2>
          </motion.div>

          <motion.div
            className="mctrt-attend-band"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeInVariants}
          >
            <div className="mctrt-attend-copy">
              <ul className="mctrt-check-list mctrt-check-list-light">
                {attendeePoints.map((item) => (
                  <li key={item}>
                    <Check size={18} strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mctrt-attend-image" aria-hidden="true">
              <img src={pageConfig.image} alt="" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mctrt-section mctrt-section-tight">
        <div className="container">
          <motion.div
            className="mctrt-heading-block"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <h2>What are the prerequisites for MCT Readiness Course (MCTRC)?</h2>
            <p>Participants should have an understanding of the following:</p>
          </motion.div>

          <motion.ul
            className="mctrt-dot-list mctrt-contained-list"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            {prerequisitePoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>

          <motion.div
            className="mctrt-heading-block mctrt-spaced-heading"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <h2>Why opt AtiSunya for MCT Readiness Certification (MCTRC)?</h2>
          </motion.div>

          <motion.div
            className="mctrt-why-list"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerVariants}
          >
            {whyAtiSunyaPoints.map((item) => (
              <motion.div
                key={item}
                className="mctrt-why-row"
                variants={fadeUpVariants}
              >
                <Check size={18} strokeWidth={3} />
                <p>{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mctrt-process-section">
        <div className="container">
          <motion.div
            className="mctrt-heading-block"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <h2>Here are 7 steps of the MCTRC process:</h2>
          </motion.div>

          <motion.div
            className="mctrt-process-list"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerVariants}
          >
            {processSteps.map((step, index) => (
              <motion.article
                key={step}
                className="mctrt-process-row"
                variants={fadeUpVariants}
              >
                <span className="mctrt-process-dot" aria-hidden="true" />
                <p>
                  <strong>Step {index + 1}:</strong> {step}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mctrt-outline-section">
        <div className="container">
          <motion.div
            className="mctrt-outline-card"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <div>
              <span>MCT Readiness Course Outline</span>
              <h2>Sharpen your delivery. Strengthen your trainer profile.</h2>
              <p>
                Begin your MCT readiness journey with AtiSunya&apos;s practical,
                instructor-led training experience.
              </p>
            </div>
            <div className="mctrt-actions">
              <Link to="/pay-now" className="tv-btn-primary p-relative mctrt-global-btn">
                <span className="btn-wrap">
                  <span className="btn-text1">Pay Now</span>
                  <span className="btn-text2">Pay Now</span>
                </span>
              </Link>
              <Link to="/contact" className="tv-btn-secondary p-relative mctrt-global-btn">
                <span className="btn-wrap">
                  <span className="btn-text1">Enroll Now</span>
                  <span className="btn-text2">Enroll Now</span>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
