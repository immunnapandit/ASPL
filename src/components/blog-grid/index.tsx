import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BlogGridArea from './BlogGridArea';

export default function BlogGrid() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Blog" subtitle="Blog" />
        <BlogGridArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
