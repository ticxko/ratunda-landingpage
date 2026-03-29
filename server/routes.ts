import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  category: string;
  keywords: string;
  readTime: string;
  thumbnail?: string;
}

function extractFirstImage(content: string): string | undefined {
  const match = content.match(/<img\s[^>]*src=["']([^"']+)["']/);
  return match?.[1];
}

function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const thumbnail = extractFirstImage(content);
      return { ...data, thumbnail } as BlogPostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Unwrap <pre><code> blocks that marked misidentifies as code blocks when
// HTML inside markdown is indented 4+ spaces after a blank line.
function unescapeHTMLCodeBlocks(html: string): string {
  return html.replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    const decoded = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");
    return /^\s*<[a-zA-Z]/.test(decoded) ? decoded : match;
  });
}

function getBlogPost(slug: string): { meta: BlogPostMeta; html: string } | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return { meta: data as BlogPostMeta, html: unescapeHTMLCodeBlocks(marked(content) as string) };
    }
  }
  return null;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "127.0.0.1",
  port: 25,
  secure: false,
  tls: { rejectUnauthorized: false },
});

const SERVICE_LABELS: Record<string, string> = {
  "Atap Bocor": "Atap Bocor (Leaky Roof)",
  "Dinding Lembab": "Dinding Lembab (Damp Walls)",
  "Tarik Listrik": "Tarik Listrik (Electrical)",
  "Renovasi Dapur": "Renovasi Dapur (Kitchen)",
  "Renovasi Kamar Mandi": "Renovasi Kamar Mandi (Bathroom)",
  "Pasang Kanopi": "Pasang Kanopi (Canopy)",
  "Pembuatan Furniture": "Pembuatan Furniture",
  "Pasang AC": "Pasang AC (AC Installation)",
  "Cor Dak Beton": "Cor Dak Beton (Concrete)",
  "Lainnya": "Lainnya (Other)",
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/blog", (_req, res) => {
    res.json(getBlogPosts());
  });

  app.get("/api/blog/:slug", (req, res) => {
    const post = getBlogPost(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  // Dynamic sitemap — auto-includes all blog posts
  app.get("/sitemap.xml", (_req, res) => {
    const posts = getBlogPosts();
    const today = new Date().toISOString().split("T")[0];
    const postUrls = posts.map((p) => `
  <url>
    <loc>https://ratunda.id/blog/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ratunda.id/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ratunda.id/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>${postUrls}
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  });

  // SSR meta injection for blog pages (production only)
  // Googlebot gets correct <title>, <meta description>, canonical, OG tags per post
  if (process.env.NODE_ENV === "production") {
    const distHtmlPath = path.join(process.cwd(), "dist", "public", "index.html");

    // Replace a meta tag attribute value in-place.
    // Matches: attr="old_value" and replaces with attr="new_value"
    function replaceMeta(html: string, attrSelector: string, newValue: string): string {
      return html.replace(
        new RegExp(`(${attrSelector}=")[^"]*"`),
        `$1${newValue}"`
      );
    }

    function injectJsonLd(html: string, data: object): string {
      const json = JSON.stringify(data).replace(/<\/script>/gi, "<\\/script>");
      return html.replace("</head>", `<script type="application/ld+json">${json}</script></head>`);
    }

    function injectBlogMeta(html: string, opts: {
      title: string; desc: string; keywords?: string; canonical: string; breadcrumbs?: object;
    }): string {
      let out = html;
      out = out.replace(/<title>[^<]*<\/title>/, `<title>${opts.title}</title>`);
      out = replaceMeta(out, 'name="description" content', opts.desc);
      if (opts.keywords) out = replaceMeta(out, 'name="keywords" content', opts.keywords);
      out = replaceMeta(out, 'link rel="canonical" href', opts.canonical);
      out = replaceMeta(out, 'property="og:url" content', opts.canonical);
      out = replaceMeta(out, 'property="og:title" content', opts.title.replace(" | Ratunda Renovasi", " | Ratunda"));
      out = replaceMeta(out, 'property="og:description" content', opts.desc);
      out = replaceMeta(out, 'name="twitter:title" content', opts.title.replace(" | Ratunda Renovasi", " | Ratunda"));
      out = replaceMeta(out, 'name="twitter:description" content', opts.desc);
      if (opts.breadcrumbs) out = injectJsonLd(out, opts.breadcrumbs);
      return out;
    }

    app.get("/blog", (_req, res) => {
      try {
        const html = fs.readFileSync(distHtmlPath, "utf-8");
        const injected = injectBlogMeta(html, {
          title: "Blog Renovasi Rumah: Tips & Panduan | Ratunda Renovasi",
          desc: "Artikel dan panduan renovasi rumah dari tim arsitek Ratunda \u2014 tips hemat biaya, solusi atap bocor, renovasi dapur &amp; kamar mandi di Jakarta.",
          canonical: "https://ratunda.id/blog",
          breadcrumbs: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: "https://ratunda.id/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://ratunda.id/blog" },
            ],
          },
        });
        res.setHeader("Content-Type", "text/html");
        res.send(injected);
      } catch {
        res.sendFile(distHtmlPath);
      }
    });

    app.get("/blog/:slug", (req, res) => {
      const post = getBlogPost(req.params.slug);
      if (!post) return res.sendFile(distHtmlPath);
      try {
        const { meta } = post;
        const html = fs.readFileSync(distHtmlPath, "utf-8");
        const injected = injectBlogMeta(html, {
          title: `${escapeHtml(meta.title)} | Ratunda Renovasi`,
          desc: escapeHtml(meta.description),
          keywords: escapeHtml(meta.keywords),
          canonical: `https://ratunda.id/blog/${meta.slug}`,
          breadcrumbs: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: "https://ratunda.id/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://ratunda.id/blog" },
              { "@type": "ListItem", position: 3, name: meta.title, item: `https://ratunda.id/blog/${meta.slug}` },
            ],
          },
        });
        res.setHeader("Content-Type", "text/html");
        res.send(injected);
      } catch {
        res.sendFile(distHtmlPath);
      }
    });
  }

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);

      // Send email notification to hello@ratunda.id
      const serviceLabel = SERVICE_LABELS[input.serviceType] || input.serviceType;
      const htmlBody = `
        <h2>Inquiry Baru dari Website Ratunda</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Nama</td><td style="padding:6px 12px;">${escapeHtml(input.name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Telepon/WA</td><td style="padding:6px 12px;">${escapeHtml(input.phone)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Layanan</td><td style="padding:6px 12px;">${escapeHtml(serviceLabel)}</td></tr>
          ${input.email ? `<tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${escapeHtml(input.email)}</td></tr>` : ""}
          ${input.message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Pesan</td><td style="padding:6px 12px;">${escapeHtml(input.message)}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#666;font-size:13px;">Dikirim dari formulir kontak ratunda.id</p>
      `;

      transporter.sendMail({
        from: '"Ratunda Website" <noreply@ratunda.id>',
        to: "hello@ratunda.id",
        subject: `[Inquiry] ${input.name} — ${serviceLabel}`,
        html: htmlBody,
      }).catch((err) => {
        console.error("Failed to send inquiry email:", err);
      });

      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
