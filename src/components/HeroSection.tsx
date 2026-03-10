import { ArrowRight, MessageCircle, Globe, Shield, Star, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-projector.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const values = [
    { icon: Globe, label: "Importación directa", blue: true },
    { icon: Shield, label: "Garantía real", blue: false },
    { icon: Star, label: "Equipos seleccionados", blue: true },
    { icon: Headphones, label: "Asesoría personalizada", blue: false },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      
      {/* 1. Background Image — GPU-accelerated layer */}
      <img
        src={heroImage}
        alt="Exclusivo proyector inteligente en un cine en casa premium"
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        loading="eager"
        decoding="async"
      />

      {/* 2. Dark overlay + gradient blend (consolidated — no backdrop-blur for performance) */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(135deg, rgba(20,30,50,0.78) 0%, rgba(43,90,158,0.55) 40%, rgba(241,180,232,0.25) 100%)"
        }}
      />
      
      {/* Top Navbar Shadow Overlay */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-[2]" />

      {/* Bottom fade to background */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

      {/* Content Container */}
      <div className="section-container relative z-10 w-full flex flex-col items-center text-center mx-auto max-w-3xl px-4 md:px-0">
        
        <div className="space-y-8 w-full flex flex-col items-center">
          
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium text-white shadow-lg mx-auto animate-fade-down">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(241,180,232,0.8)]" />
            La revolución del Home Cinema
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl animate-fade-up text-center mx-auto">
            Convierte cualquier pantalla en{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-pink)' }}>
              entretenimiento inteligente
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto text-center drop-shadow-lg font-medium animate-fade-up" style={{ animationDelay: '100ms' }}>
            Proyectores inteligentes y TV Box premium para transformar tu forma de disfrutar películas, series y streaming.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 pt-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/catalogo"
              className="btn-primary-gradient w-full sm:w-auto text-lg !py-4 !px-8 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(43,90,158,0.4)] border border-white/10"
            >
              Ver productos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/51934301716?text=Hola%2C%20me%20interesa%20conocer%20sus%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-lg !py-4 !px-8 rounded-full flex items-center justify-center gap-2 bg-black/60 hover:bg-black/75 border-2 border-white text-white font-semibold transition-all shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />
              Comprar por WhatsApp
            </a>
          </div>

          {/* Benefits / Values */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
            {values.map((v) => (
              <div key={v.label} className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-xl text-white">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10">
                  <v.icon className={`w-4 h-4 ${v.blue ? "text-blue-300" : "text-pink-300"}`} />
                </div>
                <span className="text-xs font-medium">{v.label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
