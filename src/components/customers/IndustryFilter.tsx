import type { Industry } from '../../data/customers';

interface IndustryFilterProps {
  industries: readonly Industry[];
  activeIndustry: Industry;
  onChange: (industry: Industry) => void;
}

export default function IndustryFilter({
  industries,
  activeIndustry,
  onChange,
}: IndustryFilterProps) {
  return (
    <div className="tv-customer-filter" aria-label="Filter customers by industry">
      {industries.map((industry) => (
        <button
          key={industry}
          type="button"
          className={industry === activeIndustry ? 'active' : ''}
          aria-pressed={industry === activeIndustry}
          onClick={() => onChange(industry)}
        >
          {industry}
        </button>
      ))}
    </div>
  );
}
