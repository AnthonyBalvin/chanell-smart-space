import entertainmentProjector from "@/assets/entertainment-projector.jpg";
import entertainmentTvbox from "@/assets/entertainment-tvbox.jpg";

const EntertainmentSection = () => {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--gradient-soft)" }}>
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Entretenimiento inteligente para{" "}
            <span className="gradient-text">cualquier pantalla</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group rounded-2xl overflow-hidden hover-lift">
            <div className="relative">
              <img
                src={entertainmentProjector}
                alt="Cine en casa con proyectores Chanell"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-heading text-xl font-bold text-card">Cine en casa con proyectores</h3>
                <p className="text-card/80 text-sm mt-1">
                  Transforma cualquier pared en una pantalla gigante de hasta 200 pulgadas.
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden hover-lift">
            <div className="relative">
              <img
                src={entertainmentTvbox}
                alt="TV Box transforma cualquier TV en Smart TV"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-heading text-xl font-bold text-card">Transforma cualquier TV en Smart TV</h3>
                <p className="text-card/80 text-sm mt-1">
                  Con un TV Box 4K, accede a todas las apps de streaming en segundos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntertainmentSection;
