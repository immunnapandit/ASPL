import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ContactArea from './ContactArea';

export default function Contact() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Contact Us" subtitle="Contact Us" />
        <ContactArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
