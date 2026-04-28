import HeroHomeOne from './HeroHomeOne';
import TestimonialHomeOne from './TestimonialHomeOne';
import Wrapper from '../../../layouts/Wrapper';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';
import ServiceHomeTwo from '../home-2/ServiceHomeTwo';
import BlogHomeTwo from '../home-2/BlogHomeTwo';
import AboutHomeTwo from '../home-2/AboutHomeTwo';
import IndustriesSection from './IndustriesSection';
import OurTraining from './OurTraining';
import OurClient from './OurClient';
import SolutionsSection from './SolutionsSection';
import WhyChooseUsSection from './WhyChooseUsSection';

export default function HomeOne() {
  return (
    <Wrapper>
      <HeaderOne />
      <main className="home-one-page">
        <HeroHomeOne />
        <AboutHomeTwo />
        <ServiceHomeTwo />
        <SolutionsSection />
        <IndustriesSection />
        <WhyChooseUsSection />
        <OurTraining />
        <TestimonialHomeOne />
         <OurClient />
        <BlogHomeTwo />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
