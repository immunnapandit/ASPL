import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
import BlogDetails from './components/blog-details';
import Contact from './components/contact';
import Careers from './components/careers';
import CareerDetails from './components/careers/CareerDetails';
import CareersAdmin from './components/careers/CareersAdmin';
import BlogAdmin from './components/blog-admin/BlogAdmin';
import BlogPreview from './components/blog-preview/BlogPreview';
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
  { path: '/blog-list', element: <BlogGrid /> },
  { path: '/blog', element: <BlogGrid /> },
  { path: '/blog-details', element: <Navigate to="/blog" replace /> },
  { path: '/blog/:slug', element: <BlogDetails /> },
  { path: '/blog-preview/:previewKey', element: <BlogPreview /> },
  { path: '/contact', element: <Contact /> },
  { path: '/careers', element: <Careers /> },
  { path: '/careers/:slug', element: <CareerDetails /> },
  { path: '/admin/careers', element: <CareersAdmin /> },
  { path: '/admin/blog', element: <BlogAdmin /> },
  { path: '/pay-now', element: <PayNowPage /> },
  { path: '/working-process', element: <WorkingProcess /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  { path: '/terms-and-conditions', element: <TermsConditions /> },
  { path: '/solutions/cyber-security', element: <CyberSecurity /> },
  { path: '/solutions/d365-for-finance-and-operations', element: <D365Finance /> },
  { path: '/d365-finance-operations', element: <D365Finance /> },
  ...customPageRoutes,
  
  { path: '*', element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <MctEnrollmentPopup /> */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
