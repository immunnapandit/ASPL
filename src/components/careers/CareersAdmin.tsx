import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  BriefcaseBusiness,
  Eye,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../common/Breadcrumb';
import {
  ADMIN_CAREER_APPLICATIONS_API_URL,
  ADMIN_CAREER_OPENINGS_API_URL,
  ADMIN_CAREERS_SETTINGS_API_URL,
} from '../../config/api';
import { type JobOpening, type JobOpeningStatus } from '../../data/career-openings';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';

type AdminCareerForm = {
  title: string;
  slug: string;
  type: string;
  location: string;
  department: string;
  experience: string;
  description: string;
  fullDescription: string;
  responsibilitiesText: string;
  requirementsText: string;
  status: JobOpeningStatus;
  featured: boolean;
};

type CareerApplicationStatus = 'new' | 'reviewed' | 'contacted' | 'archived';

type CareerApplicationRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleTitle: string;
  roleSlug: string;
  appliedPosition?: string;
  message?: string;
  resumeFileName: string;
  resumeContentType: string;
  status: CareerApplicationStatus;
  submittedAt: string;
  updatedAt: string;
};

type CareersSettingsForm = {
  careersPageTitle: string;
  careersPageSubtitle: string;
  generalCtaTitle: string;
  generalCtaDescription: string;
  notificationEmail: string;
};

type AdminApiResponse = {
  ok?: boolean;
  error?: string;
  openings?: JobOpening[];
  opening?: JobOpening;
};

type ApplicationsApiResponse = {
  ok?: boolean;
  error?: string;
  applications?: CareerApplicationRecord[];
  application?: CareerApplicationRecord;
};

type SettingsApiResponse = {
  ok?: boolean;
  error?: string;
  settings?: CareersSettingsForm;
};

type AdminView = 'dashboard' | 'jobs' | 'add-job' | 'applications' | 'settings';

const STORAGE_KEY = 'aspl-careers-admin-token';

const initialForm: AdminCareerForm = {
  title: '',
  slug: '',
  type: 'Full Time',
  location: '',
  department: '',
  experience: '',
  description: '',
  fullDescription: '',
  responsibilitiesText: '',
  requirementsText: '',
  status: 'active',
  featured: false,
};

const initialSettings: CareersSettingsForm = {
  careersPageTitle: 'Careers',
  careersPageSubtitle: 'Build your future with ASPL',
  generalCtaTitle: 'Send Us Your Resume',
  generalCtaDescription:
    'Share your profile with us and tell us what kind of role you are looking for. If a matching opportunity opens up, our team will get in touch.',
  notificationEmail: 'hr@atisunya.co',
};

const applicationStatuses: CareerApplicationStatus[] = [
  'new',
  'reviewed',
  'contacted',
  'archived',
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function toMultilineText(items: string[]) {
  return items.join('\n');
}

function toListItems(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toFormState(job?: JobOpening): AdminCareerForm {
  if (!job) {
    return initialForm;
  }

  return {
    title: job.title,
    slug: job.slug,
    type: job.type,
    location: job.location,
    department: job.department,
    experience: job.experience,
    description: job.description,
    fullDescription: job.fullDescription,
    responsibilitiesText: toMultilineText(job.responsibilities),
    requirementsText: toMultilineText(job.requirements),
    status: job.status,
    featured: job.featured,
  };
}

function formatApplicationDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
}

export default function CareersAdmin() {
  const adminFrameRef = useRef<HTMLDivElement | null>(null);
  const sidebarSlotRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [token, setToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [formState, setFormState] = useState<AdminCareerForm>(initialForm);
  const [applications, setApplications] = useState<CareerApplicationRecord[]>([]);
  const [settingsForm, setSettingsForm] = useState<CareersSettingsForm>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isUpdatingApplicationId, setIsUpdatingApplicationId] = useState<string | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [sidebarState, setSidebarState] = useState<'flow' | 'fixed' | 'bottom'>('flow');
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const [sidebarSlotHeight, setSidebarSlotHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedToken = window.localStorage.getItem(STORAGE_KEY) || '';
    if (storedToken) {
      setToken(storedToken);
      setTokenInput(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    void loadOpenings(token);
  }, [token]);

  useEffect(() => {
    if (!token || activeView !== 'applications') {
      return;
    }

    void loadApplications(token);
  }, [token, activeView]);

  useEffect(() => {
    if (!token || activeView !== 'settings') {
      return;
    }

    void loadSettings(token);
  }, [token, activeView]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const updateSidebarLayout = () => {
      const frameElement = adminFrameRef.current;
      const slotElement = sidebarSlotRef.current;
      const sidebarElement = sidebarRef.current;

      if (!frameElement || !slotElement || !sidebarElement) {
        return;
      }

      const sidebarHeight = sidebarElement.offsetHeight;
      setSidebarSlotHeight(sidebarHeight);

      if (window.innerWidth < 992) {
        setSidebarState('flow');
        setSidebarStyle({});
        return;
      }

      const topOffset = 24;
      const frameRect = frameElement.getBoundingClientRect();
      const slotRect = slotElement.getBoundingClientRect();

      if (slotRect.top > topOffset) {
        setSidebarState('flow');
        setSidebarStyle({
          width: `${slotRect.width}px`,
        });
        return;
      }

      if (frameRect.bottom <= sidebarHeight + topOffset) {
        setSidebarState('bottom');
        setSidebarStyle({
          width: `${slotRect.width}px`,
        });
        return;
      }

      setSidebarState('fixed');
      setSidebarStyle({
        top: `${topOffset}px`,
        left: `${slotRect.left}px`,
        width: `${slotRect.width}px`,
      });
    };

    updateSidebarLayout();

    const onScroll = () => window.requestAnimationFrame(updateSidebarLayout);
    const onResize = () => window.requestAnimationFrame(updateSidebarLayout);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [token, activeView, jobs.length, applications.length, statusMessage]);

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId),
    [jobs, selectedJobId]
  );
  const activeJobsCount = jobs.filter((job) => job.status === 'active').length;
  const newApplicationsCount = applications.filter((item) => item.status === 'new').length;

  const setStatus = (type: 'success' | 'error', message: string) => {
    setStatusType(type);
    setStatusMessage(message);
  };

  const getAdminHeaders = (withJson = false) => {
    const headers: Record<string, string> = {
      'X-Admin-Token': token,
    };

    if (withJson) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  };

  const loadOpenings = async (adminToken: string) => {
    setIsLoading(true);
    setStatusMessage('');

    try {
      const response = await fetch(ADMIN_CAREER_OPENINGS_API_URL, {
        headers: {
          'X-Admin-Token': adminToken,
        },
      });
      const result = (await response.json().catch(() => null)) as AdminApiResponse | null;

      if (!response.ok || !Array.isArray(result?.openings)) {
        throw new Error(result?.error || 'Unable to load careers CMS data.');
      }

      setJobs(result.openings);

      if (result.openings.length) {
        const nextSelectedJob =
          result.openings.find((job) => job.id === selectedJobId) || result.openings[0];
        setSelectedJobId(nextSelectedJob.id);
        setFormState(toFormState(nextSelectedJob));
      } else {
        setSelectedJobId(null);
        setFormState(initialForm);
      }
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to load careers CMS data.'
      );
      setToken('');
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadApplications = async (adminToken: string) => {
    setIsLoadingApplications(true);

    try {
      const response = await fetch(ADMIN_CAREER_APPLICATIONS_API_URL, {
        headers: {
          'X-Admin-Token': adminToken,
        },
      });
      const result = (await response.json().catch(() => null)) as ApplicationsApiResponse | null;

      if (!response.ok || !Array.isArray(result?.applications)) {
        throw new Error(result?.error || 'Unable to load applications.');
      }

      setApplications(result.applications);
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to load applications.'
      );
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const loadSettings = async (adminToken: string) => {
    setIsLoadingSettings(true);

    try {
      const response = await fetch(ADMIN_CAREERS_SETTINGS_API_URL, {
        headers: {
          'X-Admin-Token': adminToken,
        },
      });
      const result = (await response.json().catch(() => null)) as SettingsApiResponse | null;

      if (!response.ok || !result?.settings) {
        throw new Error(result?.error || 'Unable to load settings.');
      }

      setSettingsForm(result.settings);
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to load settings.'
      );
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const selectJob = (job: JobOpening) => {
    setSelectedJobId(job.id);
    setFormState(toFormState(job));
    setActiveView('jobs');
    setStatusMessage('');
  };

  const handleTokenSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tokenInput.trim()) {
      setStatus('error', 'Enter the admin token to open the careers CMS.');
      return;
    }

    const nextToken = tokenInput.trim();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextToken);
    }
    setToken(nextToken);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    const nextValue =
      event.currentTarget instanceof HTMLInputElement &&
      event.currentTarget.type === 'checkbox'
        ? event.currentTarget.checked
        : value;

    setFormState((current) => {
      const nextState = {
        ...current,
        [name]: nextValue,
      } as AdminCareerForm;

      if (name === 'title' && !current.slug) {
        nextState.slug = slugify(value);
      }

      return nextState;
    });
  };

  const handleSettingsInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setSettingsForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetFormForCreate = () => {
    setSelectedJobId(null);
    setFormState(initialForm);
    setStatusMessage('');
    setActiveView('add-job');
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      setStatus('error', 'Please unlock the CMS first.');
      return;
    }

    const payload = {
      title: formState.title.trim(),
      slug: slugify(formState.slug || formState.title),
      type: formState.type.trim(),
      location: formState.location.trim(),
      department: formState.department.trim(),
      experience: formState.experience.trim(),
      description: formState.description.trim(),
      fullDescription: formState.fullDescription.trim(),
      responsibilities: toListItems(formState.responsibilitiesText),
      requirements: toListItems(formState.requirementsText),
      status: formState.status,
      featured: formState.featured,
    };

    setIsSaving(true);
    setStatusMessage('');

    try {
      const isEditing = Boolean(selectedJobId);
      const endpoint = isEditing
        ? `${ADMIN_CAREER_OPENINGS_API_URL}/${selectedJobId}`
        : ADMIN_CAREER_OPENINGS_API_URL;
      const response = await fetch(endpoint, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: getAdminHeaders(true),
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as AdminApiResponse | null;

      if (!response.ok || !result?.opening) {
        throw new Error(result?.error || 'Unable to save this job opening.');
      }

      const savedJob = result.opening;
      setJobs((current) => {
        const nextJobs = current.filter((job) => job.id !== savedJob.id);
        nextJobs.unshift(savedJob);
        return nextJobs;
      });
      setSelectedJobId(savedJob.id);
      setFormState(toFormState(savedJob));
      setActiveView('jobs');
      setStatus('success', isEditing ? 'Job updated successfully.' : 'New job created successfully.');
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to save this job opening.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !selectedJob) {
      return;
    }

    if (!window.confirm(`Delete "${selectedJob.title}" from the careers CMS?`)) {
      return;
    }

    setIsSaving(true);
    setStatusMessage('');

    try {
      const response = await fetch(
        `${ADMIN_CAREER_OPENINGS_API_URL}/${selectedJob.id}`,
        {
          method: 'DELETE',
          headers: getAdminHeaders(),
        }
      );
      const result = (await response.json().catch(() => null)) as AdminApiResponse | null;

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to delete this opening.');
      }

      const remainingJobs = jobs.filter((job) => job.id !== selectedJob.id);
      setJobs(remainingJobs);
      if (remainingJobs.length) {
        selectJob(remainingJobs[0]);
      } else {
        resetFormForCreate();
      }
      setStatus('success', 'Job deleted successfully.');
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to delete this opening.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplicationStatusChange = async (
    applicationId: string,
    status: CareerApplicationStatus
  ) => {
    setIsUpdatingApplicationId(applicationId);
    setStatusMessage('');

    try {
      const response = await fetch(
        `${ADMIN_CAREER_APPLICATIONS_API_URL}/${applicationId}`,
        {
          method: 'PATCH',
          headers: getAdminHeaders(true),
          body: JSON.stringify({ status }),
        }
      );
      const result = (await response.json().catch(() => null)) as ApplicationsApiResponse | null;

      if (!response.ok || !result?.application) {
        throw new Error(result?.error || 'Unable to update application.');
      }

      setApplications((current) =>
        current.map((item) => (item.id === applicationId ? result.application! : item))
      );
      setStatus('success', 'Application status updated.');
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to update application.'
      );
    } finally {
      setIsUpdatingApplicationId(null);
    }
  };

  const handleSettingsSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSavingSettings(true);
    setStatusMessage('');

    try {
      const response = await fetch(ADMIN_CAREERS_SETTINGS_API_URL, {
        method: 'PUT',
        headers: getAdminHeaders(true),
        body: JSON.stringify(settingsForm),
      });
      const result = (await response.json().catch(() => null)) as SettingsApiResponse | null;

      if (!response.ok || !result?.settings) {
        throw new Error(result?.error || 'Unable to save settings.');
      }

      setSettingsForm(result.settings);
      setStatus('success', 'Settings saved successfully.');
    } catch (error) {
      setStatus(
        'error',
        error instanceof Error ? error.message : 'Unable to save settings.'
      );
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setTokenInput('');
    setJobs([]);
    setApplications([]);
    setSelectedJobId(null);
    setActiveView('dashboard');
    setFormState(initialForm);
    setSettingsForm(initialSettings);
    setStatusMessage('');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs' as const, label: 'Jobs', icon: BriefcaseBusiness },
    { id: 'add-job' as const, label: 'Add Job', icon: Plus },
    { id: 'applications' as const, label: 'Applications', icon: FileText },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const handleMenuSelect = (view: AdminView) => {
    if (view === 'add-job') {
      resetFormForCreate();
      return;
    }

    setActiveView(view);

    if (view === 'jobs' && jobs.length && !selectedJobId) {
      selectJob(jobs[0]);
    }
  };

  const currentPanelTitle =
    activeView === 'dashboard'
      ? 'Dashboard'
      : activeView === 'jobs'
        ? 'Jobs'
        : activeView === 'add-job'
          ? 'Add Job'
          : activeView === 'applications'
            ? 'Applications'
            : 'Settings';

  const renderJobForm = (isEditing: boolean) => (
    <form onSubmit={handleSave} className="tv-careers-admin-form">
      <div className="tv-careers-admin-form__section">
        <div className="tv-careers-admin-form__section-head">
          <h4>Role basics</h4>
        </div>
        <div className="tv-careers-admin-grid">
          <label>
            Job title
            <input
              name="title"
              value={formState.title}
              onChange={handleInputChange}
              placeholder="Senior Power Platform Consultant"
              required
            />
          </label>
          <label>
            Slug
            <input
              name="slug"
              value={formState.slug}
              onChange={handleInputChange}
              placeholder="senior-power-platform-consultant"
              required
            />
          </label>
          <label>
            Job type
            <input
              name="type"
              value={formState.type}
              onChange={handleInputChange}
              placeholder="Full Time"
              required
            />
          </label>
          <label>
            Location
            <input
              name="location"
              value={formState.location}
              onChange={handleInputChange}
              placeholder="Noida / Hybrid"
              required
            />
          </label>
          <label>
            Department
            <input
              name="department"
              value={formState.department}
              onChange={handleInputChange}
              placeholder="Consulting"
              required
            />
          </label>
          <label>
            Experience
            <input
              name="experience"
              value={formState.experience}
              onChange={handleInputChange}
              placeholder="4+ years"
              required
            />
          </label>
        </div>
      </div>

      <div className="tv-careers-admin-form__section">
        <div className="tv-careers-admin-form__section-head">
          <h4>Role narrative</h4>
        </div>
        <label>
          Short description
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="A short summary shown on the careers listing cards."
            required
          />
        </label>

        <label>
          Full description
          <textarea
            name="fullDescription"
            value={formState.fullDescription}
            onChange={handleInputChange}
            rows={5}
            placeholder="A richer role overview shown on the job details page."
            required
          />
        </label>
      </div>

      <div className="tv-careers-admin-form__section">
        <div className="tv-careers-admin-form__section-head">
          <h4>Candidate requirements</h4>
        </div>
        <div className="tv-careers-admin-grid">
          <label>
            Responsibilities
            <textarea
              name="responsibilitiesText"
              value={formState.responsibilitiesText}
              onChange={handleInputChange}
              rows={8}
              placeholder="One responsibility per line"
              required
            />
          </label>
          <label>
            Requirements
            <textarea
              name="requirementsText"
              value={formState.requirementsText}
              onChange={handleInputChange}
              rows={8}
              placeholder="One requirement per line"
              required
            />
          </label>
        </div>
      </div>

      <div className="tv-careers-admin-form__section">
        <div className="tv-careers-admin-form__section-head">
          <h4>Publishing controls</h4>
        </div>
        <div className="tv-careers-admin-grid tv-careers-admin-grid--compact">
          <label>
            Status
            <select name="status" value={formState.status} onChange={handleInputChange}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </label>
          <label className="tv-careers-admin-checkbox">
            <input
              type="checkbox"
              name="featured"
              checked={formState.featured}
              onChange={handleInputChange}
            />
            <span>Mark as featured</span>
          </label>
        </div>
      </div>

      <div className="tv-careers-admin-form__actions">
        <button type="submit" className="tv-btn-primary" disabled={isSaving}>
          <span className="btn-wrap">
            <span className="btn-text1">
              {isSaving ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
            </span>
            <span className="btn-text2">
              {isSaving ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
            </span>
          </span>
        </button>
        <button type="button" className="tv-careers-admin-ghost" onClick={resetFormForCreate}>
          <PencilLine size={16} />
          Clear form
        </button>
        {isEditing ? (
          <button
            type="button"
            className="tv-careers-admin-ghost"
            onClick={() => void loadOpenings(token)}
          >
            <Save size={16} />
            Refresh
          </button>
        ) : null}
      </div>
    </form>
  );

  const renderDashboard = () => (
    <div className="tv-careers-admin-dashboard">
      <div className="tv-careers-admin-metrics">
        <div className="tv-careers-admin-metric">
          <span>Total jobs</span>
          <strong>{jobs.length}</strong>
        </div>
        <div className="tv-careers-admin-metric">
          <span>Active</span>
          <strong>{activeJobsCount}</strong>
        </div>
        <div className="tv-careers-admin-metric">
          <span>New applications</span>
          <strong>{newApplicationsCount}</strong>
        </div>
      </div>
      <div className="tv-careers-admin-dashboard__panels">
        <div className="tv-careers-admin-panel">
          <h3>Quick actions</h3>
          <div className="tv-careers-admin-panel__actions">
            <button type="button" className="tv-careers-admin-add" onClick={resetFormForCreate}>
              <Plus size={16} />
              Add New Job
            </button>
            <button
              type="button"
              className="tv-careers-admin-ghost"
              onClick={() => handleMenuSelect('applications')}
            >
              <FileText size={16} />
              View Applications
            </button>
          </div>
        </div>
        <div className="tv-careers-admin-panel">
          <h3>Live site</h3>
          <p>Review the public careers page and published openings.</p>
          <Link to="/careers" className="tv-careers-admin-link">
            <Eye size={16} />
            View public careers page
          </Link>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="tv-careers-admin-workspace">
      <aside className="tv-careers-admin-list">
        <div className="tv-careers-admin-list__header">
          <div className="tv-careers-admin-list__title">
            <h3>Job openings</h3>
          </div>
          <button type="button" className="tv-careers-admin-add" onClick={resetFormForCreate}>
            <Plus size={16} />
            New Job
          </button>
        </div>

        {isLoading ? (
          <div className="tv-careers-loading" role="status">
            <LoaderCircle size={22} className="tv-spin" />
            Loading CMS data...
          </div>
        ) : !jobs.length ? (
          <div className="tv-careers-admin-empty">
            <span className="tv-careers-admin-empty__icon">
              <BriefcaseBusiness size={22} />
            </span>
            <h4>No roles created yet</h4>
            <button type="button" className="tv-careers-admin-add" onClick={resetFormForCreate}>
              <Plus size={16} />
              Create first job
            </button>
          </div>
        ) : (
          <div className="tv-careers-admin-list__items">
            {jobs.map((job) => (
              <button
                key={job.id}
                type="button"
                className={`tv-careers-admin-job ${selectedJobId === job.id ? 'is-active' : ''}`}
                onClick={() => selectJob(job)}
              >
                <div className="tv-careers-admin-job__top">
                  <span className={`tv-job-status is-${job.status}`}>{job.status}</span>
                  {job.featured ? <span className="tv-job-featured">Featured</span> : null}
                </div>
                <h4>{job.title}</h4>
                <div className="tv-careers-admin-job__meta">
                  <span>
                    <BriefcaseBusiness size={14} />
                    {job.type}
                  </span>
                  <span>
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </div>
                <p>{job.description}</p>
              </button>
            ))}
          </div>
        )}
      </aside>

      <section className="tv-careers-admin-editor">
        <div className="tv-careers-admin-editor__header">
          <div>
            <span className="tv-careers-admin-editor__label">Editing role</span>
            <h3>{selectedJob ? selectedJob.title : 'Select a job'}</h3>
          </div>
          {selectedJob ? (
            <button
              type="button"
              className="tv-careers-admin-ghost tv-careers-admin-danger"
              onClick={handleDelete}
              disabled={isSaving}
            >
              <Trash2 size={16} />
              Delete
            </button>
          ) : null}
        </div>

        {selectedJob ? (
          renderJobForm(true)
        ) : (
          <div className="tv-careers-admin-empty">
            <span className="tv-careers-admin-empty__icon">
              <BriefcaseBusiness size={22} />
            </span>
            <h4>Select a job to edit</h4>
          </div>
        )}
      </section>
    </div>
  );

  const renderAddJob = () => (
    <section className="tv-careers-admin-editor">
      <div className="tv-careers-admin-editor__header">
        <div>
          <span className="tv-careers-admin-editor__label">Create role</span>
          <h3>New opening</h3>
        </div>
      </div>
      {renderJobForm(false)}
    </section>
  );

  const renderApplications = () => (
    <div className="tv-careers-admin-panel">
      <div className="tv-careers-admin-editor__header">
        <div>
          <span className="tv-careers-admin-editor__label">Applications</span>
          <h3>Candidate submissions</h3>
        </div>
        <button
          type="button"
          className="tv-careers-admin-ghost"
          onClick={() => void loadApplications(token)}
        >
          <Save size={16} />
          Refresh
        </button>
      </div>

      {isLoadingApplications ? (
        <div className="tv-careers-loading" role="status">
          <LoaderCircle size={22} className="tv-spin" />
          Loading applications...
        </div>
      ) : !applications.length ? (
        <div className="tv-careers-admin-empty">
          <span className="tv-careers-admin-empty__icon">
            <FileText size={22} />
          </span>
          <h4>No applications yet</h4>
        </div>
      ) : (
        <div className="tv-careers-admin-applications">
          {applications.map((application) => (
            <article key={application.id} className="tv-careers-admin-application">
              <div className="tv-careers-admin-application__top">
                <div>
                  <h4>{application.fullName}</h4>
                  <p>{application.roleTitle}</p>
                </div>
                <span className={`tv-job-status is-${application.status === 'new' ? 'draft' : 'active'}`}>
                  {application.status}
                </span>
              </div>

              <div className="tv-careers-admin-application__meta">
                <span>
                  <Mail size={14} />
                  {application.email}
                </span>
                <span>
                  <Phone size={14} />
                  {application.phone}
                </span>
                <span>
                  <FileText size={14} />
                  {application.resumeFileName}
                </span>
              </div>

              <div className="tv-careers-admin-application__body">
                <p>
                  <strong>Applied:</strong> {formatApplicationDate(application.submittedAt)}
                </p>
                {application.appliedPosition ? (
                  <p>
                    <strong>Interested in:</strong> {application.appliedPosition}
                  </p>
                ) : null}
                {application.message ? (
                  <p>
                    <strong>Message:</strong> {application.message}
                  </p>
                ) : null}
              </div>

              <div className="tv-careers-admin-application__actions">
                <select
                  value={application.status}
                  onChange={(event) =>
                    void handleApplicationStatusChange(
                      application.id,
                      event.currentTarget.value as CareerApplicationStatus
                    )
                  }
                  disabled={isUpdatingApplicationId === application.id}
                >
                  {applicationStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <section className="tv-careers-admin-editor">
      <div className="tv-careers-admin-editor__header">
        <div>
          <span className="tv-careers-admin-editor__label">Settings</span>
          <h3>Careers page settings</h3>
        </div>
      </div>

      {isLoadingSettings ? (
        <div className="tv-careers-loading" role="status">
          <LoaderCircle size={22} className="tv-spin" />
          Loading settings...
        </div>
      ) : (
        <form onSubmit={handleSettingsSave} className="tv-careers-admin-form">
          <div className="tv-careers-admin-form__section">
            <div className="tv-careers-admin-form__section-head">
              <h4>Page copy</h4>
            </div>
            <div className="tv-careers-admin-grid">
              <label>
                Careers page title
                <input
                  name="careersPageTitle"
                  value={settingsForm.careersPageTitle}
                  onChange={handleSettingsInputChange}
                  required
                />
              </label>
              <label>
                Careers page subtitle
                <input
                  name="careersPageSubtitle"
                  value={settingsForm.careersPageSubtitle}
                  onChange={handleSettingsInputChange}
                  required
                />
              </label>
            </div>
            <label>
              CTA title
              <input
                name="generalCtaTitle"
                value={settingsForm.generalCtaTitle}
                onChange={handleSettingsInputChange}
                required
              />
            </label>
            <label>
              CTA description
              <textarea
                name="generalCtaDescription"
                value={settingsForm.generalCtaDescription}
                onChange={handleSettingsInputChange}
                rows={4}
                required
              />
            </label>
            <label>
              Notification email
              <input
                type="email"
                name="notificationEmail"
                value={settingsForm.notificationEmail}
                onChange={handleSettingsInputChange}
                required
              />
            </label>
          </div>

          <div className="tv-careers-admin-form__actions">
            <button type="submit" className="tv-btn-primary" disabled={isSavingSettings}>
              <span className="btn-wrap">
                <span className="btn-text1">
                  {isSavingSettings ? 'Saving...' : 'Save Settings'}
                </span>
                <span className="btn-text2">
                  {isSavingSettings ? 'Saving...' : 'Save Settings'}
                </span>
              </span>
            </button>
          </div>
        </form>
      )}
    </section>
  );

  let content: ReactNode = renderDashboard();
  if (activeView === 'jobs') content = renderJobs();
  if (activeView === 'add-job') content = renderAddJob();
  if (activeView === 'applications') content = renderApplications();
  if (activeView === 'settings') content = renderSettings();

  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Careers CMS" subtitle="Admin" />
        <section className="tv-careers-admin pt-130 pb-130">
          {!token ? (
            <div className="container">
              <div className="tv-careers-admin-auth">
                <div className="tv-careers-admin-auth__panel">
                  <span className="tv-careers-admin-auth__badge">
                    <ShieldCheck size={18} />
                    Secure careers admin
                  </span>
                  <h2>Manage career openings without touching code</h2>
                  <p>
                    Use the admin token from backend `.env` to open the CMS, then
                    create, edit, publish, or delete roles from one place.
                  </p>
                  <form onSubmit={handleTokenSubmit} className="tv-careers-admin-auth__form">
                    <label htmlFor="admin-token">Admin token</label>
                    <div className="tv-careers-admin-auth__field">
                      <LockKeyhole size={18} />
                      <input
                        id="admin-token"
                        type="password"
                        value={tokenInput}
                        onChange={(event) => setTokenInput(event.currentTarget.value)}
                        placeholder="Enter careers admin token"
                      />
                    </div>
                    {statusMessage ? (
                      <p className={`tv-admin-status is-${statusType}`}>{statusMessage}</p>
                    ) : null}
                    <button type="submit" className="tv-btn-primary">
                      <span className="btn-wrap">
                        <span className="btn-text1">Unlock CMS</span>
                        <span className="btn-text2">Unlock CMS</span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="tv-careers-admin-frame" ref={adminFrameRef}>
              {statusMessage ? (
                <p className={`tv-admin-status is-${statusType}`}>{statusMessage}</p>
              ) : null}

              <div className="tv-careers-admin-app">
                <div
                  className="tv-careers-admin-sidebar-slot"
                  ref={sidebarSlotRef}
                  style={sidebarSlotHeight ? { height: `${sidebarSlotHeight}px` } : undefined}
                >
                <aside
                  ref={sidebarRef}
                  className={`tv-careers-admin-sidebar is-${sidebarState}`}
                  style={sidebarStyle}
                >
                  <div className="tv-careers-admin-sidebar__brand">
                    <span className="tv-careers-admin-topbar__eyebrow">
                      <Sparkles size={16} />
                      ASPL Careers CMS
                    </span>
                  </div>

                  <nav className="tv-careers-admin-sidebar__nav" aria-label="Careers CMS menu">
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`tv-careers-admin-sidebar__item ${
                            activeView === item.id ? 'is-active' : ''
                          }`}
                          onClick={() => handleMenuSelect(item.id)}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="tv-careers-admin-sidebar__footer">
                    <Link to="/careers" className="tv-careers-admin-sidebar__item">
                      <Eye size={18} />
                      <span>View Site</span>
                    </Link>
                    <button
                      type="button"
                      className="tv-careers-admin-sidebar__item is-logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </aside>
                </div>

                <section className="tv-careers-admin-content">
                  <div className="tv-careers-admin-content__topbar">
                    <div>
                      <span className="tv-careers-admin-editor__label">Admin Panel</span>
                      <h2>{currentPanelTitle}</h2>
                    </div>
                  </div>
                  {content}
                </section>
              </div>
            </div>
          )}
        </section>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
