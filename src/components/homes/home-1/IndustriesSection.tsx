import type { ElementType, CSSProperties } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Factory,
  ShoppingCart,
  HeartPulse,
  UtensilsCrossed,
  Cog,
  GraduationCap,
  RadioTower,
  LaptopMinimal,
  MoreHorizontal,
} from 'lucide-react';
import '../../../styles/scss/layout/_industry.scss';

type IndustryItem = {
  title: string;
  icon: ElementType;
  label: string;
  iconColor: string;
  gradient: string;
  glow: string;
  ring: string;
};

type HexagonStyle = CSSProperties & {
  '--industry-gradient'?: string;
  '--industry-glow'?: string;
  '--industry-ring'?: string;
  '--industry-icon'?: string;
};

const industries: IndustryItem[] = [
  {
    title: 'Manufacturing',
    icon: Factory,
    label: 'ERP Systems',
    iconColor: '#1f6fff',
    gradient: 'linear-gradient(145deg, #f4f8ff 0%, #e7efff 55%, #eaf7ff 100%)',
    glow: 'rgba(31, 111, 255, 0.14)',
    ring: 'rgba(31, 111, 255, 0.12)',
  },
  {
    title: 'Retail & E-Commerce',
    icon: ShoppingCart,
    label: 'Digital Commerce',
    iconColor: '#0c8bdc',
    gradient: 'linear-gradient(145deg, #f2f9ff 0%, #e5f1ff 52%, #edf8ff 100%)',
    glow: 'rgba(12, 139, 220, 0.14)',
    ring: 'rgba(12, 139, 220, 0.12)',
  },
  {
    title: 'Healthcare',
    icon: HeartPulse,
    label: 'Connected Care',
    iconColor: '#149d8d',
    gradient: 'linear-gradient(145deg, #f1fbfa 0%, #e1f7f3 52%, #ebf8ff 100%)',
    glow: 'rgba(20, 157, 141, 0.14)',
    ring: 'rgba(20, 157, 141, 0.12)',
  },
  {
    title: 'Food and Beverages',
    icon: UtensilsCrossed,
    label: 'Supply Visibility',
    iconColor: '#2b77d1',
    gradient: 'linear-gradient(145deg, #f4f8ff 0%, #e9f1ff 50%, #eef8ff 100%)',
    glow: 'rgba(43, 119, 209, 0.14)',
    ring: 'rgba(43, 119, 209, 0.12)',
  },
  {
    title: 'Engineering',
    icon: Cog,
    label: 'Process Automation',
    iconColor: '#335eea',
    gradient: 'linear-gradient(145deg, #f5f7ff 0%, #e6ecff 52%, #edf5ff 100%)',
    glow: 'rgba(51, 94, 234, 0.14)',
    ring: 'rgba(51, 94, 234, 0.12)',
  },
  {
    title: 'Education',
    icon: GraduationCap,
    label: 'Learning Platforms',
    iconColor: '#1477c9',
    gradient: 'linear-gradient(145deg, #f3f8ff 0%, #e7f0ff 52%, #edf8ff 100%)',
    glow: 'rgba(20, 119, 201, 0.14)',
    ring: 'rgba(20, 119, 201, 0.12)',
  },
  {
    title: 'Telecommunication',
    icon: RadioTower,
    label: 'Connected Networks',
    iconColor: '#1764d6',
    gradient: 'linear-gradient(145deg, #f4f8ff 0%, #e6eeff 52%, #edf6ff 100%)',
    glow: 'rgba(23, 100, 214, 0.14)',
    ring: 'rgba(23, 100, 214, 0.12)',
  },
  {
    title: 'Technology',
    icon: LaptopMinimal,
    label: 'Cloud Native',
    iconColor: '#0f8ea7',
    gradient: 'linear-gradient(145deg, #f1fbff 0%, #e3f6ff 52%, #e8fbff 100%)',
    glow: 'rgba(15, 142, 167, 0.14)',
    ring: 'rgba(15, 142, 167, 0.12)',
  },
  {
    title: 'And Many More',
    icon: MoreHorizontal,
    label: 'Scalable Delivery',
    iconColor: '#2354c7',
    gradient: 'linear-gradient(145deg, #f5f8ff 0%, #e9efff 52%, #eff8ff 100%)',
    glow: 'rgba(35, 84, 199, 0.14)',
    ring: 'rgba(35, 84, 199, 0.12)',
  },
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
        style={
          {
            '--industry-gradient': item.gradient,
            '--industry-glow': item.glow,
            '--industry-ring': item.ring,
            '--industry-icon': item.iconColor,
          } as HexagonStyle
        }
      >
        <div className="hexagon-shape">
          <div className="icon-badge">
            <Icon size={28} strokeWidth={2.1} style={{ color: item.iconColor }} />
          </div>
          <span className="industry-meta">{item.label}</span>
        </div>
      </div>

      <p className="industry-text">{item.title}</p>
    </motion.div>
  );
}

export default function IndustriesSection() {
  return (
    <section className="tv-industries-section pt-130 pb-80">
      <div className="container">
        <motion.div
          className="industries-header"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="tv-section-title-box text-center mb-60">
            <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
              Industries
            </span>

            <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
              Technology Solutions
              <br />
              for Every Industry
            </h4>

            <p>
              Enterprise-focused IT services designed to modernize operations,
              connect business systems, and support secure digital growth.
            </p>
          </div>
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
