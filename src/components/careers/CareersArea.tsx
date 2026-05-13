import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  generalApplication,
  type JobOpening,
} from '../../data/career-openings';
import { fetchCareerOpenings } from '../../lib/careers';

function formatPostedLabel(value?: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const diffMs = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < 0) {
    return `Posted ${date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}`;
  }

  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `Posted ${minutes} min ago`;
  }

  if (diffMs < day) {
    const hours = Math.max(1, Math.floor(diffMs / hour));
    return `Posted ${hours} hr ago`;
  }

  if (diffMs < 30 * day) {
    const days = Math.max(1, Math.floor(diffMs / day));
    return `Posted ${days} day${days === 1 ? '' : 's'} ago`;
  }

  return `Posted ${date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}`;
}

function getJobSummary(job: JobOpening) {
  const summary = (job.fullDescription || job.description || '').trim();

  if (summary.length <= 160) {
    return summary;
  }

  return `${summary.slice(0, 157).trim()}...`;
}

function CareersOpeningLoader() {
  return (
    <div className="tv-careers-loading-wrap" role="status" aria-live="polite">
      <div className="tv-careers-loading tv-careers-loading--center">
        <LoaderCircle size={24} className="tv-spin" aria-hidden="true" />
        <span className="visually-hidden">Loading career openings</span>
      </div>
      <div className="row gy-4" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <div key={item} className="col-xl-4 col-lg-6">
            <div className="tv-careers-job tv-careers-job--skeleton h-100">
              <span className="tv-careers-skeleton tv-careers-skeleton--meta" />
              <span className="tv-careers-skeleton tv-careers-skeleton--title" />
              <span className="tv-careers-skeleton tv-careers-skeleton--line" />
              <span className="tv-careers-skeleton tv-careers-skeleton--line is-short" />
              <span className="tv-careers-skeleton tv-careers-skeleton--button" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CareersArea() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="tv-careers-area">
      <section className="tv-careers-openings pt-130 pb-130">
        <div className="container">
          <div className="tv-careers-section-heading text-center">
            <span className="tv-section-subtitle">Open Positions</span>
            <h3 className="tv-section-title">Current Job Openings</h3>
          </div>

          {isLoading ? <CareersOpeningLoader /> : null}

          {!isLoading && jobs.length ? (
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
                      <span>
                        <CalendarDays size={16} />
                        {formatPostedLabel(job.postedAt)}
                      </span>
                    </div>
                    <h4>{job.title}</h4>
                    <p>{getJobSummary(job)}</p>
                    <span className="tv-btn-link">
                      Apply Now
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && !jobs.length ? (
            <div className="tv-careers-empty">
              <h4>No open roles right now</h4>
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

    </div>
  );
}
