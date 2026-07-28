/**
 * Cliente API para comunicarse con el backend
 * 
 * Este módulo encapsula todas las llamadas HTTP al servidor Express.
 * Utiliza Axios para realizar peticiones REST.
 * 
 * Ventajas de usar un módulo dedicado:
 * 1. Centraliza todas las llamadas API en un solo lugar
 * 2. Facilita el cambio de URL base sin modificar cada componente
 * 3. Permite manejar errores de forma centralizada
 * 4. Facilita la adición de headers de autenticación futuros
 */

import axios from 'axios';

/**
 * Instancia de Axios configurada con la URL base del API.
 * En desarrollo, Vite proxy redirige /api a localhost:3001
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de respuesta para manejar errores globalmente.
 * Si el servidor responde con error, se captura aquí.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==================== TIPOS ====================

/** Interfaz para los servicios ofrecidos por RS Creativ */
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  created_at: string;
}

/** Interfaz para los trabajos del portafolio */
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  client_name: string;
  featured: boolean;
  created_at: string;
}

/** Interfaz para los miembros del equipo */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  order: number;
}

/** Interfaz para los clientes */
export interface Client {
  id: string;
  name: string;
  logo: string;
  website_url: string;
  featured: boolean;
}

/** Interfaz para los mensajes de contacto */
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

/** Interfaz para configuración del sitio */
export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

// ==================== FUNCIONES API ====================

/** Servicios */
export const getServices = () => api.get<Service[]>('/services');
export const getServiceById = (id: string) => api.get<Service>(`/services/${id}`);
export const getServicesByCategory = (category: string) => api.get<Service[]>(`/services?category=${category}`);

/** Portafolio */
export const getPortfolio = () => api.get<PortfolioItem[]>('/portfolio');
export const getPortfolioById = (id: string) => api.get<PortfolioItem>(`/portfolio/${id}`);
export const getPortfolioByCategory = (category: string) => api.get<PortfolioItem[]>(`/portfolio?category=${category}`);

/** Equipo */
export const getTeam = () => api.get<TeamMember[]>('/team');

/** Clientes */
export const getClients = () => api.get<Client[]>('/clients');

/** Contacto */
export const sendMessage = (data: Omit<ContactMessage, 'id' | 'read' | 'created_at'>) => 
  api.post<ContactMessage>('/contact', data);

/** Configuración del sitio */
export const getSiteSettings = () => api.get<SiteSetting[]>('/settings');

export default api;
