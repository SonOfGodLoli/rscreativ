import { listSettings, saveSetting, deleteSetting } from '../api';
import { useAsyncData } from '../useAsyncData';
import CrudManager from '../components/CrudManager';
import type { CrudField } from '../components/CrudManager';
import { Alert } from '../components/ui';

const FIELDS: CrudField[] = [
  { key: 'key', label: 'Clave', type: 'text', required: true, placeholder: 'phone, email, instagram...' },
  { key: 'value', label: 'Valor', type: 'textarea', required: true },
];

const EMPTY = { key: '', value: '' };

export default function SettingsAdmin() {
  const { data, loading, error, reload } = useAsyncData(listSettings);

  return (
    <div className="space-y-4">
      <CrudManager
        title="Configuración del sitio"
        description="Datos de contacto, horarios y redes sociales."
        fields={FIELDS}
        empty={EMPTY}
        items={data ?? []}
        loading={loading}
        error={error}
        itemTitle={(setting) => `${setting.key} = ${setting.value}`}
        onCreate={(values) => saveSetting(String(values.key), String(values.value))}
        onUpdate={async (id, values) => {
          const current = (data ?? []).find((setting) => setting.id === id);

          if (current && current.key !== values.key) {
            await deleteSetting(current.key);
          }

          return saveSetting(String(values.key), String(values.value));
        }}
        onDelete={(setting) => deleteSetting(setting.key)}
        onReload={reload}
      />

      <div className="mx-auto max-w-6xl">
        <Alert tone="info">
          Claves usadas por el sitio: phone, email, address, schedule_weekdays, schedule_saturday,
          schedule_sunday, whatsapp, facebook, instagram.
        </Alert>
      </div>
    </div>
  );
}
