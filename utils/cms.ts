import { api } from './api';
import { backendServices, backendIndustries } from './industriesServicesData';

export interface ServiceFeature {
  title: string;
  desc: string;
  iconName: string;
}

export interface ServiceModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  features: ServiceFeature[];
}

export interface ResourceModel {
  id: string;
  title: string;
  category: string;
  format: string;
  date: string;
  readTime: string;
}

export interface JobModel {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
}

export interface IndustryFeature {
  title: string;
  desc: string;
  iconName: string;
}

export interface IndustryModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  features: IndustryFeature[];
}

export interface FooterLinkModel {
  id: string;
  column: 'Quick Links' | 'Services' | 'Resources';
  label: string;
  url: string;
}

// ============================================================
// Default data — used as fallback when API is unreachable
// ============================================================

const defaultServices: ServiceModel[] = backendServices;

const defaultResources: ResourceModel[] = [
  { id: '1', title: "The Future of Industrial AI", category: "AI & ML", format: "PDF Guide", date: "Oct 24", readTime: "15 min" }
];

const defaultJobs: JobModel[] = [
  { id: '1', title: "Lead ML Engineer", department: "Data/AI", location: "On Location", type: "FULL-TIME", tags: ["MLOps", "Cloud", "Predictive Modeling"] }
];

const defaultIndustries: IndustryModel[] = backendIndustries;

const defaultFooterLinks: FooterLinkModel[] = [
  { id: '1', column: 'Quick Links', label: 'Home', url: '/' },
  { id: '2', column: 'Quick Links', label: 'About Us', url: '/#about' },
  { id: '3', column: 'Quick Links', label: 'Industries', url: '/#industries' },
  { id: '4', column: 'Quick Links', label: 'Careers', url: '/careers' },
  { id: '5', column: 'Quick Links', label: 'Contact', url: '/#contact' },
  { id: '6', column: 'Services', label: 'AI & ML Services', url: '/solutions/ai-ml-services' },
  { id: '7', column: 'Services', label: 'Cloud & Digital Operations', url: '/solutions/cloud-cognitive' },
  { id: '8', column: 'Services', label: 'Mechanical & Industrial', url: '/solutions/mechanical-industrial' },
  { id: '9', column: 'Services', label: 'Pipeline Design & Installation', url: '/solutions/pipeline-design' },
  { id: '10', column: 'Services', label: 'Gas Industry Solutions', url: '/solutions/gas-industry' },
  { id: '11', column: 'Services', label: 'Digital Marketing', url: '/solutions/digital-marketing' },
  { id: '12', column: 'Services', label: 'Consulting & Cybersecurity', url: '/solutions/enterprise-solutions' },
  { id: '13', column: 'Resources', label: 'Blog', url: '/#resources' },
  { id: '14', column: 'Resources', label: 'Case Studies', url: '/#resources' },
  { id: '15', column: 'Resources', label: 'Whitepapers', url: '/#resources' },
  { id: '16', column: 'Resources', label: 'Tutorials', url: '/#resources' },
  { id: '17', column: 'Resources', label: 'Company Updates', url: '/#resources' }
];

// ============================================================
// Async API-backed CMS helpers (with fallback to defaults)
// ============================================================

function createAPIHelper<T extends { id: string }>(endpoint: string, staticDataFile: string, fallbackData: T[]) {
  return {
    getAll: async (): Promise<T[]> => {
      try {
        // First try to fetch from static JSON file
        const response = await fetch(staticDataFile);
        if (response.ok) {
          console.log(`[CMS] Loaded ${staticDataFile} from static files`);
          return await response.json();
        }
      } catch (err) {
        console.warn(`[CMS] Static file ${staticDataFile} not found, trying API...`);
      }

      try {
        // Try API endpoint as secondary source
        return await api.get<T[]>(endpoint);
      } catch (err) {
        console.warn(`API ${endpoint} unavailable, using defaults:`, err);
        return fallbackData;
      }
    },
    add: async (item: Omit<T, 'id'>): Promise<T> => {
      return await api.post<T>(endpoint, item);
    },
    update: async (id: string, updated: Partial<T>): Promise<T> => {
      return await api.put<T>(`${endpoint}/${id}`, updated);
    },
    remove: async (id: string): Promise<void> => {
      await api.delete(`${endpoint}/${id}`);
    }
  };
}

export const CMSServices = createAPIHelper<ServiceModel>('/services', '/data/services.json', defaultServices);
export const CMSResources = createAPIHelper<ResourceModel>('/resources', '/data/resources.json', defaultResources);
export const CMSJobs = createAPIHelper<JobModel>('/jobs', '/data/jobs.json', defaultJobs);
export const CMSIndustries = createAPIHelper<IndustryModel>('/industries', '/data/industries.json', defaultIndustries);
export const CMSFooterLinks = createAPIHelper<FooterLinkModel>('/footer-links', '/data/footer-links.json', defaultFooterLinks);
