import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { careerOpenings } from '../../data/career-openings';

export default function CareersArea() {
  return (
    <div className="tv-careers-area">
      <section className="tv-careers-openings pt-130 pb-130">
        <div className="container">
          <div className="tv-careers-section-heading text-center">
            <span className="tv-section-subtitle">Open Positions</span>
            <h3 className="tv-section-title">Current Job Openings</h3>
          </div>
          <div className="row gy-4">
            {careerOpenings.map((job) => (
              <div key={job.slug} className="col-xl-4 col-lg-6">
                <Link
                  to={`/careers/${job.slug}`}
                  className="tv-careers-job h-100"
                >
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
                  <span className="tv-btn-link">
                    View Details
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-careers-cta pb-130">
        <div className="container">
          <div className="tv-careers-cta__wrap">
            <div className="tv-careers-cta__content">
              <span className="tv-careers-eyebrow">Didn't Find the Right Role?</span>
              <h3>Send Us Your Resume</h3>
              <p>
                Share your profile with us and tell us what kind of role you are
                looking for. If a matching opportunity opens up, our team will
                get in touch.
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
              <Link to="/careers/general-application" className="tv-btn-primary">
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
