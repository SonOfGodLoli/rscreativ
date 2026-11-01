import type { ComponentProps, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.03),0_12px_32px_-24px_rgba(16,24,40,0.28)] ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {Icon && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9a171c]/[0.08] text-[#9a171c] ring-1 ring-[#9a171c]/10">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.7rem]">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-500">{description}</p>}
        </div>
      </div>

      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

const baseControl =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#9a171c] focus:ring-2 focus:ring-[#eb9192]/40 disabled:bg-gray-100';

export function Input({ className = '', ...props }: ComponentProps<'input'>) {
  return <input {...props} className={`${baseControl} ${className}`} />;
}

export function Textarea({ className = '', ...props }: ComponentProps<'textarea'>) {
  return <textarea {...props} className={`${baseControl} min-h-24 ${className}`} />;
}

export function Select({ className = '', children, ...props }: ComponentProps<'select'>) {
  return (
    <select {...props} className={`${baseControl} ${className}`}>
      {children}
    </select>
  );
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' }) {
  const styles = {
    primary:
      'bg-[#9a171c] text-white shadow-sm hover:bg-[#7a1216] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a171c]',
    secondary: 'bg-[#fbe9e9] text-[#7a1216] hover:bg-[#f6d7d7]',
    danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
    ghost: 'text-[#9a171c] hover:bg-[#9a171c]/10',
    outline: 'border border-[#9a171c]/25 bg-white text-[#9a171c] hover:bg-[#9a171c]/5',
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    />
  );
}

export function Badge({
  children,
  tone = 'gray',
}: {
  children: ReactNode;
  tone?: 'gray' | 'green' | 'red' | 'amber' | 'brand';
}) {
  const tones = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
    brand: 'bg-[#fbe9e9] text-[#9a171c]',
  };

  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Alert({ children, tone = 'error' }: { children: ReactNode; tone?: 'error' | 'success' | 'info' }) {
  if (!children) return null;

  const tones = {
    error: 'border-red-200 bg-red-50 text-red-700',
    success: 'border-green-200 bg-green-50 text-green-700',
    info: 'border-[#eb9192]/60 bg-[#fdf2f2] text-[#7a1216]',
  };

  return <div className={`rounded-lg border px-3 py-2 text-sm ${tones[tone]}`}>{children}</div>;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9a171c]/10 text-[#9a171c]">
        <Icon className="h-6 w-6" />
      </span>
      <p className="font-semibold text-gray-800">{title}</p>
      {description && <p className="max-w-sm text-sm text-gray-500">{description}</p>}
    </div>
  );
}
