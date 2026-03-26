import { useState } from "react";

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
                  Unlock Your Potential with AtiSunya – A Trusted Microsoft Instructional Skills Certification Provider (ISCP)
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

      <style>{`
        .pm-page {
          padding: 90px 0 110px;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.10), transparent 30%),
            radial-gradient(circle at top right, rgba(168, 85, 247, 0.10), transparent 28%),
            linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }

        .pm-hero {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          box-shadow: 0 26px 80px rgba(15, 23, 42, 0.14);
          margin-bottom: 28px;
          background: #0f172a;
        }

        .pm-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0.10) 0%,
            rgba(15, 23, 42, 0.80) 100%
          );
          pointer-events: none;
        }

        .pm-hero-img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
        }

        .pm-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 56px;
          color: #fff;
        }

        .pm-badge {
          display: inline-flex;
          width: fit-content;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          margin-bottom: 14px;
        }

        .pm-hero-overlay h1 {
          font-size: clamp(32px, 4vw, 60px);
          line-height: 1.05;
          margin: 0 0 14px;
          max-width: 840px;
        }

        .pm-hero-overlay p {
          font-size: 18px;
          line-height: 1.75;
          max-width: 760px;
          margin: 0;
          opacity: 0.96;
        }

        .pm-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 26px;
        }

        .pm-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.28s ease;
          border: 1px solid transparent;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.10);
        }

        .pm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(15, 23, 42, 0.14);
        }

        .pm-btn-primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
        }

        .pm-btn-secondary {
          background: rgba(255, 255, 255, 0.10);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
        }

        .pm-content-card,
        .pm-sidebar-card,
        .pm-section-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 26px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
        }

        .pm-content-card {
          padding: 26px;
        }

        .pm-intro {
          padding: 8px 6px 22px;
        }

        .pm-kicker {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
        }

        .pm-intro h2 {
          margin: 0 0 10px;
          font-size: clamp(26px, 3vw, 38px);
          color: #0f172a;
        }

        .pm-intro p {
          margin: 0;
          color: #475569;
          line-height: 1.8;
        }

        .pm-sections {
          display: grid;
          gap: 16px;
        }

        .pm-section-card {
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        .pm-section-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #2563eb 0%, #7c3aed 100%);
          opacity: 0;
          transform: scaleY(0.6);
          transform-origin: center;
          transition: all 0.28s ease;
        }

        .pm-section-card.active {
          border-color: rgba(37, 99, 235, 0.18);
          box-shadow: 0 20px 44px rgba(37, 99, 235, 0.10);
          transform: translateY(-1px);
        }

        .pm-section-card.active::before {
          opacity: 1;
          transform: scaleY(1);
        }

        .pm-section-head {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 22px 22px 22px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          text-align: left;
          cursor: pointer;
        }

        .pm-section-head h3 {
          margin: 0 0 6px;
          font-size: 20px;
          color: #0f172a;
        }

        .pm-section-head p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }

        .pm-toggle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #0f172a;
          font-size: 26px;
          font-weight: 700;
          flex: 0 0 44px;
          transition: all 0.28s ease;
        }

        .pm-toggle.open {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
        }

        .pm-section-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.42s ease;
        }

        .pm-section-body.open {
          grid-template-rows: 1fr;
        }

        .pm-section-inner {
          overflow: hidden;
          padding: 0 22px 24px 28px;
          color: #334155;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.32s ease, transform 0.32s ease;
        }

        .pm-section-body.open .pm-section-inner {
          opacity: 1;
          transform: translateY(0);
        }

        .pm-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .pm-mini-card {
          padding: 18px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid rgba(15, 23, 42, 0.06);
        }

        .pm-mini-card h6 {
          margin: 0 0 8px;
          font-size: 16px;
          color: #0f172a;
          text-transform: capitalize;
        }

        .pm-mini-card p {
          margin: 0;
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
        }

        .pm-list {
          margin: 18px 0 0;
          padding: 0;
          list-style: none;
        }

        .pm-list li {
          position: relative;
          padding-left: 26px;
          margin-bottom: 12px;
        }

        .pm-list li:before {
          content: "";
          position: absolute;
          left: 0;
          top: 11px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.08);
        }

        .pm-sidebar {
          position: sticky;
          top: 22px;
          display: grid;
          gap: 18px;
        }

        .pm-sidebar-card {
          padding: 0;
          overflow: hidden;
        }

        .pm-details-card {
          padding: 24px;
        }

        .pm-fee-card {
          padding: 0;
        }

        .pm-card-titlebar {
          padding: 18px 24px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .pm-card-titlebar h4 {
          margin: 0;
          font-size: 20px;
          color: #fff;
        }

        .pm-info {
          display: grid;
          gap: 14px;
        }

        .pm-info div {
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }

        .pm-info div:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .pm-info span {
          display: block;
          font-size: 13px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .pm-info strong {
          font-size: 15px;
          color: #0f172a;
        }

        .pm-batch-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          background: #fff;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 0;
          overflow: hidden;
        }

        .pm-batch-cell {
          padding: 18px 12px;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          background: #fff;
        }

        .pm-batch-cell:first-child {
          border-right: 1px solid rgba(15, 23, 42, 0.12);
        }

        .pm-batch-cell:last-child {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .pm-fee-box {
          padding: 22px 24px 24px;
          background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
        }

        .pm-fee-line {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 12px;
        }

        .pm-fee-line span {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #2563eb;
          white-space: nowrap;
          padding-top: 4px;
        }

        .pm-fee-values {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          text-align: right;
        }

        .pm-fee-values strong {
          font-size: 18px;
          color: #0f172a;
          line-height: 1.2;
        }

        .pm-fee-box p {
          color: #475569;
          line-height: 1.7;
          margin: 0;
        }

        .pm-cta-box {
          margin-top: 16px;
          padding: 20px;
          border-radius: 18px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #fff;
        }

        .pm-cta-box h5 {
          margin: 0 0 8px;
          color: #fff;
        }

        .pm-cta-box p {
          color: rgba(255, 255, 255, 0.88);
        }

        @media (max-width: 1199px) {
          .pm-page {
            padding-top: 72px;
          }

          .pm-hero-img {
            height: 390px;
          }
        }

        @media (max-width: 991px) {
          .pm-sidebar {
            position: static;
          }

          .pm-hero-overlay {
            padding: 34px;
          }

          .pm-actions {
            margin-top: 22px;
          }
        }

        @media (max-width: 767px) {
          .pm-page {
            padding: 56px 0 84px;
          }

          .pm-content-card,
          .pm-details-card,
          .pm-fee-box {
            padding: 18px;
          }

          .pm-hero-img {
            height: 310px;
          }

          .pm-hero-overlay {
            padding: 22px;
          }

          .pm-hero-overlay h1 {
            font-size: 28px;
          }

          .pm-hero-overlay p {
            font-size: 15px;
          }

          .pm-actions {
            width: 100%;
            flex-direction: column;
          }

          .pm-btn {
            width: 100%;
          }

          .pm-grid {
            grid-template-columns: 1fr;
          }

          .pm-section-head {
            padding: 18px 16px 18px 22px;
          }

          .pm-section-head h3 {
            font-size: 17px;
          }

          .pm-section-inner {
            padding: 0 16px 20px 22px;
          }

          .pm-card-titlebar h4,
          .pm-sidebar-card h4 {
            font-size: 20px;
          }

          .pm-fee-values strong {
            font-size: 16px;
          }

          .pm-batch-cell {
            font-size: 14px;
            padding: 14px 8px;
          }

          .pm-fee-line {
            flex-direction: column;
            align-items: flex-start;
          }

          .pm-fee-values {
            align-items: flex-start;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}