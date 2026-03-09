import HeroHomeTwo from './HeroHomeTwo';
import CustomarHomeTwo from './CustomarHomeTwo';
import AboutHomeTwo from './AboutHomeTwo';
import ServiceHomeTwo from './ServiceHomeTwo';
import ProjectHomeTwo from './ProjectHomeTwo';
import ChooseHomeTwo from './ChooseHomeTwo';
import TestimonialHomeTwo from './TestimonialHomeTwo';
import CtaHomeTwo from './CtaHomeTwo';
import FaqHomeTwo from './FaqHomeTwo';
import BlogHomeTwo from './BlogHomeTwo';
import BrandHomeTwo from './BrandHomeTwo';
import Wrapper from '../../../layouts/Wrapper';
import HeaderTwo from '../../../layouts/headers/HeaderTwo';
import FooterTwo from '../../../layouts/footers/FooterTwo';

export default function HomeTwo() {
  return (
    <Wrapper>
      <HeaderTwo />
      <main>
        <HeroHomeTwo />
        <CustomarHomeTwo />
        <AboutHomeTwo />
        <ServiceHomeTwo />
        <ProjectHomeTwo />
        <ChooseHomeTwo />
        <TestimonialHomeTwo />
        <CtaHomeTwo />
        <FaqHomeTwo />
        <BlogHomeTwo />
        <BrandHomeTwo />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
