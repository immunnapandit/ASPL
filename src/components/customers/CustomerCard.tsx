import type { Customer } from '../../data/customers';

interface CustomerCardProps {
  customer: Customer;
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <article className="tv-customer-card">
      <div className="tv-customer-logo">
        <img
          src={customer.logo}
          alt={`${customer.name} logo`}
          loading="lazy"
        />
      </div>
    </article>
  );
}
