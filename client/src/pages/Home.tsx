import { useState } from "react";
import { motion } from "framer-motion";
import {
  CloudRain, Droplets, Zap, ChefHat, Bath,
  Tent, Armchair, Wind, BrickWall, ArrowRight, Phone, CheckCircle2,
  LayoutGrid, PanelsTopLeft, Layers, Maximize, Sun, Construction,
  TreePine, Square, Waves, Thermometer, UtensilsCrossed, Instagram,
  MessageSquare, ClipboardCheck, HardHat, ThumbsUp,
  Shield, Eye, Users, Clock, Star, Quote, ChevronDown, BookOpen
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ServiceCard } from "@/components/ServiceCard";
import { Marquee } from "@/components/Marquee";
import { InquiryForm } from "@/components/InquiryForm";
import { Button } from "@/components/ui/button";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";
import logoImg from "@assets/01_Ratunda_-_Primary_Logo_crop_1768105271103.png";
import heroImg from "@assets/supergrafis_1768108685140.png";
import p1 from "@assets/crop-bon_1768110247720.jpg";
import p2 from "@assets/crop-wan_1768110247720.jpg";
import p3 from "@assets/crop-deb_1768110247721.jpg";

// Service Data — formValue maps to InquiryForm serviceOptions
const services = [
  { title: "Atap Bocor", icon: CloudRain, formValue: "Atap Bocor" },
  { title: "Dinding Lembab", icon: Droplets, formValue: "Dinding Lembab" },
  { title: "Tarik Listrik", icon: Zap, formValue: "Tarik Listrik" },
  { title: "Renovasi Dapur", icon: ChefHat, formValue: "Renovasi Dapur" },
  { title: "Renovasi Kamar Mandi", icon: Bath, formValue: "Renovasi Kamar Mandi" },
  { title: "Pasang Kanopi", icon: Tent, formValue: "Pasang Kanopi" },
  { title: "Bikin Furniture", icon: Armchair, formValue: "Pembuatan Furniture" },
  { title: "Pasang AC", icon: Wind, formValue: "Pasang AC" },
  { title: "Cor Dak Beton", icon: BrickWall, formValue: "Cor Dak Beton" },
];

const specialties = [
  { text: "Pasang Roster", icon: LayoutGrid },
  { text: "Plafon Akustik", icon: Waves },
  { text: "Dinding Panel", icon: PanelsTopLeft },
  { text: "Secondary Skin Wall", icon: Layers },
  { text: "Lantai Mezzanine", icon: Maximize },
  { text: "Skylight", icon: Sun },
  { text: "Struktur Baja", icon: Construction },
  { text: "Pembuatan Taman", icon: TreePine },
  { text: "Jendela Aluminium", icon: Square },
  { text: "Atap Bitumen", icon: Tent },
  { text: "Pasang Water Heater", icon: Thermometer },
  { text: "Pembuatan Meja Makan", icon: UtensilsCrossed },
];

interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
      >
        <span className="font-bold font-display text-foreground text-base md:text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5 md:pb-6" : "max-h-0"}`}>
        <p className="px-5 md:px-6 text-sm md:text-base text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState("");

  const { data: blogPosts = [], isLoading: blogLoading } = useQuery<BlogPostMeta[]>({
    queryKey: ["/api/blog"],
    queryFn: () => fetch("/api/blog").then((r) => r.json()),
  });

  const scrollToContact = (service?: string) => {
    if (service) setSelectedService(service);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body">
      <WhatsAppBubble />
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#0b142e]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Ratunda Renovasi - Jasa Renovasi Rumah Jakarta" className="h-10 w-auto brightness-0 invert" />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog">
              <span className="text-white/70 hover:text-white text-sm font-medium transition-colors cursor-pointer">Blog</span>
            </Link>
            <Button
              onClick={scrollToContact}
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0b142e]">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#734375]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#004d26]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:pr-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground font-semibold text-xs mb-4 border border-accent/30 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-white/90">One Project, One Architect In-Charge</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-display text-white leading-[1.1] mb-4">
                Renovasi Rumah <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
                  Dipimpin Arsitek,
                </span>
                <br /> Bukan Cuma Tukang
              </h1>

              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6 max-w-md">
                Capek kerjaan renovasi nggak sesuai ekspektasi? Di Ratunda, setiap proyek dipimpin arsitek berpengalaman dengan harga transparan via RAB — bukan estimasi asal-asalan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => scrollToContact()}
                  className="h-12 px-6 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
                >
                  Konsultasi Gratis Sekarang <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <span className="inline-flex items-center justify-center h-12 px-6 rounded-full text-base font-semibold border-2 border-white/20 text-white whitespace-nowrap">
                  <Phone className="mr-2 w-4 h-4 shrink-0" /> 0811-8881-9865
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs font-medium text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" /> Bergaransi
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" /> Harga Transparan
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" /> Dipimpin Arsitek
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative lg:col-span-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <img 
                  src={heroImg}
                  alt="Jasa renovasi rumah profesional Jakarta - Ratunda Renovasi" 
                  className="w-full h-auto scale-110 object-contain"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-8 left-8 bg-gray-100/95 backdrop-blur px-6 py-4 rounded-2xl shadow-xl max-w-xs border border-gray-200"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex -space-x-3">
                      {[p1, p2, p3].map((img, i) => (
                        <img key={i} src={img} alt={`Tim arsitek Ratunda Renovasi ${i + 1}`} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">100+</span>
                  </div>
                  <p className="text-sm text-gray-800 font-semibold">
                    Proyek renovasi telah diselesaikan dengan memuaskan.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Layanan Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mt-3 mb-4">
              Apapun Masalah Rumah Anda, <br/> Kami Punya Solusinya
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                delay={index * 0.1}
                onClick={() => scrollToContact(service.formValue)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Cara Kerja Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mt-3 mb-4">
              4 Langkah Mudah Menuju <br /> Hunian Impian Anda
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-primary/25" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">

            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Konsultasi Gratis",
                desc: "Hubungi kami via WhatsApp atau formulir. Ceritakan kebutuhan renovasi Anda — tim kami siap mendengarkan.",
              },
              {
                step: "02",
                icon: ClipboardCheck,
                title: "Survei & Estimasi",
                desc: "Tim ahli kami datang ke lokasi untuk survei, lalu memberikan estimasi biaya yang transparan dan detail.",
              },
              {
                step: "03",
                icon: HardHat,
                title: "Pengerjaan Profesional",
                desc: "Tukang berpengalaman mengerjakan proyek sesuai timeline yang disepakati, dengan update progres berkala.",
              },
              {
                step: "04",
                icon: ThumbsUp,
                title: "Serah Terima & Garansi",
                desc: "Proyek selesai, Anda puas. Kami berikan garansi pekerjaan untuk ketenangan jangka panjang Anda.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-primary/15 flex items-center justify-center shadow-sm">
                    <item.icon className="w-9 h-9 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-md">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed max-w-[250px] text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          </div>

          {/* CTA under steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-14"
          >
            <Button
              onClick={scrollToContact}
              className="h-12 px-8 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              Mulai Konsultasi Gratis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Ratunda Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Kenapa Ratunda?</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mt-3 mb-4">
              Bukan Sekadar Tukang, <br /> Tapi Partner Renovasi Anda
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Dipimpin Arsitek",
                desc: "Setiap proyek diawasi langsung oleh arsitek berpengalaman dari Poiesis — biro arsitektur dengan pengalaman 10+ tahun.",
              },
              {
                icon: Eye,
                title: "Harga Transparan",
                desc: "RAB (Rencana Anggaran Biaya) detail sebelum mulai kerja. Tidak ada biaya tersembunyi atau scope creep tanpa persetujuan.",
              },
              {
                icon: Clock,
                title: "Update Harian via WA",
                desc: "Grup WhatsApp khusus proyek Anda. Laporan progres dan biaya setiap hari — Anda selalu tahu perkembangannya.",
              },
              {
                icon: Shield,
                title: "Bergaransi",
                desc: "Garansi pekerjaan untuk ketenangan jangka panjang. Jika ada masalah setelah selesai, kami yang tangani.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Testimoni</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mt-3 mb-4">
              Apa Kata Klien Kami
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Ibu Sarah",
                location: "Kemang, Jakarta Selatan",
                service: "Renovasi Dapur",
                text: "Sangat puas dengan hasilnya! Arsitek dari Ratunda sangat detail dan komunikatif. Update progres via WA setiap hari bikin saya tenang meskipun lagi di kantor.",
                rating: 5,
              },
              {
                name: "Pak Budi",
                location: "BSD, Tangerang Selatan",
                service: "Atap Bocor & Plafon",
                text: "Sudah coba 2 tukang sebelumnya tapi bocor terus. Ratunda survei dulu, kasih RAB jelas, lalu kerjain. Sekarang sudah 6 bulan tidak bocor lagi.",
                rating: 5,
              },
              {
                name: "Ibu Mira",
                location: "Caryota, Cibubur",
                service: "Renovasi Rumah",
                text: "Saya sangat puas dengan pengalaman bekerja sama dengan tim Ratunda. Tim Ratunda bekerja dengan rapi, hasilnya memuaskan, dan sangat bisa menyesuaikan dengan budget tanpa mengurangi kualitas pekerjaan. Timnya ramah, komunikatif, dan cepat tanggap dalam merespons setiap kebutuhan maupun kendala di lapangan.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative"
              >
                <Quote className="w-8 h-8 text-accent/30 mb-3" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.location} — {testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-10"
          >
            <Button
              onClick={() => scrollToContact()}
              className="h-12 px-8 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              Konsultasi Gratis Sekarang <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-purple-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mt-3 mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Berapa biaya renovasi rumah di Jakarta?",
                a: "Biaya renovasi rumah bervariasi tergantung jenis pekerjaan, luas area, dan material yang digunakan. Di Ratunda, kami memberikan RAB (Rencana Anggaran Biaya) detail setelah survei lokasi gratis, sehingga Anda tahu persis biaya sebelum pekerjaan dimulai. Tidak ada biaya tersembunyi.",
              },
              {
                q: "Apakah Ratunda melayani area di luar Jakarta?",
                a: "Ya, Ratunda melayani seluruh wilayah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) dan kota-kota besar lainnya di Indonesia. Hubungi kami untuk konfirmasi ketersediaan di lokasi Anda.",
              },
              {
                q: "Apa bedanya Ratunda dengan jasa tukang biasa?",
                a: "Di Ratunda, setiap proyek dipimpin oleh arsitek berpengalaman dengan konsep 'One Project, One Architect In-Charge'. Arsitek kami mengawasi langsung pekerjaan tukang dan mandor di lapangan, memberikan konsultasi teknis, serta memastikan kualitas sesuai standar. Ratunda adalah sister company dari Poiesis, biro arsitektur dengan pengalaman lebih dari 10 tahun.",
              },
              {
                q: "Berapa lama waktu pengerjaan renovasi rumah?",
                a: "Durasi pengerjaan tergantung skala proyek. Perbaikan ringan seperti atap bocor bisa selesai dalam 1-3 hari. Renovasi kamar mandi atau dapur sekitar 2-4 minggu. Proyek besar seperti cor dak beton atau penambahan lantai bisa memakan waktu 1-3 bulan. Timeline detail akan tercantum dalam RAB sebelum pekerjaan dimulai.",
              },
              {
                q: "Apakah ada garansi untuk pekerjaan renovasi?",
                a: "Ya, Ratunda memberikan garansi untuk setiap pekerjaan yang telah diselesaikan. Jika terdapat masalah setelah proyek selesai yang terkait dengan kualitas pengerjaan kami, tim Ratunda akan menanganinya tanpa biaya tambahan sesuai ketentuan garansi.",
              },
              {
                q: "Bagaimana cara memulai konsultasi dengan Ratunda?",
                a: "Anda bisa menghubungi kami melalui WhatsApp di 0811-8881-9865 atau mengisi formulir konsultasi di website kami. Tim kami akan merespons dalam waktu singkat, menjadwalkan survei lokasi gratis, dan memberikan RAB detail sebelum pekerjaan dimulai. Konsultasi awal sepenuhnya gratis dan tanpa komitmen.",
              },
            ].map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4 md:px-6 mb-6 text-center">
          <h3 className="text-xl md:text-2xl font-bold font-display text-foreground">
            Spesialisasi Konstruksi Lainnya
          </h3>
        </div>
        <div className="bg-primary/5 py-12 space-y-8">
          <Marquee items={specialties.slice(0, 4)} speed="fast" />
          <Marquee items={specialties.slice(4, 8)} direction="right" speed="fast" />
          <Marquee items={specialties.slice(8)} speed="fast" />
        </div>
      </section>

      {/* Blog Preview Section */}
      {(blogLoading || blogPosts.length > 0) && (
        <section className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Artikel Terbaru</span>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mt-3">
                  Tips & Panduan Renovasi
                </h2>
                <div className="w-20 h-1.5 bg-accent rounded-full mt-4" />
              </div>
              <Link href="/blog">
                <span className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all cursor-pointer text-sm group">
                  Lihat Semua <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {blogLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 animate-pulse h-52" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <article className="group rounded-2xl border border-gray-100 bg-white p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer h-full flex flex-col">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 self-start mb-3">
                          <BookOpen className="inline w-3 h-3 mr-1" />
                          {post.category}
                        </span>
                        <h3 className="text-base font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                          <span className="ml-auto flex items-center gap-1 group-hover:text-primary transition-colors font-medium">
                            Baca <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center mt-8 md:hidden">
              <Link href="/blog">
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm cursor-pointer">
                  Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                Siap Mewujudkan <br/>
                <span className="text-accent">Hunian Impian?</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed max-w-md">
                Jangan ragu untuk berkonsultasi. Tim ahli kami siap memberikan solusi terbaik untuk kebutuhan renovasi dan konstruksi Anda.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Telepon & WhatsApp</h4>
                    <p className="text-primary-foreground/70">Senin - Minggu, 08:00 - 17:00</p>
                    <p className="text-white font-mono mt-1 text-lg">0811-8881-9865</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Area Layanan</h4>
                    <p className="text-primary-foreground/70">
                      Melayani seluruh wilayah Jabodetabek dan kota-kota besar di Indonesia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full">
              <InquiryForm selectedService={selectedService} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row flex-wrap justify-between gap-12 mb-12">
            <div className="max-w-xs text-center md:text-left">
              <img src={logoImg} alt="Ratunda Renovasi - Jasa Perbaikan dan Renovasi Rumah" className="h-12 w-auto mb-6 brightness-0 invert mx-auto md:mx-0" />
              <p className="text-gray-400 text-sm mb-4">
                Partner terpercaya untuk segala kebutuhan konstruksi dan renovasi rumah Anda. Mengutamakan kualitas dan kepuasan pelanggan.
              </p>
              <a 
                href="https://instagram.com/ratunda.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>@ratunda.id</span>
              </a>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Layanan Trending</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Renovasi Rumah</li>
                <li>Perbaikan Atap</li>
                <li>Instalasi Listrik</li>
                <li>Desain Interior</li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h4 className="font-bold mb-4 text-accent">Layanan Lainnya</h4>
              <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-gray-400 text-sm min-w-[300px] md:min-w-[450px]">
                <ul className="space-y-2">
                  <li>Pasang Roster</li>
                  <li>Plafon Akustik</li>
                  <li>Dinding Panel</li>
                  <li>Secondary Skin</li>
                </ul>
                <ul className="space-y-2">
                  <li>Lantai Mezzanine</li>
                  <li>Skylight</li>
                  <li>Struktur Baja</li>
                  <li>Bikin Taman</li>
                </ul>
                <ul className="space-y-2">
                  <li>Jendela Aluminium</li>
                  <li>Atap Bitumen</li>
                  <li>Water Heater</li>
                  <li>Meja Makan</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Kontak</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>hello@ratunda.id</li>
                <li>+62 811-8881-9865</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            © 2026 Ratunda Renovasi. PT. Pencipta Organik Imaji. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
