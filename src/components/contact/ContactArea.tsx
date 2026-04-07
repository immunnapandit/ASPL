import { useState } from 'react';
import type { FormEvent } from 'react';

const contactHighlights = [
  {
    title: 'Project-led delivery',
    description:
      'We shape clear scopes, realistic milestones, and dependable communication from kickoff to launch.',
  },
  {
    title: 'Business-first consulting',
    description:
      'Our team connects strategy, technology, and execution so every engagement moves the business forward.',
  },
];

const officeLocations = [
  {
    country: 'India',
    city: 'Bengaluru',
    address: 'Global delivery and consulting operations',
  },
  {
    country: 'United States',
    city: 'Dallas',
    address: 'Client partnerships and transformation programs',
  },
  {
    country: 'United Arab Emirates',
    city: 'Dubai',
    address: 'Regional business support and enterprise advisory',
  },
];

const initialFormData = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactArea() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitState({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit your message right now.');
      }

      setSubmitState({
        type: 'success',
        message: result.message || 'Your message has been submitted successfully.',
      });
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';

      setSubmitState({
        type: 'error',
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="tv-contact-area pt-130 pb-130">
        <div className="container">
          <div className="tv-contact-wrap">
            <div className="row gy-4 align-items-center">
              <div className="col-xxl-6 col-xl-6 col-lg-6">
                <div className="tv-contact-left-wrap">
                  <div className="tv-section-title-box mb-44">
                    <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                      Contact Us
                    </span>
                    <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                      Let&apos;s Build an Exceptional Project Together
                    </h4>
                    <p>
                      Share your goals with our team and we will help you shape a practical,
                      premium solution with the right delivery approach.
                    </p>
                  </div>

                  {contactHighlights.map((item, index) => (
                    <div
                      key={item.title}
                      className="tv-card-box mb-40 wow itfadeUp"
                      data-wow-delay={index === 0 ? '.2s' : '.3s'}
                    >
                      <div className="icon">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 0L24.4901 13.8197H39.0211L27.2655 22.3607L31.7557 36.1803L20 27.6393L8.24429 36.1803L12.7345 22.3607L0.97887 13.8197H15.5099L20 0Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="content">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="col-xxl-6 col-xl-6 col-lg-6 wow itfadeUp"
                data-wow-delay=".2s"
              >
                <div className="tv-contact-right-wrap">
                  <h1 className="text-white">Make an Appointment</h1>
                  <p>Tell us about your requirement and our team will get back to you promptly.</p>
                  <form
                    action="#"
                    className="tv-contact-form"
                    aria-label="Contact form"
                    onSubmit={handleSubmit}
                  >
                    <div className="tv-contact-input-box mb-24">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            fullName: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="tv-contact-input-box mb-24">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        spellCheck={false}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            email: event.target.value.toLowerCase(),
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="tv-contact-input-box mb-24">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        value={formData.subject}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            subject: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="it-contact-textarea-box mb-24">
                      <textarea
                        name="message"
                        placeholder="Your Message *"
                        rows={4}
                        value={formData.message}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            message: event.target.value,
                          }))
                        }
                        required
                      ></textarea>
                    </div>
                    {submitState.type ? (
                      <p
                        className={`tv-contact-form-message tv-contact-form-message--${submitState.type}`}
                      >
                        {submitState.message}
                      </p>
                    ) : null}
                    <button type="submit" className="tv-btn-primary" disabled={isSubmitting}>
                      <span className="btn-wrap">
                        <span className="btn-text1">
                          {isSubmitting ? 'Sending...' : 'Submit Message'}
                        </span>
                        <span className="btn-text2">
                          {isSubmitting ? 'Sending...' : 'Submit Message'}
                        </span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tv-google-map wow itfadeUp" data-wow-delay=".2s">
        <div className="container">
          <div className="tv-office-location-wrap">
            <div className="tv-office-location-head">
              <span className="tv-section-subtitle">Our Locations</span>
              <h4 className="tv-section-title">Supporting clients across multiple countries</h4>
              <p>
                Present your offices in a premium, compact format without the oversized single-map
                layout.
              </p>
            </div>

            <div className="row gy-4">
              {officeLocations.map((office) => (
                <div key={`${office.country}-${office.city}`} className="col-xl-4 col-md-6">
                  <div className="tv-office-location-card">
                    <span className="tv-office-location-country">{office.country}</span>
                    <h5>{office.city}</h5>
                    <p>{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
