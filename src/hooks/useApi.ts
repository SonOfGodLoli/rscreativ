/**
 * Hook personalizado para realizar llamadas API
 * 
 * Este hook encapsula la lógica de carga de datos desde el API,
 * proporcionando estados de carga, error y datos de forma reactiva.
 * 
 * Ventajas de usar un hook personalizado:
 * 1. Reutilización de lógica de fetching en múltiples componentes
 * 2. Estados de loading y error manejados automáticamente
 * 3. Código más limpio y declarativo en los componentes
 * 4. Fácil de testear y mantener
 * 
 * @param fetchFunction - Función API a ejecutar
 * @returns Objeto con { data, loading, error, refetch }
 */

import { useState, useEffect, useCallback } from 'react';

/** Tipo de retorno del hook useApi */
interface UseApiReturn<T> {
  data: T | null;        // Datos obtenidos del API
  loading: boolean;      // Estado de carga
  error: string | null;  // Mensaje de error si lo hay
  refetch: () => void;   // Función para recargar datos
}

/**
 * Hook genérico para llamadas API.
 * 
 * @example
 * ```tsx
 * const { data: services, loading, error } = useApi(getServices);
 * ```
 */
export function useApi<T>(fetchFunction: () => Promise<{ data: T }>): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Función para obtener los datos del API.
   * Se ejecuta tanto en el montaje inicial como al llamar a refetch.
   */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction();
      setData(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos';
      setError(errorMessage);
      console.error('Error en useApi:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  // Ejecutar fetchData al montar el componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
