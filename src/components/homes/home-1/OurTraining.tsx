const trainings = [
  {
    title: "Microsoft Dynamics 365 F&O",
    desc: "Enterprise ERP solutions for finance and operations.",
    logo: "/assets/img/service/Dynamics365.svg",
  },
  {
    title: "Microsoft Azure",
    desc: "Cloud computing & infrastructure services.",
    logo: "/assets/img/service/azure-icon.svg",
  },
  {
    title: "Power BI & Data Analytics",
    desc: "Business intelligence & data visualization.",
    logo: "/assets/img/service/power-bi-icon.svg",
  },
  {
    title: "Business Central",
    desc: "Enterprise productivity & collaboration tools.",
    logo: "/assets/img/service/BusinessCentral.svg",
  },
  {
    title: "Cloud Technology",
    desc: "CI/CD pipelines & automation workflows.",
    logo: "/assets/img/service/Cloud.svg",
  },
  {
    title: "Microsoft Power Platform",
    desc: "Low-code tools for app development & automation.",
    logo: "/assets/img/service/PowerPlatform.svg",
  },
];

export default function TrainingsSection() {
  return (
    <>
      <style>
        {`
        .training-area {
          background: #ffffff;
          padding: 120px 40px;
          text-align: center;
        }

        /* HEADING */
        .training-heading {
          max-width: 700px;
          margin: 0 auto 70px;
        }

        .training-subtitle {
          font-size: 13px;
          letter-spacing: 3px;
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .training-title {
          font-size: 42px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 15px;
        }

        .training-title span {
          color: #2563eb;
        }

        .training-text {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
        }

        /* GRID */
        .training-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 35px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        /* CARD */
        .training-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 35px 25px;
          text-align: left;
          border: 1px solid #e5e7eb;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        /* Glow background */
        .training-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(37,99,235,0.08), transparent 60%);
          opacity: 0;
          transition: 0.4s;
        }

        /* Top animated line */
        .training-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          transition: width 0.35s ease;
        }

        .training-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.12);
        }

        .training-card:hover::before {
          width: 100%;
        }

        .training-card:hover::after {
          opacity: 1;
        }

        /* LOGO */
        .training-logo {
          width: 55px;
          height: 55px;
          object-fit: contain;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .training-card:hover .training-logo {
          transform: scale(1.1) rotate(2deg);
        }

        /* TITLE */
        .training-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #0f172a;
          transition: 0.3s;
        }

        .training-card:hover .training-name {
          color: #2563eb;
        }

        /* DESC */
        .training-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        /* LEARN MORE */
        .learn-more {
          font-size: 14px;
          font-weight: 500;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: 0.3s;
        }

        .learn-more span {
          transition: transform 0.3s ease;
        }

        .learn-more:hover span {
          transform: translateX(6px);
        }

        /* BUTTON */
        .view-all-btn {
          display: inline-block;
          padding: 14px 30px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: #fff;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(37,99,235,0.25);
        }

        .view-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(37,99,235,0.35);
        }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .training-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .training-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
        `}
      </style>

      <div className="training-area">

        {/* HEADING */}
        <div className="training-heading">
          <div className="training-subtitle">TRAININGS</div>

          <h2 className="training-title">
            Our <span>Training Programs</span>
          </h2>

          <p className="training-text">
            We provide industry-focused training programs designed to enhance
            your skills in cloud, ERP, and modern business technologies.
          </p>
        </div>

        {/* CARDS */}
        <div className="training-grid">
          {trainings.map((item, index) => (
            <div key={index} className="training-card">
              
              <img
                src={item.logo}
                alt={item.title}
                className="training-logo"
              />

              <div className="training-name">{item.title}</div>

              <div className="training-desc">{item.desc}</div>

              <a href="#" className="learn-more">
                Learn More <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <a href="#" className="view-all-btn">
          View All Trainings
        </a>

      </div>
    </>
  );
}