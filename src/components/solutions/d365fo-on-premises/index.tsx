import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import D365FoOnPremises, { pageConfig } from './D365FoOnPremises';

export default function D365FoOnPremisesPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <D365FoOnPremises />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
