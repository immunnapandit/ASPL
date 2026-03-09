import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ProjectArea from './ProjectArea';

export default function Project() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Project" subtitle="Project" />
        <ProjectArea />
      </main>
      <FooterOne />
    </Wrapper>
  );
}
