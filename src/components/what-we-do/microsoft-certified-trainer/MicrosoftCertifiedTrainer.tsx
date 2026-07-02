import Breadcrumb from '../../../common/Breadcrumb';
import { CheckCircle2, GraduationCap } from 'lucide-react';

const trainers = [
  {
    name: 'Dr Umesh Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/umesh%20pandit.png',
    expertise: 'Microsoft Cloud and Dynamics 365 architecture with enterprise training delivery',
    bio: 'Guides professionals and corporate teams with structured Microsoft technology learning, certification readiness, and practical classroom delivery.',
    focusAreas: ['Cloud readiness', 'Dynamics 365 architecture', 'Enterprise workshops']
  },
  {
    name: 'Atul Verma',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Atul%20Verma.jpg',
    expertise: 'Dynamics 365 Business Central On-Premises setup, administration, finance, inventory, and upgrade readiness',
    bio: 'Delivers Business Central On-Premises training focused on setup, administration, upgrades, and practical ERP process enablement for SMB and partner teams.',
    focusAreas: ['On-premises setup', 'Administration readiness', 'ERP process mapping']
  },
  {
    name: 'Saroj Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Saroj%20Pandit.jpg',
    expertise: 'Microsoft functional consulting, business process workshops, user adoption, and learner mentoring',
    bio: 'Supports learners with clear functional explanations, scenario-based workshops, and professional guidance for Microsoft certification pathways.',
    focusAreas: ['Functional discovery', 'User adoption', 'Scenario workshops']
  },
  {
    name: 'Sangeeta Verma',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Sangeeta.jpg',
    expertise: 'Dynamics 365 CRM and Finance & Operations workflows, customer engagement, and ERP process alignment',
    bio: 'Trains teams on customer engagement and Dynamics 365 Finance and Operations concepts, connecting CRM workflows with finance and operations process understanding.',
    focusAreas: ['CRM workflows', 'Finance and operations', 'Role-based enablement']
  },
  {
    name: 'Amit Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Amit%20Pandit.jpg',
    expertise: 'Dynamics 365 Supply Chain Management functional consulting for procurement, inventory, warehouse, planning, and production',
    bio: 'Guides learners through supply chain management processes, functional consulting practices, and real-world Dynamics 365 SCM business scenarios.',
    focusAreas: ['Procurement and sourcing', 'Inventory and warehouse', 'Planning and production']
  },
  {
    name: 'Anshika Gupta',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Anshika%20Gupta.png',
    expertise: 'Dynamics 365 Finance & Operations development with X++, extensions, data entities, integrations, and deployable packages',
    bio: 'Delivers developer-focused Dynamics 365 Finance and Operations training around X++, extensions, data entities, debugging, and deployment-ready customization practices.',
    focusAreas: ['X++ development', 'Extensions and models', 'Data entities and integration']
  }
];

export default function MicrosoftCertifiedTrainer() {
  return (
    <main className="mct-trainer-list-page">
      <Breadcrumb title="Microsoft Certified Trainers" subtitle="Meet our certified trainers" />

      <section className="mct-trainer-directory">
        <div className="container">
          <div className="mct-trainer-section-head">
            <span>Certified Trainers Profiles</span>
            <h2>Our Microsoft Certified Trainers team</h2>
            <p>Experienced Microsoft technology trainers supporting practical learning, implementation readiness, and role-based enablement.</p>
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

                <ul className="mct-trainer-card__focus" aria-label={`${trainer.name} focus areas`}>
                  {trainer.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>

                <p className="mct-trainer-card__bio">{trainer.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



