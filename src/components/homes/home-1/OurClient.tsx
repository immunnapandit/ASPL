

const clientLogos = [
  { id: 1, name: "Microsoft", logo: "/logos/microsoft.png" },
  { id: 2, name: "Google", logo: "/logos/google.png" },
  { id: 3, name: "Amazon", logo: "/logos/amazon.png" },
  { id: 4, name: "Meta", logo: "/logos/meta.png" },
  { id: 5, name: "Netflix", logo: "/logos/netflix.png" },
  { id: 6, name: "Adobe", logo: "/logos/adobe.png" },
];

export default function ClientLogos() {
  return (
    <>
      <style>{`
        .client-section {
          padding: 70px 20px;
          background: #ffffff;
          text-align: center;
          overflow: hidden;
        }

        .client-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .client-title {
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #111827;
        }

        .client-subtitle {
          color: #6b7280;
          margin-bottom: 50px;
        }

        .slider {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .slide-track {
          display: flex;
          width: calc(200px * 12);
          animation: scroll 25s linear infinite;
        }

        .logo-card {
          width: 180px;
          height: 100px;
          margin: 0 12px;
          background: #f9fafb;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
          filter: grayscale(100%);
        }

        .logo-card img {
          max-width: 100%;
          height: 42px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .logo-card:hover {
          transform: translateY(-8px) scale(1.05);
          filter: grayscale(0%);
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border-color: #d1d5db;
        }

        .logo-card:hover img {
          transform: scale(1.1);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause on hover */
        .slider:hover .slide-track {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .client-title {
            font-size: 26px;
          }

          .slide-track {
            animation: scroll 18s linear infinite;
          }

          .logo-card {
            width: 140px;
            height: 80px;
          }

          .logo-card img {
            height: 30px;
          }
        }
      `}</style>

      <section className="client-section">
        <div className="client-container">
          <h2 className="client-title">Our Clients</h2>
          <p className="client-subtitle">
            Trusted by top companies worldwide
          </p>

          <div className="slider">
            <div className="slide-track">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <div key={index} className="logo-card">
                  <img src={client.logo} alt={client.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}