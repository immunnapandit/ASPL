import { useState } from "react";
import "../../styles/scss/layout/_becomemct.scss";

export default function BecomeMct() {
  const [openIndex, setOpenIndex] = useState(0);

  const upcomingBatches = [
    { date: "2026-03-28" },
    { date: "2026-03-29" },
  ];

  const sections = [
    {
      title: "Program Overview",
      subtitle: "A structured path to becoming MCT-ready.",
      content: (
        <>
          <p>
            AtiSunya helps IT professionals and aspiring educators grow into
            confident, certified trainers. Our MCT Readiness Program is
            designed to strengthen your instructional skills, improve delivery
            quality, and help you step into the Microsoft training ecosystem
            with confidence and recognition.
          </p>
          <p className="mb-0">
            The course focuses on practical presentation skills, learner
            engagement, and professional delivery for onsite, remote, and
            hybrid environments.
          </p>
        </>
      ),
    },
    {
      title: "Why Choose AtiSunya",
      subtitle: "A guided and professional learning experience.",
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
      title: "What You Will Learn",
      subtitle: "Skills that improve your teaching impact.",
      content: (
        <>
          <p>
            Our Instructional Skills for Technical Trainers course equips you to
            deliver high-quality Microsoft training in onsite, remote, or
            hybrid settings.
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
      title: "Who Should Join",
      subtitle: "Ideal for future trainers and technical presenters.",
      content: (
        <>
          <p>
            This program is ideal for professionals who want to move into
            training or improve the way they deliver technical content.
          </p>

          <div className="pm-grid">
            <div className="pm-mini-card">
              <h6>Technical professionals</h6>
              <p>Perfect for people transitioning from development or support.</p>
            </div>
            <div className="pm-mini-card">
              <h6>Existing trainers</h6>
              <p>Helpful for trainers preparing for MCT eligibility.</p>
            </div>
            <div className="pm-mini-card">
              <h6>Corporate educators</h6>
              <p>Useful for those delivering learning sessions in organizations.</p>
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
      title: "Program Outcome",
      subtitle: "A stronger and more confident trainer profile.",
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
      title: "Next Steps",
      subtitle: "Start your MCT journey with confidence.",
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
    <div className="pm-page">
      <div className="container">
        <div className="pm-hero">
          <img
            src="assets/img/project/project-details.png"
            alt="Become a Microsoft Certified Trainer"
            className="pm-hero-img"
          />

          <div className="pm-hero-overlay">
            <span className="pm-badge">
              Microsoft Instructional Skills Certification Program
            </span>
            <h1>Become a Microsoft Certified Trainer (MCT)</h1>
            <p>
              Unlock your potential with AtiSunya — a trusted Microsoft
              Instructional Skills Certification Provider (ISCP).
            </p>

            <div className="pm-actions">
              <a href="/pay-now" className="pm-btn pm-btn-primary">
                Pay Now
              </a>
              <a href="/enroll-now" className="pm-btn pm-btn-secondary">
                Enroll Now
              </a>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-xl-8 col-lg-8 col-12">
            <div className="pm-content-card">
              <div className="pm-intro">
                <span className="pm-kicker">MCT Program</span>
                <h2>Become a Microsoft Certified Trainer (MCT)</h2>
                <p>
                  Unlock Your Potential with AtiSunya – A Trusted Microsoft
                  Instructional Skills Certification Provider (ISCP)
                </p>
              </div>

              <div className="pm-sections">
                {sections.map((section, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <article
                      key={section.title}
                      className={`pm-section-card ${isOpen ? "active" : ""}`}
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
                        <span className={`pm-toggle ${isOpen ? "open" : ""}`}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <div className={`pm-section-body ${isOpen ? "open" : ""}`}>
                        <div className="pm-section-inner">{section.content}</div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-12">
            <div className="pm-sidebar">
              <div className="pm-sidebar-card pm-details-card">
                <h4>Program Details</h4>
                <div className="pm-info">
                  <div>
                    <span>Program</span>
                    <strong>Microsoft Trainer Readiness</strong>
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
                    <span>Website</span>
                    <strong>example.site.com</strong>
                  </div>
                </div>
              </div>

              <div className="pm-sidebar-card pm-batch-card">
                <div className="pm-card-titlebar">
                  <h4>Upcoming Global Batches</h4>
                </div>

                <div className="pm-batch-strip">
                  {upcomingBatches.map((batch, index) => (
                    <div key={index} className="pm-batch-cell">
                      {batch.date}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pm-sidebar-card pm-fee-card">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}