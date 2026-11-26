import React, { useEffect } from 'react';

interface SeoHeadProps {
  pageName: string;
  description: string;
  structuredData?: Record<string, unknown>;
}

const SITE_NAME = 'ZenterPrime';
const STRUCTURED_DATA_ID = 'zenterprime-structured-data';

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  pageName,
  description,
  structuredData,
}) => {
  const fullTitle = `${pageName} | ${SITE_NAME}`;

  useEffect(() => {
    const currentUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', currentUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);

    upsertCanonical(currentUrl);

    let script = document.getElementById(STRUCTURED_DATA_ID) as HTMLScriptElement | null;
    if (structuredData) {
      if (!script) {
        script = document.createElement('script');
        script.id = STRUCTURED_DATA_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }
  }, [fullTitle, description, structuredData]);

  return null;
};

export default SeoHead;
