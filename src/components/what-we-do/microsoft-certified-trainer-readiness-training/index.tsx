import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftCertifiedTrainerReadinessTraining from './MicrosoftCertifiedTrainerReadinessTraining';
import pageConfig from './pageConfig';
export default function MicrosoftCertifiedTrainerReadinessTrainingPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftCertifiedTrainerReadinessTraining />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

