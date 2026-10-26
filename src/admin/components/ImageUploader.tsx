import { useRef, useState } from 'react';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { uploadMedia } from '../api';
import { Alert, Button, Field, Input } from './ui';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Imagen' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const response = await uploadMedia(file);
      onChange(response.data.url);
    } catch {
      setError('No se pudo subir la imagen (máx. 8 MB, JPG/PNG/WEBP/GIF/AVIF)');
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className="space-y-2">
      <Field label={label}>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://... o sube un archivo"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        <Button type="button" variant="secondary" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? <Upload className="h-4 w-4 animate-pulse" /> : <ImagePlus className="h-4 w-4" />}
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </Button>
        {value && (
          <Button type="button" variant="ghost" onClick={() => onChange('')}>
            <Trash2 className="h-4 w-4" /> Quitar
          </Button>
        )}
      </div>

      {error && <Alert>{error}</Alert>}

      {value && (
        <img
          src={value}
          alt="Vista previa"
          className="max-h-48 w-auto rounded-lg border border-gray-200 object-contain"
        />
      )}
    </div>
  );
}
