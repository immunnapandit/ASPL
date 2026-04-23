import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeOne from './components/homes/home-1';
import HomeTwo from './components/homes/home-2';
import HomeThree from './components/homes/home-3';
import About from './components/about';
import NotFound from './components/error';
import Service from './components/service';
import ServiceDetails from './components/service-details';
import Team from './components/team';
import TeamDetails from './components/team-details';
import Price from './components/price';
import Project from './components/project';
import ProjectDetails from './components/project-details';
import Faq from './components/faq';
import BlogGrid from './components/blog-grid';
import BlogList from './components/blog-list';
import BlogDetails from './components/blog-details';
import Contact from './components/contact';
import BecomeMCTPage from './components/become-mct';
import BecomeMctEnrollPage from './components/become-mct/enroll';
import Careers from './components/careers';
import CareerDetails from './components/careers/CareerDetails';
import PayNowPage from './components/pay-now';
import D365Finance from './components/solutions/d365-finance';
import WorkingProcess from './components/working-process';
import PrivacyPolicy from './components/privacy-policy';
import TermsConditions from './components/terms-conditions';
import CyberSecurity from './components/solutions/cyber-security';
import { customPageRoutes } from './routes/custom-pages';

const router = createBrowserRouter([
  { path: '/', element: <HomeOne /> },
  { path: '/home-2', element: <HomeTwo /> },
  { path: '/home-3', element: <HomeThree /> },
  { path: '/about', element: <About /> },
  { path: '/service', element: <Service /> },
  { path: '/service-details', element: <ServiceDetails /> },
  { path: '/team', element: <Team /> },
  { path: '/team-details', element: <TeamDetails /> },
  { path: '/price', element: <Price /> },
  { path: '/project', element: <Project /> },
  { path: '/project-details', element: <ProjectDetails /> },
  { path: '/faq', element: <Faq /> },
  { path: '/blog-grid', element: <BlogGrid /> },
  { path: '/blog-list', element: <BlogList /> },
  { path: '/blog', element: <BlogGrid /> },
  { path: '/blog-details', element: <BlogDetails /> },
  { path: '/contact', element: <Contact /> },
  { path: '/careers', element: <Careers /> },
  { path: '/careers/:slug', element: <CareerDetails /> },
  { path: '/pay-now', element: <PayNowPage /> },
  { path: '/working-process', element: <WorkingProcess /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  { path: '/terms-and-conditions', element: <TermsConditions /> },
  { path: '/solutions/cyber-security', element: <CyberSecurity /> },
  { path: '/solutions/d365-for-finance-and-operations', element: <D365Finance /> },
  { path: '/become-mct/enroll', element: <BecomeMctEnrollPage /> },
  ...customPageRoutes,
  { path: '*', element: <NotFound /> },

  { path: '/become-mct', element: <BecomeMCTPage /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
