import { listPortfolio, createPortfolio, updatePortfolio, deletePortfolio } from '../api';
import { useAsyncData } from '../useAsyncData';
import CrudManager from '../components/CrudManager';
import type { CrudField } from '../components/CrudManager';

const FIELDS: CrudField[] = [
  { key: 'title', label: 'Título', type: 'text', required: true },
  { key: 'client_name', label: 'Cliente', type: 'text' },
  {
    key: 'category',
    label: 'Categoría',
    type: 'select',
    options: ['branding', 'impresion', 'digital', 'eventos', 'diseno', 'celebraciones', 'personalizados'],
  },
  { key: 'featured', label: 'Destacado', type: 'checkbox' },
  { key: 'description', label: 'Descripción', type: 'textarea', required: true },
  { key: 'images', label: 'Imágenes (una URL por línea)', type: 'lines' },
];

const EMPTY = {
  title: '',
  description: '',
  images: [] as string[],
  category: 'impresion',
  client_name: '',
  featured: false,
};

export default function PortfolioAdmin() {
  const { data, loading, error, reload } = useAsyncData(listPortfolio);

  return (
    <CrudManager
      title="Portafolio"
      description="Trabajos realizados. Cada trabajo puede tener varias imágenes."
      fields={FIELDS}
      empty={EMPTY}
      items={data ?? []}
      loading={loading}
      error={error}
      itemTitle={(item) => `${item.title}${item.client_name ? ` — ${item.client_name}` : ''}`}
      onCreate={(values) => createPortfolio(values as never)}
      onUpdate={(id, values) => updatePortfolio(id, values as never)}
      onDelete={(item) => deletePortfolio(item.id)}
      onReload={reload}
    />
  );
}
