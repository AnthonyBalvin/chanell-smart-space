import { MousePointer, ShoppingCart, CreditCard, MessageCircle } from "lucide-react";

const steps = [
  { icon: MousePointer, title: "Elige tu equipo", desc: "Explora nuestro catálogo y elige el producto ideal.", blue: true },
  { icon: ShoppingCart, title: "Agrégalo al carrito", desc: "Añade los productos que te gusten al carrito.", blue: false },
  { icon: CreditCard, title: "Presiona pagar", desc: "Revisa tu pedido y confirma la compra.", blue: true },
  { icon: MessageCircle, title: "Pedido por WhatsApp", desc: "Tu pedido se envía automáticamente a WhatsApp.", blue: false },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo <span className="gradient-text-blue">comprar</span>?
          </h2>
          <p className="text-muted-foreground">Comprar es fácil y rápido en 4 simples pasos.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px bg-border" />
              )}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 ${step.blue ? "bg-accent/10" : "bg-primary/10"
                }`}>
                <step.icon className={`w-7 h-7 ${step.blue ? "text-accent" : "text-primary"}`} />
              </div>
              <span className={`text-xs font-bold mb-2 block ${step.blue ? "text-accent" : "text-primary"}`}>Paso {i + 1}</span>
              <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
