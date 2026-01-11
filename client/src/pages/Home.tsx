import { motion } from "framer-motion";
import { 
  CloudRain, Droplets, Zap, ChefHat, Bath, 
  Tent, Armchair, Wind, BrickWall, ArrowRight, Phone, CheckCircle2,
  LayoutGrid, PanelsTopLeft, Layers, Maximize, Sun, Construction, 
  TreePine, Square, Waves, Thermometer, UtensilsCrossed
} from "lucide-react";
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

// Service Data
const services = [
  { title: "Atap Bocor", icon: CloudRain },
  { title: "Dinding Lembab", icon: Droplets },
  { title: "Tarik Listrik", icon: Zap },
  { title: "Renovasi Dapur", icon: ChefHat },
  { title: "Renovasi Kamar Mandi", icon: Bath },
  { title: "Pasang Kanopi", icon: Tent },
  { title: "Bikin Furniture", icon: Armchair },
  { title: "Pasang AC", icon: Wind },
  { title: "Cor Dak Beton", icon: BrickWall },
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

export default function Home() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body">
      <WhatsAppBubble />
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#0b142e]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Ratunda" className="h-10 w-auto brightness-0 invert" />
          </div>
          <Button 
            onClick={scrollToContact}
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6"
          >
            Hubungi Kami
          </Button>
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
                <span className="text-white/90">Jasa Renovasi Terpercaya</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-display text-white leading-[1.1] mb-4">
                Solusi Renovasi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
                  Rumah & Konstruksi
                </span>
                <br /> Modern
              </h1>
              
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6 max-w-md">
                Wujudkan hunian impian Anda dengan layanan profesional, transparan, dan hasil berkualitas tinggi di seluruh Indonesia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={scrollToContact}
                  className="h-12 px-6 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
                >
                  Konsultasi Gratis Sekarang <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 px-6 rounded-full text-base font-semibold border-2 border-white/20 hover:bg-white/10 text-white"
                >
                  <Phone className="mr-2 w-4 h-4" /> 0811-8881-9865
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs font-medium text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" /> Bergaransi
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" /> Tepat Waktu
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" /> Profesional
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
                  alt="Modern Home Renovation Supergraphic" 
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
                        <img key={i} src={img} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
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
              />
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
                    <p className="text-white font-mono mt-1 text-lg">0812-3456-7890</p>
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
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row flex-wrap justify-between gap-12 mb-12">
            <div className="max-w-xs">
              <img src={logoImg} alt="Ratunda" className="h-12 w-auto mb-6 brightness-0 invert" />
              <p className="text-gray-400 text-sm">
                Partner terpercaya untuk segala kebutuhan konstruksi dan renovasi rumah Anda. Mengutamakan kualitas dan kepuasan pelanggan.
              </p>
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
