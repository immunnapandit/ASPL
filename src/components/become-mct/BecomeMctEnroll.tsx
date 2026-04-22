import { type FormEvent } from 'react';
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
  ShieldCheck,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/scss/layout/_becomemct.scss';

export default function BecomeMctEnroll() {
  const handleEnrollSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const microsoftAccountId = formData.get('microsoftAccountId');
    const phone = formData.get('phone');
    const preferredDateTime = formData.get('preferredDateTime');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const body = [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Microsoft Account ID: ${microsoftAccountId}`,
      `Phone: ${phone}`,
      `Preferred Date/Time: ${preferredDateTime}`,
      '',
      'Message:',
      `${message}`,
    ].join('\n');

    const mailtoLink = `mailto:info@atisunya.com?subject=${encodeURIComponent(
      String(subject || 'MCT Enrollment Inquiry')
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
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
                      required
                    />
                  </div>
                </div>

                <div className="pm-form-group">
                  <label htmlFor="microsoftAccountId">
                    Microsoft Account ID *
                  </label>
                  <div className="pm-input-shell">
                    <ShieldCheck size={18} />
                    <input
                      id="microsoftAccountId"
                      name="microsoftAccountId"
                      type="text"
                      placeholder="Enter your Microsoft account ID"
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
                    required
                  />
                </div>
              </div>

              <div className="pm-form-footer">
                <p>
                  Your details are used only for enrollment follow-up and
                  schedule coordination.
                </p>
                <button type="submit" className="pm-btn pm-btn-primary">
                  Submit Enrollment Request
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
