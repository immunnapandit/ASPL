import {
  BriefcaseBusiness,
  Check,
  FileCog,
  Gauge,
  Globe2,
  Handshake,
  Headphones,
  Layers3,
  LifeBuoy,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ServicePageConfig } from '../../../data/service-page-types';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Finance',
  subtitle: 'Modern finance operations with visibility, control, and scalability',
  category: 'solution',
  focus: 'financial processes, compliance, reporting, automation, and operational control',
  summary:
    'AtiSunya helps finance teams implement Dynamics 365 Finance with stronger controls, connected reporting, automation, and scalable enterprise processes.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Finance process design and ERP configuration',
    'Reporting, compliance, and control visibility',
    'Integrations, automation, and workflow improvements',
    'Optimization, support, and future-state planning'
  ]
};

const offerBullets = [
  'Unified financial data for faster month-end decisions',
  'Configurable approvals, controls, and audit trails',
  'Streamlined billing, collections, and vendor payments',
  'Budget, cost, and cash visibility across entities'
];

const aiBullets = [
  'Spot exceptions before they slow down the close',
  'Turn finance activity into leadership-ready insights',
  'Support multi-currency operations with cleaner reporting'
];

const modules = [
  {
    label: 'Core Finance',
    items: [
      {
        title: 'General Ledger',
        text: 'Manage accounts, track transactions, maintain financial records, and build reliable reports.'
      },
      {
        title: 'Accounts Receivable',
        text: 'Create customer invoices, track balances, and manage incoming payments with better clarity.'
      },
      {
        title: 'Accounts Payable',
        text: 'Handle vendor invoices, automate approvals, and streamline payment workflows.'
      },
      {
        title: 'Fixed Assets',
        text: 'Maintain assets, depreciation, resources, machines, land, and inventory records.'
      },
      {
        title: 'Bank and Cash Management',
        text: 'Reconcile bank statements, forecast cash flow, and generate treasury-ready reports.'
      },
      {
        title: 'Credit and Collections',
        text: 'Centralize customer credit, control sales flow, and improve collection follow-ups.'
      }
    ]
  },
  {
    label: 'Budgeting and Forecasting',
    items: [
      {
        title: 'Budget Planning',
        text: 'Create department-wise budgets, approval flows, and variance tracking for better planning.'
      },
      {
        title: 'Cash Forecasting',
        text: 'Use real-time inputs to forecast inflow, outflow, liquidity, and working-capital needs.'
      },
      {
        title: 'Scenario Modeling',
        text: 'Compare business scenarios and prepare leadership teams for changing market conditions.'
      }
    ]
  },
  {
    label: 'Cost Management',
    items: [
      {
        title: 'Cost Accounting',
        text: 'Track cost centers, allocations, product costs, and profitability across business units.'
      },
      {
        title: 'Expense Control',
        text: 'Improve approvals, policy checks, and visibility into recurring operational spend.'
      }
    ]
  },
  {
    label: 'Financial Reporting and Analysis',
    items: [
      {
        title: 'Management Reports',
        text: 'Build accurate reports for leaders with consolidated views across entities and regions.'
      },
      {
        title: 'Embedded Analytics',
        text: 'Turn daily finance activity into dashboards that help teams act faster.'
      }
    ]
  },
  {
    label: 'Advanced Modules',
    items: [
      {
        title: 'Tax and Compliance',
        text: 'Support changing tax rules, audit trails, and compliance requirements with stronger governance.'
      },
      {
        title: 'Intercompany Accounting',
        text: 'Simplify transactions between entities and keep consolidation cleaner.'
      }
    ]
  }
];

const benefits = [
  {
    icon: Sparkles,
    title: 'Proactive Decision Making',
    text: 'Use AI, reporting, and forecasting to monitor cash flow, understand trends, improve margins, and close books faster.'
  },
  {
    icon: Settings,
    title: 'Automate Operations',
    text: 'Automate core finance processes, reduce manual effort, create approval rules, and centralize data across Microsoft applications.'
  },
  {
    icon: Gauge,
    title: 'Maximize Profit Margins',
    text: 'Understand demand patterns, customer behavior, and product margins so teams can focus on profitable growth.'
  },
  {
    icon: Globe2,
    title: 'Scale Globally',
    text: 'Support multi-currency payments, local tax needs, and global compliance as your business expands across markets.'
  }
];

const fitPoints = [
  {
    label: 'Organization Size',
    text: 'Best suited for growing and enterprise teams that need advanced finance controls, high transaction capacity, and multi-user scalability.'
  },
  {
    label: 'Core Capabilities',
    text: 'Choose it when your business needs stronger reporting, budgeting, compliance, automation, and finance-specific ERP depth.'
  },
  {
    label: 'Advanced Features',
    text: 'Use modern functionality for analysis, tax compliance, workflows, approvals, and changing operational requirements.'
  },
  {
    label: 'Global Business',
    text: 'Ideal for multi-location organizations that handle different currencies, entities, regulations, and regional reporting needs.'
  }
];

const services = [
  {
    icon: FileCog,
    title: 'Dynamics 365 Finance Implementation',
    text: 'Power up your business with modern financial functionality, clean process design, and implementation support from AtiSunya consultants.'
  },
  {
    icon: Layers3,
    title: 'Dynamics 365 Finance Customizations',
    text: 'Customize workflows, reports, integrations, and user experiences so Dynamics 365 Finance fits the way your business operates.'
  },
  {
    icon: Headphones,
    title: 'Dynamics 365 Finance Support',
    text: 'Keep finance operations running smoothly with dependable support, issue resolution, optimization, and ongoing improvements.'
  }
];

const reasons = [
  {
    icon: BriefcaseBusiness,
    title: 'Proven Track Record',
    text: 'AtiSunya brings practical Microsoft business application experience across ERP, CRM, cloud, analytics, and enterprise transformation.'
  },
  {
    icon: Handshake,
    title: 'Personalized Approach',
    text: 'We understand your requirements, goals, and constraints first, then design a solution aligned with your operating model.'
  },
  {
    icon: LifeBuoy,
    title: 'Agile Support System',
    text: 'Our team supports you before and after implementation with maintenance, optimization, and business continuity assistance.'
  },
  {
    icon: Globe2,
    title: 'Global Infrastructure',
    text: 'We help build reliable services for remote, hybrid, and multi-region businesses while keeping compliance in focus.'
  }
];

function FinanceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tv-finance-image-frame tv-d365-reveal" style={{ '--d365-delay': '0.12s' } as CSSProperties}>
      <img src={src} alt={alt} />
    </div>
  );
}

export { pageConfig };

export default function D365FinanceArea() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = modules[activeModuleIndex];
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const items = Array.from(page.querySelectorAll<HTMLElement>('.tv-d365-reveal'));

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="tv-d365-finance-page" ref={pageRef}>
      <div className="tv-d365-section tv-d365-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="tv-d365-hero-content tv-d365-hero-animate">
                <span className="tv-d365-kicker">Microsoft Dynamics 365 Finance</span>
                <h1>
                  Connected Finance for <span>Smarter Growth</span>
                </h1>
                <p>
                  AtiSunya helps finance teams modernize planning, controls,
                  reporting, and automation with Microsoft Dynamics 365 Finance.
                </p>
                <a className="tv-d365-primary-btn" href="/contact">
                  Get Started!
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <FinanceImage
                src="/assets/img/d365-finance/finance-hero-dashboard.svg"
                alt="Dynamics 365 Finance dashboard illustration"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-d365-split-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-flow.svg"
                alt="Connected finance operations workflow"
              />
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="tv-d365-copy tv-d365-reveal" style={{ '--d365-delay': '0.08s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Bring Finance, Reporting, and Controls <span>into One System</span>
                </h2>
                <p>
                  Dynamics 365 Finance is a cloud ERP platform for organizations
                  that need stronger financial governance, reliable reporting,
                  and scalable processes across teams and entities.
                </p>
                <p>
                  Our consultants align the platform with your real workflows so
                  teams can reduce manual effort, close faster, and trust the
                  numbers they use every day.
                </p>
                <h3>What your finance team can improve:</h3>
                <ul className="tv-pill-list">
                  {offerBullets.map((item) => (
                    <li key={item}>
                      <Check size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  The result is a finance foundation that can work independently
                  and still connect with the wider Microsoft business application
                  ecosystem as your roadmap expands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-d365-split-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-ai-insights.svg"
                alt="AI insights for finance analytics"
              />
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="tv-d365-copy tv-d365-reveal" style={{ '--d365-delay': '0.08s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Make Financial Decisions <span>with Better Signals</span>
                </h2>
                <p>
                  Use automation, analytics, and AI-assisted insights to identify
                  trends, exceptions, and risks while finance work is still in
                  motion.
                </p>
                <p>
                  Leadership gets a clearer business view, while finance teams get
                  practical support for forecasting, reporting, reconciliations,
                  and recurring operational tasks.
                </p>
                <p>
                  AtiSunya configures these capabilities around the way your
                  organization manages entities, currencies, approvals, and
                  compliance responsibilities.
                </p>
                <ul className="tv-pill-list">
                  {aiBullets.map((item) => (
                    <li key={item}>
                      <Check size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-modules-section">
        <div className="container">
          <div className="tv-d365-center-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
            <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
              Core Finance Modules <span>Configured Around Your Operations</span>
            </h2>
            <p>
              Start with the modules your team needs most, then extend the
              platform as reporting, governance, and automation requirements grow.
            </p>
          </div>
          <div className="tv-modules-panel tv-d365-reveal" style={{ '--d365-delay': '0.12s' } as CSSProperties}>
            <div className="tv-module-tabs">
              {modules.map((module, index) => (
                <button
                  className={index === activeModuleIndex ? 'active' : ''}
                  key={module.label}
                  onClick={() => setActiveModuleIndex(index)}
                  type="button"
                >
                  {module.label}
                </button>
              ))}
            </div>
            <div className="tv-module-grid">
              {activeModule.items.map((item) => (
                <article className="tv-module-card" key={item.title}>
                  <Check size={26} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-benefits-section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-xl-7 col-lg-7">
              <div className="tv-d365-left-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Business Benefits <span>for Modern Finance Teams</span>
                </h2>
                <p>
                  AtiSunya focuses on measurable improvements: fewer manual steps,
                  stronger controls, faster visibility, and a finance setup that
                  can support business growth.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-growth-rocket.svg"
                alt="Finance growth and efficiency illustration"
              />
            </div>
          </div>
          <div className="tv-benefit-grid">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article className="tv-benefit-card tv-d365-reveal" style={{ '--d365-delay': `${0.08 + index * 0.08}s` } as CSSProperties} key={title}>
                <span>
                  <Icon size={34} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-fit-section">
        <div className="container">
          <div className="tv-d365-center-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
            <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
              When Dynamics 365 Finance <span>Makes Sense</span>
            </h2>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-7">
              <div className="tv-fit-copy tv-d365-reveal" style={{ '--d365-delay': '0.08s' } as CSSProperties}>
                <p>
                  <strong>Implementing Dynamics 365 Finance</strong> depends on
                  your operating model, reporting complexity, and growth plan.
                  These points help decide whether the platform is the right fit.
                </p>
                {fitPoints.map((point) => (
                  <p key={point.label}>
                    <b>{point.label}:</b> {point.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-decision-badge.svg"
                alt="Dynamics 365 Finance decision fit illustration"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-services-section">
        <div className="container">
          <div className="tv-d365-center-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
            <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
              Dynamics 365 Finance <span>Services from AtiSunya</span>
            </h2>
            <p>
              We support the full journey from planning and implementation to
              customization, integrations, reporting, and ongoing optimization.
            </p>
          </div>
          <div className="tv-services-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="tv-service-card tv-d365-reveal" style={{ '--d365-delay': `${0.08 + index * 0.08}s` } as CSSProperties} key={title}>
                <span>
                  <Icon size={54} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="/contact" aria-label={`Discuss ${title}`}>
                  -&gt;
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-why-section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-xl-6 col-lg-7">
              <div className="tv-d365-left-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Why Businesses Work <span>with AtiSunya</span>
                </h2>
                <p>
                  Work with consultants who understand Microsoft business
                  applications, finance processes, cloud platforms, and the
                  practical delivery discipline needed for stable ERP outcomes.
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-atisunya-choice.svg"
                alt="AtiSunya Dynamics 365 Finance partner illustration"
              />
            </div>
          </div>
          <div className="tv-reasons-grid">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <article className="tv-reason-card tv-d365-reveal" style={{ '--d365-delay': `${0.08 + index * 0.08}s` } as CSSProperties} key={title}>
                <span>
                  <Icon size={34} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
