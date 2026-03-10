import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    location: "Lima",
    text: "Increíble calidad de imagen. El Cubeliti Max superó todas mis expectativas. La asesoría fue excelente.",
    rating: 5,
  },
  {
    name: "María L.",
    location: "Arequipa",
    text: "El TV Box 4K transformó mi televisor antiguo. Ahora tengo Netflix, Disney+ y todas las apps sin problemas.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    location: "Trujillo",
    text: "Compré el Magcubic y me encantó. Perfecto para películas en familia. La garantía me da mucha tranquilidad.",
    rating: 4,
  },
  {
    name: "Ana P.",
    location: "Cusco",
    text: "Excelente servicio. Me asesoraron por WhatsApp y el producto llegó en perfectas condiciones. 100% recomendado.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros <span className="gradient-text">clientes</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12 relative">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < t.rating ? "text-primary fill-primary" : "text-border"}`}
                />
              ))}
            </div>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
              "{t.text}"
            </p>
            <p className="font-heading font-semibold">{t.name}</p>
            <p className="text-sm text-accent">{t.location}</p>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted transition-colors hidden md:block"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted transition-colors hidden md:block"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
