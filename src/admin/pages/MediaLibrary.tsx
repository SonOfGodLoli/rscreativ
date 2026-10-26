import { useRef, useState } from 'react';
import { Copy, Trash2, Upload } from 'lucide-react';
import { deleteMedia, listMedia, mediaUrl, uploadMedia } from '../api';
import { useAsyncData } from '../useAsyncData';
import { Alert, Button, Panel } from '../components/ui';

export default function MediaLibrary() {
  const { data, loading, error, reload } = useAsyncData(listMedia);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState('');

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage('');

    try {
      for (const file of Array.from(files).slice(0, 10)) {
        await uploadMedia(file);
      }

      setMessage('Imágenes subidas');
      reload();
    } catch {
      setMessage('Alguna imagen no se pudo subir');
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  async function copyUrl(id: string) {
    await navigator.clipboard.writeText(mediaUrl(id));
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  }

  async function remove(id: string) {
    if (!window.confirm('¿Eliminar esta imagen? Las secciones que la usan quedarán sin imagen.')) return;
    await deleteMedia(id);
    reload();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Imágenes</h1>
          <p className="text-sm text-gray-500">Sube imágenes y copia su URL para usarlas en cualquier sección.</p>
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />
          <Button disabled={uploading} onClick={() => inputRef.current?.click()}>
            <Upload className="h-4 w-4" /> {uploading ? 'Subiendo...' : 'Subir imágenes'}
          </Button>
        </div>
      </div>

      {message && <Alert tone={message === 'Imágenes subidas' ? 'success' : 'error'}>{message}</Alert>}
      {error && <Alert>{error}</Alert>}

      {loading && <p className="text-sm text-gray-500">Cargando...</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(data ?? []).map((item) => (
          <Panel key={item.id} className="flex flex-col gap-2 p-3">
            <img
              src={mediaUrl(item.id)}
              alt={item.filename}
              loading="lazy"
              className="h-36 w-full rounded-lg bg-gray-100 object-cover"
            />
            <p className="truncate text-xs text-gray-600" title={item.filename}>
              {item.filename}
            </p>
            <p className="text-xs text-gray-400">
              {item.width && item.height ? `${item.width}×${item.height} · ` : ''}
              {(item.size / 1024).toFixed(0)} KB
            </p>
            <div className="flex items-center gap-1">
              <Button variant="secondary" className="flex-1" onClick={() => copyUrl(item.id)}>
                <Copy className="h-4 w-4" /> {copied === item.id ? 'Copiado' : 'URL'}
              </Button>
              <Button variant="danger" onClick={() => remove(item.id)} title="Eliminar">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Panel>
        ))}
      </div>

      {!loading && data?.length === 0 && <Alert tone="info">Todavía no hay imágenes subidas.</Alert>}
    </div>
  );
}
