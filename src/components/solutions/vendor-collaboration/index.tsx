import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import VendorCollaboration, { pageConfig } from './VendorCollaboration';

export default function VendorCollaborationPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <VendorCollaboration />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
