import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from "lucide-react";

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
    queryFn: () => fetch(`/api/blog/${slug}`).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400">Memuat artikel...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Artikel tidak ditemukan.</p>
        <Link href="/blog">
          <span className="text-orange-600 hover:underline cursor-pointer">← Kembali ke Blog</span>
        </Link>
      </div>
    );
  }

  const { meta, html } = data;

  // Build JSON-LD Article schema
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
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <span className="font-bold text-lg text-gray-900 cursor-pointer">Ratunda</span>
          </Link>
          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/">
              <span className="hover:text-gray-900 cursor-pointer">Beranda</span>
            </Link>
            <Link href="/blog">
              <span className="hover:text-gray-900 cursor-pointer">Blog</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Link href="/blog">
          <span className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </span>
        </Link>
      </div>

      {/* Article header */}
      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {meta.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
            {meta.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{meta.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(meta.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {meta.readTime} baca
            </span>
            <span className="text-gray-400">oleh {meta.author}</span>
          </div>
        </header>

        {/* Article body */}
        <div
          className="prose prose-gray prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold
            prose-td:border prose-td:border-gray-200 prose-th:border prose-th:border-gray-200
            prose-td:px-3 prose-td:py-2 prose-th:px-3 prose-th:py-2
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* CTA */}
        <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            Butuh bantuan untuk renovasi rumahmu?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Konsultasi gratis dengan arsitek Ratunda — kami survey lokasi dan siapkan RAB tanpa biaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/628118881986?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              Chat WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/#contact">
              <span className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-5 py-2.5 rounded-lg transition-colors text-sm cursor-pointer">
                Isi Formulir Konsultasi
              </span>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Ratunda Renovasi · PT. Pencipta Organik Imaji
      </footer>
    </div>
  );
}
