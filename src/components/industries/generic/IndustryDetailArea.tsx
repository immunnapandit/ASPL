import { Link } from 'react-router-dom';
import type { IndustryPageConfig } from '../../../data/industry-pages';
import '../../../styles/scss/layout/_industry-page.scss';

interface IndustryDetailAreaProps {
  page: IndustryPageConfig;
}

export default function IndustryDetailArea({
  page,
}: IndustryDetailAreaProps) {
  return (
    <section className="tv-industry-page">
      <div className="container">
        <div className="tv-industry-hero">
          <div className="row g-4 g-xl-5 align-items-center">
            <div className="col-lg-6">
              <div className="tv-industry-copy">
                <span className="tv-industry-kicker">Industry Solutions</span>
                <h2>{page.title}</h2>
                <h3>{page.subtitle}</h3>
                <p>{page.summary}</p>

                <div className="tv-industry-actions">
                  <Link to="/contact" className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Talk to Experts</span>
                      <span className="btn-text2">Talk to Experts</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="tv-industry-media">
                <img src={page.image} alt={page.title} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>

        <div className="tv-industry-highlights">
          <div className="row g-4">
            {page.highlights.map((highlight) => (
              <div key={highlight} className="col-lg-3 col-md-6">
                <article className="tv-industry-highlight-card">
                  <h4>{highlight}</h4>
                  <p>
                    Industry-focused workflows designed to improve visibility,
                    execution, and business responsiveness.
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="tv-industry-layout">
          <div className="tv-page-heading text-center">
            <span className="tv-section-subtitle">How We Help</span>
            <h3 className="tv-section-title">
              Delivery support aligned to real operational priorities
            </h3>
          </div>

          <div className="row g-4 g-xl-5 align-items-start">
            <div className="col-lg-5">
              <div className="tv-industry-sidebar">
                <span className="tv-industry-sidebar-label">Industry Focus</span>
                <h4>{page.focus}</h4>
                <p>
                  We help organizations simplify operations, improve reporting,
                  and create practical systems that support day-to-day execution
                  as well as long-term scale.
                </p>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="tv-industry-capability-list">
                {page.capabilities.map((capability) => (
                  <article
                    key={capability}
                    className="tv-industry-capability-item"
                  >
                    <h4>{capability}</h4>
                    <p>
                      Structured consulting, implementation guidance, and
                      process optimization to help teams move faster with more
                      clarity.
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
