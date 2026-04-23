import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { NEWSLETTER_API_URL } from '../../config/api';
import { socialLinks } from '../../data/social-links';

export default function FooterOne() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterWebsite, setNewsletterWebsite] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const newsletterApiUrl = NEWSLETTER_API_URL;

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newsletterStatus === 'submitting') {
      return;
    }

    setNewsletterStatus('submitting');
    setNewsletterMessage('');

    try {
      const response = await fetch(newsletterApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          website: newsletterWebsite.trim(),
          source: 'website-footer',
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to subscribe right now.');
      }

      setNewsletterStatus('success');
      setNewsletterMessage(
        result?.message || 'Thank you for subscribing to the AtiSunya newsletter.'
      );
      setNewsletterEmail('');
      setNewsletterWebsite('');
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(
        error instanceof Error
          ? error.message
          : 'Unable to subscribe right now. Please try again.'
      );
    }
  };

  return (
    <footer>
      <div className="tv-footer-wrap footer-one-wrap footer-bg z-index-1 pt-130">
        <div className="tv-footer-top-area">
          <div className="container">
            <div className="tv-footer-top-area-form">
              <div className="row align-items-center">
                <div className="col-xl-5 col-12">
                  <div className="tv-footer-top-heading">
                    <h2 className="tv-spltv-text tv-spltv-in-right">
                      Subscribe to Our Newsletter
                    </h2>
                  </div>
                </div>
                <div className="col-xl-7 col-12 text-xl-end">
                  <div className="tv-footer-top-form">
                    <form onSubmit={handleNewsletterSubmit}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={newsletterEmail}
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        onChange={(event) => setNewsletterEmail(event.target.value)}
                        disabled={newsletterStatus === 'submitting'}
                        required
                      />
                      <input
                        className="tv-newsletter-honeypot"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={newsletterWebsite}
                        onChange={(event) => setNewsletterWebsite(event.target.value)}
                        aria-hidden="true"
                      />
                      <button
                        className="tv-btn-primary p-relative"
                        disabled={newsletterStatus === 'submitting'}
                      >
                        <span className="btn-wrap">
                          <span className="btn-text1">
                            {newsletterStatus === 'submitting' ? 'Submitting...' : 'Submit Now'}
                          </span>
                          <span className="btn-text2">
                            {newsletterStatus === 'submitting' ? 'Submitting...' : 'Submit Now'}
                          </span>
                        </span>
                      </button>
                    </form>
                    {newsletterMessage ? (
                      <p
                        className={`tv-newsletter-form-message ${
                          newsletterStatus === 'error' ? 'is-error' : 'is-success'
                        }`}
                        role="status"
                      >
                        {newsletterMessage}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tv-footer-area mb-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-1">
                  <div className="tv-footer-widget-logo mb-30">
                    <Link to="/">
                      <img src="/assets/img/logo/AtiSunyaLogo.png" alt="" />
                    </Link>
                  </div>
                  <div className="tv-footer-widget-partner-badge">
                    <img
                      src="/assets/img/footer/MicrosoftSilverPartner.png"
                      alt="Microsoft Silver Partner"
                    />
                  </div>
                  <div className="tv-footer-widget-text">
                    <p>
                      AtiSunya is a technology-driven company delivering smart digital solutions, including web development, CRM, ERP, and business automation to help businesses grow and scale efficiently.
                    </p>
                  </div>
                  <div className="tv-footer-widget-contact-info">
                    <ul>
                      <li>
                        <a href="">
                          <i className="fa-solid fa-phone"></i>(+91)-80-8181-0673, (+91)-82-9915-6511
                        </a>
                      </li>
                      <li>
                        <a href="mailto:info@atisunya.co">
                          <i className="fa-solid fa-envelope"></i>
                          info@atisunya.co
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-2">
                  <h4 className="tv-footer-widget-title">Quick Links</h4>
                  <div className="tv-footer-widget-menu">
                    <ul>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/#services">Services</Link>
                      </li>
                      <li>
                        <Link to="/careers">Careers</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-3 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Services</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <Link to="/solutions/microsoft-dynamics-365">Dynamics 365</Link>
                        </li>
                        <li>
                          <Link to="/solutions/microsoft-azure">Azure</Link>
                        </li>
                        <li>
                          <Link to="/what-we-do/erp-implementation">ERP Development</Link>
                        </li>
                        <li>
                          <Link to="/ai-solutions">Artificial Intelligence</Link>
                        </li>
                        <li>
                          <Link to="/solutions/office-365">Office 365</Link>
                        </li>
                        <li>
                          <Link to="/what-we-do/web-development">Web Development</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-4 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Information</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <Link to="/working-process">Working Process</Link>
                        </li>
                        <li>
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/terms-and-conditions">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link to="/faq">Faqs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tv-copyright-area ">
          <div className="container">
            <div className="tv-copyright-border">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="tv-copyright-left text-center text-lg-start">
                    <p className="mb-0">
                      © 2026 All Rights Reserved | Developed by
                      <a href="https://www.atisunya.co" target="_blank">
                        {' '}
                        AtiSunya Pvt. Ltd.
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 text-end">
                  <div className="tv-footer-widget-social">
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
