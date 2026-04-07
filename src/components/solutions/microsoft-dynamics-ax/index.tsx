import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftDynamicsAx, { pageConfig } from './MicrosoftDynamicsAx';

export default function MicrosoftDynamicsAxPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftDynamicsAx />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

