import { Globe, Shield, Star, Headphones } from "lucide-react";

const values = [
  {
    icon: Globe,
    title: "Importación directa",
    description: "Traemos los mejores equipos directamente de fábrica, sin intermediarios.",
    accent: "blue" as const,
  },
  {
    icon: Shield,
    title: "Garantía real",
    description: "6 meses de garantía con soporte técnico incluido en todos nuestros productos.",
    accent: "pink" as const,
  },
  {
    icon: Star,
    title: "Equipos seleccionados",
    description: "Cada producto es probado y seleccionado por nuestro equipo de expertos.",
    accent: "blue" as const,
  },
  {
    icon: Headphones,
    title: "Asesoría personalizada",
    description: "Te ayudamos a elegir el equipo perfecto para tus necesidades.",
    accent: "pink" as const,
  },
];

const ValueSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="gradient-text">Chanell</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más que una tienda de tecnología, somos tu aliado en{" "}
            <span className="text-accent font-medium">entretenimiento inteligente</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="glass-card p-6 hover-lift text-center">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                v.accent === "blue" ? "bg-accent/10" : "bg-primary/10"
              }`}>
                <v.icon className={`w-7 h-7 ${v.accent === "blue" ? "text-accent" : "text-primary"}`} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
