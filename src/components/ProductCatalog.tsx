import { useState, useMemo } from "react";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

type SortOption = "recommended" | "bestseller" | "price-asc" | "price-desc";
type CategoryFilter = "all" | "projector" | "tvbox";

const ProductCatalog = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all") result = result.filter((p) => p.category === category);
    
    result = result.filter((p) => p.price <= maxPrice);
    
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "bestseller": result.sort((a, b) => (b.tag === "Más vendido" ? 1 : 0) - (a.tag === "Más vendido" ? 1 : 0)); break;
    }
    return result;
  }, [category, maxPrice, sort]);

  const filterBtn = (label: string, active: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`text-sm px-4 py-2 rounded-xl transition-all ${
        active ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="catalogo" className="py-20 md:py-28">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Catálogo <span className="gradient-text">completo</span>
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-outline-premium !py-2 !px-4 flex items-center gap-2 text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm bg-card border border-border rounded-xl px-4 py-2 text-foreground"
            >
              <option value="recommended">Recomendados</option>
              <option value="bestseller">Más vendidos</option>
              <option value="price-asc">Precio menor a mayor</option>
              <option value="price-desc">Precio mayor a menor</option>
            </select>
          </div>
        </div>

        <div className={`flex flex-wrap gap-2 mb-8 ${showFilters ? "" : "hidden md:flex"}`}>
          <div className="flex flex-wrap gap-2">
            {filterBtn("Todos", category === "all", () => setCategory("all"))}
            {filterBtn("Proyectores", category === "projector", () => setCategory("projector"))}
            {filterBtn("TV Box", category === "tvbox", () => setCategory("tvbox"))}
          </div>
          <div className="w-px bg-border mx-2 hidden md:block" />
          <div className="flex flex-col justify-center min-w-[200px] px-2 flex-1 max-w-xs">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-muted-foreground">Precio máximo:</span>
              <span className="font-bold text-primary">S/{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="2000" 
              step="50" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No se encontraron productos con estos filtros.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="product-card flex flex-col">
                <div className="relative p-6 bg-muted/30">
                  {product.tag && <span className="tag-badge absolute top-4 left-4 z-10">{product.tag}</span>}
                  <img src={product.image} alt={product.name} className="w-full h-44 object-contain" loading="lazy" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-lg">{product.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.specs.map((s) => (
                      <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold gradient-text">S/{product.price}</span>
                    <button onClick={() => addToCart(product)} className="btn-primary-gradient !px-4 !py-2 flex items-center gap-2 text-sm">
                      <ShoppingCart className="w-4 h-4" />
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
