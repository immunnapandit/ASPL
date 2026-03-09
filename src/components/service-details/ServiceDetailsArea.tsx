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
    question: 'What is vision for the future?',
    answer:
      'Augue enim ut sem vulputate nunc eu ultrices nec bibendum. Nullam non at eu tincidunt non  purus vitae.leo nam quam elit imperdiet. Sit malesuada massa scelerisque tincidunt. faucibus Sit dolor ultricie phasellus viverra feugiat enim nisl.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'Do you offer free resources?',
    answer:
      'Logo design costs vary based on project complexity and requirements. We offer packages starting from $499 for basic logos to $1999+ for comprehensive branding solutions with multiple concepts and revisions.',
    isOpen: false,
  },
  {
    id: 3,
    question: 'Can help to find investors?',
    answer:
      'Project timelines depend on scope and complexity. Typical projects take 2-4 weeks from initial consultation to final delivery. We provide detailed timelines during our project kickoff meeting.',
    isOpen: false,
  },
  {
    id: 4,
    question: 'Can help to find investors?',
    answer:
      'Project timelines depend on scope and complexity. Typical projects take 2-4 weeks from initial consultation to final delivery. We provide detailed timelines during our project kickoff meeting.',
    isOpen: false,
  },
  {
    id: 5,
    question: 'What services do you offer?',
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

export default function ServiceDetailsArea() {
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
    <div className="tv-blog-area tv-single-service pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12 order-xl-1 order-lg-1">
            <div className="tv-blog-list-wrap">
              <div className="tv-blog-details">
                <div className="tv-blog-details-thumb mb-40">
                  <img src="assets/img/service/single-service.png" alt="" />
                </div>
                <h2 className="title">Data Security</h2>
                <div className="tv-blog-details-content">
                  <p>
                    When an unknown printer took ar galley offer type year
                    anddey scrambled make aewer specimen a book bethas survived
                    not only five when anner year unknown printer eed little
                    help from friend from time to time. Although we offer the
                    one-stop convenience. unknown printer took galley type year
                    anddey unknown printer took scrambled.
                  </p>

                  <p>
                    When an unknown printer took ar galley offer type year
                    anddey scrambled make aewer specimen a book bethas survived
                    not only five when anner year unknown printer eed little
                    help from friend from time to time. Although we offer the
                    one-stop convenience. unknown printer took galley type year
                    unknown printer took galley anddey scrambled.
                  </p>

                  <div className="tv-service-list-item">
                    <ul>
                      <li>
                        <i className="fa-solid fa-check"></i>Sed nisl fusce est
                        consequat mollis habitasse facilisi rutrum nisle.
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i>Cubilia quisque ad
                        accumsan lorem platea elementum nisl curabitur dapibus.
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i>Egestas magnis
                        sapien hack vehicula condimentum dui enim justo site.
                      </li>
                    </ul>
                  </div>

                  <div className="tv-blog-details-thumb-img d-flex justify-content-between">
                    <div>
                      {' '}
                      <img
                        src="assets/img/blog/blog-details-thumb-1-2.png"
                        alt=""
                      />
                    </div>
                    <div>
                      {' '}
                      <img
                        src="assets/img/blog/blog-details-thumb-1-3.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <p>
                    When an unknown printer took ar galley offer type year
                    anddey scrambled make aewer specimen a book bethas survived
                    not only five when anner year unknown printer eed little
                    help from friend from time to time. Although we offer the
                    one-stop convenience. unknown printer took galley type year
                    anddey unknown printer took scrambled.
                  </p>
                  <h3 className="faq-title">Frequently Asked Question</h3>

                  <div className="tv-custom-accordion">
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
          <div className="col-xl-4 col-lg-4 col-12 order-xl-0 order-lg-0">
            <div className="tv-sidebar-area">
              <div
                className="tv-widget widget mb-40  wow-itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <ul>
                  <li className="cat-item">
                    <a href="">Managed IT Services</a>
                    <span>
                      <i className="fa-regular fa-angle-right"></i>
                    </span>
                  </li>
                  <li className="cat-item">
                    <a href="">Cloud Services </a>
                    <span>
                      <i className="fa-regular fa-angle-right"></i>
                    </span>
                  </li>
                  <li className="cat-item">
                    <a href="">Machine Learning</a>
                    <span>
                      <i className="fa-regular fa-angle-right"></i>
                    </span>
                  </li>
                  <li className="cat-item">
                    <a href="">Data Security</a>
                    <span>
                      <i className="fa-regular fa-angle-right"></i>
                    </span>
                  </li>
                  <li className="cat-item">
                    <a href="">Web Analysis</a>
                    <span>
                      <i className="fa-regular fa-angle-right"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className="tv-widget widget mb-30  wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <div className="tv-widget-content">
                  <h4>Need Any Help?</h4>
                  <p>Need Any Help, Call Us 24/7 For Support</p>
                  <div className="widget-contact-wrap-area mt-40">
                    <div className="widget-contact-wrap d-flex align-items-center">
                      <div className="icon">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <div className="contact-info">
                        <p>Call Us</p>
                        <h5>
                          <a href="tel:+1234567890">+123 456 7890</a>
                        </h5>
                      </div>
                    </div>
                    <div className="widget-contact-wrap d-flex align-items-center">
                      <div className="icon">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div className="contact-info">
                        <p>Email</p>
                        <h5>
                          <a href="mailto:info@example.com">info@example.com</a>
                        </h5>
                      </div>
                    </div>
                    <div className="widget-contact-wrap d-flex align-items-center">
                      <div className="icon">
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <div className="contact-info">
                        <p>Office Address</p>
                        <h5>
                          <a href="#">125 Berlin, Germany</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
