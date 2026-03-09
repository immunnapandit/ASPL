import HeroHomeThree from './HeroHomeThree';
import ServiceHomeThree from './ServiceHomeThree';
import AboutHomeThree from './AboutHomeThree';
import ProjectHomeThree from './ProjectHomeThree';
import ProcessHomeThree from './ProcessHomeThree';
import TeamHomeThree from './TeamHomeThree';
import PricingHomeThree from './PricingHomeThree';
import CtaHomeThree from './CtaHomeThree';
import TestimonialHomeThree from './TestimonialHomeThree';
import BlogHomeThree from './BlogHomeThree';
import Wrapper from '../../../layouts/Wrapper';
import HeaderThree from '../../../layouts/headers/HeaderThree';
import FooterThree from '../../../layouts/footers/FooterThree';

export default function HomeThree() {
  return (
    <Wrapper>
      <HeaderThree />
      <main>
        <HeroHomeThree />
        <ServiceHomeThree />
        <AboutHomeThree />
        <ProjectHomeThree />
        <ProcessHomeThree />
        <TeamHomeThree />
        <PricingHomeThree />
        <TestimonialHomeThree />
        <CtaHomeThree />
        <BlogHomeThree />
      </main>
      <FooterThree />
    </Wrapper>
  );
}
