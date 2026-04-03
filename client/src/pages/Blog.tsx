import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearch, useLocation } from "wouter";
import { ArrowRight, Calendar, Clock, Tag, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
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
  thumbnail?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  "Biaya & Perencanaan": "bg-accent/80 text-white border border-accent",
  "Masalah Rumah & Solusi": "bg-primary/80 text-white border border-primary",
  "Tips Memilih Jasa": "bg-secondary/80 text-white border border-secondary",
  "Panduan Renovasi": "bg-accent/80 text-white border border-accent",
  "Panduan Teknis": "bg-primary/80 text-white border border-primary",
};

const POSTS_PER_PAGE = 10;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const searchString = useSearch();
  const [, navigate] = useLocation();

  const pageParam = new URLSearchParams(searchString).get("page");
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);

  const { data: posts = [], isLoading } = useQuery<BlogPostMeta[]>({
    queryKey: ["/api/blog"],
    queryFn: () => fetch("/api/blog").then((r) => r.json()),
  });

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const startIdx = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const goToPage = useCallback((page: number) => {
    navigate(page <= 1 ? "/blog" : `/blog?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
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
              <span className="text-accent text-sm font-semibold cursor-pointer">Blog</span>
            </Link>
            <a
              href="https://wa.me/6281188819865?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-5 py-2 text-sm transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#0b142e] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#734375]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#004d26]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-white/90 text-xs font-semibold mb-5 border border-accent/30">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              Artikel & Panduan
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight mb-4">
              Blog Renovasi Rumah
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Tips, panduan biaya, dan solusi masalah renovasi dari tim arsitek Ratunda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <main className="container mx-auto px-4 md:px-6 py-16">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-gray-50 animate-pulse h-72"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Belum ada artikel. Segera hadir!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group rounded-2xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer h-full flex flex-col overflow-hidden">
                      {post.thumbnail && (
                        <div className="w-full h-48 overflow-hidden bg-gray-100">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
                              CATEGORY_STYLES[post.category] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            <Tag className="w-3 h-3" />
                            {post.category}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 text-gray-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                      page === currentPage
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 text-gray-600"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      {/* CTA */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
            Butuh konsultasi renovasi?
          </h2>
          <p className="text-primary-foreground/75 mb-8 text-lg max-w-lg mx-auto">
            Diskusikan proyekmu dengan arsitek Ratunda — gratis, tanpa komitmen.
          </p>
          <a
            href="https://wa.me/6281188819865?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/20 text-base"
          >
            Chat WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 border-t border-white/10">
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
