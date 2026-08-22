#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://vesa.co.in";
const SITE_NAME = "VESA Atelier";
const TODAY = new Date().toISOString().slice(0, 10);

const postsSrc = readFileSync(join(ROOT, "src/lib/blog/posts.ts"), "utf8");
const slugs = [...postsSrc.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const postMeta = [
  ...postsSrc.matchAll(
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g,
  ),
].map((match) => ({
  slug: match[1],
  title: match[2],
  description: match[3],
  publishedAt: match[4],
}));

const staticPages = [
  { loc: `${SITE_URL}/`, priority: "1.0", changefreq: "weekly" },
  { loc: `${SITE_URL}/about`, priority: "0.8", changefreq: "monthly" },
  { loc: `${SITE_URL}/blog`, priority: "0.9", changefreq: "weekly" },
];

const postPages = slugs.map((slug) => ({
  loc: `${SITE_URL}/blog/${slug}`,
  priority: "0.8",
  changefreq: "monthly",
}));

const urls = [...staticPages, ...postPages]
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(ROOT, "public/robots.txt"), robots);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRssDate(date) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

const feedItems = postMeta
  .slice()
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRssDate(post.publishedAt)}</pubDate>
    </item>`,
  )
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Journal</title>
    <link>${SITE_URL}/blog</link>
    <description>Reflections from VESA Atelier on calm, self-worth, and intentional living.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${feedItems}
  </channel>
</rss>
`;

writeFileSync(join(ROOT, "public/feed.xml"), feed);

console.log(`SEO files written (${slugs.length} blog posts, RSS feed).`);
