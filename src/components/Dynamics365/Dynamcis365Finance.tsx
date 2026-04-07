import { motion } from "framer-motion";
import "../../styles/scss/layout/_d365fo.scss";

const heroStats = [
  { value: "360deg", label: "financial visibility across entities, projects, and cash positions" },
  { value: "24/7", label: "decision support with connected reporting and role-based insights" },
  { value: "1", label: "unified finance operating model spanning planning to close" },
];

const highlights = [
  "Finance transformation roadmap aligned to your operating model",
  "Global-ready controls, compliance, and closing discipline",
  "Connected planning, banking, reporting, and asset operations",
];

const capabilities = [
  {
    id: "01",
    title: "Financial command center",
    text: "Unify ledgers, subledgers, journals, and multi-entity reporting in one controlled environment.",
  },
  {
    id: "02",
    title: "Planning with accountability",
    text: "Drive budget ownership with structured approvals, live variance visibility, and sharper forecasting.",
  },
  {
    id: "03",
    title: "Cash, banking, and liquidity",
    text: "Improve treasury confidence through reconciliation, cash positioning, and payment orchestration.",
  },
  {
    id: "04",
    title: "Receivables and payables discipline",
    text: "Reduce leakage with stronger invoicing, collections, supplier settlements, and exception handling.",
  },
  {
    id: "05",
    title: "Fixed asset governance",
    text: "Manage capitalization, depreciation, transfers, and disposals with better audit readiness.",
  },
  {
    id: "06",
    title: "Cost and profitability insight",
    text: "Track cost drivers across departments, projects, and business units to improve margin decisions.",
  },
];

const deliveryPillars = [
  {
    title: "Consult",
    text: "Map pain points, reporting gaps, control risks, and target-state finance processes before build begins.",
  },
  {
    title: "Architect",
    text: "Design the operating model, integrations, data structure, and governance needed for a durable rollout.",
  },
  {
    title: "Enable",
    text: "Train teams, support adoption, and stabilize the platform so finance leaders can trust the numbers fast.",
  },
];

const operatingModel = [
  "Multi-company finance foundations",
  "Month-end close acceleration",
  "Budget control and approvals",
  "Audit-ready process design",
];

const heroBackground =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=80";

const overviewImage =
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80";

const deliveryImage =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80";

export default function Dynamics365Finance() {
  return (
    <div className="d365-finance-page">
      <section className="d365-hero">
        <div className="d365-hero__backdrop">
          <div
            className="d365-hero__image"
            style={{ backgroundImage: `url(${heroBackground})` }}
          />
          <div className="d365-hero__veil" />
          <div className="d365-hero__mesh" />
          <motion.span
            className="d365-hero__glow d365-hero__glow--one"
            animate={{ x: [0, 24, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="d365-hero__glow d365-hero__glow--two"
            animate={{ x: [0, -28, 0], y: [0, 22, 0], scale: [1, 0.94, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="d365-shell d365-hero__layout">
          <motion.div
            className="d365-hero__copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="d365-chip">AtiSunya Pvt Ltd</span>
            <h1>Dynamics 365 Finance, elevated for modern enterprise control.</h1>
            <p className="d365-hero__lede">
              Build a sharper finance function with connected operations, faster reporting,
              stronger governance, and a user experience that feels ready for executive review.
            </p>

            <div className="d365-hero__actions">
              <a href="mailto:info@atisunya.co" className="d365-btn d365-btn--primary">
                Book a finance consultation
              </a>
              <a href="#capabilities" className="d365-btn d365-btn--ghost">
                Explore capabilities
              </a>
            </div>

            <div className="d365-hero__highlights">
              {highlights.map((item) => (
                <div key={item} className="d365-hero__highlight">
                  <span />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className="d365-hero__panel"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="d365-panel__top">
              <span className="d365-chip d365-chip--soft">Finance operating cockpit</span>
              <h2>Premium delivery for finance leaders who want clarity, not clutter.</h2>
            </div>

            <div className="d365-panel__stats">
              {heroStats.map((item) => (
                <article key={item.value} className="d365-stat">
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>

            <div className="d365-panel__footer">
              <p>Designed for CFOs, controllers, finance heads, and transformation teams.</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="d365-overview">
        <div className="d365-shell d365-overview__grid">
          <motion.div
            className="d365-overview__content"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="d365-kicker">Overview</span>
            <h2>A more polished finance experience from strategy to stabilization.</h2>
            <p>
              Dynamics 365 Finance gives organizations a modern ERP foundation for
              accounting, budgeting, liquidity, compliance, and financial intelligence.
              AtiSunya helps shape that foundation into a system your teams can adopt with
              confidence.
            </p>
            <p>
              The focus is not just implementation. It is a refined operating experience
              where executives get better visibility, teams work with cleaner workflows, and
              finance processes scale without losing control.
            </p>
          </motion.div>

          <motion.div
            className="d365-overview__media"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="d365-overview__image-wrap">
              <img src={overviewImage} alt="Finance consulting meeting and digital dashboards" />
            </div>

            <div className="d365-overview__card">
              <div className="d365-overview__eyebrow">
                <span className="d365-dot" />
                Designed for structured finance transformation
              </div>
              <div className="d365-overview__list">
                {operatingModel.map((item) => (
                  <div key={item} className="d365-overview__item">
                    <strong>{item}</strong>
                    <span>Structured delivery with consulting-led execution.</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="d365-capabilities" id="capabilities">
        <div className="d365-shell">
          <div className="d365-section-head d365-section-head--split">
            <div>
              <span className="d365-kicker">Capabilities</span>
              <h2>Purpose-built finance capabilities with executive-grade presentation.</h2>
            </div>
            <p>
              Each capability is framed to feel more premium, easier to scan, and more
              aligned with enterprise decision-making.
            </p>
          </div>

          <div className="d365-capabilities__grid">
            {capabilities.map((item, index) => (
              <motion.article
                key={item.id}
                className="d365-capability"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <div className="d365-capability__meta">
                  <span className="d365-capability__id">{item.id}</span>
                  <span className="d365-capability__line" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="d365-delivery">
        <div className="d365-shell d365-delivery__grid">
          <motion.div
            className="d365-delivery__intro"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="d365-kicker">Delivery model</span>
            <h2>Consulting, implementation, integration, and adoption in one premium flow.</h2>
            <p>
              We turn finance transformation into a clear sequence of decisions, build steps,
              and adoption milestones. That means fewer surprises, better ownership, and a
              stronger finish after go-live.
            </p>

            <motion.div
              className="d365-delivery__visual"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <img src={deliveryImage} alt="Enterprise team planning finance transformation" />
              <div className="d365-delivery__visual-badge">
                Premium design with real-world consulting imagery
              </div>
            </motion.div>
          </motion.div>

          <div className="d365-delivery__cards">
            {deliveryPillars.map((item, index) => (
              <motion.article
                key={item.title}
                className="d365-delivery-card"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.07 }}
              >
                <span className="d365-delivery-card__index">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="d365-cta" id="contact">
        <div className="d365-shell">
          <motion.div
            className="d365-cta__panel"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <span className="d365-kicker d365-kicker--light">Next step</span>
              <h2>Ready to make this Dynamics 365 Finance page feel truly premium?</h2>
              <p>
                We can keep refining the experience around your brand, conversion goals, and
                industry positioning.
              </p>
            </div>
            <a href="mailto:info@atisunya.co" className="d365-btn d365-btn--light">
              Contact AtiSunya
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
