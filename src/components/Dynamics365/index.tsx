import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import Dynamics365 from './Dynamcis365Finance';

export default function Dynamics365Finance() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Dynamics 365 Finance" subtitle="Manage your financial operations with Microsoft's enterprise solution" />
        <Dynamics365/>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
