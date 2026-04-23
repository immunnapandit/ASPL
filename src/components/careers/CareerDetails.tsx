import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BriefcaseBusiness, MapPin, Upload } from 'lucide-react';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import {
  getCareerOpeningBySlug,
} from '../../data/career-openings';

export default function CareerDetails() {
  const { slug } = useParams();
  const job = getCareerOpeningBySlug(slug);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');

  const careerApiUrl =
    import.meta.env.VITE_CAREER_API_URL || 'http://localhost:5001/api/careers';
  const isGeneralApplication = job?.slug === 'general-application';

  const handleApplicationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!job) {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('roleTitle', job.title);
    formData.set('roleSlug', job.slug);

    setStatusMessage('');
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(careerApiUrl, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to submit your application right now.');
      }

      setIsSuccess(true);
      setStatusMessage(
        result?.message ||
          'Thank you for applying. Our HR team will review your details and contact you soon.'
      );
      form.reset();
      setResumeFileName('');
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your application right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <Wrapper>
        <HeaderOne />
        <main>
          <Breadcrumb title="Career Not Found" subtitle="Careers" />
          <section className="tv-career-detail-area pt-130 pb-130">
            <div className="container">
              <div className="tv-career-not-found">
                <h3>This role is not available anymore.</h3>
                <p>
                  Please go back to the careers page and explore the latest open
                  positions.
                </p>
                <Link to="/careers" className="tv-btn-primary">
                  <span className="btn-wrap">
                    <span className="btn-text1">Back to Careers</span>
                    <span className="btn-text2">Back to Careers</span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <FooterOne />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={job.title} subtitle="Careers" />
        <section className="tv-career-detail-area pt-130 pb-130">
          <div className="container">
            <Link to="/careers" className="tv-career-back-link">
              <ArrowLeft size={18} />
              Back to openings
            </Link>

            <div
              className={`tv-career-detail-layout ${
                isGeneralApplication ? 'is-general-application' : ''
              }`}
            >
              <article className="tv-career-detail-main">
                <div className="tv-job-details-meta">
                  <span>
                    <BriefcaseBusiness size={14} />
                    {job.type}
                  </span>
                  <span>
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </div>

                <h2>{job.title}</h2>
                <p className="tv-career-detail-lead">{job.fullDescription}</p>

                <div className="tv-job-section">
                  <h5>Key Responsibilities</h5>
                  <ul>
                    {job.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="tv-job-section">
                  <h5>Required Qualifications</h5>
                  <ul>
                    {job.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>

              <aside className="tv-job-apply-panel tv-career-detail-form">
                <h5>
                  {isGeneralApplication ? 'Send your resume' : 'Apply for this role'}
                </h5>
                <form
                  onSubmit={handleApplicationSubmit}
                  className="tv-application-form"
                >
                  <div className="tv-form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input type="text" id="fullName" name="fullName" required />
                  </div>
                  <div className="tv-form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      required
                    />
                  </div>
                  <div className="tv-form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input type="tel" id="phone" name="phone" required />
                  </div>
                  {isGeneralApplication ? (
                    <div className="tv-form-group">
                      <label htmlFor="appliedPosition">Apply For *</label>
                      <input
                        type="text"
                        id="appliedPosition"
                        name="appliedPosition"
                        placeholder="Which position are you interested in?"
                        required
                      />
                    </div>
                  ) : null}
                  <div className="tv-form-group">
                    <label htmlFor="resume">Resume/CV *</label>
                    <label htmlFor="resume" className="tv-file-upload">
                      <span className="tv-file-upload__icon">
                        <Upload size={18} />
                      </span>
                      <span className="tv-file-upload__text">
                        {resumeFileName || 'Choose resume file'}
                      </span>
                    </label>
                    <input
                      className="tv-file-upload__input"
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={(event) =>
                        setResumeFileName(event.currentTarget.files?.[0]?.name || '')
                      }
                    />
                  </div>
                  <div className="tv-form-group">
                    <label htmlFor="message">Cover Letter / Message</label>
                    <textarea id="message" name="message" rows={4}></textarea>
                  </div>

                  {statusMessage ? (
                    <p
                      className={`tv-form-status ${
                        isSuccess ? 'is-success' : 'is-error'
                      }`}
                      role="status"
                    >
                      {statusMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="tv-btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
