import { Shield, CheckCircle } from "lucide-react";

const WarrantySection = () => {
  const points = [
    "6 meses de garantía en todos los productos",
    "Soporte técnico por WhatsApp",
    "Reemplazo en caso de defecto de fábrica",
    "Asesoría post-venta incluida",
  ];

  return (
    <section id="garantia" className="py-20 md:py-28" style={{ background: "var(--gradient-soft)" }}>
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Compra con total <span className="gradient-text">confianza</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Todos nuestros productos cuentan con garantía real y soporte técnico dedicado.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantySection;
