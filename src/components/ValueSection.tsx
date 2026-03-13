import { Globe, Shield, Star, Headphones } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-20 md:py-28 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-gradient-to-r from-primary/5 via-accent/5 to-purple-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir <span className="gradient-text">Chanell</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Más que una tienda de tecnología, somos tu aliado en{" "}
            <span className="text-accent font-medium">entretenimiento inteligente</span>.
          </p>
        </div>

        {/* Mobile: 1-col horizontal rows. Tablet: 2-col. Desktop: 4-col */}
        <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center group"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                  v.accent === "blue"
                    ? "bg-accent/10 border border-accent/15 text-accent"
                    : "bg-primary/10 border border-primary/15 text-primary"
                }`}
              >
                <v.icon className="w-7 h-7" strokeWidth={1.6} />
              </div>

              {/* Text */}
              <div className="sm:mt-0">
                <h3 className="font-heading font-semibold text-[15px] md:text-base leading-tight mb-1">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
