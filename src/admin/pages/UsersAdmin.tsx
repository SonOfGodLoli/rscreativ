import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { createUser, deleteUser, listUsers, updateUser } from '../api';
import type { AdminUser } from '../api';
import { useAsyncData } from '../useAsyncData';
import { Alert, Badge, Button, Field, Input, Panel, Select } from '../components/ui';

const EMPTY = { email: '', name: '', password: '', role: 'EDITOR' };

export default function UsersAdmin() {
  const { data, loading, error, reload } = useAsyncData(listUsers);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [message, setMessage] = useState('');

  function reset() {
    setForm(EMPTY);
    setEditing(null);
    setMessage('');
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');

    try {
      if (editing) {
        await updateUser(editing.id, {
          name: form.name,
          role: form.role as 'ADMIN' | 'EDITOR',
          ...(form.password ? { password: form.password } : {}),
        });
        setMessage('Usuario actualizado');
      } else {
        await createUser(form);
        setMessage('Usuario creado');
      }

      reset();
      reload();
    } catch {
      setMessage('No se pudo guardar (¿correo duplicado?)');
    }
  }

  function startEdit(user: AdminUser) {
    setEditing(user);
    setForm({ email: user.email, name: user.name, password: '', role: user.role });
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function toggleActive(user: AdminUser) {
    await updateUser(user.id, { active: !user.active });
    reload();
  }

  async function remove(user: AdminUser) {
    if (!window.confirm(`¿Eliminar la cuenta de ${user.email}?`)) return;
    await deleteUser(user.id);
    reload();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-sm text-gray-500">
          Crea cuentas para tus trabajadores. Los editores gestionan contenido; los administradores también gestionan usuarios.
        </p>
      </div>

      <Panel>
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
          <Plus className="h-4 w-4" /> {editing ? `Editar ${editing.email}` : 'Nueva cuenta'}
        </h2>

        <form className="grid gap-3 sm:grid-cols-2" onSubmit={submit}>
          <Field label="Correo">
            <Input
              required
              type="email"
              disabled={Boolean(editing)}
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </Field>
          <Field label="Nombre">
            <Input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </Field>
          <Field label={editing ? 'Nueva contraseña (opcional)' : 'Contraseña'}>
            <Input
              required={!editing}
              type="password"
              minLength={8}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </Field>
          <Field label="Rol">
            <Select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Administrador</option>
            </Select>
          </Field>

          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit">
              <Save className="h-4 w-4" /> {editing ? 'Guardar cambios' : 'Crear cuenta'}
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={reset}>
                Cancelar
              </Button>
            )}
          </div>
        </form>

        {message && (
          <div className="mt-3">
            <Alert tone={message.startsWith('No se pudo') ? 'error' : 'success'}>{message}</Alert>
          </div>
        )}
      </Panel>

      <Panel>
        {error && <Alert>{error}</Alert>}
        {loading && <p className="text-sm text-gray-500">Cargando...</p>}

        <div className="divide-y divide-gray-100">
          {(data ?? []).map((user) => (
            <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{user.name}</span>
                  <Badge tone={user.role === 'ADMIN' ? 'amber' : 'gray'}>{user.role}</Badge>
                  <Badge tone={user.active ? 'green' : 'red'}>{user.active ? 'Activa' : 'Desactivada'}</Badge>
                </div>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => startEdit(user)}>
                  Editar
                </Button>
                <Button variant="secondary" onClick={() => toggleActive(user)}>
                  {user.active ? 'Desactivar' : 'Activar'}
                </Button>
                <Button variant="danger" onClick={() => remove(user)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
