import Breadcrumb from '../../../common/Breadcrumb';
import { CheckCircle2, GraduationCap } from 'lucide-react';

const trainers = [
  {
    name: 'Dr Umesh Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/umesh%20pandit.png',
    expertise: 'Microsoft Cloud, Dynamics 365, and enterprise training',
    bio: 'Guides professionals and corporate teams with structured Microsoft technology learning, certification readiness, and practical classroom delivery.'
  },
  {
    name: 'Atul Verma',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Atul%20Verma.jpg',
    expertise: 'Business applications, implementation, and user enablement',
    bio: 'Delivers outcome-focused sessions that connect Microsoft solutions with real business processes and hands-on learner practice.'
  },
  {
    name: 'Saroj Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Saroj%20Pandit.jpg',
    expertise: 'Functional consulting, process training, and learner mentoring',
    bio: 'Supports learners with clear explanations, scenario-based workshops, and professional guidance for Microsoft certification pathways.'
  },
  {
    name: 'Sangeeta Verma',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Sangeeta.jpg',
    expertise: 'Power Platform, Dynamics 365, and practical enablement',
    bio: 'Helps teams build confidence through role-based training, guided exercises, and focused Microsoft technology preparation.'
  },
  {
    name: 'Amit Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Amit%20Pandit.jpg',
    expertise: 'Microsoft 365, governance, and enterprise collaboration',
    bio: 'Designs professional learning paths that help learners understand Microsoft platforms, adoption practices, and certification expectations.'
  },
  {
    name: 'Anshika Gupta',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Anshika%20Gupta.png',
    expertise: 'Power BI, analytics, and data-driven reporting',
    bio: 'Delivers analytics-focused training with emphasis on data modelling, visualization quality, and confident business storytelling.'
  }
];

export default function MicrosoftCertifiedTrainer() {
  return (
    <main className="mct-trainer-list-page">
      <Breadcrumb title="Microsoft Certified Trainer" subtitle="Meet our certified trainers" />

      <section className="mct-trainer-directory">
        <div className="container">
          <div className="mct-trainer-section-head">
            <span>Certified Trainer Profiles</span>
            <h2>Our Microsoft Certified Trainer team</h2>
          </div>

          <div className="mct-trainer-grid">
            {trainers.map((trainer, index) => (
              <article key={trainer.name} className="mct-trainer-card">
                <div className="mct-trainer-card__topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <CheckCircle2 size={18} aria-hidden="true" />
                </div>

                <div className="mct-trainer-card__header">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="mct-trainer-card__photo"
                  />

                  <div>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.title}</p>
                  </div>
                </div>

                <div className="mct-trainer-card__expertise">
                  <GraduationCap size={18} aria-hidden="true" />
                  <span>{trainer.expertise}</span>
                </div>

                <p className="mct-trainer-card__bio">{trainer.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
