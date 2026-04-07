import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Certified Trainer Readiness Training',
  subtitle: 'Structured preparation for future Microsoft Certified Trainers',
  category: 'service',
  focus: 'trainer readiness, delivery confidence, and Microsoft learning alignment',
  summary:
    'Prepare aspiring trainers with readiness support across delivery skills, Microsoft-aligned learning structure, and practical facilitation confidence.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Trainer readiness and planning',
    'Content delivery skill development',
    'Microsoft learning pathway alignment',
    'Confidence-building practice sessions'
  ]
};

export { pageConfig };

export default function MicrosoftCertifiedTrainerReadinessTraining() {
  return <GenericServiceArea page={pageConfig} />;
}

