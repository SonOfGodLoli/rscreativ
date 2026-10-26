import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { createPage, deletePage, listPages, updatePage } from '../api';
import type { Page } from '../api';
import { useAsyncData } from '../useAsyncData';
import { Alert, Badge, Button, Field, Input, Panel, Textarea } from '../components/ui';

const EMPTY = { slug: '', title: '', description: '' };

export default function PagesList() {
  const { data, loading, error, reload } = useAsyncData(listPages);
  const [form, setForm] = useState(EMPTY);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await createPage({ ...form, published: true, order: data?.length ?? 0 });
      setForm(EMPTY);
      setMessage('Página creada');
      reload();
    } catch {
      setMessage('No se pudo crear la página');
    } finally {
      setSubmitting(false);
    }
  }

  async function togglePublished(page: Page) {
    await updatePage(page.id, { published: !page.published });
    reload();
  }

  async function handleDelete(page: Page) {
    if (!window.confirm(`¿Eliminar la página "${page.title}" y todas sus secciones?`)) return;
    await deletePage(page.id);
    reload();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Páginas y secciones</h1>
        <p className="text-sm text-gray-500">
          Las secciones de la página "home", "servicios", "portfolio" y "contacto" se muestran en el sitio público.
          También puedes crear páginas nuevas.
        </p>
      </div>

      <Panel>
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
          <Plus className="h-4 w-4" /> Nueva página
        </h2>

        <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleCreate}>
          <Field label="Slug (URL)">
            <Input
              required
              placeholder="promociones"
              value={form.slug}
              onChange={(event) => setForm({ ...form, slug: event.target.value.toLowerCase() })}
            />
          </Field>
          <Field label="Título">
            <Input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Descripción (opcional)">
              <Textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={submitting}>
              <Plus className="h-4 w-4" /> Crear página
            </Button>
          </div>
        </form>

        {message && <div className="mt-3"><Alert tone={message === 'Página creada' ? 'success' : 'error'}>{message}</Alert></div>}
      </Panel>

      <Panel>
        {error && <Alert>{error}</Alert>}
        {loading && <p className="text-sm text-gray-500">Cargando...</p>}

        <div className="divide-y divide-gray-100">
          {(data ?? []).map((page) => (
            <div key={page.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{page.title}</span>
                  <Badge tone={page.published ? 'green' : 'gray'}>{page.published ? 'Publicada' : 'Oculta'}</Badge>
                  <span className="text-xs text-gray-400">/{page.slug}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {page._count?.sections ?? 0} sección(es)
                  {page.description ? ` · ${page.description}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => togglePublished(page)}>
                  {page.published ? 'Ocultar' : 'Publicar'}
                </Button>
                <Link to={`/admin/paginas/${page.id}`}>
                  <Button variant="secondary">Editar secciones</Button>
                </Link>
                <Link to={`/p/${page.slug}`} target="_blank">
                  <Button variant="ghost" title="Ver página">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(page)} title="Eliminar">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {!loading && data?.length === 0 && <p className="py-4 text-sm text-gray-500">No hay páginas creadas.</p>}
        </div>
      </Panel>
    </div>
  );
}
