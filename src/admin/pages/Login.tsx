import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { Alert, Button, Field, Input } from '../components/ui';
import Seo from '@/components/Seo';

export default function Login() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await signIn(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      const status = (err as { response?: { status?: number } }).response?.status;
      setError(status === 401 ? 'Correo o contraseña incorrectos' : 'No se pudo iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="brand-gradient relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <Seo title="Acceso al panel | RS Creativ" description="Área privada de administración." noindex />

      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#eb9192]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#9a171c]/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="brand-gradient mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Panel RS Creativ</h1>
            <p className="mt-1 text-sm text-gray-500">Acceso para el equipo de contenido</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field label="Correo electrónico">
              <Input
                type="email"
                autoComplete="username"
                placeholder="tu@rscreativ.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>

            <Field label="Contraseña">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-[#9a171c]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            {error && <Alert>{error}</Alert>}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Ingresando...' : 'Ingresar al panel'}
            </Button>
          </form>

          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#9a171c]"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al sitio
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-white/70">© RS Creativ · Panel de administración</p>
      </div>
    </div>
  );
}
