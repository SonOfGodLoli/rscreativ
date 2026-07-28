/**
 * Configuración de Vite para el proyecto RS Creativ
 * 
 * Este archivo configura el bundler Vite con las siguientes características:
 * - Plugin de React para soporte de JSX/TSX
 * - Plugin de Tailwind CSS v4 para estilos
 * - Alias de rutas para importaciones más limpias
 * - Configuración del servidor de desarrollo
 * - Proxy para peticiones API al backend
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/rscreativ/',
  // Plugins de Vite: React y Tailwind CSS
  plugins: [react(), tailwindcss()],
  
  // Configuración de resolución de rutas
  resolve: {
    alias: {
      // Alias '@' que apunta a la carpeta src/
      // Permite importar archivos como: import Component from '@/components/Component'
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173, // Puerto del servidor de desarrollo
    
    // Proxy para redirigir peticiones /api al backend
    // Útil durante el desarrollo para evitar problemas de CORS
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // URL del backend
        changeOrigin: true, // Cambia el origin del header para evitar CORS
      },
    },
  },
})