import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import DynamicsNav2017, { pageConfig } from './DynamicsNav2017';

export default function DynamicsNav2017Page() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <DynamicsNav2017 />
      </main>
      <FooterOne />
    </Wrapper>
  );
}

