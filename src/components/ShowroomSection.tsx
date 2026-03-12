import { motion } from "framer-motion";
import { DoorOpen, MapPin, Clock, Navigation } from "lucide-react";
import showroomImage from "@/assets/showroom.jpg";

const containerVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } 
  }
};

const imageVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const ShowroomSection = () => {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          
          {/* Content Area */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-5 md:gap-8 lg:gap-10 w-full"
          >
            {/* Cinematic Image Area (Mobile Only - moved to TOP) */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:hidden mb-2"
            >
              <div className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] sm:border sm:border-border/50 shadow-lg">
                <div className="aspect-[16/10] w-full relative">
                  <img
                    src={showroomImage}
                    alt="Chanell Tecnología Showroom Experiencia"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Soft Mobile Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Title & Description */}
            <motion.div variants={itemVariants} className="space-y-3 md:space-y-5 text-center lg:text-left px-2 sm:px-0">
              <div className="hidden lg:flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground w-fit">
                <DoorOpen className="w-4 h-4 text-primary" />
                <span>¡Visítanos hoy! No se requiere cita previa</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Prueba la experiencia en el <span className="gradient-text">showroom</span>
              </h2>
              <p className="text-muted-foreground text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Visítanos y prueba nuestros equipos antes de comprar. Te guiaremos para 
                elegir el producto perfecto en un entorno ambientado como en casa.
              </p>
            </motion.div>

            {/* Local Data: Trust Signals */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              
              {/* Address Card */}
              <div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-muted/30 border border-border/50">
                <div className="bg-background p-2.5 rounded-[0.85rem] text-primary shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Av. Sáenz Peña 100</p>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Puente Piedra 15118, Perú.</p>
                </div>
              </div>
              
              {/* Hours Card */}
              <div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-muted/30 border border-border/50">
                <div className="bg-background p-2.5 rounded-[0.85rem] text-accent shadow-sm shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Lunes a Sábado</p>
                  <p className="text-[13px] text-muted-foreground mt-0.5">10:00 AM – 8:00 PM</p>
                </div>
              </div>

            </motion.div>

            {/* Action Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <a 
                href="https://maps.app.goo.gl/pNiggMzEbtxGUBK79" 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary-gradient inline-flex flex-row items-center justify-center gap-2 shadow-lg shadow-primary/20 w-full lg:w-fit py-4 px-8 text-[15px] font-semibold rounded-2xl"
              >
                <Navigation className="w-4 h-4" />
                Ir con GPS
              </a>
            </motion.div>

          </motion.div>

          {/* Cinematic Image Area (Desktop Only) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
            className="w-full hidden lg:block"
          >
            <div className="relative group rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl shadow-black/20 dark:shadow-black/40">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src={showroomImage}
                  alt="Chanell Tecnología Showroom Experiencia"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out md:group-hover:scale-105"
                  loading="lazy"
                />
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ShowroomSection;
