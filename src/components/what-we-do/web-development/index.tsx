import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import WebDevelopment, { pageConfig } from './WebDevelopment';

export default function WebDevelopmentPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <WebDevelopment />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
