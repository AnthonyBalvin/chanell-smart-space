import { Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const WarrantySection = () => {
  const points = [
    "6 meses de garantía en todos los productos",
    "Soporte técnico por WhatsApp",
    "Reemplazo en caso de defecto de fábrica",
    "Asesoría post-venta incluida",
  ];

  return (
    <section id="garantia" className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-accent/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="section-container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Shield Icon */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl sm:rounded-[2rem] flex items-center justify-center mx-auto mb-6 md:mb-8 border border-accent/20 bg-gradient-to-tr from-accent/10 to-accent/5 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-md cursor-pointer transition-all duration-300"
          >
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-accent" />
          </motion.div>

          {/* Titles & Description */}
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 mb-10 md:mb-14 px-4 sm:px-0">
            <h2 className="font-heading text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
              Compra con total <span className="gradient-text-blue">confianza</span>
            </h2>
            <p className="text-muted-foreground text-[15px] sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Todos nuestros productos cuentan con garantía real y soporte técnico dedicado.
            </p>
          </motion.div>

          {/* Points list (Vertical mobile, 2x2 Tablets/PC) */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 text-left w-full max-w-3xl mx-auto"
          >
            {points.map((p, i) => (
              <motion.div 
                key={p} 
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 glass-card p-4 md:p-5 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group"
              >
                {/* Number / Check Badge */}
                <div className="bg-background border border-border/50 p-2.5 rounded-xl shrink-0 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[14px] md:text-base font-medium text-foreground leading-snug">{p}</span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default WarrantySection;
