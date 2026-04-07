export const pageConfig = {
  title: 'Webinar & Events',
  subtitle: 'Webinars and events'
};

const webinars = [
  {
    title: 'Modern ERP Rollout Planning for Growing Businesses',
    date: 'April 18, 2026',
    mode: 'Live Webinar',
    image: '/assets/img/blog/blog-grid-1-1.png',
    text:
      'A practical session on implementation planning, stakeholder alignment, and reducing risk before go-live.'
  },
  {
    title: 'How Dynamics 365 Support Models Reduce Business Downtime',
    date: 'April 27, 2026',
    mode: 'Expert Talk',
    image: '/assets/img/blog/blog-grid-1-2.png',
    text:
      'See how support governance, response models, and release planning protect business-critical operations.'
  },
  {
    title: 'Power Platform Use Cases That Actually Improve Operations',
    date: 'May 06, 2026',
    mode: 'Online Event',
    image: '/assets/img/blog/blog-grid-1-3.png',
    text:
      'Explore automation, reporting, and low-code application ideas that create immediate business value.'
  }
];

export default function WebinarsEvents() {
  return (
    <section className="tv-insights-page">
      <div className="container">
        <div className="tv-insights-hero">
          <span className="tv-section-subtitle">Insights</span>
          <h2 className="tv-section-title">{pageConfig.title}</h2>
          <p>
            Explore upcoming knowledge sessions, product conversations, and
            expert-led events designed around real business transformation topics.
          </p>
        </div>

        <div className="row g-4">
          {webinars.map((webinar) => (
            <div key={webinar.title} className="col-lg-4 col-md-6">
              <article className="tv-insight-card">
                <div className="tv-insight-card-image">
                  <img src={webinar.image} alt={webinar.title} className="img-fluid" />
                </div>
                <div className="tv-insight-card-body">
                  <div className="tv-insight-meta">
                    <span>{webinar.mode}</span>
                    <span>{webinar.date}</span>
                  </div>
                  <h3>{webinar.title}</h3>
                  <p>{webinar.text}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
