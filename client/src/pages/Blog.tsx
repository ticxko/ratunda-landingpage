import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

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

const CATEGORY_COLORS: Record<string, string> = {
  "Biaya & Perencanaan": "bg-blue-100 text-blue-700",
  "Masalah Rumah & Solusi": "bg-orange-100 text-orange-700",
  "Tips Memilih Jasa": "bg-green-100 text-green-700",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery<BlogPostMeta[]>({
    queryKey: ["/api/blog"],
    queryFn: () => fetch("/api/blog").then((r) => r.json()),
  });

  return (
    <div className="min-h-screen bg-white">
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
              <span className="hover:text-gray-900 cursor-pointer font-medium text-gray-900">Blog</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-medium text-orange-600 mb-2">Artikel & Panduan</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Blog Renovasi Rumah
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Tips, panduan biaya, dan solusi masalah renovasi dari tim arsitek Ratunda.
          </p>
        </div>
      </section>

      {/* Posts */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Belum ada artikel. Segera hadir!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group rounded-xl border border-gray-200 p-6 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Tag className="inline w-3 h-3 mr-1" />
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="bg-orange-50 border-t border-orange-100 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Butuh konsultasi renovasi?
          </h2>
          <p className="text-gray-600 mb-6">
            Diskusikan proyekmu dengan arsitek Ratunda — gratis, tanpa komitmen.
          </p>
          <a
            href="https://wa.me/628118881986?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Chat WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Ratunda Renovasi · PT. Pencipta Organik Imaji
      </footer>
    </div>
  );
}
