import Breadcrumb from '../../../common/Breadcrumb';
import type { ServicePageConfig } from '../../../data/service-page-types';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import GenericServiceArea from './GenericServiceArea';

interface GenericServicePageProps {
  page: ServicePageConfig;
}

export default function GenericServicePage({ page }: GenericServicePageProps) {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={page.title} subtitle={page.subtitle} />
        <GenericServiceArea page={page} />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
