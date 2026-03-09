import ServiceArea from './ServiceArea';
import TestimonialHomeOne from '../homes/home-1/TestimonialHomeOne';
import Wrapper from '../../layouts/Wrapper';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';

export default function Service() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Services" subtitle="Services" />
        <ServiceArea />
        <TestimonialHomeOne />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
