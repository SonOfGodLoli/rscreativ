import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCmsPage } from '@/services/api';
import type { CmsPage, CmsSection } from '@/services/api';

function CtaButton({ label, url }: { label: string; url: string }) {
  if (!label) return null;

  const className =
    'inline-flex items-center gap-2 rounded-lg bg-[#9a171c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7a1216]';

  if (url.startsWith('http')) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link to={url || '/contacto'} className={className}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function Section({ section }: { section: CmsSection }) {
  if (section.kind === 'hero') {
    return (
      <section className="relative overflow-hidden bg-[#040a33] py-20">
        {section.image && (
          <>
            <img src={section.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-[#040a33]/70" />
          </>
        )}

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          {section.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#eb9192]">{section.eyebrow}</span>
          )}
          {section.title && <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">{section.title}</h2>}
          {section.subtitle && <p className="mt-4 text-lg text-white/80">{section.subtitle}</p>}
          {section.body && <p className="mt-4 whitespace-pre-line text-white/70">{section.body}</p>}
          <div className="mt-7 flex justify-center">
            <CtaButton label={section.ctaLabel} url={section.ctaUrl} />
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === 'cta') {
    return (
      <section className="bg-[#9a171c] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          {section.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{section.eyebrow}</span>
          )}
          {section.title && <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">{section.title}</h2>}
          {section.subtitle && <p className="mt-3 text-lg text-white/80">{section.subtitle}</p>}
          {section.body && <p className="mt-3 whitespace-pre-line text-white/70">{section.body}</p>}
          <div className="mt-6 flex justify-center">
            <CtaButton label={section.ctaLabel} url={section.ctaUrl} />
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === 'gallery') {
    const images = section.images.length > 0 ? section.images : section.image ? [section.image] : [];

    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            {section.eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b24940]">{section.eyebrow}</span>
            )}
            {section.title && <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">{section.title}</h2>}
            {section.subtitle && <p className="mt-2 text-gray-600">{section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={section.title || 'Galería'}
                className="h-48 w-full rounded-xl object-cover shadow-md transition hover:scale-[1.02]"
              />
            ))}
          </div>

          {section.body && <p className="mt-6 whitespace-pre-line text-center text-gray-600">{section.body}</p>}
        </div>
      </section>
    );
  }

  if (section.kind === 'cards') {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            {section.eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b24940]">{section.eyebrow}</span>
            )}
            {section.title && <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">{section.title}</h2>}
            {section.subtitle && <p className="mt-2 text-gray-600">{section.subtitle}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(section.items ?? []).map((item, index) => (
              <div key={`${item.title}-${index}`} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                {item.image && <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  {item.description && <p className="mt-1 text-sm text-gray-600">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>

          {section.body && <p className="mt-6 whitespace-pre-line text-center text-gray-600">{section.body}</p>}
          <div className="mt-6 flex justify-center">
            <CtaButton label={section.ctaLabel} url={section.ctaUrl} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          {section.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b24940]">{section.eyebrow}</span>
          )}
          {section.title && <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">{section.title}</h2>}
          {section.subtitle && <p className="mt-2 text-lg text-gray-700">{section.subtitle}</p>}
          {section.body && <p className="mt-4 whitespace-pre-line text-gray-600">{section.body}</p>}
          <div className="mt-6">
            <CtaButton label={section.ctaLabel} url={section.ctaUrl} />
          </div>
        </div>

        {section.image && (
          <img src={section.image} alt={section.title || ''} className="w-full rounded-2xl object-cover shadow-lg" />
        )}
      </div>
    </section>
  );
}

export default function CmsSections({ slug }: { slug: string }) {
  const [page, setPage] = useState<CmsPage | null>(null);

  useEffect(() => {
    let alive = true;

    getCmsPage(slug)
      .then((response) => {
        if (alive) {
          setPage(response.data);
        }
      })
      .catch(() => {
        if (alive) {
          setPage(null);
        }
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  if (!page || page.sections.length === 0) {
    return null;
  }

  return (
    <>
      {page.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </>
  );
}
