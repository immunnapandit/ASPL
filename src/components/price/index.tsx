import FaqHomeTwo from '../homes/home-2/FaqHomeTwo';
import PricingHomeOne from '../homes/home-1/PricingHomeOne';
import Wrapper from '../../layouts/Wrapper';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';

export default function Price() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Pricing Plan" subtitle="Pricing Plan" />
        <PricingHomeOne style_2={true} />
        <FaqHomeTwo />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
