import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import CareersArea from './CareersArea';

export default function Careers() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Careers" subtitle="Build your future with ASPL" />
        <CareersArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
