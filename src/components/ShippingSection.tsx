import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Shield } from "lucide-react";

/* ─────────────────────────────────────────────
   Datos de cada operador logístico
───────────────────────────────────────────── */
const carriers = [
  {
    id: "shalom",
    name: "Shalom",
    tagline: "Envíos Nacionales",
    photo: "/carrier_shalom.png",
    accentColor: "#3b82f6",          // blue-500
    gradientFrom: "from-blue-600",
    labelBg: "bg-blue-600/90",
    description:
      "Cobertura en todo el Perú. Enviamos sobres, paquetes y encomiendas a cientos de destinos con tarifas accesibles.",
    details: [
      { icon: MapPin, text: "Todo el Perú" },
      { icon: Clock,  text: "3–7 días hábiles" },
      { icon: Shield, text: "Envío asegurado" },
    ],
  },
  {
    id: "olva",
    name: "Olva Courier",
    tagline: "+30 Años de Experiencia",
    photo: "/carrier_olva.png",
    accentColor: "#ec4899",          // pink-500
    gradientFrom: "from-pink-600",
    labelBg: "bg-pink-600/90",
    description:
      "Red de oficinas a nivel nacional con más de 30 años en el mercado. Logística confiable para tu tranquilidad.",
    details: [
      { icon: MapPin, text: "200+ ciudades" },
      { icon: Clock,  text: "2–5 días hábiles" },
      { icon: Shield, text: "Tracking en tiempo real" },
    ],
  },
  {
    id: "motos",
    name: "Motorizados",
    tagline: "Entregas el Mismo Día",
    photo: "/carrier_moto.png",
    accentColor: "#22d3ee",          // cyan-400
    gradientFrom: "from-cyan-500",
    labelBg: "bg-cyan-600/90",
    description:
      "Entregamos en el día dentro de la ciudad. Ideal para compras urgentes o regalos de última hora.",
    details: [
      { icon: MapPin, text: "Lima Metropolitana" },
      { icon: Clock,  text: "Mismo día" },
      { icon: Shield, text: "Entrega confirmada" },
    ],
  },
];

/* ─────────────────────────────────────────────
   FlipCard individual
   - Desktop: flip on hover (CSS group-hover)
   - Mobile:  flip on scroll (IntersectionObserver)
───────────────────────────────────────────── */
const FlipCard = ({
  carrier,
  index,
}: {
  carrier: (typeof carriers)[number];
  index: number;
}) => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Scroll-triggered flip para móvil */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /* Solo activo en pantallas pequeñas (< 640px) */
        if (window.innerWidth >= 640) return;
        if (entry.isIntersecting) {
          /* Delay escalonado según índice de la tarjeta */
          const timer = setTimeout(() => setFlipped(true), index * 150);
          return () => clearTimeout(timer);
        } else {
          setFlipped(false);
        }
      },
      { threshold: 0.75 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 16,
        delay: index * 0.12,
      }}
      /* perspective on the outer wrapper */
      className="group"
      style={{ perspective: "1100px" }}
    >
      {/* Inner rotating wrapper
          - sm+: rotates on mouse hover via CSS
          - mobile: rotates when `flipped` state is true  */}
      <div
        className="relative w-full h-80 md:h-[22rem]"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
          /* On mobile: controlled by state; on desktop: overridden by CSS hover below */
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* ══════════════ FRENTE ══════════════ */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Foto de fondo */}
          <img
            src={carrier.photo}
            alt={carrier.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />

          {/* Overlay degradado inferior para legibilidad */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${carrier.gradientFrom}/10 via-transparent to-transparent`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Etiqueta inferior (estilo imagen de referencia) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: carrier.accentColor }}
              >
                {carrier.tagline}
              </p>
              <h3 className="font-heading font-bold text-xl text-white leading-tight">
                {carrier.name}
              </h3>
            </div>
            {/* Pill de hint */}
            <span className="hidden sm:block text-[10px] text-white/40 font-medium italic">
              hover →
            </span>
            <span className="sm:hidden text-[10px] text-white/40 font-medium italic">
              scroll →
            </span>
          </div>

          {/* Borde sutil con el color del acento */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1.5px ${carrier.accentColor}40` }}
          />
        </div>

        {/* ══════════════ REVERSO ══════════════ */}
        <div
          className="
            absolute inset-0 rounded-2xl overflow-hidden
            bg-gradient-to-br from-slate-900 to-slate-800
            border border-white/10
            flex flex-col items-start justify-center gap-5 p-7 md:p-8
          "
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Línea de acento */}
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: carrier.accentColor }}
          />

          <div>
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-1"
              style={{ color: carrier.accentColor }}
            >
              {carrier.tagline}
            </p>
            <h3 className="font-heading font-bold text-xl text-white mb-3">
              {carrier.name}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {carrier.description}
            </p>
          </div>

          {/* Detalles con íconos */}
          <ul className="flex flex-col gap-2.5 w-full">
            {carrier.details.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: carrier.accentColor }}
                  strokeWidth={2}
                />
                <span className="text-sm text-white/80">{text}</span>
              </li>
            ))}
          </ul>

          {/* Glow interior */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 110%, ${carrier.accentColor}18 0%, transparent 65%)`,
            }}
          />
        </div>

        {/* ── CSS: activa el giro en hover SOLO en sm+ ── */}
        <style>{`
          @media (min-width: 640px) {
            .group:hover > div[style*="preserve-3d"] {
              transform: rotateY(180deg) !important;
            }
          }
        `}</style>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Sección principal
───────────────────────────────────────────── */
const ShippingSection = () => {
  return (
    <section id="envios" className="py-20 md:py-28 relative overflow-hidden">
      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Envíos a{" "}
            <span className="gradient-text-blue">todo el Perú</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Trabajamos con los mejores operadores logísticos del país para que
            tu pedido llegue seguro.
          </p>
        </motion.div>

        {/* Flip cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          {carriers.map((c, i) => (
            <FlipCard key={c.id} carrier={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingSection;
