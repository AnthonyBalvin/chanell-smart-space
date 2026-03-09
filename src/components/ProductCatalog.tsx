import { useState, useMemo } from "react";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

type SortOption = "recommended" | "bestseller" | "price-asc" | "price-desc";
type PriceRange = "all" | "under300" | "300-800" | "800-1200" | "over1200";
type CategoryFilter = "all" | "projector" | "tvbox";

const ProductCatalog = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (priceRange !== "all") {
      result = result.filter((p) => {
        switch (priceRange) {
          case "under300": return p.price < 300;
          case "300-800": return p.price >= 300 && p.price <= 800;
          case "800-1200": return p.price >= 800 && p.price <= 1200;
          case "over1200": return p.price > 1200;
          default: return true;
        }
      });
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "bestseller": result.sort((a, b) => (b.tag === "Más vendido" ? 1 : 0) - (a.tag === "Más vendido" ? 1 : 0)); break;
    }
    return result;
  }, [category, priceRange, sort]);

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
          <div className="flex flex-wrap gap-2">
            {filterBtn("Todos los precios", priceRange === "all", () => setPriceRange("all"))}
            {filterBtn("< S/300", priceRange === "under300", () => setPriceRange("under300"))}
            {filterBtn("S/300 – S/800", priceRange === "300-800", () => setPriceRange("300-800"))}
            {filterBtn("S/800 – S/1200", priceRange === "800-1200", () => setPriceRange("800-1200"))}
            {filterBtn("> S/1200", priceRange === "over1200", () => setPriceRange("over1200"))}
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
