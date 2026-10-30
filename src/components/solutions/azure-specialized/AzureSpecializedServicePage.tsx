import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import { azureSpecializedServices, getAzureSpecializedService } from './services';

export default function AzureSpecializedServicePage() {
  const { serviceSlug } = useParams();
  const service = getAzureSpecializedService(serviceSlug);

  if (!service) {
    return <Navigate to="/solutions/microsoft-azure" replace />;
  }

  const relatedServices = service.relatedSlugs
    .map((slug) => azureSpecializedServices.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);

  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={service.title} subtitle="Specialized Azure & Cloud Services" />
        <article className="tv-azure-detail">
          <section className="tv-azure-detail-hero">
            <div className="container">
              <div className="tv-azure-detail-backlink">
                <Link to="/solutions/microsoft-azure">Microsoft Azure</Link>
                <span aria-hidden="true"> / </span>
                <span>Specialized services</span>
              </div>
              <div className="row align-items-center g-4 g-lg-5">
                <div className="col-lg-6">
                  <span className="tv-azure-detail-kicker">Azure &amp; cloud consulting</span>
                  <h1>{service.title}</h1>
                  <p className="tv-azure-detail-lead">{service.introduction}</p>
                  <div className="tv-azure-detail-actions">
                    <Link to="/contact" className="tv-btn-primary">
                      <span className="btn-wrap">
                        <span className="btn-text1">Request Consultation</span>
                        <span className="btn-text2">Request Consultation</span>
                      </span>
                    </Link>
                    <a href="#about-service" className="tv-azure-detail-text-link">
                      Explore the service <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tv-azure-detail-image">
                    <img src={service.image} alt={service.imageAlt} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section tv-azure-detail-about" id="about-service">
            <div className="container">
              <div className="row g-4 g-xl-5 align-items-start">
                <div className="col-lg-5">
                  <span className="tv-azure-detail-kicker">About the service</span>
                  <h2>A focused engagement shaped around your cloud priorities</h2>
                </div>
                <div className="col-lg-7">
                  <p className="tv-azure-detail-about-copy">{service.about}</p>
                  <div className="tv-azure-detail-callout">
                    <ShieldCheck size={23} aria-hidden="true" />
                    <p>
                      Recommendations are grounded in your workload, people, and operating constraints, with
                      practical decisions and next steps your teams can review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section tv-azure-detail-tinted">
            <div className="container">
              <div className="tv-azure-detail-heading">
                <span className="tv-azure-detail-kicker">Business challenges</span>
                <h2>What makes this work difficult?</h2>
                <p>We focus the engagement on the technical and organizational issues that can slow progress or increase risk.</p>
              </div>
              <div className="row g-4">
                {service.challenges.map((item, index) => (
                  <div className="col-md-6 col-xl-3" key={item.title}>
                    <article className="tv-azure-detail-card tv-azure-challenge-card">
                      <span className="tv-azure-detail-card-number">0{index + 1}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section">
            <div className="container">
              <div className="tv-azure-detail-heading">
                <span className="tv-azure-detail-kicker">What we offer</span>
                <h2>From assessment to a practical delivery path</h2>
              </div>
              <div className="row g-4">
                {service.offers.map((item) => (
                  <div className="col-md-6" key={item.title}>
                    <article className="tv-azure-detail-card tv-azure-offer-card">
                      <div className="tv-azure-detail-icon"><Check size={19} aria-hidden="true" /></div>
                      <div><h3>{item.title}</h3><p>{item.description}</p></div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section tv-azure-detail-tinted">
            <div className="container">
              <div className="row g-4 g-xl-5">
                <div className="col-lg-6">
                  <div className="tv-azure-detail-heading tv-azure-detail-heading-left">
                    <span className="tv-azure-detail-kicker">Technical capabilities</span>
                    <h2>Key features and technical capabilities</h2>
                  </div>
                  <ul className="tv-azure-detail-checklist">
                    {service.capabilities.map((capability) => (
                      <li key={capability}><Check size={18} aria-hidden="true" />{capability}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6">
                  <div className="tv-azure-tech-panel">
                    <span className="tv-azure-detail-kicker">Technology toolkit</span>
                    <h2>Technologies used</h2>
                    <p>Technology choices are confirmed against your existing environment and service requirements.</p>
                    <ul>
                      {service.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section">
            <div className="container">
              <div className="tv-azure-detail-heading">
                <span className="tv-azure-detail-kicker">Business benefits</span>
                <h2>Outcomes your teams can carry forward</h2>
              </div>
              <div className="row g-4">
                {service.benefits.map((item) => (
                  <div className="col-md-6 col-xl-3" key={item.title}>
                    <article className="tv-azure-detail-benefit">
                      <span className="tv-azure-benefit-mark"><Check size={17} aria-hidden="true" /></span>
                      <h3>{item.title}</h3><p>{item.description}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section tv-azure-detail-tinted">
            <div className="container">
              <div className="tv-azure-detail-heading">
                <span className="tv-azure-detail-kicker">Implementation approach</span>
                <h2>A clear sequence from context to action</h2>
              </div>
              <ol className="tv-azure-approach-list">
                {service.approach.map((step, index) => (
                  <li key={step.title}>
                    <span className="tv-azure-approach-step">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{step.title}</h3><p>{step.description}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="tv-azure-detail-section">
            <div className="container">
              <div className="tv-azure-detail-heading">
                <span className="tv-azure-detail-kicker">Relevant use cases</span>
                <h2>Where this service makes a difference</h2>
              </div>
              <div className="row g-4">
                {service.useCases.map((item) => (
                  <div className="col-md-4" key={item.title}>
                    <article className="tv-azure-use-case"><h3>{item.title}</h3><p>{item.description}</p></article>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-section tv-azure-detail-tinted">
            <div className="container">
              <div className="tv-azure-detail-heading">
                <span className="tv-azure-detail-kicker">Frequently asked questions</span>
                <h2>Questions about {service.title}</h2>
              </div>
              <div className="tv-azure-faq-list">
                {service.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="tv-azure-related-section">
            <div className="container">
              <div className="tv-azure-related-heading">
                <div><span className="tv-azure-detail-kicker">Continue exploring</span><h2>Related Azure services</h2></div>
                <Link to="/solutions/microsoft-azure">View all Azure services <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
              <div className="row g-3">
                {relatedServices.map((related) => (
                  <div className="col-md-6" key={related.slug}>
                    <Link className="tv-azure-related-card" to={`/solutions/microsoft-azure/${related.slug}`}>
                      <span><strong>{related.title}</strong><small>{related.cardDescription}</small></span>
                      <ArrowRight size={19} aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tv-azure-detail-cta">
            <div className="container">
              <div className="tv-azure-cta-inner">
                <div><span className="tv-azure-detail-kicker">Start a conversation</span><h2>Discuss your {service.title.toLowerCase()} priorities</h2><p>Share your goals and constraints. We’ll help you identify a useful next step.</p></div>
                <Link to="/contact" className="tv-btn-primary"><span className="btn-wrap"><span className="btn-text1">Contact Us</span><span className="btn-text2">Contact Us</span></span></Link>
              </div>
            </div>
          </section>
        </article>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
