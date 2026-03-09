const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--gradient-soft)" }}>
      <div className="section-container text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Transforma tu forma de disfrutar el{" "}
          <span className="gradient-text">entretenimiento</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Descubre nuestra selección premium de proyectores y TV Box con garantía real y asesoría personalizada.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#catalogo" className="btn-primary-gradient inline-flex items-center">
            Ver catálogo
          </a>
          <a
            href="https://wa.me/51934301716?text=Hola%2C%20me%20interesa%20comprar%20un%20producto"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-premium inline-flex items-center"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
