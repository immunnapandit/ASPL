import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ProjectDetailsArea from './ProjectDetailsArea';

export default function ProjectDetails() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Project Details" subtitle="Project Details" />
        <ProjectDetailsArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
