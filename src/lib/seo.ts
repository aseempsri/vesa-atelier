export const SITE_URL = "https://vesa.co.in";
export const SITE_NAME = "VESA Atelier";
export const SITE_LOCALE = "en_IN";
export const SITE_LANGUAGE = "en-IN";
export const SITE_GEO_REGION = "IN-MH";
export const SITE_GEO_PLACENAME = "Bombay";
export const SITE_AUTHOR = "Sandhya Srivastava";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_WIDTH = "1920";
export const OG_IMAGE_HEIGHT = "1080";
export const OG_IMAGE_TYPE = "image/jpeg";
export const SITE_DESCRIPTION =
  "VESA Atelier — a house of hand-poured candles crafted for calm, elegance, and meaningful moments. Reflections and the first collection at vesa.co.in.";
export const RSS_FEED_URL = `${SITE_URL}/feed.xml`;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized.replace(/\/$/, "")}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function buildPageHead({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
  noIndex = false,
  publishedTime,
  modifiedTime,
  keywords,
  jsonLd,
}: PageSeoInput) {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const robotsContent = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "author", content: SITE_AUTHOR },
    { name: "application-name", content: SITE_NAME },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },
    { name: "language", content: SITE_LANGUAGE },
    { httpEquiv: "content-language", content: SITE_LANGUAGE },
    { name: "geo.region", content: SITE_GEO_REGION },
    { name: "geo.placename", content: SITE_GEO_PLACENAME },
    { name: "robots", content: robotsContent },
    { name: "googlebot", content: robotsContent },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:type", content: type },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: OG_IMAGE_TYPE },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
  ];

  if (keywords?.length) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }
  if (publishedTime) {
    meta.push({ property: "article:published_time", content: publishedTime });
  }
  if (modifiedTime) {
    meta.push({ property: "article:modified_time", content: modifiedTime });
  }
  if (type === "article") {
    meta.push({ property: "article:author", content: SITE_AUTHOR });
    meta.push({ property: "article:section", content: "Reflections" });
  }

  const links: Array<Record<string, string>> = [
    { rel: "canonical", href: url },
    { rel: "alternate", hreflang: SITE_LANGUAGE, href: url },
    { rel: "alternate", hreflang: "x-default", href: url },
  ];

  const scripts = jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            Array.isArray(jsonLd)
              ? jsonLd.length === 1
                ? jsonLd[0]
                : jsonLd
              : jsonLd,
          ),
        },
      ]
    : undefined;

  return { meta, links, scripts };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.png`,
    },
    image: DEFAULT_OG_IMAGE,
    description: SITE_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: absoluteUrl("/about"),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_GEO_PLACENAME,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: SITE_LANGUAGE,
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: SITE_LANGUAGE,
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR,
    jobTitle: "Founder",
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
    url: absoluteUrl("/about"),
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  subtitle?: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: [DEFAULT_OG_IMAGE],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    isPartOf: {
      "@type": "Blog",
      name: `${SITE_NAME} Journal`,
      url: absoluteUrl("/blog"),
    },
    articleSection: "Reflections",
    inLanguage: SITE_LANGUAGE,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Journal`,
    description:
      "Reflections from VESA Atelier on calm, self-worth, and intentional living.",
    url: absoluteUrl("/blog"),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: SITE_LANGUAGE,
  };
}

export function itemListJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
