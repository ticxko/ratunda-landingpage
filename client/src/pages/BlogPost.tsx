import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@assets/01_Ratunda_-_Primary_Logo_crop_1768105271103.png";

interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  category: string;
  keywords: string;
  readTime: string;
}

interface BlogPostData {
  meta: BlogPostMeta;
  html: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery<BlogPostData>({
    queryKey: ["/api/blog", slug],
    queryFn: () =>
      fetch(`/api/blog/${slug}`).then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      }),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-body">
        {/* Nav skeleton */}
        <nav className="fixed w-full top-0 z-50 bg-[#0b142e]/90 backdrop-blur-md border-b border-white/5 h-20" />
        <div className="pt-32 max-w-3xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-white font-body flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Artikel tidak ditemukan.</p>
        <Link href="/blog">
          <span className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
          </span>
        </Link>
      </div>
    );
  }

  const { meta, html } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    author: {
      "@type": "Organization",
      name: meta.author,
      url: "https://ratunda.id",
    },
    publisher: {
      "@type": "Organization",
      name: "Ratunda Renovasi",
      url: "https://ratunda.id",
      logo: {
        "@type": "ImageObject",
        url: "https://ratunda.id/logo.png",
      },
    },
    datePublished: meta.date,
    dateModified: meta.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ratunda.id/blog/${meta.slug}`,
    },
    keywords: meta.keywords,
  };

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#0b142e]/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <img
              src={logoImg}
              alt="Ratunda Renovasi"
              className="h-10 w-auto brightness-0 invert cursor-pointer"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer hidden md:inline">
                Beranda
              </span>
            </Link>
            <Link href="/blog">
              <span className="text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer">
                Blog
              </span>
            </Link>
            <a
              href="https://wa.me/628118881986?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-5 py-2 text-sm transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </nav>

      {/* Article header bar */}
      <div className="bg-[#0b142e] pt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 cursor-pointer transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Blog
              </span>
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-accent/80 border border-accent px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3 text-white" />
                {meta.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold font-display text-white leading-tight max-w-3xl mb-4">
              {meta.title}
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              {meta.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 pb-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(meta.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {meta.readTime} baca
              </span>
              <span>oleh {meta.author}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article body */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl mx-auto px-4 py-12"
      >
        <div
          className="prose prose-gray prose-lg max-w-none
            prose-headings:font-bold prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-table:text-sm prose-th:bg-primary/5 prose-th:font-semibold
            prose-td:border prose-td:border-gray-200 prose-th:border prose-th:border-gray-200
            prose-td:px-3 prose-td:py-2 prose-th:px-3 prose-th:py-2
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* CTA box */}
        <div className="mt-14 rounded-2xl bg-primary p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10">
            <h3 className="font-bold font-display text-white text-xl mb-2">
              Butuh bantuan untuk renovasi rumahmu?
            </h3>
            <p className="text-primary-foreground/75 text-sm mb-6 max-w-md">
              Konsultasi gratis dengan arsitek Ratunda — kami survey lokasi dan siapkan RAB tanpa biaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/628118881986?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-black/20 text-sm"
              >
                Chat WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/#contact">
                <span className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                  Isi Formulir Konsultasi
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 border-t border-white/10 mt-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src={logoImg}
            alt="Ratunda Renovasi"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Ratunda Renovasi · PT. Pencipta Organik Imaji
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/">
              <span className="hover:text-white transition-colors cursor-pointer">Beranda</span>
            </Link>
            <Link href="/blog">
              <span className="hover:text-white transition-colors cursor-pointer">Blog</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
