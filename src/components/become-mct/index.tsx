import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BecomeMCTPage from './BecomeMct';
export default function BecomeMCT() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Become MCT" subtitle="Become a Microsoft Certified Trainer" />
        <BecomeMCTPage />
      </main>
      <FooterOne />
    </Wrapper>
  );
}