import "../../../styles/scss/layout/_clientlogo.scss"

const clientLogos = [
  { id: 1, name: "ADCB", logo: "../../assets/img/ClientLogo/ADCB.webp" },
  { id: 2, name: "Google", logo: "../../assets/img/ClientLogo/Google.webp" },
  { id: 3, name: "Amazon", logo: "/logos/amazon.png" },
  { id: 4, name: "Meta", logo: "/logos/meta.png" },
  { id: 5, name: "Netflix", logo: "/logos/netflix.png" },
  { id: 6, name: "Adobe", logo: "/logos/adobe.png" },
];

export default function ClientLogos() {
  return (
    <section className="client-section">
      <div className="client-container">
        <div className="client-header">
          <span className="client-badge">Trusted Worldwide</span>
          <h2 className="client-title">Our Clients</h2>
          <p className="client-subtitle">
            Premium brands and growing businesses trust our work
          </p>
        </div>

        <div className="slider-wrapper">
          <div className="slider">
            <div className="slide-track">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <div key={`${client.id}-${index}`} className="logo-card">
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}