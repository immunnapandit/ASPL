import { type ChangeEvent, type FormEvent, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MessageSquareText,
  Phone,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MCT_ENROLLMENT_API_URL } from '../../config/api';
import '../../styles/scss/layout/_becomemct.scss';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EnrollFormState = {
  fullName: string;
  email: string;
  phone: string;
  preferredDateTime: string;
  subject: string;
  message: string;
};

const initialFormState: EnrollFormState = {
  fullName: '',
  email: '',
  phone: '',
  preferredDateTime: '',
  subject: '',
  message: '',
};

export default function BecomeMctEnroll() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEnrollChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleEnrollSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(MCT_ENROLLMENT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formState.fullName.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim(),
          preferredDateTime: formState.preferredDateTime,
          subject: formState.subject.trim(),
          message: formState.message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || 'Unable to submit your enrollment request right now.'
        );
      }

      setIsSuccess(true);
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-18202522456/uDxUCOXSgsQcENjm0edD',
        transaction_id: '',
      });
      setStatusMessage(
        result?.message ||
          'Enrollment request submitted successfully. Our team will contact you soon.'
      );
      setFormState(initialFormState);
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your enrollment request right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pm-enroll-page">
      <div className="container">
        <div className="pm-enroll-shell">
          <div className="pm-enroll-aside">
            <Link to="/become-mct" className="pm-back-link">
              <ArrowLeft size={18} />
              Back to Become MCT
            </Link>

            <span className="pm-kicker">Enroll Now</span>
            <h1>MCT Enrollment Form</h1>
            <p>
              Share your details and our team will coordinate the next available
              global batch with you.
            </p>

            <div className="pm-enroll-benefits">
              <span>
                <Clock3 size={18} />
                Weekly batches
              </span>
              <span>
                <Globe2 size={18} />
                Global delivery
              </span>
              <span>
                <CheckCircle2 size={18} />
                MCT-ready path
              </span>
            </div>
          </div>

          <div className="pm-enroll-card">
            <form className="pm-enroll-form" onSubmit={handleEnrollSubmit}>
              <div className="pm-form-section-title">
                <h5>Candidate Details</h5>
                <p>Fields marked with * are required.</p>
              </div>

              <div className="pm-form-grid">
                <div className="pm-form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <div className="pm-input-shell">
                    <User size={18} />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formState.fullName}
                      onChange={handleEnrollChange}
                      required
                    />
                  </div>
                </div>

                <div className="pm-form-group">
                  <label htmlFor="email">Email *</label>
                  <div className="pm-input-shell">
                    <Mail size={18} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formState.email}
                      onChange={handleEnrollChange}
                      required
                    />
                  </div>
                </div>

                <div className="pm-form-group">
                  <label htmlFor="phone">Phone *</label>
                  <div className="pm-input-shell">
                    <Phone size={18} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formState.phone}
                      onChange={handleEnrollChange}
                      required
                    />
                  </div>
                </div>

                <div className="pm-form-group">
                  <label htmlFor="preferredDateTime">Date / Time *</label>
                  <div className="pm-input-shell">
                    <CalendarClock size={18} />
                    <input
                      id="preferredDateTime"
                      name="preferredDateTime"
                      type="datetime-local"
                      value={formState.preferredDateTime}
                      onChange={handleEnrollChange}
                      required
                    />
                  </div>
                </div>

                <div className="pm-form-group">
                  <label htmlFor="subject">Subject *</label>
                  <div className="pm-input-shell">
                    <MessageSquareText size={18} />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Enter the subject"
                      value={formState.subject}
                      onChange={handleEnrollChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pm-form-section-title">
                <h5>Message</h5>
                <p>Mention your preferred batch date or training goal.</p>
              </div>

              <div className="pm-form-group">
                <label htmlFor="message">Your Message *</label>
                <div className="pm-input-shell pm-input-shell-textarea">
                  <MessageSquareText size={18} />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your goals, preferred batch, or any questions you have"
                    value={formState.message}
                    onChange={handleEnrollChange}
                    required
                  />
                </div>
              </div>

              {statusMessage ? (
                <p
                  className={`pm-form-message ${
                    isSuccess ? 'is-success' : 'is-error'
                  }`}
                  role="status"
                >
                  {statusMessage}
                </p>
              ) : null}

              <div className="pm-form-footer">
                <p>
                  Your details are used only for enrollment follow-up and
                  schedule coordination.
                </p>
                <button
                  type="submit"
                  className="pm-btn pm-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enrollment Request'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
