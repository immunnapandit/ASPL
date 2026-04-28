import Breadcrumb from '../../../common/Breadcrumb';
import FooterOne from '../../../layouts/footers/FooterOne';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import Gallery from './Gallery';

const pageConfig = {
  title: 'Gallery',
  subtitle: 'Gallery'
};

export default function GalleryPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <Gallery />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
