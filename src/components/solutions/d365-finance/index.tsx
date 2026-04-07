import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import D365FinanceArea from './D365FinanceArea';

export default function D365Finance() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb
          title="Dynamics 365 Finance"
          subtitle="Comprehensive Financial Management Solution"
        />
        <D365FinanceArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
