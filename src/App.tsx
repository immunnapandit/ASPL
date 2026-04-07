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
import Careers from './components/careers';

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
  { path: '/blog-details', element: <BlogDetails /> },
  { path: '/contact', element: <Contact /> },
  { path: '/careers', element: <Careers /> },
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
