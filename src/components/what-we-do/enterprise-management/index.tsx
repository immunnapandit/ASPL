import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import EnterpriseManagement, { pageConfig } from './EnterpriseManagement';

export default function EnterpriseManagementPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <EnterpriseManagement />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

