import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServicePageConfig } from '../../../data/service-page-types';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Certified Trainer Readiness Training',
  subtitle:
    'Course components, trainer preparation, and MCT application readiness',
  category: 'service',
  focus:
    'instructional skills development, Microsoft certification readiness, and trainer confidence',
  summary:
    'AtiSunya’s Microsoft Certified Trainer Readiness Course helps future trainers strengthen delivery skills, improve instructional confidence, and prepare for Microsoft Certified Trainer application requirements.',
  image: '/assets/img/service/MCTRT.png',
  highlights: [
    'Live trainer readiness sessions',
    'Scenario-based instructional practice',
    'Microsoft-aligned eligibility guidance',
    'Certificate-backed MCT application support',
  ],
};

const audienceCards = [
  {
    title: 'Who This Is For',
    description:
      'Ideal for professionals who are enthusiastic about training others and want to sharpen their instructional toolkit.',
  },
  {
    title: 'Why Continue This Course',
    description:
      'This program helps you stay prepared and confident when the next training opportunity arrives.',
  },
  {
    title: 'Who Can Apply',
    description:
      'Applicants should be familiar with Associate or Expert-level Microsoft topics and hold at least one certification at the corresponding level.',
  },
];

const benefitPoints = [
  'Practical, scenario-based learning that mirrors real training environments and teaching challenges.',
  'Access to an LMS and Exam Ready platform for resources, guidance, and ongoing preparation support.',
  'Instructor-led sessions and mentorship from certified Microsoft trainers focused on capability building.',
  'Microsoft Learning Partner access to exclusive learning content, tools, and trainer resources.',
];

const whyChoosePoints = [
  'As an official ISCP, we help you meet one of the key requirements for the Microsoft Certified Trainer program.',
  'Programs are led by Microsoft Certified Trainers and industry experts with practical, project-based experience.',
  'Online and offline classes are available, giving learners flexibility across time zones and delivery formats.',
  'Successful participants receive a Microsoft-approved Instructional Skills Certificate required for MCT application readiness.',
  'The MCT Readiness Program supports career growth through global recognition and stronger training credibility.',
  'Ongoing support, peer networking, and access to the broader MCT community continue beyond the class itself.',
];

const processSteps = [
  'Enroll in the 8-hour MCTRC session. After registration, you receive a digital handbook covering the curriculum and preparation guidance.',
  'Attend the live session, where trainers explain the step-by-step Microsoft Certified Trainer application process and each eligibility requirement.',
  'Complete the MCTRC assessment by delivering a 90-minute live session on an Associate or Expert Microsoft Certified topic.',
  'Receive your MCTRC certificate after successful evaluation of your instructional delivery.',
  'Email AtiSunya with your Microsoft Certificate ID (MCID) using the subject line “Start MCT Registration” and ensure your MCID is linked to the relevant certification.',
  'Receive a welcome email from Microsoft after processing, confirming successful enrollment as an MCT.',
];

const upcomingBatches = [
  '20 Apr-2026 to 21 Apr-2026',
  '23 Apr-2026 to 24 Apr-2026',
];

export { pageConfig };

export default function MicrosoftCertifiedTrainerReadinessTraining() {
  return (
    <main className="mctrt-page">
      <section className="mctrt-hero">
        <div className="container">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-xl-7 col-lg-7">
              <div className="mctrt-hero-copy">
                <span className="mctrt-kicker">Enroll Now</span>
                <h1>
                  Microsoft Certified Trainer Readiness: Course Components &
                  Overview
                </h1>
                <p>
                  AtiSunya&apos;s specially designed Microsoft Certified Trainer
                  Readiness Course equips future trainers with the practical
                  instructional skills and structured guidance needed to succeed
                  as Microsoft-certified trainers.
                </p>
                <p>
                  The program focuses on effective communication, confident body
                  language, dynamic delivery techniques, and the teaching
                  discipline required for modern classroom, hybrid, and virtual
                  learning environments.
                </p>

                <div className="mctrt-actions">
                  <Link to="/contact" className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Enroll Now</span>
                      <span className="btn-text2">Enroll Now</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5">
              <aside className="mctrt-hero-card">
                <div className="mctrt-media-panel">
                  <div className="mctrt-card-image">
                    <img src={pageConfig.image} alt={pageConfig.title} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="mctrt-batches">
        <div className="container">
          <div className="mctrt-batch-card">
            <div className="mctrt-batch-card-head">
              <h2>Upcoming Global Batches</h2>
            </div>

            <div className="mctrt-batch-strip">
              {upcomingBatches.map((batch, index) => (
                <div key={batch} className="mctrt-batch-cell">
                  <span>{batch}</span>
                  {index === 0 && <i aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mctrt-overview">
        <div className="container">
          <div className="row g-4 g-xl-5 align-items-start">
            <div className="col-lg-7">
              <div className="mctrt-section-copy">
                <span className="mctrt-section-tag">Program Value</span>
                <h2>
                  Advantages of earning the Microsoft Certified Trainer
                  Readiness Course
                </h2>
                <p>
                  Enrolling in the MCTRC at AtiSunya offers a structured path
                  toward becoming a qualified corporate trainer. The
                  certification improves instructional delivery skills while
                  helping participants align with key evaluation criteria for
                  Microsoft Certified Trainer status.
                </p>
                <p>
                  After successful completion and evaluation, you receive a
                  qualified MCTRC certificate that demonstrates your readiness
                  to deliver official Microsoft training.
                </p>
                <p>
                  To support different learning preferences, AtiSunya offers
                  both virtual and classroom-based sessions delivered across
                  global regions, giving participants the flexibility to learn
                  in the format that fits them best.
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="mctrt-highlight-stack">
                {pageConfig.highlights.map((item) => (
                  <article key={item} className="mctrt-highlight-card">
                    <div className="mctrt-check" aria-hidden="true">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mctrt-audience">
        <div className="container">
          <div className="mctrt-section-heading text-center">
            <span className="mctrt-section-tag">Eligibility</span>
            <h2>
              Who should enroll in the Microsoft Certified Trainer Readiness
              Course?
            </h2>
          </div>

          <div className="row g-4">
            {audienceCards.map((item) => (
              <div key={item.title} className="col-lg-4">
                <article className="mctrt-info-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </div>
            ))}
          </div>

          <div className="mctrt-prerequisites">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <div className="mctrt-prereq-copy">
                  <span className="mctrt-section-tag">Prerequisites</span>
                  <h3>Prerequisites for MCTRC enrollment</h3>
                  <p>
                    To enroll in the MCTRC, participants must meet the following
                    requirements.
                  </p>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="mctrt-prereq-list">
                  <article className="mctrt-prereq-item">
                    <h4>Hold a qualifying certification</h4>
                    <p>
                      Possess at least one Microsoft Associate or Expert-level
                      certification.
                    </p>
                  </article>
                  <article className="mctrt-prereq-item">
                    <h4>Understand the subject matter</h4>
                    <p>
                      Demonstrate a strong understanding of the corresponding
                      course material.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mctrt-benefits">
        <div className="container">
          <div className="row g-4 g-xl-5">
            <div className="col-lg-5">
              <div className="mctrt-section-copy mctrt-sticky-copy">
                <span className="mctrt-section-tag">Top Benefits</span>
                <h2>What participants gain from the MCT readiness course</h2>
                <p>
                  The course combines guided practice, platform support, trainer
                  mentorship, and Microsoft-aligned resources to help
                  participants build real delivery confidence.
                </p>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-4">
                {benefitPoints.map((benefit) => (
                  <div key={benefit} className="col-md-6">
                    <article className="mctrt-benefit-card">
                      <div className="mctrt-check" aria-hidden="true">
                        <Check size={18} strokeWidth={3} />
                      </div>
                      <p>{benefit}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mctrt-process">
        <div className="container">
          <div className="row g-4 g-xl-5">
            <div className="col-lg-5">
              <div className="mctrt-section-copy">
                <span className="mctrt-section-tag">Why AtiSunya</span>
                <h2>Why choose AtiSunya for MCT readiness certification?</h2>
                <p>
                  AtiSunya is committed to helping IT professionals and emerging
                  educators become certified Microsoft trainers through
                  structured delivery, practical mentoring, and guided
                  certification support.
                </p>
              </div>

              <div className="mctrt-why-list">
                {whyChoosePoints.map((item) => (
                  <div key={item} className="mctrt-why-item">
                    <div className="mctrt-check" aria-hidden="true">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <div className="mctrt-process-panel">
                <div className="mctrt-process-head">
                  <span className="mctrt-section-tag">MCTRC Process</span>
                  <h3>Here are the steps in the MCTRC journey</h3>
                </div>

                <div className="mctrt-step-list">
                  {processSteps.map((step, index) => (
                    <article key={step} className="mctrt-step-card">
                      <span className="mctrt-step-number">
                        Step {index + 1}
                      </span>
                      <p>{step}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mctrt-outcome">
        <div className="container">
          <div className="mctrt-outcome-card">
            <span className="mctrt-section-tag">Completion Outcome</span>
            <h2>What you are equipped to do after completing the course</h2>
            <p>
              Upon successful completion, participants receive a
              Microsoft-approved Instructional Skills Certificate, a key
              requirement for MCT application readiness and a strong validation
              of their training capability.
            </p>
            <p>
              The program helps you step into technical training with stronger
              communication, recognized instructional credibility, and career
              growth supported by Microsoft-aligned global recognition.
            </p>

            <div className="mctrt-actions">
              <Link to="/contact" className="tv-btn-primary">
                <span className="btn-wrap">
                  <span className="btn-text1">Enroll Now</span>
                  <span className="btn-text2">Enroll Now</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
