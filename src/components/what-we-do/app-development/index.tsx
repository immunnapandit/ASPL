import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import AppDevelopment, { pageConfig } from './AppDevelopment';

export default function AppDevelopmentPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <AppDevelopment />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

