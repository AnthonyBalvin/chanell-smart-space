import { ShoppingCart, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    // Calculate the current index based on scroll position
    const scrollPosition = carouselRef.current.scrollLeft;
    // Each item's width plus some of the gap to roughly determine which item is in view
    // Since items are 82vw wide and snap to center, we can approximate the scroll offset.
    // However, a more robust way is getting all child elements and finding which one is closest to the center.
    
    // Simpler heuristic: assuming uniform width items + gaps
    // scrollWidth = total scrollable width
    // clientWidth = visible width
    const itemWidth = carouselRef.current.scrollWidth / products.length;
    // adding half itemWidth to smoothly switch active state before it fully snaps
    const currentIndex = Math.round(scrollPosition / itemWidth);
    
    // Ensure index is within bounds
    setActiveIndex(Math.min(Math.max(currentIndex, 0), products.length - 1));
  };

  // Helper to scroll correctly on dot click
  const scrollTo = (index: number) => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / products.length;
    carouselRef.current.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  return (
    <section id="productos" className="py-20 md:py-28 relative">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Productos <span className="gradient-text">destacados</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Los equipos más populares seleccionados por nuestros expertos.
            </p>
          </div>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-4 sm:pb-6 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory md:snap-none md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pt-0 md:pb-0 md:mt-0"
          >
            {products.map((product) => (
              <div key={product.id} className="w-[82vw] max-w-[300px] shrink-0 snap-center md:snap-align-none md:w-auto md:max-w-none product-card flex flex-col group cursor-pointer md:cursor-default">
                <div className="relative p-5 sm:p-6 bg-muted/30">
                  {product.tag && (
                    <span className="tag-badge absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-[10px] sm:text-xs !px-2.5 !py-1 sm:!px-3">
                      {product.tag}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-contain mx-auto transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-base sm:text-lg line-clamp-2 leading-tight">{product.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {product.specs.map((spec) => (
                      <span key={spec} className="text-[10px] sm:text-xs bg-muted px-1.5 py-0.5 rounded-md text-muted-foreground whitespace-nowrap">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    <span className="font-heading text-xl sm:text-2xl font-bold gradient-text shrink-0">
                      S/{product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-primary-gradient !px-3 !py-1.5 sm:!px-4 sm:!py-2 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm shrink-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Pagination - Mobile only */}
          <div className="flex justify-center items-center gap-2 mt-6 md:hidden">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Ir al producto ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? "w-6 bg-primary" 
                    : "w-2 bg-border hover:bg-border/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
