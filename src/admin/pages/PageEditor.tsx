import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowUp, ChevronLeft, Plus, Save, Trash2 } from 'lucide-react';
import {
  createSection,
  deleteSection,
  getPage,
  reorderSections,
  updatePage,
  updateSection,
} from '../api';
import type { Page, Section, SectionItem } from '../api';
import { useAsyncData } from '../useAsyncData';
import { Alert, Badge, Button, Field, Input, Panel, Select, Textarea } from '../components/ui';
import ImageUploader from '../components/ImageUploader';

const KINDS: { value: Section['kind']; label: string }[] = [
  { value: 'text', label: 'Texto' },
  { value: 'hero', label: 'Portada (hero)' },
  { value: 'gallery', label: 'Galería de imágenes' },
  { value: 'cards', label: 'Tarjetas' },
  { value: 'cta', label: 'Llamada a la acción' },
];

function emptySection(pageId: string, order: number): Partial<Section> {
  return {
    pageId,
    kind: 'text',
    eyebrow: '',
    title: '',
    subtitle: '',
    body: '',
    image: '',
    images: [],
    ctaLabel: '',
    ctaUrl: '',
    items: [],
    order,
    visible: true,
  };
}

function ItemsEditor({ items, onChange }: { items: SectionItem[]; onChange: (items: SectionItem[]) => void }) {
  function update(index: number, patch: Partial<SectionItem>) {
    onChange(items.map((item, position) => (position === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-gray-200 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Tarjeta {index + 1}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChange(items.filter((_, position) => position !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Input
              placeholder="Título"
              value={item.title}
              onChange={(event) => update(index, { title: event.target.value })}
            />
            <Input
              placeholder="URL de imagen"
              value={item.image}
              onChange={(event) => update(index, { image: event.target.value })}
            />
            <div className="sm:col-span-2">
              <Textarea
                placeholder="Descripción"
                value={item.description}
                onChange={(event) => update(index, { description: event.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => onChange([...items, { title: '', description: '', image: '' }])}
      >
        <Plus className="h-4 w-4" /> Agregar tarjeta
      </Button>
    </div>
  );
}

function SectionCard({
  section,
  index,
  total,
  onChanged,
  onMove,
}: {
  section: Section;
  index: number;
  total: number;
  onChanged: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const [form, setForm] = useState(section);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(section);
  }, [section]);

  function set<K extends keyof Section>(key: K, value: Section[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage('');

    try {
      await updateSection(section.id, form);
      setMessage('Guardado');
      onChanged();
    } catch {
      setMessage('No se pudo guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm('¿Eliminar esta sección?')) return;
    await deleteSection(section.id);
    onChanged();
  }

  return (
    <Panel className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge tone="amber">#{index + 1}</Badge>
          <span className="text-sm font-semibold text-gray-700">{KINDS.find((kind) => kind.value === form.kind)?.label}</span>
          <Badge tone={form.visible ? 'green' : 'gray'}>{form.visible ? 'Visible' : 'Oculta'}</Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" disabled={index === 0} onClick={() => onMove(-1)} title="Subir">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" disabled={index === total - 1} onClick={() => onMove(1)} title="Bajar">
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button variant="danger" onClick={remove} title="Eliminar">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Tipo de sección">
          <Select value={form.kind} onChange={(event) => set('kind', event.target.value as Section['kind'])}>
            {KINDS.map((kind) => (
              <option key={kind.value} value={kind.value}>
                {kind.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Texto pequeño superior (eyebrow)">
          <Input value={form.eyebrow} onChange={(event) => set('eyebrow', event.target.value)} />
        </Field>
        <Field label="Título">
          <Input value={form.title} onChange={(event) => set('title', event.target.value)} />
        </Field>
        <Field label="Subtítulo">
          <Input value={form.subtitle} onChange={(event) => set('subtitle', event.target.value)} />
        </Field>
      </div>

      <Field label="Contenido">
        <Textarea value={form.body} onChange={(event) => set('body', event.target.value)} />
      </Field>

      <ImageUploader label="Imagen principal" value={form.image} onChange={(value) => set('image', value)} />

      <Field label="Galería (una URL por línea)">
        <Textarea
          value={form.images.join('\n')}
          onChange={(event) =>
            set(
              'images',
              event.target.value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Texto del botón">
          <Input value={form.ctaLabel} onChange={(event) => set('ctaLabel', event.target.value)} />
        </Field>
        <Field label="Enlace del botón">
          <Input value={form.ctaUrl} onChange={(event) => set('ctaUrl', event.target.value)} />
        </Field>
      </div>

      {(form.kind === 'cards' || (form.items && form.items.length > 0)) && (
        <div>
          <span className="mb-1 block text-sm font-medium text-gray-700">Tarjetas</span>
          <ItemsEditor items={form.items ?? []} onChange={(items) => set('items', items)} />
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.visible}
          onChange={(event) => set('visible', event.target.checked)}
          className="h-4 w-4 accent-[#9a171c]"
        />
        Mostrar esta sección en el sitio
      </label>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? 'Guardando...' : 'Guardar sección'}
        </Button>
        {message && <Alert tone={message === 'Guardado' ? 'success' : 'error'}>{message}</Alert>}
      </div>
    </Panel>
  );
}

export default function PageEditor() {
  const { id = '' } = useParams();
  const { data, loading, error, reload } = useAsyncData(() => getPage(id));
  const [meta, setMeta] = useState<Page | null>(null);
  const [metaMessage, setMetaMessage] = useState('');
  const [newSection, setNewSection] = useState<Partial<Section> | null>(null);

  useEffect(() => {
    if (data) {
      setMeta(data);
    }
  }, [data]);

  async function saveMeta(event: React.FormEvent) {
    event.preventDefault();
    if (!meta) return;

    setMetaMessage('');

    try {
      await updatePage(meta.id, {
        title: meta.title,
        slug: meta.slug,
        description: meta.description,
        published: meta.published,
        order: meta.order,
      });
      setMetaMessage('Página actualizada');
      reload();
    } catch {
      setMetaMessage('No se pudo actualizar (revisa el slug)');
    }
  }

  async function addSection() {
    if (!data || !newSection) return;
    await createSection(data.id, newSection);
    setNewSection(null);
    reload();
  }

  function moveSection(index: number, direction: -1 | 1) {
    if (!data?.sections) return;

    const ids = data.sections.map((section) => section.id);
    const target = index + direction;

    if (target < 0 || target >= ids.length) return;

    [ids[index], ids[target]] = [ids[target], ids[index]];
    reorderSections(data.id, ids).then(reload);
  }

  if (loading) return <p className="text-sm text-gray-500">Cargando página...</p>;
  if (error || !data || !meta) return <Alert>{error || 'Página no encontrada'}</Alert>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/admin/paginas">
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <Panel>
        <form className="space-y-3" onSubmit={saveMeta}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Título">
              <Input value={meta.title} onChange={(event) => setMeta({ ...meta, title: event.target.value })} />
            </Field>
            <Field label="Slug (URL)">
              <Input value={meta.slug} onChange={(event) => setMeta({ ...meta, slug: event.target.value.toLowerCase() })} />
            </Field>
          </div>
          <Field label="Descripción">
            <Textarea
              value={meta.description}
              onChange={(event) => setMeta({ ...meta, description: event.target.value })}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={meta.published}
              onChange={(event) => setMeta({ ...meta, published: event.target.checked })}
              className="h-4 w-4 accent-[#9a171c]"
            />
            Página publicada
          </label>
          <div className="flex items-center gap-3">
            <Button type="submit">
              <Save className="h-4 w-4" /> Guardar página
            </Button>
            {metaMessage && (
              <Alert tone={metaMessage === 'Página actualizada' ? 'success' : 'error'}>{metaMessage}</Alert>
            )}
          </div>
        </form>
      </Panel>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-gray-900">Secciones ({data.sections?.length ?? 0})</h2>
        <Button onClick={() => setNewSection(emptySection(data.id, data.sections?.length ?? 0))}>
          <Plus className="h-4 w-4" /> Agregar sección
        </Button>
      </div>

      {newSection && (
        <Panel className="space-y-3 border-dashed border-[#eb9192]">
          <h3 className="font-semibold text-gray-900">Nueva sección</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Tipo">
              <Select
                value={newSection.kind}
                onChange={(event) =>
                  setNewSection({ ...newSection, kind: event.target.value as Section['kind'] })
                }
              >
                {KINDS.map((kind) => (
                  <option key={kind.value} value={kind.value}>
                    {kind.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Título">
              <Input
                value={newSection.title ?? ''}
                onChange={(event) => setNewSection({ ...newSection, title: event.target.value })}
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <Button onClick={addSection}>Crear sección</Button>
            <Button variant="secondary" onClick={() => setNewSection(null)}>
              Cancelar
            </Button>
          </div>
        </Panel>
      )}

      {(data.sections ?? []).map((section, index) => (
        <SectionCard
          key={section.id}
          section={section}
          index={index}
          total={data.sections?.length ?? 0}
          onChanged={reload}
          onMove={(direction) => moveSection(index, direction)}
        />
      ))}

      {data.sections?.length === 0 && (
        <Alert tone="info">Esta página aún no tiene secciones. Agrega la primera arriba.</Alert>
      )}
    </div>
  );
}
