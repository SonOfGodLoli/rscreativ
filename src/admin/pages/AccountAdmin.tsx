import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { changePassword } from '../api';
import { useAuth } from '../AuthContext';
import { Alert, Button, Field, Input, Panel } from '../components/ui';

export default function AccountAdmin() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');

    if (newPassword !== confirm) {
      setMessage('Las contraseñas nuevas no coinciden');
      return;
    }

    setSaving(true);

    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirm('');
      setMessage('Contraseña actualizada');
    } catch {
      setMessage('No se pudo cambiar la contraseña (revisa la actual)');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
        <p className="text-sm text-gray-500">
          {user?.name} · {user?.email} · {user?.role}
        </p>
      </div>

      <Panel>
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
          <KeyRound className="h-4 w-4" /> Cambiar contraseña
        </h2>

        <form className="space-y-3" onSubmit={submit}>
          <Field label="Contraseña actual">
            <Input
              required
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </Field>
          <Field label="Nueva contraseña">
            <Input
              required
              type="password"
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </Field>
          <Field label="Confirmar nueva contraseña">
            <Input
              required
              type="password"
              minLength={8}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </Field>

          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar contraseña'}
          </Button>
        </form>

        {message && (
          <div className="mt-3">
            <Alert tone={message === 'Contraseña actualizada' ? 'success' : 'error'}>{message}</Alert>
          </div>
        )}
      </Panel>
    </div>
  );
}
