import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const featured = products.filter((p) => p.tag);

  return (
    <section id="productos" className="py-20 md:py-28">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Productos <span className="gradient-text">destacados</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los equipos más populares seleccionados por nuestros expertos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-card flex flex-col">
              <div className="relative p-6 bg-muted/30">
                {product.tag && (
                  <span className="tag-badge absolute top-4 left-4 z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-lg">{product.name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {product.specs.map((spec) => (
                    <span key={spec} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="font-heading text-2xl font-bold gradient-text">
                    S/{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-primary-gradient !px-4 !py-2 flex items-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
