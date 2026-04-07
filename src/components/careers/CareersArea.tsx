import { ArrowRight, BriefcaseBusiness, MapPin, X } from 'lucide-react';
import { useState } from 'react';

const openings = [
  {
    title: 'Dynamics 365 Functional Consultant',
    type: 'Full Time',
    location: 'Noida / Hybrid',
    description:
      'Lead requirement discovery, process mapping, solution design, and stakeholder coordination for enterprise implementations.',
    fullDescription:
      'We are looking for an experienced Dynamics 365 Functional Consultant to join our team. You will work with enterprise clients to understand their business processes, design comprehensive solutions, and oversee successful implementations.',
    responsibilities: [
      'Conduct requirement gathering and process mapping with stakeholders',
      'Design scalable and efficient Dynamics 365 solutions',
      'Lead solution design workshops and documentation',
      'Coordinate with technical teams for implementation',
      'Provide post-implementation support and training',
      'Stay updated with latest D365 features and best practices',
    ],
    requirements: [
      '5+ years of experience with Dynamics 365 implementations',
      'Strong knowledge of ERP processes and best practices',
      'Excellent communication and stakeholder management skills',
      'Experience with project management methodologies',
      'Microsoft Dynamics 365 certification preferred',
      'Bachelor\'s degree in IT, Business, or related field',
    ],
  },
  {
    title: 'Power Platform Developer',
    type: 'Full Time',
    location: 'Remote / Hybrid',
    description:
      'Design scalable apps, automations, and integrations using Power Apps, Power Automate, and related Microsoft services.',
    fullDescription:
      'Join our development team to create innovative solutions using Microsoft Power Platform. You\'ll design and develop custom applications, workflows, and integrations that solve real business problems.',
    responsibilities: [
      'Develop custom Power Apps based on business requirements',
      'Create and optimize Power Automate workflows',
      'Design and implement integrations with external systems',
      'Write clean, maintainable code following best practices',
      'Conduct code reviews and provide technical mentorship',
      'Debug and resolve technical issues and performance bottlenecks',
      'Document solutions and create technical specifications',
    ],
    requirements: [
      '3+ years of development experience with Power Platform',
      'Strong proficiency in Power Apps and Power Automate',
      'Experience with Power BI and data modeling',
      'Knowledge of C# or JavaScript',
      'Understanding of API integrations and REST services',
      'Excellent problem-solving and analytical skills',
      'Industry certifications in Power Platform are a plus',
    ],
  },
  {
    title: 'ERP Support Specialist',
    type: 'Full Time',
    location: 'Noida',
    description:
      'Support live business systems, troubleshoot incidents, and help clients maintain smooth day-to-day operations.',
    fullDescription:
      'We are seeking a dedicated ERP Support Specialist to provide Tier-2 technical support for our ERP implementations. You will work with clients to resolve issues, optimize system performance, and ensure continuous business operations.',
    responsibilities: [
      'Provide technical support to end-users and clients',
      'Troubleshoot and resolve ERP system incidents',
      'Perform system analysis and root cause analysis',
      'Deploy patches, fixes, and system updates',
      'Maintain documentation of issues and resolutions',
      'Collaborate with development teams for issue resolution',
      'Monitor system performance and identify optimization opportunities',
    ],
    requirements: [
      '2+ years of ERP support experience (Dynamics 365 or similar)',
      'Strong troubleshooting and technical analysis skills',
      'Knowledge of database management and SQL basics',
      'Excellent customer service and communication skills',
      'Ability to work in shifts if required',
      'Certification in relevant ERP systems is a plus',
      'Bachelor\'s degree in IT or related field',
    ],
  },
  // Add more job openings here as needed
];

export default function CareersArea() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState<typeof openings[0] | null>(null);

  const openJobDetails = (job: typeof openings[0]) => {
    setSelectedJobDetails(job);
    setShowJobDetails(true);
  };

  const closeJobDetails = () => {
    setShowJobDetails(false);
    setSelectedJobDetails(null);
  };

  const openForm = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowJobDetails(false);
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
                <article 
                  className="tv-careers-job h-100 cursor-pointer"
                  onClick={() => openJobDetails(job)}
                  style={{ cursor: 'pointer' }}
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openForm(job.title);
                    }} 
                    className="tv-btn-link"
                  >
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

      {showJobDetails && selectedJobDetails && (
        <div className="tv-modal-overlay" onClick={closeJobDetails}>
          <div className="tv-modal-content tv-job-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tv-modal-header">
              <div>
                <h4>{selectedJobDetails.title}</h4>
                <div className="tv-job-details-meta" style={{ display: 'flex', gap: '20px', marginTop: '8px', fontSize: '14px' }}>
                  <span>
                    <BriefcaseBusiness size={14} style={{ marginRight: '4px' }} />
                    {selectedJobDetails.type}
                  </span>
                  <span>
                    <MapPin size={14} style={{ marginRight: '4px' }} />
                    {selectedJobDetails.location}
                  </span>
                </div>
              </div>
              <button onClick={closeJobDetails} className="tv-modal-close">
                <X size={24} />
              </button>
            </div>
            <div className="tv-job-details-content" style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '15px' }}>
              <div className="tv-job-section" style={{ marginBottom: '30px' }}>
                <h5 style={{ marginBottom: '10px', fontWeight: '600' }}>About the Role</h5>
                <p>{selectedJobDetails.fullDescription}</p>
              </div>

              <div className="tv-job-section" style={{ marginBottom: '30px' }}>
                <h5 style={{ marginBottom: '15px', fontWeight: '600' }}>Key Responsibilities</h5>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                  {selectedJobDetails.responsibilities.map((resp, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tv-job-section" style={{ marginBottom: '30px' }}>
                <h5 style={{ marginBottom: '15px', fontWeight: '600' }}>Required Qualifications</h5>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                  {selectedJobDetails.requirements.map((req, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => {
                  openForm(selectedJobDetails.title);
                }}
                className="tv-btn-primary"
                style={{ marginTop: '20px', display: 'inline-block' }}
              >
                <span className="btn-wrap">
                  <span className="btn-text1">Apply Now</span>
                  <span className="btn-text2">Apply Now</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

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
