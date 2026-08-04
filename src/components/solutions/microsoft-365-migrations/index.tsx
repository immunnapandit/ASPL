import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import Microsoft365Migrations, { pageConfig } from './Microsoft365Migrations';

export default function Microsoft365MigrationsPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <Microsoft365Migrations />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
