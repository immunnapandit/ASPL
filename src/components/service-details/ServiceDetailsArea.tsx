import { useState } from 'react';
import { Link } from 'react-router-dom';
import type {
  ServiceDetailsFaq,
  ServiceDetailsPageConfig,
} from './service-details-data';
import { defaultServiceDetailsPage } from './service-details-data';

interface FaqHomeTwoProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}
[];

function buildFaqState(faqs: ServiceDetailsFaq[]): FaqHomeTwoProps[] {
  return faqs.map((faq, index) => ({
    ...faq,
    isOpen: index === 0,
  }));
}

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

interface ServiceDetailsAreaProps {
  page?: ServiceDetailsPageConfig;
}

export default function ServiceDetailsArea({
  page = defaultServiceDetailsPage,
}: ServiceDetailsAreaProps) {
  const [faqs, setFaqs] = useState(() => buildFaqState(page.faqs));
  const sidebarLinks = page.sidebarLinks ?? [];
  const hasSidebar = sidebarLinks.length > 0;

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
          <div
            className={
              hasSidebar
                ? 'col-xl-8 col-lg-8 col-12 order-xl-1 order-lg-1'
                : 'col-12'
            }
          >
            <div className="tv-blog-list-wrap">
              <div className="tv-blog-details">
                <div className="tv-blog-details-thumb mb-40">
                  <img src={page.heroImage} alt={page.title} />
                </div>
                <h2 className="title">{page.title}</h2>
                <div className="tv-blog-details-content">
                  <div className="mb-35">
                    <Link to="/contact" className="tv-btn-primary p-relative">
                      <span className="btn-wrap">
                        <span className="btn-text1">Enquire Now</span>
                        <span className="btn-text2">Enquire Now</span>
                      </span>
                    </Link>
                  </div>

                  {page.introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  <div className="tv-service-list-item">
                    <ul>
                      {page.checklist.map((item) => (
                        <li key={item}>
                          <i className="fa-solid fa-check"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tv-blog-details-thumb-img d-flex justify-content-between">
                    <div>
                      <img
                        src={page.galleryImages[0]}
                        alt={`${page.title} visual 1`}
                      />
                    </div>
                    <div>
                      <img
                        src={page.galleryImages[1]}
                        alt={`${page.title} visual 2`}
                      />
                    </div>
                  </div>
                  <p>{page.closingParagraph}</p>
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
          {hasSidebar && (
            <div className="col-xl-4 col-lg-4 col-12 order-xl-0 order-lg-0">
              <div className="tv-sidebar-area">
                <div
                  className="tv-widget widget mb-40  wow-itfadeUp"
                  data-wow-duratoin=".9s"
                  data-wow-delay=".3s"
                >
                  <ul>
                    {sidebarLinks.map((item) => (
                      <li className="cat-item" key={item.href}>
                        <Link to={item.href}>{item.label}</Link>
                        <span>
                          <i className="fa-regular fa-angle-right"></i>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
