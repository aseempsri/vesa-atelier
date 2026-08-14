#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://vesa.co.in";
const TODAY = new Date().toISOString().slice(0, 10);

const postsSrc = readFileSync(join(ROOT, "src/lib/blog/posts.ts"), "utf8");
const slugs = [...postsSrc.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const staticPages = [
  { loc: `${SITE_URL}/`, priority: "1.0", changefreq: "weekly" },
  { loc: `${SITE_URL}/about/`, priority: "0.8", changefreq: "monthly" },
  { loc: `${SITE_URL}/blog/`, priority: "0.9", changefreq: "weekly" },
];

const postPages = slugs.map((slug) => ({
  loc: `${SITE_URL}/blog/${slug}/`,
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

console.log(`SEO files written (${slugs.length} blog posts).`);
