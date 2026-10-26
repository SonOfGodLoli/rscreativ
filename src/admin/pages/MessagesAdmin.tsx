import { useState } from 'react';
import { Check, Mail, Trash2 } from 'lucide-react';
import { deleteMessage, listMessages, setMessageRead } from '../api';
import { useAsyncData } from '../useAsyncData';
import { Alert, Badge, Button, Panel } from '../components/ui';

export default function MessagesAdmin() {
  const { data, loading, error, reload } = useAsyncData(listMessages);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const messages = (data ?? []).filter((message) => (filter === 'unread' ? !message.read : true));
  const unread = (data ?? []).filter((message) => !message.read).length;

  async function toggle(id: string, read: boolean) {
    await setMessageRead(id, read);
    reload();
  }

  async function remove(id: string) {
    if (!window.confirm('¿Eliminar este mensaje?')) return;
    await deleteMessage(id);
    reload();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mensajes</h1>
          <p className="text-sm text-gray-500">Mensajes enviados desde el formulario de contacto.</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge tone={unread > 0 ? 'red' : 'green'}>{unread} sin leer</Badge>
          <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>
            Todos
          </Button>
          <Button variant={filter === 'unread' ? 'primary' : 'secondary'} onClick={() => setFilter('unread')}>
            Sin leer
          </Button>
        </div>
      </div>

      {error && <Alert>{error}</Alert>}
      {loading && <p className="text-sm text-gray-500">Cargando...</p>}

      {messages.map((message) => (
        <Panel key={message.id} className={message.read ? '' : 'border-l-4 border-l-[#9a171c]'}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gray-900">{message.name}</span>
                {!message.read && <Badge tone="amber">Nuevo</Badge>}
                <span className="text-xs text-gray-400">
                  {new Date(message.created_at).toLocaleString('es-PE')}
                </span>
              </div>
              <p className="text-sm text-gray-600">{message.subject}</p>
              <p className="mt-1 text-sm text-gray-500">
                {message.email}
                {message.phone ? ` · ${message.phone}` : ''}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}>
                <Button variant="secondary">
                  <Mail className="h-4 w-4" /> Responder
                </Button>
              </a>
              <Button variant="secondary" onClick={() => toggle(message.id, !message.read)}>
                <Check className="h-4 w-4" /> {message.read ? 'Marcar nuevo' : 'Marcar leído'}
              </Button>
              <Button variant="danger" onClick={() => remove(message.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="mt-3 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
            {message.message}
          </p>
        </Panel>
      ))}

      {!loading && messages.length === 0 && <Alert tone="info">No hay mensajes en esta vista.</Alert>}
    </div>
  );
}
