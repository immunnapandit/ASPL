import { useState } from 'react';

interface FaqAreaProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}
[];

const faqData: FaqAreaProps[] = [
  {
    isOpen: true,
    id: 'one',
    question: 'Q1. What services does AtiSunya provide?',
    answer:
      'AtiSunya provides consulting, ERP and CRM implementation, Microsoft Dynamics solutions, Azure services, app development, BI and analytics, managed support, digital transformation, and Microsoft Certified Trainer readiness programs.',
  },
  {
    isOpen: false,
    id: 'two',
    question: 'Q2. Do you support Microsoft Certified Trainer readiness?',
    answer:
      'Yes. We offer Microsoft Certified Trainer readiness support and structured training to help eligible professionals understand the application process, documentation expectations, and practical preparation steps.',
  },
  {
    isOpen: false,
    id: 'three',
    question: 'Q3. Which Microsoft solutions do you work with?',
    answer:
      'We work across Microsoft Dynamics 365, Microsoft Azure, Power Platform, Power BI, Dynamics AX, Dynamics NAV, and Dynamics CRM, along with related modernization, support, and optimization services.',
  },
  {
    isOpen: false,
    id: 'four',
    question: 'Q4. How do you approach a new client project?',
    answer:
      'Our approach starts with discovery and business understanding, followed by solution planning, implementation, validation, user enablement, and post-go-live improvement. The exact delivery model depends on scope, timeline, and business priorities.',
  },
  {
    isOpen: false,
    id: 'five',
    question: 'Q5. Do you work only with large enterprises?',
    answer:
      'No. We support both growing businesses and enterprise clients. Engagements are shaped around actual business needs, whether that means advisory support, targeted implementation, or long-term managed services.',
  },
  {
    isOpen: false,
    id: 'six',
    question: 'Q6. Can you help after implementation is complete?',
    answer:
      'Yes. We provide post-implementation support, managed services, optimization, issue resolution, change requests, and guidance for continuous improvement after go-live.',
  },
  {
    isOpen: false,
    id: 'seven',
    question: 'Q7. Do you offer custom development and integrations?',
    answer:
      'Yes. We support app development, workflow automation, integrations, reporting solutions, and custom enhancements when standard platform capabilities need to be extended for business requirements.',
  },
  {
    isOpen: false,
    id: 'eight',
    question: 'Q8. How can I contact AtiSunya for a consultation?',
    answer:
      'You can reach us through the Contact Us page, email us at info@atisunya.co, or use the contact details listed in the footer to discuss your requirements.',
  },
];

interface AccordionItemProps {
  faq: FaqAreaProps;
  isOpen: boolean;
  onClick: () => void;
}
const AccordionItem = ({ faq, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="accordion-items">
      <h2 className="accordion-header">
        <button
          className={`accordion-buttons ${isOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          {faq.question}
        </button>
      </h2>
      <div
        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
        aria-labelledby={`heading${faq.id}`}
      >
        <div className="accordion-body d-flex align-items-center">
          <p className="mb-0">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FaqArea() {
  const [faqs, setFaqs] = useState(faqData);

  const handleToggle = (id: string) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => ({
        ...faq,
        isOpen: faq.id === id ? !faq.isOpen : false,
      }))
    );
  };

  return (
    <div className="tv-faq-area pt-130 pb-130">
      <div className="container">
        <div className="row gy-4">
          <div className="col-xxl-4 col-xl-4 col-lg-4">
            <div className="tv-faq-left-wrap">
              <div className="tv-section-title-box mb-50">
                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                  FAQ
                </span>
                <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                  Frequently Asked Questions
                </h4>
                <p>
                  Find quick answers about our services, Microsoft solution expertise,
                  project delivery approach, and training support.
                </p>
              </div>
              <div className="tv-faq-form">
                <h4>Have a Question?</h4>
                <form action="#">
                  <div className="tv-contact-input-box mb-24">
                    <input type="text" placeholder="Full Name *" />
                  </div>
                  <div className="tv-contact-input-box mb-24">
                    <input type="email" placeholder="Email Address *" />
                  </div>
                  <div className="it-contact-textarea-box mb-24">
                    <textarea placeholder="Your Message *"></textarea>
                  </div>
                  <button className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Ask Question Now</span>
                      <span className="btn-text2">Ask Question Now</span>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-8">
            <div className="tv-custom-accordion tv-custom-accordion-style-2 style-3">
              <div className="accordion" id="accordionExample">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    faq={faq}
                    isOpen={faq.isOpen}
                    onClick={() => handleToggle(faq.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
