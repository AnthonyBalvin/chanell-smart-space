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

const containerVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // increased slightly for better cascade
    },
  },
};

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120, // bounce stiffness
      damping: 14, // how much it bounces (lower = more bounce)
      mass: 1,
    },
  },
};

const ValueSection = () => {
  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      <div className="section-container relative z-10">
        {/* Background glow for section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-gradient-to-r from-primary/5 via-accent/5 to-purple-500/5 blur-[120px] -z-10 rounded-full" />

        <div
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir <span className="gradient-text">Chanell</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Más que una tienda de tecnología, somos tu aliado en{" "}
            <span className="text-accent font-medium">entretenimiento inteligente</span>.
          </p>
        </div>

        {/* Grid Layout: Vertical on mobile, 2x2 on tablet, 4x1 on PC */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((v) => (
            <div
              key={v.title}
              className="glass-card p-8 flex flex-col items-start sm:items-center text-left sm:text-center relative rounded-3xl overflow-hidden shadow-sm shadow-primary/5"
            >

              {/* Icon Container with subtle bump and glow */}
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 relative z-10 shadow-sm ${v.accent === "blue"
                  ? "bg-accent/10 text-accent"
                  : "bg-primary/10 text-primary"
                }`}>
                <v.icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <h3 className="font-heading font-semibold text-xl mb-2 sm:mb-3 relative z-10 transition-colors duration-300">
                {v.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed relative z-10 w-full">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
