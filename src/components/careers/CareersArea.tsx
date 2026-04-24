import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Send,
  Upload,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CAREER_API_URL } from '../../config/api';
import {
  fallbackCareerOpenings,
  generalApplication,
  type JobOpening,
} from '../../data/career-openings';
import { fetchCareerOpenings } from '../../lib/careers';

type DisplayJob = JobOpening | typeof generalApplication;

export default function CareersArea() {
  const [jobs, setJobs] = useState<JobOpening[]>(fallbackCareerOpenings);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<DisplayJob>(generalApplication);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [resumeFileName, setResumeFileName] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCareerOpenings()
      .then((openings) => {
        if (isMounted) {
          setJobs(openings);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openForm = (job: DisplayJob) => {
    setSelectedJob(job);
    setIsFormOpen(true);
    setStatusMessage('');
    setResumeFileName('');
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedJob(generalApplication);
    setStatusMessage('');
    setResumeFileName('');
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setResumeFileName(file?.name || '');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('roleTitle', selectedJob.title);
    formData.set('roleSlug', selectedJob.slug);

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch(CAREER_API_URL, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to submit your application right now.');
      }

      setStatusType('success');
      setStatusMessage(
        result?.message ||
          'Thank you for applying. Our HR team will review your details and contact you soon.'
      );
      form.reset();
      setResumeFileName('');
    } catch (error) {
      setStatusType('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your application right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tv-careers-area">
      <section className="tv-careers-openings pt-130 pb-130">
        <div className="container">
          <div className="tv-careers-section-heading text-center">
            <span className="tv-section-subtitle">Open Positions</span>
            <h3 className="tv-section-title">Current Job Openings</h3>
          </div>

          {isLoading ? (
            <div className="tv-careers-loading" role="status">
              <LoaderCircle size={22} className="tv-spin" />
              Loading live openings...
            </div>
          ) : null}

          <div className="row gy-4">
            {jobs.map((job) => (
              <div key={job.id} className="col-xl-4 col-lg-6">
                <Link to={`/careers/${job.slug}`} className="tv-careers-job h-100">
                  <div className="tv-careers-job__meta">
                    <span>
                      <BriefcaseBusiness size={16} />
                      {job.type}
                    </span>
                    <span>
                      <MapPin size={16} />
                      {job.location}
                    </span>
                  </div>
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      openForm(job);
                    }}
                    className="tv-btn-link"
                    type="button"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {!jobs.length ? (
            <div className="tv-careers-empty">
              <h4>No open roles right now</h4>
              <p>
                New positions can be published from the careers CMS anytime. Until
                then, candidates can still send a general application.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="tv-careers-cta pb-130">
        <div className="container">
          <div className="tv-careers-cta__wrap">
            <div className="tv-careers-cta__content">
              <span className="tv-careers-eyebrow">Didn&apos;t Find the Right Role?</span>
              <h3>Send Us Your Resume</h3>
              <p>
                Share your profile with us and tell us what kind of role you are
                looking for. If a matching opportunity opens up, our team will get
                in touch.
              </p>
              <div className="tv-careers-cta__points">
                <span>
                  <CheckCircle2 size={17} />
                  Future openings
                </span>
                <span>
                  <CheckCircle2 size={17} />
                  HR review
                </span>
                <span>
                  <CheckCircle2 size={17} />
                  Resume on record
                </span>
              </div>
            </div>
            <div className="tv-careers-cta__action">
              <span className="tv-careers-cta__icon">
                <Send size={26} />
              </span>
              <h4>General Application</h4>
              <p>Upload your resume and mention your preferred position.</p>
              <Link
                to={`/careers/${generalApplication.slug}`}
                className="tv-btn-primary"
              >
                <span className="btn-wrap">
                  <span className="btn-text1">Send Resume</span>
                  <span className="btn-text2">Send Resume</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isFormOpen ? (
        <div className="tv-modal-overlay" onClick={closeForm}>
          <div className="tv-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="tv-modal-header">
              <h4>Apply for {selectedJob.title}</h4>
              <button onClick={closeForm} className="tv-modal-close" type="button">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="tv-application-form">
              {statusMessage ? (
                <p className={`tv-form-status is-${statusType}`}>{statusMessage}</p>
              ) : null}
              <div className="tv-form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" required />
              </div>
              <div className="tv-form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="tv-form-group">
                <label htmlFor="phone">Phone *</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              {selectedJob.slug === generalApplication.slug ? (
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
                  onChange={handleResumeChange}
                  required
                />
              </div>
              <div className="tv-form-group">
                <label htmlFor="message">Cover Letter / Message</label>
                <textarea id="message" name="message" rows={4}></textarea>
              </div>
              <button type="submit" className="tv-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
