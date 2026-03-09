import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BlogDetailsArea from './BlogDetailsArea';

export default function BlogDetails() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Blog Details" subtitle="Blog Details" />
        <BlogDetailsArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
