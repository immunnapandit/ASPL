const industries = [
  { title: "Manufacturing", icon: "🏭" },
  { title: "Retail & E-Commerce", icon: "🛒" },
  { title: "Healthcare", icon: "❤️" },
  { title: "Food and Beverages", icon: "🍔" },
  { title: "Engineering", icon: "⚙️" },
  { title: "Education", icon: "📚" },
  { title: "Telecommunication", icon: "📡" },
  { title: "Technology", icon: "💻" },
  { title: "And Many More", icon: "●●●" },
];

export default function IndustriesSection() {
  return (
    <>
      <style>
        {`
        .industries-area {
          background: #f6f7fb;
          padding: 120px 40px 110px;
          text-align: center;
        }

        .section-subtitle {
          font-size: 13px;
          letter-spacing: 3px;
          color: #1d4ed8;
          margin-bottom: 12px;
          display: inline-block;
        }

        .section-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 70px;
          color: #0f172a;
        }

        .section-title span {
          color: #2563eb;
        }

        /* GRID */
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 50px 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* BOTTOM 3 ITEMS CENTER ALIGN */
        .industry-item:nth-child(7) {
          grid-column: 2 / 3;
        }

        .industry-item:nth-child(8) {
          grid-column: 3 / 4;
        }

        .industry-item:nth-child(9) {
          grid-column: 4 / 5;
        }

        .industry-card {
          text-align: center;
        }

        /* HEXAGON ICON */
        .industry-icon {
          width: 85px;
          height: 85px;
          margin: 0 auto;
          background: #ffffff;
          clip-path: polygon(
            25% 6.7%, 75% 6.7%,
            100% 50%, 75% 93.3%,
            25% 93.3%, 0% 50%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transition: 0.3s;
        }

        .industry-card:hover .industry-icon {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.15);
        }

        .industry-title {
          margin-top: 18px;
          font-size: 16px;
          font-weight: 500;
          color: #0f172a;
        }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .industry-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .industry-item:nth-child(7),
          .industry-item:nth-child(8),
          .industry-item:nth-child(9) {
            grid-column: auto;
          }
        }

        @media (max-width: 576px) {
          .industry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        `}
      </style>

      <div className="industries-area">
        <div className="section-subtitle">INDUSTRIES</div>

        <h2 className="section-title">
          Explore <span> Industries</span>
        </h2>

        <div className="industry-grid">
          {industries.map((item, index) => (
            <div key={index} className="industry-item">
              <div className="industry-card">
                <div className="industry-icon">{item.icon}</div>
                <div className="industry-title">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}