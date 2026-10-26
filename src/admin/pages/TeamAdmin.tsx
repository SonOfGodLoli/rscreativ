import { listTeam, createTeam, updateTeam, deleteTeam } from '../api';
import { useAsyncData } from '../useAsyncData';
import CrudManager from '../components/CrudManager';
import type { CrudField } from '../components/CrudManager';

const FIELDS: CrudField[] = [
  { key: 'name', label: 'Nombre', type: 'text', required: true },
  { key: 'role', label: 'Cargo', type: 'text', required: true },
  { key: 'order', label: 'Orden', type: 'number' },
  { key: 'description', label: 'Biografía', type: 'textarea' },
  { key: 'image', label: 'Foto', type: 'image' },
];

const EMPTY = { name: '', role: '', description: '', image: '', order: 0 };

export default function TeamAdmin() {
  const { data, loading, error, reload } = useAsyncData(listTeam);

  return (
    <CrudManager
      title="Equipo"
      description="Personas que aparecen en la sección del equipo."
      fields={FIELDS}
      empty={EMPTY}
      items={data ?? []}
      loading={loading}
      error={error}
      itemTitle={(member) => `${member.name} — ${member.role}`}
      onCreate={(values) => createTeam(values as never)}
      onUpdate={(id, values) => updateTeam(id, values as never)}
      onDelete={(member) => deleteTeam(member.id)}
      onReload={reload}
    />
  );
}
