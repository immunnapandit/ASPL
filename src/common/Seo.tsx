import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SITE_NAME = 'AtiSunya';
export const SITE_URL = 'https://www.atisunya.co';
export const DEFAULT_OG_IMAGE = '/assets/img/logo/AtiSunyaLogo.png';

function toAbsoluteUrl(value: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
}

function upsertJsonLd(schema?: SeoProps['schema']) {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema="true"]');

  if (!schema) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-schema', 'true');
  script.textContent = JSON.stringify(schema);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export default function Seo({
  title,
  description,
  path = '/',
  canonicalPath,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  schema,
}: SeoProps) {
  useEffect(() => {
    const normalizedPath = canonicalPath ?? path;
    const canonicalUrl = toAbsoluteUrl(normalizedPath);
    const imageUrl = toAbsoluteUrl(image);
    const robots = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertLink('canonical', canonicalUrl);
    upsertJsonLd(schema);
  }, [canonicalPath, description, image, noindex, path, schema, title, type]);

  return null;
}
