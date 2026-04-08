import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftDynamicsNav from './MicrosoftDynamicsNav';
import { pageConfig } from './MicrosoftDynamicsNav.config';

export default function MicrosoftDynamicsNavPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftDynamicsNav />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

