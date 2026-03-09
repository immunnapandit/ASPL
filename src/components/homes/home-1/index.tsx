import HeroHomeOne from './HeroHomeOne';
import AboutHomeOne from './AboutHomeOne';
import ServiceHomeOne from './ServiceHomeOne';
import ProjectHomeOne from './ProjectHomeOne';
import TeamHomeOne from './TeamHomeOne';
import ProcessHomeOne from './ProcessHomeOne';
import CtaHomeOne from './CtaHomeOne';
import PricingHomeOne from './PricingHomeOne';
import CounterHomeOne from './CounterHomeOne';
import TestimonialHomeOne from './TestimonialHomeOne';
import BlogHomeOne from './BlogHomeOne';
import Wrapper from '../../../layouts/Wrapper';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';

export default function HomeOne() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <HeroHomeOne />
        <AboutHomeOne />
        <ServiceHomeOne />
        <ProjectHomeOne />
        <TeamHomeOne />
        <ProcessHomeOne />
        <CtaHomeOne />
        <PricingHomeOne />
        <CounterHomeOne />
        <TestimonialHomeOne />
        <BlogHomeOne />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
