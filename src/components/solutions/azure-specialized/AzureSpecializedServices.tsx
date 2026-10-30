import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { azureSpecializedServices } from './services';

export default function AzureSpecializedServices() {
  return (
    <section className="tv-azure-specialized" aria-labelledby="azure-specialized-title">
      <div className="container">
        <div className="tv-azure-specialized-heading">
          <span className="tv-azure-specialized-kicker">Focused expertise</span>
          <h2 id="azure-specialized-title">Specialized Azure &amp; Cloud Services</h2>
          <p>
            Practical, focused engagements for complex cloud migrations, architecture decisions,
            platform engineering, cost control, resilience, and production AI readiness.
          </p>
        </div>

        <div className="row g-4">
          {azureSpecializedServices.map((service) => (
            <div className="col-md-6 col-xl-4" key={service.slug}>
              <article className="tv-azure-service-card">
                <Link
                  className="tv-azure-service-card-image"
                  to={`/solutions/microsoft-azure/${service.slug}`}
                  aria-label={`Learn more about ${service.title}`}
                  tabIndex={-1}
                >
                  <img src={service.image} alt={service.imageAlt} loading="lazy" />
                </Link>
                <div className="tv-azure-service-card-body">
                  <h3>
                    <Link to={`/solutions/microsoft-azure/${service.slug}`}>{service.title}</Link>
                  </h3>
                  <p>{service.cardDescription}</p>
                  <Link className="tv-azure-service-link" to={`/solutions/microsoft-azure/${service.slug}`}>
                    Learn More <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
