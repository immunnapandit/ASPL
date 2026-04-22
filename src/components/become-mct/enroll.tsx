import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BecomeMctEnroll from './BecomeMctEnroll';

export default function BecomeMctEnrollPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Enroll MCT" subtitle="MCT Enrollment Form" />
        <BecomeMctEnroll />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
