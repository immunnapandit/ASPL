import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServicePageConfig } from '../../../data/service-page-types';

interface WhatWeDoServiceLayoutProps {
  page: ServicePageConfig;
}

function buildBenefits(page: ServicePageConfig) {
  return [
    {
      title: page.highlights[0],
      description: `Create a strong starting point for ${page.title.toLowerCase()} with structured planning aligned to ${page.focus}.`
    },
    {
      title: page.highlights[1],
      description: `Move from concept to execution with practical delivery support shaped around ${page.subtitle.toLowerCase()}.`
    },
    {
      title: page.highlights[2],
      description: `Improve handoffs, visibility, and business flow by connecting teams, systems, and decisions around ${page.title.toLowerCase()}.`
    },
    {
      title: page.highlights[3],
      description: `Sustain long-term value through controlled releases, measurable improvement, and dependable ownership.`
    },
    {
      title: 'Business alignment',
      description: `Keep the service direction tied to real priorities with a focus on ${page.focus}.`
    },
    {
      title: 'Scalable delivery',
      description: `Build a delivery model that supports growth, change, and better consistency across the business over time.`
    }
  ];
}

export default function WhatWeDoServiceLayout({ page }: WhatWeDoServiceLayoutProps) {
  const benefits = buildBenefits(page);
  const sectionLabel = page.category === 'solution' ? 'Solutions' : 'What We Do';
  const benefitsLabel = page.category === 'solution' ? 'Solution Benefits' : 'Key Benefits';

  return (
    <main className="tv-product-engineering-page">
      <section
        className="tv-pe-hero"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.94)), url('/assets/img/service/service-bg.png')"
        }}
      >
        <div className="container">
          <div className="tv-pe-heading text-center">
            <span className="tv-pe-kicker">{sectionLabel}</span>
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
          </div>

          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="tv-pe-hero-media">
                <img src={page.image} alt={page.title} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tv-pe-copy">
                <h2>{page.subtitle}</h2>
                <p>{page.summary}</p>
                <p>
                  We support organizations with a practical delivery approach that keeps planning, execution,
                  adoption, and improvement connected through every stage of the engagement.
                </p>
                <div className="tv-pe-actions">
                  <Link to="/contact" className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Contact Us</span>
                      <span className="btn-text2">Contact Us</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tv-pe-intro">
        <div className="container">
          <div className="row align-items-start g-4 g-xl-5">
            <div className="col-lg-7">
              <div className="tv-pe-content">
                <h2>Support business outcomes with a clear and flexible delivery foundation</h2>
                <p>
                  Our approach to {page.title.toLowerCase()} is designed to align business goals, project
                  priorities, and user expectations while keeping delivery simple and accountable.
                </p>
                <p>Key areas include:</p>
                <ul className="tv-pe-bullet-list">
                  {page.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="tv-pe-note">
                  This helps teams improve consistency, reduce delivery friction, and create a stronger path from
                  implementation to long-term optimization.
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="tv-pe-side-media">
                <img src="/assets/img/hero/hero-thumb-2.jpeg" alt={`${page.title} workspace`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="tv-pe-benefits"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url('/assets/img/service/service-bg.png')"
        }}
      >
        <div className="container">
          <div className="tv-pe-heading text-center">
            <span className="tv-pe-kicker">{benefitsLabel}</span>
            <h2>How {page.title} supports stronger business execution</h2>
          </div>

          <div className="row g-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="col-md-6 col-xl-4">
                <article className="tv-pe-benefit-card">
                  <div className="tv-pe-benefit-icon" aria-hidden="true">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
