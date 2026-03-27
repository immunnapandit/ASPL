import { motion } from "framer-motion";
import type { Variants } from "framer-motion";import {
  Factory,
  ShoppingCart,
  HeartPulse,
  UtensilsCrossed,
  Cog,
  GraduationCap,
  RadioTower,
  LaptopMinimal,
  MoreHorizontal,
} from "lucide-react";
import "../../../styles/scss/layout/_industry.scss";

type IndustryItem = {
  title: string;
  icon: React.ElementType;
  color: string;
  tint: string;
};

type HexagonStyle = React.CSSProperties & {
  ["--icon-tint"]?: string;
};

const industries: IndustryItem[] = [
  { title: "Manufacturing", icon: Factory, color: "#C48A3A", tint: "rgba(196, 138, 58, 0.12)" },
  { title: "Retail & E-Commerce", icon: ShoppingCart, color: "#F97316", tint: "rgba(249, 115, 22, 0.12)" },
  { title: "Healthcare", icon: HeartPulse, color: "#EF4444", tint: "rgba(239, 68, 68, 0.12)" },
  { title: "Food and Beverages", icon: UtensilsCrossed, color: "#E11D48", tint: "rgba(225, 29, 72, 0.12)" },
  { title: "Engineering", icon: Cog, color: "#F59E0B", tint: "rgba(245, 158, 11, 0.12)" },
  { title: "Education", icon: GraduationCap, color: "#7C3AED", tint: "rgba(124, 58, 237, 0.12)" },
  { title: "Telecommunication", icon: RadioTower, color: "#0EA5E9", tint: "rgba(14, 165, 233, 0.12)" },
  { title: "Technology", icon: LaptopMinimal, color: "#2563EB", tint: "rgba(37, 99, 235, 0.12)" },
  { title: "And Many More", icon: MoreHorizontal, color: "#8B5CF6", tint: "rgba(139, 92, 246, 0.12)" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function IndustryCard({ item }: { item: IndustryItem }) {
  const Icon = item.icon;

  return (
    <motion.div className="industry-item" variants={itemVariants}>
      <div
        className="hexagon-card"
        style={{ "--icon-tint": item.tint } as HexagonStyle}
      >
        <div className="hexagon-shape">
          <div className="icon-badge">
            <Icon size={28} strokeWidth={2} style={{ color: item.color }} />
          </div>
        </div>
      </div>

      <p className="industry-text">{item.title}</p>
    </motion.div>
  );
}

export default function IndustriesSection() {
  return (
    <section className="industries-section">
      <div className="container">
        <motion.div
          className="industries-header"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="subtitle-row">
            <span className="industries-subtitle">INDUSTRIES</span>
            <span className="subtitle-line">
              <span className="subtitle-dot" />
            </span>
          </div>

          <h2 className="industries-title">
            <span>Explore</span> Industries
          </h2>

          <p className="industries-description">
            Powerful solutions designed for multiple business sectors with a modern, scalable experience.
          </p>
        </motion.div>

        <motion.div
          className="industries-grid-top"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {industries.slice(0, 6).map((item) => (
            <IndustryCard key={item.title} item={item} />
          ))}
        </motion.div>

        <motion.div
          className="industries-grid-bottom"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {industries.slice(6).map((item) => (
            <IndustryCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}