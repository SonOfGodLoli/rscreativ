import { useEffect, useRef, useState } from 'react';
import { Check, ImagePlus, Images, Plus, Trash2, Upload } from 'lucide-react';
import { listMedia, mediaUrl, uploadMedia } from '../api';
import type { MediaItem } from '../api';
import { Alert, Button, Field, Input } from './ui';

interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/avif';

export default function MultiImageUploader({
  value,
  onChange,
  label = 'Imágenes',
}: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [manualUrl, setManualUrl] = useState('');

  const [showLibrary, setShowLibrary] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [mediaError, setMediaError] = useState('');

  const images = Array.isArray(value) ? value : [];

  useEffect(() => {
    if (!showLibrary || media.length > 0) return;

    let active = true;
    setLoadingMedia(true);
    setMediaError('');

    listMedia()
      .then((response) => {
        if (active) setMedia(response.data);
      })
      .catch(() => {
        if (active) setMediaError('No se pudieron cargar las imágenes subidas');
      })
      .finally(() => {
        if (active) setLoadingMedia(false);
      });

    return () => {
      active = false;
    };
  }, [showLibrary, media.length]);

  function addUrls(urls: string[]) {
    const next = [...images];

    urls.forEach((url) => {
      const clean = url.trim();
      if (clean && !next.includes(clean)) next.push(clean);
    });

    if (next.length !== images.length) onChange(next);
  }

  function removeUrl(url: string) {
    onChange(images.filter((item) => item !== url));
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    const uploaded: string[] = [];
    let failed = 0;

    for (const file of Array.from(files).slice(0, 10)) {
      try {
        const response = await uploadMedia(file);
        uploaded.push(response.data.url);
      } catch {
        failed += 1;
      }
    }

    addUrls(uploaded);

    if (uploaded.length > 0 && failed === 0) {
      setError('');
    } else if (failed > 0) {
      setError(
        uploaded.length > 0
          ? `${uploaded.length} imagen(es) subidas, ${failed} fallaron (máx. 8 MB, JPG/PNG/WEBP/GIF/AVIF)`
          : 'No se pudo subir la imagen (máx. 8 MB, JPG/PNG/WEBP/GIF/AVIF)'
      );
    }

    setUploading(false);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  function addManual() {
    if (!manualUrl.trim()) return;
    addUrls([manualUrl]);
    setManualUrl('');
  }

  return (
    <div className="space-y-3">
      <Field label={label}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPT}
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />
          <Button type="button" variant="secondary" disabled={uploading} onClick={() => inputRef.current?.click()}>
            {uploading ? <Upload className="h-4 w-4 animate-pulse" /> : <ImagePlus className="h-4 w-4" />}
            {uploading ? 'Subiendo...' : 'Subir imágenes'}
          </Button>

          <Button type="button" variant="ghost" onClick={() => setShowLibrary((open) => !open)}>
            <Images className="h-4 w-4" /> {showLibrary ? 'Ocultar biblioteca' : 'Ver imágenes subidas'}
          </Button>
        </div>
      </Field>

      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-56 flex-1">
          <Field label="O pega una URL">
            <Input
              value={manualUrl}
              placeholder="https://... o /api/media/..."
              onChange={(event) => setManualUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addManual();
                }
              }}
            />
          </Field>
        </div>
        <Button type="button" variant="secondary" onClick={addManual}>
          <Plus className="h-4 w-4" /> Añadir
        </Button>
      </div>

      {error && <Alert>{error}</Alert>}

      {showLibrary && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Imágenes ya subidas</p>
            {loadingMedia && <span className="text-xs text-gray-500">Cargando...</span>}
          </div>

          {mediaError && <Alert>{mediaError}</Alert>}

          {!loadingMedia && media.length === 0 && !mediaError && (
            <p className="text-xs text-gray-500">
              Todavía no hay imágenes subidas. Usa «Subir imágenes» para agregar la primera.
            </p>
          )}

          <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4 md:grid-cols-6">
            {media.map((item) => {
              const url = mediaUrl(item.id);
              const selected = images.includes(url);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => (selected ? removeUrl(url) : addUrls([url]))}
                  title={selected ? 'Quitar del portafolio' : 'Añadir al portafolio'}
                  className={`relative overflow-hidden rounded-lg border-2 transition ${
                    selected ? 'border-[#9a171c] ring-2 ring-[#eb9192]/50' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={url}
                    alt={item.filename}
                    loading="lazy"
                    className="h-20 w-full bg-gray-100 object-cover"
                  />
                  {selected && (
                    <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#9a171c] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="group relative overflow-hidden rounded-lg border border-gray-200">
              <img src={url} alt={`Imagen ${index + 1}`} className="h-28 w-full bg-gray-100 object-cover" />
              <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeUrl(url)}
                title="Quitar imagen"
                className="absolute right-1 top-1 rounded bg-red-600 p-1 text-white opacity-90 transition hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500">Sin imágenes. Sube archivos o elige las que ya están en la biblioteca.</p>
      )}
    </div>
  );
}
