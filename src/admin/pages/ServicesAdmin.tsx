import { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import {
  createService,
  createSubsection,
  deleteService,
  deleteSubsection,
  listServices,
  updateService,
  updateSubsection,
} from '../api';
import type { Service, Subsection } from '../api';
import { useAsyncData } from '../useAsyncData';
import { Alert, Badge, Button, Field, Input, Panel, Select, Textarea } from '../components/ui';
import ImageUploader from '../components/ImageUploader';

const CATEGORIES = ['impresion', 'diseno', 'celebraciones', 'personalizados'];

const EMPTY_SERVICE = {
  title: '',
  description: '',
  image: '',
  category: 'impresion',
  features: [] as string[],
};

function SubsectionRow({
  serviceId,
  subsection,
  onChanged,
}: {
  serviceId: string;
  subsection: Subsection;
  onChanged: () => void;
}) {
  const [form, setForm] = useState(subsection);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(subsection);
  }, [subsection]);

  async function save() {
    setSaving(true);
    setMessage('');

    try {
      await updateSubsection(serviceId, subsection.id, form);
      setMessage('Guardado');
      onChanged();
    } catch {
      setMessage('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm(`¿Eliminar "${subsection.title}"?`)) return;
    await deleteSubsection(serviceId, subsection.id);
    onChanged();
  }

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50/60 p-3">
      <div className="flex items-center justify-between">
        <Badge tone="amber">Subsección</Badge>
        <Button variant="danger" onClick={remove} title="Eliminar">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Título">
          <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </Field>
        <Field label="Precio / nota (opcional)">
          <Input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
        </Field>
      </div>

      <Field label="Descripción">
        <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
      </Field>

      <ImageUploader value={form.image} onChange={(value) => setForm({ ...form, image: value })} />

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? 'Guardando...' : 'Guardar'}
        </Button>
        {message && <Alert tone={message === 'Guardado' ? 'success' : 'error'}>{message}</Alert>}
      </div>
    </div>
  );
}

function NewSubsection({ serviceId, onCreated }: { serviceId: string; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);

  if (!open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> Agregar subsección
      </Button>
    );
  }

  async function create() {
    setSaving(true);

    try {
      await createSubsection(serviceId, { title, description, image, price: '', order: 99 });
      setTitle('');
      setDescription('');
      setImage('');
      setOpen(false);
      onCreated();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-dashed border-[#eb9192] p-3">
      <Field label="Título">
        <Input value={title} onChange={(event) => setTitle(event.target.value)} />
      </Field>
      <Field label="Descripción">
        <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </Field>
      <ImageUploader value={image} onChange={setImage} />
      <div className="flex gap-2">
        <Button onClick={create} disabled={saving || !title}>
          <Plus className="h-4 w-4" /> Crear
        </Button>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

function ServiceCard({ service, onChanged }: { service: Service; onChanged: () => void }) {
  const [form, setForm] = useState(service);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(service);
  }, [service]);

  async function save() {
    setSaving(true);
    setMessage('');

    try {
      await updateService(service.id, {
        title: form.title,
        description: form.description,
        image: form.image,
        category: form.category,
        features: form.features,
      });
      setMessage('Guardado');
      onChanged();
    } catch {
      setMessage('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm(`¿Eliminar el servicio "${service.title}" con todas sus subsecciones?`)) return;
    await deleteService(service.id);
    onChanged();
  }

  return (
    <Panel className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{service.title}</h3>
          <Badge>{service.category}</Badge>
          <Badge tone="amber">{service.subsections.length} subsección(es)</Badge>
        </div>
        <Button variant="danger" onClick={remove}>
          <Trash2 className="h-4 w-4" /> Eliminar servicio
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Título">
          <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </Field>
        <Field label="Categoría">
          <Select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Descripción">
        <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
      </Field>

      <ImageUploader value={form.image} onChange={(value) => setForm({ ...form, image: value })} />

      <Field label="Características (una por línea)">
        <Textarea
          value={form.features.join('\n')}
          onChange={(event) =>
            setForm({
              ...form,
              features: event.target.value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? 'Guardando...' : 'Guardar servicio'}
        </Button>
        {message && <Alert tone={message === 'Guardado' ? 'success' : 'error'}>{message}</Alert>}
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-gray-700">Subsecciones / productos</h4>

        {service.subsections.map((subsection) => (
          <SubsectionRow key={subsection.id} serviceId={service.id} subsection={subsection} onChanged={onChanged} />
        ))}

        <NewSubsection serviceId={service.id} onCreated={onChanged} />
      </div>
    </Panel>
  );
}

export default function ServicesAdmin() {
  const { data, loading, error, reload } = useAsyncData(listServices);
  const [form, setForm] = useState(EMPTY_SERVICE);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await createService(form);
      setForm(EMPTY_SERVICE);
      setMessage('Servicio creado');
      reload();
    } catch {
      setMessage('No se pudo crear el servicio');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Servicios y productos</h1>
        <p className="text-sm text-gray-500">
          Cada servicio puede tener subsecciones (productos) con su propia imagen, descripción y precio.
        </p>
      </div>

      <Panel>
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
          <Plus className="h-4 w-4" /> Nuevo servicio
        </h2>
        <form className="space-y-3" onSubmit={handleCreate}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Título">
              <Input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            </Field>
            <Field label="Categoría">
              <Select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Descripción">
            <Textarea
              required
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </Field>
          <ImageUploader value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
          <Button type="submit" disabled={submitting}>
            <Plus className="h-4 w-4" /> Crear servicio
          </Button>
        </form>
        {message && <div className="mt-3"><Alert tone={message === 'Servicio creado' ? 'success' : 'error'}>{message}</Alert></div>}
      </Panel>

      {error && <Alert>{error}</Alert>}
      {loading && <p className="text-sm text-gray-500">Cargando...</p>}

      {(data ?? []).map((service) => (
        <ServiceCard key={service.id} service={service} onChanged={reload} />
      ))}

      {!loading && data?.length === 0 && <Alert tone="info">Aún no hay servicios. Crea el primero arriba.</Alert>}
    </div>
  );
}
