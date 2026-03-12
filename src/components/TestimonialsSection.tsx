import { Star } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Carlos M.",
    location: "Lima",
    text: "Increíble calidad de imagen. El Cubeliti Max superó todas mis expectativas. La asesoría fue excelente.",
    rating: 5,
    initial: "C",
    color: "bg-blue-500",
  },
  {
    name: "María L.",
    location: "Arequipa",
    text: "El TV Box 4K transformó mi televisor antiguo. Ahora tengo Netflix, Disney+ y todas las apps sin problemas.",
    rating: 5,
    initial: "M",
    color: "bg-pink-500",
  },
  {
    name: "Roberto S.",
    location: "Trujillo",
    text: "Compré el Magcubic y me encantó. Perfecto para películas en familia. La garantía me da mucha tranquilidad.",
    rating: 4,
    initial: "R",
    color: "bg-accent",
  },
  {
    name: "Ana P.",
    location: "Cusco",
    text: "Excelente servicio. Me asesoraron por WhatsApp y el producto llegó en perfectas condiciones. 100% recomendado.",
    rating: 5,
    initial: "A",
    color: "bg-primary",
  },
];

// Duplicate the array to create a seamless infinite loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const T_DURATION = testimonials.length * 9; // Slow base speed: 36 seconds per cycle

  useEffect(() => {
    // Start continuous movement
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        ease: "linear",
        duration: T_DURATION,
        repeat: Infinity,
      },
    });
  }, [controls, T_DURATION]);

  const handleHoverStart = () => {
    // Stop the animation on hover/touch
    controls.stop();
  };

  const handleHoverEnd = () => {
    // Read the current position and resume the animation from that point
    // Note: To resume seamlessly, framer-motion requires passing the current value to the start sequence, but since x is a complex percentage string, it's easier to just restart the animation from the halted state without snapping back to 0. We can do this safely by simply calling start again without passing '0%'.
    controls.start({
      x: "-50%",
      transition: {
        ease: "linear",
        duration: T_DURATION,
        repeat: Infinity,
      },
    });
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="section-container"
      >
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Lo que dicen nuestros <span className="gradient-text">clientes</span>
          </h2>
        </div>

        {/* Marquee constrained within section-container bounds */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-[2rem] p-4">
          
          {/* Subtle fade edges to obscure the clipping point */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            ref={containerRef}
            className="flex w-max gap-4 md:gap-6 pr-4 md:pr-6 items-stretch"
            animate={controls}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onTouchStart={handleHoverStart}
            onTouchEnd={handleHoverEnd}
          >
            {duplicatedTestimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="glass-card w-[280px] md:w-[350px] p-6 lg:p-8 rounded-[1.5rem] flex-shrink-0 flex flex-col pointer-events-auto hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* Humanizing Avatar */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-sm border border-white/20 ${t.color}`}>
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-4 md:h-4 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
                    />
                  ))}
                </div>
                
                <p className="text-sm md:text-base text-foreground leading-relaxed italic flex-grow">
                  "{t.text}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
