import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import OurCustomers from './OurCustomers';

export default function CustomersPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <OurCustomers />
      <FooterOne />
    </Wrapper>
  );
}
