import { ArrowRight, BriefcaseBusiness, MapPin, X } from 'lucide-react';
import { useState } from 'react';

const openings = [
  {
    title: 'Dynamics 365 Functional Consultant',
    type: 'Full Time',
    location: 'Noida / Hybrid',
    description:
      'Lead requirement discovery, process mapping, solution design, and stakeholder coordination for enterprise implementations.',
  },
  {
    title: 'Power Platform Developer',
    type: 'Full Time',
    location: 'Remote / Hybrid',
    description:
      'Design scalable apps, automations, and integrations using Power Apps, Power Automate, and related Microsoft services.',
  },
  {
    title: 'ERP Support Specialist',
    type: 'Full Time',
    location: 'Noida',
    description:
      'Support live business systems, troubleshoot incidents, and help clients maintain smooth day-to-day operations.',
  },
  // Add more job openings here as needed
];

export default function CareersArea() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

  const openForm = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedJob('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const resume = formData.get('resume');

    const subject = `Application for ${selectedJob}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nResume: ${resume ? 'Attached' : 'Not attached'}`;

    const mailtoLink = `mailto:careers@aspl.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    closeForm();
  };

  return (
    <div className="tv-careers-area">
      <section className="tv-careers-openings pt-130 pb-130">
        <div className="container">
          <div className="tv-careers-section-heading text-center">
            <span className="tv-section-subtitle">Open Positions</span>
            <h3 className="tv-section-title">
              Current Job Openings
            </h3>
          </div>
          <div className="row gy-4">
            {openings.map((job) => (
              <div key={job.title} className="col-xl-4 col-lg-6">
                <article className="tv-careers-job h-100">
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
                  <button onClick={() => openForm(job.title)} className="tv-btn-link">
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-careers-cta pb-130">
        <div className="container">
          <div className="tv-careers-cta__wrap">
            <div>
              <span className="tv-careers-eyebrow">Didn't Find the Right Role?</span>
              <h3>Send Us Your Resume</h3>
              <p>
                If you don't see a position that matches your skills, feel free to send us your resume. We might have upcoming opportunities that suit you.
              </p>
            </div>
            <button onClick={() => openForm('General Application')} className="tv-btn-primary">
              <span className="btn-wrap">
                <span className="btn-text1">Send Resume</span>
                <span className="btn-text2">Send Resume</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {isFormOpen && (
        <div className="tv-modal-overlay" onClick={closeForm}>
          <div className="tv-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="tv-modal-header">
              <h4>Apply for {selectedJob}</h4>
              <button onClick={closeForm} className="tv-modal-close">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="tv-application-form">
              <div className="tv-form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="tv-form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="tv-form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="tv-form-group">
                <label htmlFor="resume">Resume/CV</label>
                <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" />
              </div>
              <div className="tv-form-group">
                <label htmlFor="message">Cover Letter / Message</label>
                <textarea id="message" name="message" rows={4}></textarea>
              </div>
              <button type="submit" className="tv-btn-primary">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
