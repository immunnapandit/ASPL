import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import PayNow from './PayNow';

export default function PayNowPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Pay Now" subtitle="Secure Program Payment" />
        <PayNow />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
