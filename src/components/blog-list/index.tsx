import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BlogListArea from './BlogListArea';

export default function BlogList() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Blog List" subtitle="Blog List" />
        <BlogListArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
