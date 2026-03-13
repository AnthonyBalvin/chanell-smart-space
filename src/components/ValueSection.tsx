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
    description: "1 año de garantía con soporte técnico incluido en todos nuestros productos.",
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
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir <span className="gradient-text">Chanell</span>?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Más que una tienda de tecnología, somos tu aliado en{" "}
            <span className="text-accent font-medium">entretenimiento inteligente</span>.
          </p>
        </div>

        {/* Mobile: 1-col cards with left accent. Tablet: 2-col. Desktop: 4-col icon strip */}
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`
                flex items-center gap-4 p-4 rounded-2xl
                bg-white/60 dark:bg-white/[0.04]
                border border-black/[0.06] dark:border-white/[0.07]
                shadow-sm
                sm:flex-col sm:items-center sm:text-center
                sm:bg-transparent sm:dark:bg-transparent
                sm:border-0 sm:shadow-none sm:p-0
                group
                ${v.accent === "blue"
                  ? "border-l-[3px] border-l-accent/60 sm:border-l-0"
                  : "border-l-[3px] border-l-primary/60 sm:border-l-0"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${v.accent === "blue"
                    ? "bg-accent/10 border border-accent/15 text-accent"
                    : "bg-primary/10 border border-primary/15 text-primary"
                  }`}
              >
                <v.icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.6} />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-heading font-semibold text-[15px] md:text-base leading-tight mb-0.5">
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
