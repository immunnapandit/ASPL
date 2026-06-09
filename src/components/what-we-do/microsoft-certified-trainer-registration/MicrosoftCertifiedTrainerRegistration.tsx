import { type ChangeEvent, type FormEvent, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Languages,
  Mic,
  Upload,
  UserRound,
} from 'lucide-react';
import { MCT_TRAINER_REGISTRATION_API_URL } from '../../../config/api';

const opportunities = [
  {
    title: 'Corporate Training Engagements',
    description:
      'Deliver instructor-led training programs for enterprise customers across various industries.',
  },
  {
    title: 'Microsoft Certification Bootcamps',
    description:
      'Help learners prepare for Microsoft certifications through structured training and exam preparation programs.',
  },
  {
    title: 'Community Events & Workshops',
    description:
      'Engage with technology communities through webinars, workshops, and knowledge-sharing sessions.',
  },
  {
    title: 'International Training Assignments',
    description:
      'Explore opportunities to deliver training programs for global clients and multinational organizations.',
  },
];

const expertiseOptions = [
  'Microsoft Azure',
  'Artificial Intelligence',
  'Data & Analytics',
  'Microsoft Security',
  'Dynamics 365',
  'Microsoft Power Platform',
  'Microsoft 365',
  'Other Microsoft Technologies',
];

const viewport = {
  once: true,
  amount: 0.18,
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function MicrosoftCertifiedTrainerRegistration() {
  const [resumeFileName, setResumeFileName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResumeFileName(event.currentTarget.files?.[0]?.name || '');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatusMessage('');
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(MCT_TRAINER_REGISTRATION_API_URL, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || 'Unable to submit your registration right now.'
        );
      }

      setIsSuccess(true);
      setStatusMessage(
        result?.message ||
          'Registration submitted successfully.'
      );
      form.reset();
      setResumeFileName('');
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your registration right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mct-registration-page">
      <motion.section
        className="mct-registration-hero"
        initial="hidden"
        animate="show"
        variants={fadeUpVariants}
      >
        <div className="container">
          <div className="mct-registration-hero-grid">
            <div className="mct-registration-hero-copy">
              <span className="mct-registration-kicker">
                Microsoft Certified Trainer Registration
              </span>
              <h1>Build global learning impact with AtiSunya</h1>
              <p>
                Active Microsoft Certified Trainers can register their profile
                for future corporate training, certification bootcamps,
                workshops, and international Microsoft technology programs.
              </p>
              <div className="mct-registration-hero-actions">
                <a href="#mct-registration-form" className="mct-registration-button">
                  Start Registration
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <aside className="mct-registration-hero-card">
              <span>Profile Review</span>
              <h2>Who this is for</h2>
              <ul>
                <li>
                  <CheckCircle2 size={18} />
                  Existing or newly renewed MCTs.
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Trainers with Microsoft delivery experience.
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Professionals available for virtual, classroom, or hybrid
                  programs.
                </li>
              </ul>
            </aside>
          </div>

          <motion.div
            className="mct-registration-opportunity-grid"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerVariants}
          >
            {opportunities.map((item) => (
              <motion.article key={item.title} variants={fadeUpVariants}>
                <BriefcaseBusiness size={20} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="mct-registration-application"
        id="mct-registration-form"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerVariants}
      >
        <div className="container">
          <motion.div
            className="mct-registration-application-shell"
            variants={fadeUpVariants}
          >
            <div className="mct-registration-application-head">
              <div>
                <span>Trainer Profile Application</span>
                <h2>Submit your MCT profile</h2>
              </div>
              <p>
                Complete the required details below. Professional summary is
                optional.
              </p>
            </div>

            <motion.form
              className="mct-registration-form"
              onSubmit={handleSubmit}
              variants={fadeUpVariants}
            >
              <motion.fieldset variants={fadeUpVariants}>
                <legend>
                  <UserRound size={19} />
                  Personal Information
                </legend>
                <div className="mct-registration-fields">
                  <label>
                    Full Name *
                    <input name="fullName" type="text" required />
                  </label>
                  <label>
                    Email Address *
                    <input name="email" type="email" required />
                  </label>
                  <label>
                    Phone Number *
                    <input name="phone" type="tel" required />
                  </label>
                  <label>
                    Country *
                    <input name="country" type="text" required />
                  </label>
                  <label className="mct-registration-field-wide">
                    LinkedIn Profile
                    <input
                      name="linkedInProfile"
                      type="url"
                      placeholder="https://www.linkedin.com/in/your-profile"
                    />
                  </label>
                </div>
              </motion.fieldset>

              <motion.fieldset variants={fadeUpVariants}>
                <legend>
                  <BadgeCheck size={19} />
                  MCT Information
                </legend>
                <div className="mct-registration-fields">
                  <label>
                    Microsoft Certified Trainer ID *
                    <input name="mctId" type="text" required />
                  </label>
                  <label>
                    MCT Status *
                    <select name="mctStatus" required defaultValue="">
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Renewed">Renewed</option>
                      <option value="Pending Renewal">Pending Renewal</option>
                    </select>
                  </label>
                  <label>
                    Years of Training Experience *
                    <input name="yearsOfExperience" type="number" min="0" required />
                  </label>
                </div>
              </motion.fieldset>

              <motion.fieldset
                className="mct-registration-expertise-fieldset"
                variants={fadeUpVariants}
              >
                <legend>
                  <BookOpenCheck size={19} />
                  Areas of Expertise
                </legend>
                <p className="mct-registration-field-help">
                  Select the Microsoft solution areas where you are qualified
                  and comfortable delivering training.
                </p>
                <div className="mct-registration-checkbox-grid">
                  {expertiseOptions.map((item) => (
                    <label key={item}>
                      <input name="expertise" type="checkbox" value={item} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </motion.fieldset>

              <motion.fieldset variants={fadeUpVariants}>
                <legend>
                  <Mic size={19} />
                  Additional Information
                </legend>
                <div className="mct-registration-fields">
                  <label>
                    Preferred Training Mode *
                    <select name="preferredTrainingMode" required defaultValue="">
                      <option value="" disabled>
                        Select mode
                      </option>
                      <option value="Virtual">Virtual</option>
                      <option value="Classroom">Classroom</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </label>
                  <label>
                    Languages Spoken *
                    <span className="mct-registration-input-icon">
                      <Languages size={18} />
                      <input
                        name="languagesSpoken"
                        type="text"
                        placeholder="English, Hindi, German"
                        required
                      />
                    </span>
                  </label>
                  <label>
                    Additional Certifications
                    <input
                      name="additionalCertifications"
                      type="text"
                      placeholder="AZ-104, AI-102, PL-300"
                    />
                  </label>
                  <label className="mct-registration-field-wide">
                    Resume Upload *
                    <span className="mct-registration-file">
                      <Upload size={18} />
                      {resumeFileName || 'Choose resume file'}
                    </span>
                    <input
                      className="mct-registration-file-input"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleResumeChange}
                    />
                  </label>
                  <label className="mct-registration-field-wide">
                    Professional Summary
                    <textarea
                      name="professionalSummary"
                      rows={5}
                      placeholder="Briefly share your training background, delivery strengths, or preferred Microsoft topics."
                    />
                  </label>
                </div>
              </motion.fieldset>

              {statusMessage ? (
                <p
                  className={`mct-registration-status ${
                    isSuccess ? 'is-success' : 'is-error'
                  }`}
                  role="status"
                >
                  {statusMessage}
                </p>
              ) : null}

              <div className="mct-registration-form-footer">
                <p>Your registration details are used for trainer-network review and opportunity matching.</p>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
