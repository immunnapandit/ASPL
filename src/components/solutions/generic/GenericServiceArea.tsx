import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ServicePageConfig } from '../../../data/service-page-types';

interface GenericServiceAreaProps {
  page: ServicePageConfig;
}

const categoryStats = {
  solution: [
    { value: '120+', label: 'Solution rollouts and optimization engagements delivered' },
    { value: '40+', label: 'Consultants and architects across Microsoft business apps' },
    { value: '95%', label: 'Programs delivered with business-first adoption focus' },
    { value: '24/7', label: 'Support readiness for critical business operations' }
  ],
  service: [
    { value: '150+', label: 'Programs supported across implementation and managed delivery' },
    { value: '30+', label: 'Industry-aligned consultants and solution specialists' },
    { value: '96%', label: 'Client satisfaction driven by practical execution' },
    { value: '4-step', label: 'Discovery-to-optimization engagement approach' }
  ]
} as const;

const categoryLabels = {
  solution: ['Strategy & Design', 'Implementation', 'Integration', 'Optimization'],
  service: ['Discovery', 'Execution', 'Enablement', 'Managed Support']
} as const;

function buildServiceTabs(page: ServicePageConfig) {
  const labels = page.category === 'solution' ? categoryLabels.solution : categoryLabels.service;
  const [first, second, third, fourth] = labels;
  const [highlightOne, highlightTwo, highlightThree, highlightFour] = page.highlights;

  return [
    {
      id: 'strategy',
      label: first,
      badge: 'Focused Planning',
      title: `${page.title} strategy shaped around your business priorities`,
      description: page.summary,
      points: [
        `Align ${page.title} initiatives to ${page.focus}.`,
        'Translate business goals into a realistic roadmap with the right delivery scope.',
        'Reduce risk early through structured planning, governance, and stakeholder alignment.',
        highlightOne
      ]
    },
    {
      id: 'execution',
      label: second,
      badge: 'Practical Delivery',
      title: `Execution support that keeps ${page.title} moving`,
      description:
        'We deliver with the structure needed to turn plans into outcomes while keeping teams aligned, timelines visible, and quality under control.',
      points: [
        highlightTwo,
        'Configuration, build, and rollout support matched to your operating model.',
        'Testing, validation, and change readiness embedded into delivery.',
        'A delivery approach designed for speed without sacrificing control.'
      ]
    },
    {
      id: 'integration',
      label: third,
      badge: 'Connected Operations',
      title: `Create stronger business flow around ${page.title}`,
      description:
        'Connected systems and cleaner handoffs make adoption easier and results more measurable across teams.',
      points: [
        highlightThree,
        'Integrate data, reporting, and processes across your wider business landscape.',
        'Improve visibility for leaders, users, and support teams.',
        'Design for smoother operations across departments and decision cycles.'
      ]
    },
    {
      id: 'growth',
      label: fourth,
      badge: 'Continuous Improvement',
      title: `Support long-term value after the initial ${page.title} launch`,
      description:
        'The strongest outcomes come from continuous refinement, guided support, and a roadmap that adapts as your business evolves.',
      points: [
        highlightFour,
        'Improve adoption, reporting, and process performance over time.',
        'Strengthen governance, release planning, and environment health.',
        'Keep momentum through enhancements and business-led optimization.'
      ]
    }
  ];
}

export default function GenericServiceArea({ page }: GenericServiceAreaProps) {
  const serviceTabs = buildServiceTabs(page);
  const [activeTab, setActiveTab] = useState(serviceTabs[0].id);
  const activeService =
    serviceTabs.find((item) => item.id === activeTab) ?? serviceTabs[0];

  if (page.category === 'solution') {
    return (
      <section className="tv-solution-page">
        <div className="container">
          <div className="tv-solution-hero">
            <div className="row align-items-center g-4 g-xl-5">
              <div className="col-lg-6">
                <div className="tv-solution-copy">
                  <span className="tv-solution-kicker">Solutions</span>
                  <h2>{page.title}</h2>
                  <h3>{page.subtitle}</h3>
                  <p>{page.summary}</p>

                  <div className="tv-solution-actions">
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
                <div className="tv-solution-media">
                  <img src={page.image} alt={page.title} className="img-fluid" />
                </div>
              </div>
            </div>
          </div>

          <div className="tv-solution-highlights">
            <div className="row g-4">
              {page.highlights.map((highlight) => (
                <div key={highlight} className="col-lg-3 col-md-6">
                  <article className="tv-solution-highlight-card">
                    <h4>{highlight}</h4>
                    <p>
                      Practical consulting, configuration, and enablement aligned
                      to your business priorities.
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="tv-solution-delivery">
            <div className="tv-page-heading text-center">
              <span className="tv-section-subtitle">How We Support</span>
              <h3 className="tv-section-title">
                A clear approach for planning, delivery, and optimization
              </h3>
            </div>

            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <div className="tv-solution-delivery-card">
                  <span className="tv-solution-delivery-label">Focus Area</span>
                  <h4>{page.focus}</h4>
                  <p>
                    We help teams move from planning to execution with a delivery
                    model that stays simple, structured, and business-focused.
                  </p>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="tv-solution-capability-list">
                  {serviceTabs.map((service) => (
                    <article key={service.id} className="tv-solution-capability-item">
                      <span>{service.label}</span>
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tv-solution-metrics">
            <div className="row g-4">
              {categoryStats.solution.map((stat) => (
                <div key={stat.label} className="col-lg-3 col-md-6">
                  <div className="tv-solution-metric-card">
                    <h4>{stat.value}</h4>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tv-service-page">
      <div className="container">
        <div className="tv-service-hero">
          <div className="row g-4 g-xl-5 align-items-center">
            <div className="col-lg-7">
              <div className="tv-service-copy">
                <span className="tv-service-kicker">What We Do</span>
                <h2>{page.title}</h2>
                <h3>{page.subtitle}</h3>
                <p>{page.summary}</p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="tv-service-summary-card">
                <span className="tv-service-summary-label">Service Focus</span>
                <h4>{page.focus}</h4>
                <Link to="/contact" className="tv-btn-primary">
                  <span className="btn-wrap">
                    <span className="btn-text1">Request a Consultation</span>
                    <span className="btn-text2">Request a Consultation</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="tv-service-metrics">
          <div className="row g-4">
            {categoryStats.service.map((stat) => (
              <div key={stat.label} className="col-lg-3 col-md-6">
                <div className="tv-service-metric-card">
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tv-service-layout">
          <div className="tv-page-heading text-center">
            <span className="tv-section-subtitle">How We Work</span>
            <h3 className="tv-section-title">
              A delivery structure designed for clarity and business value
            </h3>
          </div>

          <div className="row g-4 g-xl-5">
            <div className="col-lg-5">
              <div className="tv-service-sidebar">
                <div className="tv-service-image">
                  <img src={page.image} alt={page.title} className="img-fluid" />
                </div>

                <div className="tv-service-sidebar-card">
                  <span>{activeService.badge}</span>
                  <h4>{activeService.title}</h4>
                  <p>{activeService.description}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="tv-service-tabs" role="tablist" aria-label={`${page.title} service sections`}>
                {serviceTabs.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === service.id}
                    aria-controls={`panel-${service.id}`}
                    id={`tab-${service.id}`}
                    className={`tv-service-tab-btn ${activeTab === service.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(service.id)}
                  >
                    {service.label}
                  </button>
                ))}
              </div>

              <div
                className="tv-service-panel"
                role="tabpanel"
                id={`panel-${activeService.id}`}
                aria-labelledby={`tab-${activeService.id}`}
              >
                <div className="tv-service-panel-grid">
                  {activeService.points.map((point) => (
                    <article key={point} className="tv-service-point-card">
                      <h4>{point}</h4>
                      <p>
                        Practical support, structured execution, and clear ownership
                        to keep teams moving forward.
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tv-service-focus">
          <div className="row g-4">
            {page.highlights.map((highlight) => (
              <div key={highlight} className="col-lg-3 col-md-6">
                <article className="tv-service-focus-card">
                  <span>Focus</span>
                  <h4>{highlight}</h4>
                  <p>
                    Delivery support aligned to users, process performance, and
                    measurable outcomes.
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
