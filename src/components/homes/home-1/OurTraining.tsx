const trainings = [
  {
    title: 'Microsoft Dynamics 365 F&O',
    desc: 'Enterprise ERP solutions for finance and operations.',
    logo: '/assets/img/service/Dynamics365.svg',
  },
  {
    title: 'Microsoft Azure',
    desc: 'Cloud computing & infrastructure services.',
    logo: '/assets/img/service/azure-icon.svg',
  },
  {
    title: 'Power BI & Data Analytics',
    desc: 'Business intelligence & data visualization.',
    logo: '/assets/img/service/power-bi-icon.svg',
  },
  {
    title: 'Business Central',
    desc: 'Enterprise productivity & collaboration tools.',
    logo: '/assets/img/service/BusinessCentral.svg',
  },
  {
    title: 'Cloud Technology',
    desc: 'CI/CD pipelines & automation workflows.',
    logo: '/assets/img/service/Cloud.svg',
  },
  {
    title: 'Microsoft Power Platform',
    desc: 'Low-code tools for app development & automation.',
    logo: '/assets/img/service/PowerPlatform.svg',
  },
];

export default function TrainingsSection() {
  return (
    <section className="training-area pt-80 pb-130">
      <div className="container">
        <div className="training-heading">
          <div className="section-header">
            <span className="section-kicker">Trainings</span>

            <h2 className="section-title">
              Our Training
              <br />
              Programs
            </h2>

            <p className="section-subtitle">
              We provide industry-focused training programs designed to enhance
              your skills in cloud, ERP, and modern business technologies.
            </p>
          </div>
        </div>

        <div className="training-grid">
          {trainings.map((item) => (
            <div key={item.title} className="training-card">
              <img
                src={item.logo}
                alt={item.title}
                className="training-logo"
              />

              <div className="training-name">{item.title}</div>

              <div className="training-desc">{item.desc}</div>

              <a href="#" className="learn-more">
                Learn More <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          ))}
        </div>

        <a href="#" className="view-all-btn">
          View All Trainings
        </a>
      </div>
    </section>
  );
}
