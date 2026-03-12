import { motion } from "framer-motion";
import { MousePointer, ShoppingCart, CreditCard, MessageCircle } from "lucide-react";

const steps = [
  { icon: MousePointer, title: "Elige tu equipo", desc: "Explora nuestro catálogo y elige el producto ideal.", blue: true },
  { icon: ShoppingCart, title: "Agrégalo al carrito", desc: "Añade los productos que te gusten al carrito.", blue: false },
  { icon: CreditCard, title: "Presiona pagar", desc: "Revisa tu pedido y confirma la compra.", blue: true },
  { icon: MessageCircle, title: "Pedido por WhatsApp", desc: "Tu pedido se envía automáticamente a WhatsApp.", blue: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.21, 0.47, 0.32, 0.98] as any
    }
  }
};

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            ¿Cómo <span className="gradient-text">comprar</span>?
          </h2>
          <p className="text-muted-foreground text-lg">Comprar es fácil y rápido en 4 simples pasos.</p>
        </motion.div>

        {/* --- MOBILE VIEW: Vertical Animated Timeline --- */}
        <div className="md:hidden relative">
          {/* Vertical continuous line */}
          <div className="absolute left-[39px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/30 via-accent/30 to-border" />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6 relative z-10"
          >
            {steps.map((step, i) => (
              <motion.div 
                key={step.title}
                variants={cardVariants}
                className="flex items-start gap-5 relative group"
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon Container (Circle on the timeline) */}
                <div className={`w-20 h-20 shrink-0 rounded-[1.25rem] flex items-center justify-center relative z-20 shadow-sm border border-white/20 backdrop-blur-md transition-all duration-300 group-active:shadow-md ${
                  step.blue ? "bg-blue-50/80 dark:bg-blue-900/20" : "bg-pink-50/80 dark:bg-pink-900/20"
                }`}>
                  <step.icon className={`w-8 h-8 ${step.blue ? "text-blue-500" : "text-pink-500"}`} />
                </div>
                
                {/* Content Card (Glassmorphism) */}
                <div className="flex-1 pt-2 pb-4 border-b border-border/40">
                  <span className={`text-xs font-bold mb-1.5 inline-block uppercase tracking-wider ${step.blue ? "text-blue-500" : "text-pink-500"}`}>
                    Paso {i + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold mb-1.5 text-foreground leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- DESKTOP VIEW: Original Grid Layout --- */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-[60%] right-[-40%] h-px bg-border" />
              )}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 ${
                step.blue ? "bg-blue-50/80 dark:bg-blue-900/20" : "bg-pink-50/80 dark:bg-pink-900/20"
              }`}>
                <step.icon className={`w-7 h-7 ${step.blue ? "text-blue-500" : "text-pink-500"}`} />
              </div>
              <span className={`text-xs font-bold mb-2 block uppercase tracking-wider ${step.blue ? "text-blue-500" : "text-pink-500"}`}>Paso {i + 1}</span>
              <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
