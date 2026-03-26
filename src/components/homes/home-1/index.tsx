import HeroHomeOne from './HeroHomeOne';
import TestimonialHomeOne from './TestimonialHomeOne';
import Wrapper from '../../../layouts/Wrapper';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';
import ServiceHomeTwo from '../home-2/ServiceHomeTwo';
import BlogHomeTwo from '../home-2/BlogHomeTwo';
import AboutHomeTwo from '../home-2/AboutHomeTwo';
import ServiceHomeOne from './ServiceHomeOne';
// import TeamHomeThree from '../home-3/TeamHomeThree';
import CloudTabs from './CloudTabs';
import IndustriesSection from './IndustriesSection';
import OurTraining from './OurTraining';
import OurClient from './OurClient';

export default function HomeOne() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <HeroHomeOne />
        <AboutHomeTwo />
        <ServiceHomeTwo/>
        <IndustriesSection />
        <CloudTabs/>
        <ServiceHomeOne />
        {/* <TeamHomeThree /> */}
        <OurTraining />
        <BlogHomeTwo />
        <TestimonialHomeOne />
        <OurClient />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
