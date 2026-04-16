import type { RouteObject } from 'react-router-dom';
import AiSolutionsPage from '../components/solutions/ai-solutions';
import Ax7Page from '../components/solutions/ax-7';
import Crm2015Page from '../components/solutions/crm-2015';
import Crm2016Page from '../components/solutions/crm-2016';
import D365CustomerInsightsPage from '../components/solutions/d365-customer-insights';
import D365FieldServicePage from '../components/solutions/d365-field-service';
import D365MarketingPage from '../components/solutions/d365-marketing';
import D365ProjectServiceAutomationPage from '../components/solutions/d365-project-service-automation';
import D365RetailPage from '../components/solutions/d365-retail';
import D365SalesPage from '../components/solutions/d365-sales';
import D365SupplyChainManagementPage from '../components/solutions/d365-supply-chain-management';
import D365TalentPage from '../components/solutions/d365-talent';
import CloudTechnologyPage from '../components/solutions/cloud-technology';
import DynamicsNav2017Page from '../components/solutions/dynamics-nav-2017';
import DynamicsNav2018Page from '../components/solutions/dynamics-nav-2018';
import MicrosoftAzurePage from '../components/solutions/microsoft-azure';
import MicrosoftDynamics365Page from '../components/solutions/microsoft-dynamics-365';
import MicrosoftDynamicsAxPage from '../components/solutions/microsoft-dynamics-ax';
import MicrosoftDynamicsCrmPage from '../components/solutions/microsoft-dynamics-crm';
import MicrosoftDynamicsNavPage from '../components/solutions/microsoft-dynamics-nav';
import Office365Page from '../components/solutions/office-365';
import MicrosoftPowerBiPage from '../components/solutions/microsoft-power-bi';
import MicrosoftPowerPlatformPage from '../components/solutions/microsoft-power-platform';
import PowerAutomateSolutionsPage from '../components/solutions/power-automate-solutions';
import AppDevelopmentPage from '../components/what-we-do/app-development';
import BiAnalyticsPage from '../components/what-we-do/bi-analytics';
import ConsultingPage from '../components/what-we-do/consulting';
import CrmImplementationPage from '../components/what-we-do/crm-implementation';
import DigitalTransformationPage from '../components/what-we-do/digital-transformation';
import EnterpriseManagementPage from '../components/what-we-do/enterprise-management';
import ErpImplementationPage from '../components/what-we-do/erp-implementation';
import MicrosoftCertifiedTrainerReadinessTrainingPage from '../components/what-we-do/microsoft-certified-trainer-readiness-training';
import ProductEngineeringPage from '../components/what-we-do/product-engineering';
import SupportManagedServicesPage from '../components/what-we-do/support-managed-services';
import TrainingPage from '../components/what-we-do/training';
import WebDevelopmentPage from '../components/what-we-do/web-development';
import SuccessStoriesPage from '../components/insights/success-stories';
import WebinarsEventsPage from '../components/insights/webinars-events';

export const customPageRoutes: RouteObject[] = [
  { path: '/solutions/microsoft-dynamics-365', element: <MicrosoftDynamics365Page /> },
  {
    path: '/solutions/d365-for-supply-chain-management',
    element: <D365SupplyChainManagementPage />
  },
  { path: '/solutions/d365-for-retail', element: <D365RetailPage /> },
  { path: '/solutions/d365-for-talent', element: <D365TalentPage /> },
  { path: '/solutions/d365-for-sales', element: <D365SalesPage /> },
  {
    path: '/solutions/d365-for-customer-insights',
    element: <D365CustomerInsightsPage />
  },
  { path: '/solutions/d365-for-marketing', element: <D365MarketingPage /> },
  { path: '/solutions/d365-for-field-service', element: <D365FieldServicePage /> },
  {
    path: '/solutions/d365-for-project-service-automation',
    element: <D365ProjectServiceAutomationPage />
  },
  { path: '/solutions/microsoft-azure', element: <MicrosoftAzurePage /> },
  { path: '/ai-solutions', element: <AiSolutionsPage /> },
  { path: '/solutions/office-365', element: <Office365Page /> },
  { path: '/solutions/microsoft-dynamics-ax', element: <MicrosoftDynamicsAxPage /> },
  { path: '/solutions/microsoft-dynamics-ax/ax-7', element: <Ax7Page /> },
  { path: '/solutions/microsoft-dynamics-crm', element: <MicrosoftDynamicsCrmPage /> },
  { path: '/solutions/microsoft-dynamics-crm/crm-2015', element: <Crm2015Page /> },
  { path: '/solutions/microsoft-dynamics-crm/crm-2016', element: <Crm2016Page /> },
  { path: '/solutions/microsoft-dynamics-nav', element: <MicrosoftDynamicsNavPage /> },
  {
    path: '/solutions/microsoft-dynamics-nav/dynamics-nav-2017',
    element: <DynamicsNav2017Page />
  },
  {
    path: '/solutions/microsoft-dynamics-nav/dynamics-nav-2018',
    element: <DynamicsNav2018Page />
  },
  { path: '/solutions/microsoft-power-platform', element: <MicrosoftPowerPlatformPage /> },
  { path: '/solutions/microsoft-power-bi', element: <MicrosoftPowerBiPage /> },
  { path: '/solutions/cloud-technology', element: <CloudTechnologyPage /> },
  {
    path: '/solutions/microsoft-power-platform/power-automate-solutions',
    element: <PowerAutomateSolutionsPage />
  },
  { path: '/what-we-do/erp-implementation', element: <ErpImplementationPage /> },
  { path: '/what-we-do/crm-implementation', element: <CrmImplementationPage /> },
  { path: '/what-we-do/bi-analytics', element: <BiAnalyticsPage /> },
  { path: '/what-we-do/app-development', element: <AppDevelopmentPage /> },
  {
    path: '/what-we-do/support-managed-services',
    element: <SupportManagedServicesPage />
  },
  { path: '/what-we-do/enterprise-management', element: <EnterpriseManagementPage /> },
  { path: '/what-we-do/digital-transformation', element: <DigitalTransformationPage /> },
  { path: '/what-we-do/consulting', element: <ConsultingPage /> },
  { path: '/what-we-do/product-engineering', element: <ProductEngineeringPage /> },
  { path: '/what-we-do/training', element: <TrainingPage /> },
  { path: '/what-we-do/web-development', element: <WebDevelopmentPage /> },
  {
    path: '/microsoft-certified-trainer-readiness-training',
    element: <MicrosoftCertifiedTrainerReadinessTrainingPage />
  },
  { path: '/insights/webinars-events', element: <WebinarsEventsPage /> },
  { path: '/insights/success-stories', element: <SuccessStoriesPage /> }
];
