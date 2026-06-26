import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const HOSTNAME = "https://crbr-invest.com.br";

const pages = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/#home", changefreq: "monthly", priority: 0.9 },
  { url: "/#investments", changefreq: "monthly", priority: 0.8 },
  { url: "/#solutions", changefreq: "monthly", priority: 0.8 },
  { url: "/#app", changefreq: "monthly", priority: 0.8 },
  { url: "/#simulator", changefreq: "monthly", priority: 0.8 },
  { url: "/#faq", changefreq: "monthly", priority: 0.7 },
  { url: "/#contact", changefreq: "monthly", priority: 0.8 },
];

const sitemap = new SitemapStream({ hostname: HOSTNAME });
const writeStream = createWriteStream("./public/sitemap.xml");

sitemap.pipe(writeStream);

const lastmod = new Date().toISOString();

for (const page of pages) {
  sitemap.write({ ...page, lastmod });
}

sitemap.end();

await streamToPromise(sitemap);

console.log("Sitemap gerado em public/sitemap.xml");
