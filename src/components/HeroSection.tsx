import { Globe, Shield, Star, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-projector.jpg";

const HeroSection = () => {
  const values = [
    { icon: Globe, label: "Importación directa" },
    { icon: Shield, label: "Garantía real" },
    { icon: Star, label: "Equipos seleccionados" },
    { icon: Headphones, label: "Asesoría personalizada" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ background: "var(--gradient-hero)" }}>
      {/* Subtle decorative shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Convierte cualquier espacio en{" "}
                <span className="gradient-text">entretenimiento inteligente</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Proyectores inteligentes y TV Box premium para transformar tu forma de disfrutar contenido.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#productos" className="btn-primary-gradient inline-flex items-center">
                Ver productos
              </a>
              <a
                href="https://wa.me/51934301716?text=Hola%2C%20me%20interesa%20conocer%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-premium inline-flex items-center"
              >
                Comprar por WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {values.map((v) => (
                <div key={v.label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Sala moderna con proyector inteligente Chanell Tecnología"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card p-4 hidden md:block">
              <p className="text-sm font-semibold text-foreground">+500 clientes satisfechos</p>
              <p className="text-xs text-muted-foreground">en todo el Perú</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
