import { Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const WarrantySection = () => {
  const points = [
    { label: "1 año de garantía en todos los productos", detail: "Cobertura real desde el día de tu compra." },
    { label: "Soporte técnico por WhatsApp", detail: "Te atendemos rápido, sin esperas ni trámites." },
    { label: "Reemplazo por defecto de fábrica", detail: "Si el equipo falla por fabricación, lo reemplazamos." },
    { label: "Asesoría post-venta incluida", detail: "Te acompañamos después de tu compra." },
  ];

  return (
    <section id="garantia" className="py-20 md:py-28 relative overflow-hidden">
      {/* Very subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-accent/4 blur-[120px] -z-10 rounded-full" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Shield icon — prominent, standalone */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-gradient-to-tr from-accent/15 to-accent/5 border border-accent/20 shadow-[0_8px_30px_rgba(59,130,246,0.18)] cursor-pointer"
          >
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-accent" strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Compra con total{" "}
            <span className="gradient-text-blue">confianza</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Todos nuestros productos cuentan con garantía real y soporte técnico dedicado.
          </p>
        </motion.div>

        {/* 4 independent cards — 2x2 grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto"
        >
          {points.map((p) => (
            <motion.div
              key={p.label}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="flex items-start gap-4 bg-card border border-border/60 rounded-2xl p-5 md:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              {/* Large icon circle */}
              <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-accent/10 border border-accent/20">
                <CheckCircle className="w-5 h-5 text-accent" strokeWidth={2} />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm md:text-base text-foreground leading-snug mb-1">
                  {p.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WarrantySection;
