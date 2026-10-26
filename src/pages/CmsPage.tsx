import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getCmsPage } from '@/services/api';
import type { CmsPage as CmsPageType } from '@/services/api';
import CmsSections from '@/components/cms/CmsSections';
import PageTransition from '@/components/ui/PageTransition';
import Seo from '@/components/Seo';

export default function CmsPage() {
  const { slug = '' } = useParams();
  const [page, setPage] = useState<CmsPageType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    getCmsPage(slug)
      .then((response) => {
        if (alive) setPage(response.data);
      })
      .catch(() => {
        if (alive) setPage(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#9a171c]" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Página no encontrada</h1>
        <p className="mt-2 text-gray-600">El contenido que buscas no existe o no está publicado.</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <Seo
        title={`${page.title} | RS Creativ`}
        description={page.description || 'Contenido de RS Creativ.'}
      />
      <section className="bg-[#040a33] pb-12 pt-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{page.title}</h1>
          {page.description && <p className="mt-3 text-white/70">{page.description}</p>}
        </div>
      </section>

      <CmsSections slug={slug} />
    </PageTransition>
  );
}
