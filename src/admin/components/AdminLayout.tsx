import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Building2,
  FileText,
  Image,
  Images,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Users,
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { Button } from './ui';

const links = [
  { to: '/admin', label: 'Resumen', icon: LayoutDashboard, end: true },
  { to: '/admin/paginas', label: 'Páginas', icon: FileText },
  { to: '/admin/servicios', label: 'Servicios y productos', icon: Package },
  { to: '/admin/portafolio', label: 'Portafolio', icon: Images },
  { to: '/admin/equipo', label: 'Equipo', icon: Users },
  { to: '/admin/clientes', label: 'Clientes', icon: Building2 },
  { to: '/admin/mensajes', label: 'Mensajes', icon: MessageSquare },
  { to: '/admin/imagenes', label: 'Imágenes', icon: Image },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
  { to: '/admin/cuenta', label: 'Mi cuenta', icon: KeyRound },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      <aside className="border-b border-gray-200 bg-[#040a33] text-white lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-4 lg:block">
          <Link to="/admin" className="block">
            <span className="text-lg font-bold">RS Creativ</span>
            <span className="block text-xs text-white/60">Panel de contenido</span>
          </Link>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:mt-4 lg:flex-col lg:overflow-visible lg:pb-6">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-white/15 font-semibold text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}

          {user?.role === 'ADMIN' && (
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-white/15 font-semibold text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Shield className="h-4 w-4" />
              Usuarios
            </NavLink>
          )}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-5 py-3">
          <div className="text-sm text-gray-500">
            Sesión de <span className="font-semibold text-gray-800">{user?.name}</span>
            <span className="ml-2 rounded-full bg-[#eb9192]/30 px-2 py-0.5 text-xs font-semibold text-[#9a171c]">
              {user?.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Ver sitio
            </Link>
            <Button variant="secondary" onClick={signOut}>
              <LogOut className="h-4 w-4" /> Salir
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
