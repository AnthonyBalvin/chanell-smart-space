import showroomImage from "@/assets/showroom.jpg";

const ShowroomSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={showroomImage}
              alt="Showroom Chanell Tecnología"
              className="w-full h-80 md:h-96 object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Prueba la experiencia en nuestro{" "}
              <span className="gradient-text">showroom</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Visítanos y prueba todos nuestros equipos antes de comprar. Nuestro equipo te guiará
              para que elijas el producto perfecto para tu espacio.
            </p>
            <div className="glass-card p-5 inline-block">
              <p className="text-sm font-medium">📍 Lima, Perú</p>
              <p className="text-sm text-muted-foreground">Previa cita por WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomSection;
