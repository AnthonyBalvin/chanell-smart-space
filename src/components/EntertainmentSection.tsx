import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import entertainmentProjector from "@/assets/entertainment-projector.jpg";
import entertainmentTvbox from "@/assets/entertainment-tvbox.jpg";

const EntertainmentSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="section-container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Entretenimiento inteligente para <br className="hidden md:block"/>
            <span className="gradient-text">cualquier pantalla</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre soluciones diseñadas para transformar tu sala en el centro definitivo de entretenimiento audiovisual.
          </p>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Projectors (Slides in from Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative rounded-[2rem] overflow-hidden bg-muted flex flex-col justify-end shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(232,76,114,0.15)] transition-shadow duration-700 h-[400px] md:h-[350px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={entertainmentProjector}
                alt="Cine en casa con proyectores Chanell"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                loading="lazy"
              />
            </div>
            
            {/* Soft Gradient Overlay for Readability */}
            <div className="absolute inset-x-0 bottom-0 h-[85%] md:h-3/4 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none opacity-90 md:opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
            
            {/* Content Container */}
            <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white mb-4 w-max">
                Cine en casa
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Cine en casa con proyectores
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-6 line-clamp-3 md:line-clamp-2">
                Transforma cualquier pared en una pantalla gigante de hasta 200 pulgadas. Inmersión total para películas y series.
              </p>
              
              {/* Call To Action - Revealed slightly more on hover */}
              <Link to="/catalogo?categoria=projector" className="inline-flex items-center gap-2 text-white font-medium text-sm w-max group/btn">
                <span>Ver proyectores</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover/btn:bg-primary group-hover/btn:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: TV Box (Slides in from Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative rounded-[2rem] overflow-hidden bg-muted flex flex-col justify-end shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-shadow duration-700 h-[400px] md:h-[350px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={entertainmentTvbox}
                alt="TV Box transforma cualquier TV en Smart TV"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                loading="lazy"
              />
            </div>
            
            {/* Soft Gradient Overlay for Readability */}
            <div className="absolute inset-x-0 bottom-0 h-[85%] md:h-3/4 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none opacity-90 md:opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
            
            {/* Content Container */}
            <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white mb-4 w-max">
                Upgrade inteligente
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Transforma cualquier TV en Smart TV
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-6 line-clamp-3 md:line-clamp-2">
                Con un TV Box 4K, accede a todas las apps de streaming en segundos y dale una segunda vida a tu televisor.
              </p>
              
              {/* Call To Action - Revealed slightly more on hover */}
              <Link to="/catalogo?categoria=tvbox" className="inline-flex items-center gap-2 text-white font-medium text-sm w-max group/btn">
                <span>Ver TV Box</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover/btn:bg-accent group-hover/btn:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EntertainmentSection;
