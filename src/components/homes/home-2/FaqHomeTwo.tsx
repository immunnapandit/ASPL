import { useState } from 'react';

interface FaqHomeTwoProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}
[];

const faqData: FaqHomeTwoProps[] = [
  {
    id: 1,
    question: 'What Is The Design Process For Branding?',
    answer:
      "If you ask our clients what it's like working with us, they'll tell you about how much we care about their success. Our design process involves research, strategy, concept development, refinement, and final delivery.",
    isOpen: true,
  },
  {
    id: 2,
    question: 'How Much Does Logo Design Services Cost?',
    answer:
      'Logo design costs vary based on project complexity and requirements. We offer packages starting from $499 for basic logos to $1999+ for comprehensive branding solutions with multiple concepts and revisions.',
    isOpen: false,
  },
  {
    id: 3,
    question: 'How Long Will It Take To Complete My Project?',
    answer:
      'Project timelines depend on scope and complexity. Typical projects take 2-4 weeks from initial consultation to final delivery. We provide detailed timelines during our project kickoff meeting.',
    isOpen: false,
  },
];

interface AccordionItemProps {
  faq: FaqHomeTwoProps;
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
          Q{faq.id}. {faq.question}
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

export default function FaqHomeTwo() {
  const [faqs, setFaqs] = useState(faqData);

  const handleToggle = (id: number) => {
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
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="tv-faq-left">
              <div className="tv-section-title-box">
                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                  Question
                </span>
                <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                  Frequently asked questions
                </h4>
                <p className="mt-20">
                  Morem ipsum dolor sit amet, consectetur adipiscing elita
                  florai psum dolor sit amet, consectetur amet consecteture.
                </p>
              </div>
              <div className="tv-faq-accordion mt-50">
                <div className="tv-custom-accordion">
                  <div className="accordion" id="faqAccordion">
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
          <div className="col-xl-6 col-lg-6">
            <div className="tv-faq-right">
              <img
                className="img-anim-left"
                src="assets/img/about/faq-thumb-1-1.png"
                alt="FAQ illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
