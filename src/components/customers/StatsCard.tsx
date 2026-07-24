import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatsCardProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export default function StatsCard({
  value,
  suffix,
  label,
  description,
}: StatsCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  return (
    <article className="tv-customer-stat-card" ref={ref}>
      <strong>
        {inView ? <CountUp end={value} duration={1.7} /> : 0}
        {suffix}
      </strong>
      <span>{label}</span>
      <p>{description}</p>
    </article>
  );
}
