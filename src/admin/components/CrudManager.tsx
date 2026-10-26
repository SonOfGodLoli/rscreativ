import { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { Alert, Button, Field, Input, Panel, Select, Textarea } from './ui';
import ImageUploader from './ImageUploader';

export interface CrudField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'checkbox' | 'number' | 'lines' | 'select';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface CrudManagerProps<T extends { id: string }> {
  title: string;
  description?: string;
  fields: CrudField[];
  empty: Record<string, unknown>;
  items: T[];
  loading: boolean;
  error: string;
  itemTitle: (item: T) => string;
  onCreate: (data: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<unknown>;
  onDelete: (item: T) => Promise<unknown>;
  onReload: () => void;
}

function emptyForm(empty: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(empty)) as Record<string, unknown>;
}

export default function CrudManager<T extends { id: string }>({
  title,
  description,
  fields,
  empty,
  items,
  loading,
  error,
  itemTitle,
  onCreate,
  onUpdate,
  onDelete,
  onReload,
}: CrudManagerProps<T>) {
  const [form, setForm] = useState<Record<string, unknown>>(() => emptyForm(empty));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(emptyForm(empty));
  }, [empty]);

  function set(key: string, value: unknown) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setForm(emptyForm(empty));
    setEditingId(null);
    setMessage('');
  }

  function startEdit(item: T) {
    setEditingId(item.id);
    setForm({ ...(item as unknown as Record<string, unknown>) });
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      if (editingId) {
        await onUpdate(editingId, form);
        setMessage('Actualizado');
      } else {
        await onCreate(form);
        setMessage('Creado');
      }

      reset();
      onReload();
    } catch {
      setMessage('No se pudo guardar. Revisa los datos.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: T) {
    if (!window.confirm(`¿Eliminar "${itemTitle(item)}"?`)) return;
    await onDelete(item);
    if (editingId === item.id) reset();
    onReload();
  }

  function renderField(field: CrudField) {
    const value = form[field.key];

    if (field.type === 'checkbox') {
      return (
        <label key={field.key} className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => set(field.key, event.target.checked)}
            className="h-4 w-4 accent-[#9a171c]"
          />
          {field.label}
        </label>
      );
    }

    if (field.type === 'image') {
      return (
        <div key={field.key} className={field.key === 'logo' ? '' : 'sm:col-span-2'}>
          <ImageUploader label={field.label} value={String(value ?? '')} onChange={(url) => set(field.key, url)} />
        </div>
      );
    }

    return (
      <Field key={field.key} label={field.label}>
        {field.type === 'textarea' ? (
          <Textarea
            required={field.required}
            placeholder={field.placeholder}
            value={String(value ?? '')}
            onChange={(event) => set(field.key, event.target.value)}
          />
        ) : field.type === 'lines' ? (
          <Textarea
            placeholder={field.placeholder ?? 'Una por línea'}
            value={Array.isArray(value) ? value.join('\n') : ''}
            onChange={(event) =>
              set(
                field.key,
                event.target.value
                  .split('\n')
                  .map((line) => line.trim())
                  .filter(Boolean)
              )
            }
          />
        ) : field.type === 'select' ? (
          <Select value={String(value ?? '')} onChange={(event) => set(field.key, event.target.value)}>
            {(field.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            required={field.required}
            type={field.type === 'number' ? 'number' : 'text'}
            placeholder={field.placeholder}
            value={String(value ?? '')}
            onChange={(event) =>
              set(field.key, field.type === 'number' ? Number(event.target.value) : event.target.value)
            }
          />
        )}
      </Field>
    );
  }

  const imageField = fields.find((field) => field.type === 'image');

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <Panel>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900">
            {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editingId ? 'Editar registro' : 'Nuevo registro'}
          </h2>
          {editingId && (
            <Button variant="secondary" onClick={reset}>
              <X className="h-4 w-4" /> Cancelar
            </Button>
          )}
        </div>

        <form className="grid gap-3 sm:grid-cols-2" onSubmit={submit}>
          {fields.map(renderField)}

          <div className="sm:col-span-2">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4" /> {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear'}
            </Button>
          </div>
        </form>

        {message && <div className="mt-3"><Alert tone={message === 'No se pudo guardar. Revisa los datos.' ? 'error' : 'success'}>{message}</Alert></div>}
      </Panel>

      <Panel>
        {error && <Alert>{error}</Alert>}
        {loading && <p className="text-sm text-gray-500">Cargando...</p>}

        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const record = item as unknown as Record<string, unknown>;
            const image = imageField ? String(record[imageField.key] ?? '') : '';

            return (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  {image && (
                    <img src={image} alt="" className="h-12 w-12 rounded-lg border border-gray-200 object-cover" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">{itemTitle(item)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => startEdit(item)}>
                    <Pencil className="h-4 w-4" /> Editar
                  </Button>
                  <Button variant="danger" onClick={() => remove(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          {!loading && items.length === 0 && <p className="py-4 text-sm text-gray-500">No hay registros todavía.</p>}
        </div>
      </Panel>
    </div>
  );
}
