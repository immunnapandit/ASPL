import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftCertifiedTrainerRegistration from './MicrosoftCertifiedTrainerRegistration';

export default function MicrosoftCertifiedTrainerRegistrationPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb
          title="Microsoft Certified Trainer Registration"
          subtitle="Join the AtiSunya Trainer Network"
        />
        <MicrosoftCertifiedTrainerRegistration />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
