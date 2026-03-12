import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "¿Los proyectores vienen con apps como Netflix y YouTube?",
    a: "Sí, nuestros proyectores vienen con Android instalado, lo que te permite descargar Netflix, YouTube, Disney+, Amazon Prime y muchas más apps directamente desde Google Play Store.",
  },
  {
    q: "¿Cuánto dura la garantía?",
    a: "Todos nuestros productos cuentan con 6 meses de garantía que cubre defectos de fábrica. Además, ofrecemos soporte técnico por WhatsApp.",
  },
  {
    q: "¿Es difícil instalar un TV Box?",
    a: "No, la instalación es muy sencilla. Solo necesitas conectar el TV Box a tu televisor por HDMI, conectarlo al WiFi y listo. En minutos tienes un Smart TV.",
  },
  {
    q: "¿Los proyectores funcionan de día?",
    a: "Depende del modelo. Nuestros proyectores de alta potencia (como el Cubeliti Max y Amaran Touch) ofrecen buena visibilidad incluso con algo de luz ambiental. Para mejor experiencia, recomendamos un ambiente con poca luz.",
  },
  {
    q: "¿Hacen envíos a todo el Perú?",
    a: "Sí, realizamos envíos a todo el Perú. Los envíos a Lima son de 1-2 días y a provincias de 3-5 días hábiles.",
  },
  {
    q: "¿Puedo probar los productos antes de comprar?",
    a: "¡Sí! Puedes visitarnos en nuestro showroom para probar cualquier equipo antes de tomar tu decisión. Atención sin cita previa.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="section-container max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div variants={itemVariants} key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm md:text-base pr-4 text-foreground">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
