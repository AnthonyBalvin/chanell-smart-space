import { motion } from "framer-motion";
import { MousePointer, ShoppingCart, CreditCard, MessageCircle } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: MousePointer,
    title: "Elige tu equipo",
    desc: "Explora nuestro catálogo y elige el producto ideal.",
    blue: true,
  },
  {
    num: 2,
    icon: ShoppingCart,
    title: "Agrégalo al carrito",
    desc: "Añade los productos que te gusten al carrito.",
    blue: false,
  },
  {
    num: 3,
    icon: CreditCard,
    title: "Presiona pagar",
    desc: "Revisa tu pedido y confirma la compra.",
    blue: true,
  },
  {
    num: 4,
    icon: MessageCircle,
    title: "Recibe tu pedido",
    desc: "Coordinamos el envío por WhatsApp y te lo llevamos con Shalom, Olva o Motorizado.",
    blue: false,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
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
          <p className="text-muted-foreground text-lg">
            Comprar es fácil y rápido en 4 simples pasos.
          </p>
        </motion.div>

        {/* ── DESKTOP: Horizontal connected timeline ── */}
        <div className="hidden md:block relative">
          {/* Connecting line — z-[-1] stays behind circles */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 z-[-1] bg-gradient-to-r from-accent/30 via-primary/30 to-accent/30" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step circle node on the timeline */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 relative border-2 transition-transform duration-300 group-hover:scale-110 shadow-sm bg-background ${
                    step.blue
                      ? "border-accent/40 text-accent"
                      : "border-primary/40 text-primary"
                  }`}
                >
                  <step.icon className="w-7 h-7" strokeWidth={1.6} />
                  {/* Step number badge */}
                  <span
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center text-white shadow-sm ${
                      step.blue ? "bg-accent" : "bg-primary"
                    }`}
                  >
                    {step.num}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-base mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[160px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: Vertical timeline ── */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-7 w-0.5 bg-gradient-to-b from-accent/40 via-primary/30 to-transparent" style={{ height: 'calc(100% - 5rem)' }} />

          <div className="flex flex-col gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex items-start gap-5"
              >
                {/* Circle node */}
                <div
                  className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center relative border-2 shadow-sm bg-background ${
                    step.blue
                      ? "border-accent/30 text-accent"
                      : "border-primary/30 text-primary"
                  }`}
                >
                  <step.icon className="w-6 h-6" strokeWidth={1.6} />
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${
                      step.blue ? "bg-accent" : "bg-primary"
                    }`}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="pt-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                      step.blue ? "text-accent" : "text-primary"
                    }`}
                  >
                    Paso {step.num}
                  </span>
                  <h3 className="font-heading font-semibold text-base mb-1 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
