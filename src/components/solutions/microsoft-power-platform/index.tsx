import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftPowerPlatform, { pageConfig } from './MicrosoftPowerPlatform';

export default function MicrosoftPowerPlatformPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftPowerPlatform />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

