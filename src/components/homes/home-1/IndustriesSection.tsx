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
    <section className="industries-section">
      <div className="container">
        <span className="industries-subtitle">INDUSTRIES</span>

        <h2 className="industries-title">
          Explore <span>Industries</span>
        </h2>

        <div className="industries-grid">
          {industries.map((item, index) => (
            <div key={index} className="industry-item">
              <div className="industry-icon">{item.icon}</div>
              <p className="industry-text">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}