import { useState } from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '450+', label: 'Finance specialists, consultants, and delivery experts' },
  { value: '100+', label: 'Clients supported across ERP and transformation programs' },
  { value: '150+', label: 'Projects delivered with operational finance focus' },
  { value: '98%', label: 'Client retention built on long-term delivery confidence' }
];

const serviceTabs = [
  {
    id: 'optimization',
    label: 'Finance Optimization',
    title: 'AI-driven finance optimization and business support',
    description:
      'Move beyond basic ERP administration. We provide proactive managed support for Dynamics 365 Finance with functional, technical, and operational expertise aligned to your business goals.',
    points: [
      'L1, L2, and L3 support for finance processes, configurations, and technical issues',
      'Proactive monitoring of critical workflows, batch jobs, integrations, and performance',
      'Release planning, hotfix management, and environment governance',
      'Continuous optimization for reporting, automation, and user adoption'
    ],
    image: '/assets/img/service/saas-concept-collage.jpg',
    badge: 'Managed Support'
  },
  {
    id: 'monitoring',
    label: 'Monitoring & Control',
    title: 'Continuous monitoring, compliance, and operational control',
    description:
      'We help finance teams stay ahead of disruptions with structured monitoring across system health, financial controls, integrations, and user-impacting processes.',
    points: [
      'Control monitoring for data quality, approvals, and finance-critical exceptions',
      'Environment reviews covering updates, regression risks, and operational readiness',
      'Process performance tracking across close, reconciliation, and reporting cycles',
      'DevOps-aligned change management for safer deployment velocity'
    ],
    image: '/assets/img/service/service-thumb-1.png',
    badge: 'Operational Visibility'
  },
  {
    id: 'implementation',
    label: 'Deployment & Configuration',
    title: 'Structured deployment and tailored finance configuration',
    description:
      'From first rollout to expansion programs, we configure Dynamics 365 Finance around your chart of accounts, entities, approvals, and governance requirements.',
    points: [
      'Fit-gap workshops and future-state design for finance operations',
      'Configuration for general ledger, AP, AR, fixed assets, and budgeting',
      'Role-based setup to improve usability and process accountability',
      'Go-live planning with minimal disruption to business continuity'
    ],
    image: '/assets/img/service/service-thumb-2.png',
    badge: 'Smooth Rollout'
  },
  {
    id: 'extensions',
    label: 'Custom Development',
    title: 'Extend Dynamics 365 Finance for your exact operating model',
    description:
      'When standard capability is not enough, we design custom workflows, reports, automations, and extensions that stay aligned with platform best practices.',
    points: [
      'Custom workflows, validations, and finance process automations',
      'Advanced reporting, Power Platform extensions, and role-focused workspaces',
      'Enhancements built to coexist with Microsoft updates and governance needs',
      'Targeted development that removes manual work without increasing complexity'
    ],
    image: '/assets/img/service/service-thumb-3.png',
    badge: 'Tailored Capability'
  },
  {
    id: 'integration',
    label: 'Integration',
    title: 'Connect finance with your wider business ecosystem',
    description:
      'We create dependable connections between Dynamics 365 Finance and banking, payroll, CRM, procurement, warehouse, and legacy systems to keep your data moving accurately.',
    points: [
      'Integration architecture for Microsoft and third-party business systems',
      'Middleware, APIs, and event-driven data flows with finance-grade reliability',
      'Reduced silos across customer, supplier, inventory, and accounting data',
      'Real-time or scheduled sync patterns based on business criticality'
    ],
    image: '/assets/img/service/MicrosoftD365.jpg',
    badge: 'Unified Platform'
  },
  {
    id: 'training',
    label: 'User Training',
    title: 'Enable teams to use Finance with confidence and consistency',
    description:
      'Our training programs help finance leaders, process owners, and end users get more value from the platform with practical, role-based enablement.',
    points: [
      'Training plans for finance users, power users, admins, and business leads',
      'Scenario-based learning for daily operations and period-end activities',
      'Knowledge transfer for internal support and governance teams',
      'Adoption support that improves consistency, speed, and data accuracy'
    ],
    image: '/assets/img/service/cloud.png',
    badge: 'Adoption & Growth'
  }
];

const offerings = [
  {
    title: 'Financial Operations Excellence',
    text: 'Strengthen close, reconciliation, budgeting, and reporting with a finance operating model built for speed and control.'
  },
  {
    title: 'Global Entity Management',
    text: 'Support multi-company, multi-currency, and governance-heavy organizations with scalable structures and processes.'
  },
  {
    title: 'Automation in Finance',
    text: 'Reduce repetitive work through workflow automation, approval logic, intelligent validations, and guided processes.'
  },
  {
    title: 'Insights & Planning',
    text: 'Enable finance leaders with dashboards, predictive visibility, and timely insight for better business decisions.'
  }
];

export default function D365FinanceArea() {
  const [activeTab, setActiveTab] = useState(serviceTabs[0].id);
  const activeService =
    serviceTabs.find((item) => item.id === activeTab) ?? serviceTabs[0];

  return (
    <section className="tv-d365-finance-area">
      <div className="tv-d365-bg-shape tv-d365-bg-shape-one"></div>
      <div className="tv-d365-bg-shape tv-d365-bg-shape-two"></div>

      <div className="container">
        <div className="tv-d365-hero">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-xl-6 col-lg-6">
              <div className="tv-d365-hero-content">
                <div className="tv-section-title-box tv-d365-title-box mb-40">
                  <span className="tv-section-subtitle">Dynamics 365 Finance</span>
                  <h2 className="tv-section-title">
                    Break free from standard finance support
                  </h2>
                  <h3 className="tv-d365-hero-subtitle">
                    Get top-tier Dynamics 365 Finance services
                  </h3>
                  <p className="tv-d365-hero-text">
                    Accelerate your finance transformation with implementation,
                    optimization, support, and integration services designed for
                    complex businesses. We work like an extension of your team to
                    improve visibility, strengthen controls, and keep your Dynamics
                    365 Finance environment performing at its best.
                  </p>
                </div>

                <div className="tv-d365-actions">
                  <Link to="/contact" className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Talk to Experts</span>
                      <span className="btn-text2">Talk to Experts</span>
                    </span>
                  </Link>

                  <Link to="/contact" className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Request a Demo</span>
                      <span className="btn-text2">Request a Demo</span>
                    </span>
                  </Link>
                </div>

                <div className="tv-d365-trust">
                  <span>Finance transformation</span>
                  <span>Implementation to managed support</span>
                  <span>Built for enterprise scale</span>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="tv-d365-hero-visual">
                <div className="tv-d365-image-badge">
                  <span>Finance Services</span>
                  <strong>Consulting to optimization</strong>
                </div>

                <div className="tv-d365-image">
                  <img
                    src="/assets/img/service/MicrosoftD365.jpg"
                    alt="Dynamics 365 Finance managed services"
                    className="img-fluid"
                  />
                </div>

                <div className="tv-d365-floating-card">
                  <span>Premium delivery</span>
                  <h4>Structured support, governance, and continuous improvement</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tv-d365-stats">
          <div className="tv-section-title-box text-center tv-d365-section-head">
            <span className="tv-section-subtitle">A closer look at our numbers</span>
            <h3 className="tv-section-title">
              Delivery confidence backed by real project experience
            </h3>
          </div>

          <div className="row">
            {stats.map((stat) => (
              <div key={stat.label} className="col-xl-3 col-lg-6 col-md-6">
                <div className="tv-d365-stat-card">
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tv-d365-spectrum">
          <div className="tv-section-title-box text-center tv-d365-section-head">
            <span className="tv-section-subtitle">
              Our spectrum of Dynamics 365 Finance services
            </span>
            <h3 className="tv-section-title">
              Explore the service model behind high-performing finance operations
            </h3>
          </div>

          <div className="tv-d365-tabs">
            <div
              className="tv-tabs-wrapper"
              role="tablist"
              aria-label="Dynamics 365 Finance service sections"
            >
              {serviceTabs.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === service.id}
                  aria-controls={`panel-${service.id}`}
                  id={`tab-${service.id}`}
                  className={`tv-tab-btn ${activeTab === service.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(service.id)}
                >
                  <span className="tv-tab-btn-text">{service.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="tv-spectrum-panel"
            role="tabpanel"
            id={`panel-${activeService.id}`}
            aria-labelledby={`tab-${activeService.id}`}
          >
            <div className="row align-items-center g-4 g-xl-5">
              <div className="col-xl-6 col-lg-6">
                <div className="tv-spectrum-content">
                  <div className="tv-section-title-box tv-d365-inner-title-box">
                    <span className="tv-section-subtitle">{activeService.badge}</span>
                    <h4 className="tv-section-title">{activeService.title}</h4>
                  </div>
                  <p>{activeService.description}</p>

                  <ul className="tv-features-list">
                    {activeService.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6">
                <div className="tv-spectrum-media">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tv-d365-offerings">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-xl-5 col-lg-5">
              <div className="tv-d365-offerings-content">
                <div className="tv-section-title-box tv-d365-title-box">
                  <span className="tv-section-subtitle">
                    Our comprehensive solution offerings
                  </span>
                  <h3 className="tv-section-title">
                    Built for finance leaders who need more than standard ERP delivery
                  </h3>
                  <p>
                    We bring together implementation, managed services, integration,
                    and optimization so your finance function can stay agile,
                    controlled, and insight-led through every stage of growth.
                  </p>
                </div>
                <Link to="/contact" className="tv-btn-primary">
                  <span className="btn-wrap">
                    <span className="btn-text1">Start Your Project</span>
                    <span className="btn-text2">Start Your Project</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-7 col-lg-7">
              <div className="row">
                {offerings.map((offering) => (
                  <div key={offering.title} className="col-md-6">
                    <div className="tv-offering-card">
                      <span className="tv-offering-icon">
                        <i className="fa-light fa-chart-mixed"></i>
                      </span>
                      <h4>{offering.title}</h4>
                      <p>{offering.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
