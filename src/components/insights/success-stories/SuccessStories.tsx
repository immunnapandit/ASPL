export const pageConfig = {
  title: 'Success Stories',
  subtitle: 'Success stories'
};

const stories = [
  {
    title: 'Finance Transformation for a Multi-Entity Business',
    result: 'Faster month-end reporting and stronger financial visibility',
    image: '/assets/img/blog/blog-grid-1-4.png',
    text:
      'We helped standardize finance processes, improve reporting structures, and create a more controlled delivery roadmap.'
  },
  {
    title: 'Managed Support Model for Business-Critical Operations',
    result: 'Reduced operational disruption and clearer support governance',
    image: '/assets/img/blog/blog-grid-1-5.png',
    text:
      'The engagement focused on support ownership, release planning, issue response, and long-term service stability.'
  },
  {
    title: 'Power Platform Rollout for Process Automation',
    result: 'Improved process speed with less manual coordination',
    image: '/assets/img/blog/blog-grid-1-6.png',
    text:
      'Automation and reporting workflows were introduced to simplify approvals, visibility, and operational follow-through.'
  }
];

export default function SuccessStories() {
  return (
    <section className="tv-insights-page">
      <div className="container">
        <div className="tv-insights-hero">
          <span className="tv-section-subtitle">Insights</span>
          <h2 className="tv-section-title">{pageConfig.title}</h2>
          <p>
            A look at the transformation, support, and implementation programs
            that helped clients improve delivery confidence and business outcomes.
          </p>
        </div>

        <div className="tv-story-list">
          {stories.map((story) => (
            <article key={story.title} className="tv-story-card">
              <div className="tv-story-card-image">
                <img src={story.image} alt={story.title} className="img-fluid" />
              </div>

              <div className="tv-story-card-content">
                <span className="tv-story-result">{story.result}</span>
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
