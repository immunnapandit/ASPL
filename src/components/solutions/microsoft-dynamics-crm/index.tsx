import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftDynamicsCrm, { pageConfig } from './MicrosoftDynamicsCrm';

export default function MicrosoftDynamicsCrmPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftDynamicsCrm />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

