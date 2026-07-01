import Breadcrumb from '../../../common/Breadcrumb';

const trainers = [
  {
    name: 'Umesh Kumar',
    title: 'Lead Azure Trainer',
    image: '/assets/img/team/team-1.jpg',
    bio: 'Umesh is an experienced Azure architect and trainer who focuses on platform engineering, migrations, and hands-on workshops for enterprise teams.',
    linkedin: 'https://www.linkedin.com/in/umesh-kumar'
  },
  {
    name: 'Sangeeta Rao',
    title: 'Dynamics 365 & Power Platform Trainer',
    image: '/assets/img/team/team-2.jpg',
    bio: 'Sangeeta specialises in Dynamics 365 implementations and Power Platform training, enabling business users to build low-code solutions and automation.',
    linkedin: 'https://www.linkedin.com/in/sangeeta-rao'
  },
  {
    name: 'Amit Verma',
    title: 'Microsoft 365 & Collaboration Trainer',
    image: '/assets/img/team/team-3.jpg',
    bio: 'Amit trains teams on Microsoft 365, security, and governance. He designs role-driven learning paths and certification readiness programs.',
    linkedin: 'https://www.linkedin.com/in/amit-verma'
  },
  {
    name: 'Anshika Gupta',
    title: 'Power BI & Analytics Trainer',
    image: '/assets/img/team/team-4.jpg',
    bio: 'Anshika delivers analytics and Power BI training with a focus on data modelling, visualization best practices, and storytelling with data.',
    linkedin: 'https://www.linkedin.com/in/anshika-gupta'
  }
];

export default function MicrosoftCertifiedTrainer() {
  return (
    <main className="mct-trainer-list-page">
      <Breadcrumb title="Microsoft Certified Trainer" subtitle="Meet our certified trainers" />

      <section className="container" style={{ padding: '48px 0' }}>
        <div className="row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {trainers.map((t) => (
            <article key={t.name} className="mct-trainer-card" style={{ flex: '1 1 320px', minWidth: 280 }}>
              <div className="mct-trainer-card__header" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <img src={t.image} alt={t.name} className="mct-trainer-card__photo" style={{ width: 96, height: 96, borderRadius: 8, objectFit: 'cover' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 18 }}>{t.name}</h3>
                  <p style={{ margin: '6px 0 0', color: '#475569' }}>{t.title}</p>
                </div>
              </div>

              <p style={{ marginTop: 12, color: '#334155', lineHeight: 1.5 }}>{t.bio}</p>

              <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="mct-linkedin" title={`Open ${t.name} on LinkedIn`} aria-label={`Open ${t.name} on LinkedIn`} style={{ color: '#0a66c2', textDecoration: 'none', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8h4.6V24H.2zM8.5 8h4.4v2.2h.1c.6-1.1 2.2-2.2 4.5-2.2 4.8 0 5.7 3.2 5.7 7.4V24h-4.6v-7.8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2V24H8.5z" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
