import { useEffect } from 'react';

const SITE_URL = 'https://rscreativ.netlify.app';
const DEFAULT_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

type SeoProps = {
  title: string;
  description: string;
  noindex?: boolean;
  image?: string;
};

function upsertElement(selector: string, tagName: 'meta' | 'link', attributes: Record<string, string>) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement(tagName);
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element?.setAttribute(name, value);
  });
}

export default function Seo({ title, description, noindex = false, image = DEFAULT_IMAGE }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${window.location.pathname}`;

    document.title = title;

    upsertElement('meta[name="description"]', 'meta', { name: 'description', content: description });
    upsertElement('meta[name="robots"]', 'meta', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow',
    });

    upsertElement('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
    upsertElement('meta[property="og:description"]', 'meta', {
      property: 'og:description',
      content: description,
    });
    upsertElement('meta[property="og:url"]', 'meta', { property: 'og:url', content: url });
    upsertElement('meta[property="og:image"]', 'meta', { property: 'og:image', content: image });

    upsertElement('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: title });
    upsertElement('meta[name="twitter:description"]', 'meta', {
      name: 'twitter:description',
      content: description,
    });
    upsertElement('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: image });

    if (!noindex) {
      upsertElement('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });
    }
  }, [title, description, noindex, image]);

  return null;
}
