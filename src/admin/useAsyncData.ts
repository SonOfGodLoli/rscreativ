import { useEffect, useRef, useState } from 'react';

/**
 * Carga datos del panel y permite recargarlos manualmente.
 * El loader se mantiene en una ref para evitar bucles de efectos.
 */
export function useAsyncData<T>(loader: () => Promise<{ data: T }>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let alive = true;
    setLoading(true);

    loaderRef
      .current()
      .then((response) => {
        if (alive) {
          setData(response.data);
          setError('');
        }
      })
      .catch(() => {
        if (alive) {
          setError('No se pudieron cargar los datos');
        }
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [version]);

  return { data, loading, error, reload: () => setVersion((value) => value + 1) };
}
