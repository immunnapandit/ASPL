import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import FaqArea from './FaqArea';

export default function Faq() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="FAQ" subtitle="FAQ" />
        <FaqArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
