import Breadcrumb from '../../../common/Breadcrumb';
import type { IndustryPageConfig } from '../../../data/industry-pages';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import IndustryDetailArea from './IndustryDetailArea';

interface GenericIndustryPageProps {
  page: IndustryPageConfig;
}

export default function GenericIndustryPage({
  page,
}: GenericIndustryPageProps) {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={page.title} subtitle={page.subtitle} />
        <IndustryDetailArea page={page} />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
