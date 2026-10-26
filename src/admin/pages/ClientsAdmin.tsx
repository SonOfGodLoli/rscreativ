import { listClients, createClient, updateClient, deleteClient } from '../api';
import { useAsyncData } from '../useAsyncData';
import CrudManager from '../components/CrudManager';
import type { CrudField } from '../components/CrudManager';

const FIELDS: CrudField[] = [
  { key: 'name', label: 'Nombre', type: 'text', required: true },
  { key: 'website_url', label: 'Sitio web', type: 'text', placeholder: 'https://...' },
  { key: 'featured', label: 'Mostrar como destacado', type: 'checkbox' },
  { key: 'logo', label: 'Logo', type: 'image' },
];

const EMPTY = { name: '', logo: '', website_url: '', featured: false };

export default function ClientsAdmin() {
  const { data, loading, error, reload } = useAsyncData(listClients);

  return (
    <CrudManager
      title="Clientes"
      description="Empresas que han confiado en RS Creativ."
      fields={FIELDS}
      empty={EMPTY}
      items={data ?? []}
      loading={loading}
      error={error}
      itemTitle={(client) => client.name}
      onCreate={(values) => createClient(values as never)}
      onUpdate={(id, values) => updateClient(id, values as never)}
      onDelete={(client) => deleteClient(client.id)}
      onReload={reload}
    />
  );
}
