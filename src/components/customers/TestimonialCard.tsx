import type { CustomerTestimonial } from '../../data/customers';

interface TestimonialCardProps {
  testimonial: CustomerTestimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="tv-customer-testimonial-card">
      <div className="tv-customer-rating" aria-label={`${testimonial.rating} star rating`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <i className="fa-solid fa-star" key={index}></i>
        ))}
      </div>
      <blockquote>"{testimonial.quote}"</blockquote>
      <div className="tv-customer-testimonial-author">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.clientName} avatar`}
          loading="lazy"
        />
        <div>
          <h3>{testimonial.clientName}</h3>
          <span>
            {testimonial.designation}, {testimonial.company}
          </span>
        </div>
      </div>
    </article>
  );
}
