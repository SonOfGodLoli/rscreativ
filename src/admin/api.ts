import api from '@/services/api';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
}

export interface SectionItem {
  title: string;
  description: string;
  image: string;
}

export interface Section {
  id: string;
  pageId: string;
  kind: 'hero' | 'text' | 'gallery' | 'cards' | 'cta';
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  images: string[];
  ctaLabel: string;
  ctaUrl: string;
  items: SectionItem[] | null;
  order: number;
  visible: boolean;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  published: boolean;
  order: number;
  sections?: Section[];
  _count?: { sections: number };
}

export interface SubsectionSection {
  id: string;
  subsectionId: string;
  title: string;
  body: string;
  image: string;
  order: number;
}

export interface Subsection {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  image: string;
  price: string;
  order: number;
  sections: SubsectionSection[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  created_at: string;
  subsections: Subsection[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  client_name: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  order: number;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  website_url: string;
  featured: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  createdAt: string;
}

export interface MediaUploadResult extends MediaItem {
  url: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
  active: boolean;
  created_at: string;
}

// ==================== AUTH ====================

export const login = (email: string, password: string) =>
  api.post<{ token: string; user: AuthUser }>('/auth/login', { email, password });

export const me = () => api.get<AuthUser>('/auth/me');

export const changePassword = (currentPassword: string, newPassword: string) =>
  api.post('/auth/change-password', { currentPassword, newPassword });

// ==================== PÁGINAS Y SECCIONES ====================

export const listPages = () => api.get<Page[]>('/admin/pages');
export const getPage = (id: string) => api.get<Page>(`/admin/pages/${id}`);
export const createPage = (data: Partial<Page>) => api.post<Page>('/admin/pages', data);
export const updatePage = (id: string, data: Partial<Page>) => api.patch<Page>(`/admin/pages/${id}`, data);
export const deletePage = (id: string) => api.delete(`/admin/pages/${id}`);
export const createSection = (pageId: string, data: Partial<Section>) =>
  api.post<Section>(`/admin/pages/${pageId}/sections`, data);
export const updateSection = (id: string, data: Partial<Section>) =>
  api.patch<Section>(`/admin/sections/${id}`, data);
export const deleteSection = (id: string) => api.delete(`/admin/sections/${id}`);
export const reorderSections = (pageId: string, ids: string[]) =>
  api.put(`/admin/pages/${pageId}/sections/reorder`, { ids });

// ==================== MEDIA ====================

const mediaBase = (api.defaults.baseURL ?? '').replace(/\/api$/, '');

export const mediaUrl = (id: string) => `${mediaBase}/api/media/${id}`;

export const listMedia = () => api.get<MediaItem[]>('/admin/media');
export const uploadMedia = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post<MediaUploadResult>('/admin/media', form);
};
export const deleteMedia = (id: string) => api.delete(`/admin/media/${id}`);

// ==================== SERVICIOS ====================

export const listServices = () => api.get<Service[]>('/admin/services');
export const createService = (data: Partial<Service>) => api.post<Service>('/admin/services', data);
export const updateService = (id: string, data: Partial<Service>) =>
  api.patch<Service>(`/admin/services/${id}`, data);
export const deleteService = (id: string) => api.delete(`/admin/services/${id}`);
export const createSubsection = (serviceId: string, data: Partial<Subsection>) =>
  api.post<Subsection>(`/admin/services/${serviceId}/subsections`, data);
export const updateSubsection = (serviceId: string, id: string, data: Partial<Subsection>) =>
  api.patch(`/admin/services/${serviceId}/subsections/${id}`, data);
export const deleteSubsection = (serviceId: string, id: string) =>
  api.delete(`/admin/services/${serviceId}/subsections/${id}`);

export const createSubsectionSection = (
  serviceId: string,
  subsectionId: string,
  data: Partial<SubsectionSection>
) => api.post<SubsectionSection>(`/admin/services/${serviceId}/subsections/${subsectionId}/sections`, data);
export const updateSubsectionSection = (
  serviceId: string,
  subsectionId: string,
  id: string,
  data: Partial<SubsectionSection>
) => api.patch(`/admin/services/${serviceId}/subsections/${subsectionId}/sections/${id}`, data);
export const deleteSubsectionSection = (serviceId: string, subsectionId: string, id: string) =>
  api.delete(`/admin/services/${serviceId}/subsections/${subsectionId}/sections/${id}`);

// ==================== PORTAFOLIO ====================

export const listPortfolio = () => api.get<PortfolioItem[]>('/admin/portfolio');
export const createPortfolio = (data: Partial<PortfolioItem>) =>
  api.post<PortfolioItem>('/admin/portfolio', data);
export const updatePortfolio = (id: string, data: Partial<PortfolioItem>) =>
  api.patch<PortfolioItem>(`/admin/portfolio/${id}`, data);
export const deletePortfolio = (id: string) => api.delete(`/admin/portfolio/${id}`);

// ==================== EQUIPO ====================

export const listTeam = () => api.get<TeamMember[]>('/admin/team');
export const createTeam = (data: Partial<TeamMember>) => api.post<TeamMember>('/admin/team', data);
export const updateTeam = (id: string, data: Partial<TeamMember>) =>
  api.patch<TeamMember>(`/admin/team/${id}`, data);
export const deleteTeam = (id: string) => api.delete(`/admin/team/${id}`);

// ==================== CLIENTES ====================

export const listClients = () => api.get<Client[]>('/admin/clients');
export const createClient = (data: Partial<Client>) => api.post<Client>('/admin/clients', data);
export const updateClient = (id: string, data: Partial<Client>) =>
  api.patch<Client>(`/admin/clients/${id}`, data);
export const deleteClient = (id: string) => api.delete(`/admin/clients/${id}`);

// ==================== MENSAJES ====================

export const listMessages = () => api.get<ContactMessage[]>('/admin/messages');
export const setMessageRead = (id: string, read: boolean) =>
  api.patch(`/admin/messages/${id}`, { read });
export const deleteMessage = (id: string) => api.delete(`/admin/messages/${id}`);

// ==================== CONFIGURACIÓN ====================

export const listSettings = () => api.get<SiteSetting[]>('/admin/settings');
export const saveSetting = (key: string, value: string) =>
  api.put<SiteSetting>('/admin/settings', { key, value });
export const deleteSetting = (key: string) => api.delete(`/admin/settings/${key}`);

// ==================== USUARIOS ====================

export const listUsers = () => api.get<AdminUser[]>('/admin/users');
export const createUser = (data: { email: string; name: string; password: string; role: string }) =>
  api.post<AdminUser>('/admin/users', data);
export const updateUser = (id: string, data: Partial<AdminUser> & { password?: string }) =>
  api.patch<AdminUser>(`/admin/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/admin/users/${id}`);
