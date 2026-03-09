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
    question: 'Q1. What Is The Design Process For Branding?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'two',
    question: 'Q2. How Much Does Logo Design Services Cost?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'three',
    question: 'Q3. How Long Will It Take To Complete My Project?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'four',
    question: 'Q4. What Is Included In A Round Of Revisions?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'five',
    question: 'Q5. Are we too small for managed IT services?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'six',
    question: "Q6. Why can't we print on both sides of the paper?",
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'seven',
    question: 'Q7. What is a statement of work in project management?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
  },
  {
    isOpen: false,
    id: 'eight',
    question: 'Q8. How to become an agile project manager?',
    answer:
      'How quick is quick? For most design, we’re talking 2–3 business days. We balance speed with quality, ensuring you get top-notch design swiftly.',
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
                  Question
                </span>
                <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                  Frequently asked asked question
                </h4>
                <p>
                  If you need immediate assistance, click the button below to
                  chat live with a Customer Service Customer live with
                  representative.
                </p>
              </div>
              <div className="tv-faq-form">
                <h4>Have any Question</h4>
                <form action="#">
                  <div className="tv-contact-input-box mb-24">
                    <input type="text" placeholder="Full Name *" />
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
