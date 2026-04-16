import { Link } from 'react-router-dom';
import '../../../styles/scss/layout/_trainings.scss';

const trainings = [
  {
    title: 'Microsoft Dynamics 365 F&O',
    desc: 'Enterprise ERP solutions for finance and operations.',
    logo: '/assets/img/service/Dynamics365.svg',
    href: '/solutions/d365-for-finance-and-operations',
  },
  {
    title: 'Microsoft Azure',
    desc: 'Cloud computing & infrastructure services.',
    logo: '/assets/img/service/azure-icon.svg',
    href: '/solutions/microsoft-azure',
  },
  {
    title: 'Power BI & Data Analytics',
    desc: 'Business intelligence & data visualization.',
    logo: '/assets/img/service/power-bi-icon.svg',
    href: '/solutions/microsoft-power-bi',
  },
  {
    title: 'Business Central',
    desc: 'Enterprise productivity & collaboration tools.',
    logo: '/assets/img/service/BusinessCentral.svg',
    href: '/solutions/business-central',
  },
  {
    title: 'Cloud Technology',
    desc: 'CI/CD pipelines & automation workflows.',
    logo: '/assets/img/service/cloud.png',
    href: '/solutions/cloud-technology',
  },
  {
    title: 'Microsoft Power Platform',
    desc: 'Low-code tools for app development & automation.',
    logo: '/assets/img/service/PowerPlatform.svg',
    href: '/solutions/microsoft-power-platform',
  },
];

export default function TrainingsSection() {
  return (
    <section className="training-area">
      <div className="training-heading tv-section-title-box">
        <span className="training-subtitle tv-section-subtitle tv-spltv-text tv-spltv-in-right">
          Trainings
        </span>

        <h2 className="training-title tv-section-title tv-spltv-text tv-spltv-in-right">
          Our Training Programs
        </h2>

        <p className="training-text">
          We provide industry-focused training programs designed to enhance your
          skills in cloud, ERP, and modern business technologies.
        </p>
      </div>

      <div className="training-grid">
        {trainings.map((item, index) => (
          <div key={index} className="training-card">
            <img src={item.logo} alt={item.title} className="training-logo" />
            <div className="training-name">{item.title}</div>

            <div className="training-desc">{item.desc}</div>

            <Link to={item.href} className="learn-more">
              Learn More <span>&rarr;</span>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/what-we-do/training" className="view-all-btn">
        View All Trainings
      </Link>
    </section>
  );
}
