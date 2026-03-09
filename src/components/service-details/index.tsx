import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ServiceDetailsArea from './ServiceDetailsArea';

export default function ServiceDetails() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Service Details" subtitle="Service Details" />
        <ServiceDetailsArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
