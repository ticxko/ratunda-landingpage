import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Tag, BookOpen } from "lucide-react";
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

const CATEGORY_STYLES: Record<string, string> = {
  "Biaya & Perencanaan": "bg-accent/20 text-accent-foreground border border-accent/30",
  "Masalah Rumah & Solusi": "bg-primary/10 text-primary border border-primary/20",
  "Tips Memilih Jasa": "bg-secondary/10 text-secondary border border-secondary/20",
  "Panduan Renovasi": "bg-muted/10 text-muted border border-muted/20",
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
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 animate-pulse h-52"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Belum ada artikel. Segera hadir!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group rounded-2xl border border-gray-100 bg-white p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer h-full flex flex-col">
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
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
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
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
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
            href="https://wa.me/628118881986?text=Halo%20Ratunda%2C%20saya%20ingin%20konsultasi%20renovasi"
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
