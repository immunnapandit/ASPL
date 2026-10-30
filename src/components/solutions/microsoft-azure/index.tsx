import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftAzure from './MicrosoftAzure';
import pageConfig from './pageConfig';

export default function MicrosoftAzurePage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftAzure />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
