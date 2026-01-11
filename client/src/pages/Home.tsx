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
import heroImg from "@assets/hero_image.png"; 

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
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-display text-xl">
              R
            </div>
            <span className="text-xl font-bold text-foreground font-display hidden sm:block">
              Ratunda
            </span>
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
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground font-semibold text-sm mb-6 border border-accent/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Jasa Renovasi Terpercaya
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display text-foreground leading-[1.1] mb-6">
                Solusi Renovasi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  Rumah & Konstruksi
                </span>
                <br /> Modern
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Wujudkan hunian impian Anda dengan layanan profesional, transparan, dan hasil berkualitas tinggi di seluruh Indonesia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="h-14 px-8 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
                >
                  Konsultasi Gratis <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="h-14 px-8 rounded-full text-lg font-semibold border-2 border-border hover:bg-gray-50 text-foreground"
                >
                  <Phone className="mr-2 w-5 h-5" /> 0812-3456-7890
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Bergaransi
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Tepat Waktu
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" /> Profesional
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 border-8 border-white">
                {/* 
                  Using placeholder image for now as requested. 
                  In production, replace src with: heroImg 
                */}
                {/* HTML comment: modern minimalist house exterior renovation */}
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                  alt="Modern Home Renovation" 
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-8 left-8 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-xl max-w-xs border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                      ))}
                    </div>
                    <span className="font-bold text-foreground">500+</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
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
        <div className="bg-primary/5 py-8 space-y-6">
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
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold font-display mb-4">Ratunda</h3>
              <p className="text-gray-400 max-w-sm mx-auto md:mx-0">
                Partner terpercaya untuk segala kebutuhan konstruksi dan renovasi rumah Anda. Mengutamakan kualitas dan kepuasan pelanggan.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Layanan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Renovasi Rumah</li>
                <li>Perbaikan Atap</li>
                <li>Instalasi Listrik</li>
                <li>Desain Interior</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Kontak</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>info@ratunda.id</li>
                <li>+62 812 3456 7890</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            © 2024 Ratunda. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
