import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, SlidersHorizontal, ArrowLeft, Search, X } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

type SortOption = "recommended" | "bestseller" | "price-asc" | "price-desc";
type CategoryFilter = "all" | "projector" | "tvbox";
type PriceFilter = "all" | "under500" | "500to1000" | "over1000";
type FeatureFilter = "voice" | "touch" | "power" | "apps";

const featureMap: Record<FeatureFilter, string> = {
  voice: "Control por voz",
  touch: "Pantalla táctil",
  power: "Alta potencia",
  apps: "Apps instaladas",
};

const Catalog = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get("categoria") as CategoryFilter) || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [features, setFeatures] = useState<FeatureFilter[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Prevent scrolling when mobile filter is open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showMobileFilters]);

  const toggleFeature = (f: FeatureFilter) => {
    setFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.specs.some(s => s.toLowerCase().includes(lowerSearch))
      );
    }

    if (category !== "all") result = result.filter((p) => p.category === category);

    if (priceFilter === "under500") result = result.filter(p => p.price <= 500);
    else if (priceFilter === "500to1000") result = result.filter(p => p.price > 500 && p.price <= 1000);
    else if (priceFilter === "over1000") result = result.filter(p => p.price > 1000);

    if (features.length > 0) {
      result = result.filter((p) =>
        features.every((f) => p.features?.includes(featureMap[f]))
      );
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "bestseller": result.sort((a, b) => (b.tag === "Más vendido" ? 1 : 0) - (a.tag === "Más vendido" ? 1 : 0)); break;
    }
    return result;
  }, [searchTerm, category, priceFilter, sort, features]);

  const filterCheckbox = (label: string, active: boolean, onClick: () => void) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${active ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 group-hover:border-primary/50"
        }`}>
        {active && <span className="text-[10px] sm:text-xs">✓</span>}
      </div>
      <span className={`text-sm sm:text-base transition-colors ${active ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
        {label}
      </span>
      {/* Hidden input to make it accessible */}
      <input type="checkbox" className="hidden" checked={active} onChange={onClick} />
    </label>
  );

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="font-heading font-semibold text-lg mb-4">Tipo de producto</h4>
        <div className="flex flex-col gap-3">
          {filterCheckbox("Todos", category === "all", () => setCategory("all"))}
          {filterCheckbox("Proyectores", category === "projector", () => setCategory("projector"))}
          {filterCheckbox("TV Box", category === "tvbox", () => setCategory("tvbox"))}
        </div>
      </div>
      <div className="w-full h-px bg-border/50" />

      {/* Price */}
      <div>
        <h4 className="font-heading font-semibold text-lg mb-4">Rango de Precio</h4>
        <div className="flex flex-col gap-3">
          {filterCheckbox("Cualquier precio", priceFilter === "all", () => setPriceFilter("all"))}
          {filterCheckbox("Hasta S/500", priceFilter === "under500", () => setPriceFilter("under500"))}
          {filterCheckbox("S/500 a S/1000", priceFilter === "500to1000", () => setPriceFilter("500to1000"))}
          {filterCheckbox("Más de S/1000", priceFilter === "over1000", () => setPriceFilter("over1000"))}
        </div>
      </div>
      <div className="w-full h-px bg-border/50" />

      {/* Features */}
      <div>
        <h4 className="font-heading font-semibold text-lg mb-4">Características</h4>
        <div className="flex flex-col gap-3">
          {(Object.keys(featureMap) as FeatureFilter[]).map((key) => (
            filterCheckbox(featureMap[key], features.includes(key), () => toggleFeature(key))
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Subtle background gradient to maintain visual depth without overpowering */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10 pointer-events-none" />

      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="section-container">

          {/* Header area with navigation and title */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              Catálogo <span className="gradient-text">completo</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-28 bg-card/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm">
              <FilterPanel />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex flex-col min-w-0">

              {/* Toolbar: Search, Mobile Filter Toggle, Sort, Results Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-sm">

                {/* Search Bar */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>

                {/* Filter/Sort Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden btn-outline-premium !py-2.5 !px-4 flex items-center justify-center gap-2 text-sm flex-1 sm:flex-none"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                  </button>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="text-sm bg-background border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all flex-1 sm:flex-none min-w-[180px] w-full"
                  >
                    <option value="recommended">Recomendados</option>
                    <option value="bestseller">Más vendidos</option>
                    <option value="price-asc">Precio menor a mayor</option>
                    <option value="price-desc">Precio mayor a menor</option>
                  </select>
                </div>
              </div>

              {/* Results count text */}
              <div className="mb-6 text-sm text-muted-foreground flex items-center justify-between">
                <span>Mostrando <strong className="text-foreground">{filtered.length}</strong> productos</span>
              </div>

              {/* Product Grid */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-card/20 border border-white/5 rounded-3xl text-center">
                  <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No se encontraron productos</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Intenta ajustar los filtros de búsqueda o revisar otras categorías.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setCategory("all");
                      setPriceFilter("all");
                      setFeatures([]);
                    }}
                    className="mt-6 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                  {filtered.map((product) => (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Image Area with soft background */}
                      <Link to={`/producto/${product.id}`} className="relative pt-6 pb-4 px-4 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center block cursor-pointer">
                        {product.tag && (
                          <span className={`absolute top-3 left-3 z-10 text-[10px] md:text-xs px-2.5 py-1 rounded-full font-medium ${product.tag === 'Más vendido'
                            ? 'bg-accent/10 text-accent border border-accent/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                            }`}>
                            {product.tag}
                          </span>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 md:h-48 object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </Link>

                      {/* Content Area */}
                      <div className="p-4 md:p-6 flex flex-col flex-1 border-t border-border/50">
                        <Link to={`/producto/${product.id}`} className="hover:text-primary transition-colors cursor-pointer w-full group/title">
                          <h3 className="font-heading font-semibold text-sm md:text-lg mb-2 line-clamp-1 group-hover/title:underline decoration-primary/50 underline-offset-4">{product.name}</h3>
                        </Link>

                        {/* Specs badges */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.specs.slice(0, 3).map((s) => (
                            <span key={s} className="text-[10px] md:text-xs bg-muted/50 border border-border/50 px-2 py-0.5 rounded-md text-muted-foreground whitespace-nowrap">
                              {s}
                            </span>
                          ))}
                          {product.specs.length > 3 && (
                            <span className="text-[10px] md:text-xs bg-muted/50 border border-border/50 px-2 py-0.5 rounded-md text-muted-foreground">
                              +{product.specs.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 pt-2">
                          <span className="font-heading text-lg md:text-2xl font-bold">
                            S/{product.price}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="btn-primary-gradient !px-0 sm:!px-4 !py-2 w-full sm:w-auto flex items-center justify-center gap-2 text-xs md:text-sm"
                            aria-label={`Agregar ${product.name} al carrito`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="sm:hidden lg:inline">Agregar</span>
                            <span className="hidden sm:inline lg:hidden">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Slide-up Filter Panel */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${showMobileFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowMobileFilters(false)}
        />

        {/* Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] bg-card border-t border-border shadow-2xl rounded-t-3xl flex flex-col transition-transform duration-300 ease-out ${showMobileFilters ? "translate-y-0" : "translate-y-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50 pb-4">
            <h3 className="font-heading text-xl font-bold">Filtros</h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 flex-1 pb-32">
            <FilterPanel />
          </div>

          {/* Fixed Bottom Action */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t border-border/50 bg-gradient-to-t from-card via-card to-transparent pt-12">
            <button
              onClick={() => setShowMobileFilters(false)}
              className="btn-primary-gradient w-full !py-3 font-semibold text-base shadow-lg shadow-primary/20"
            >
              Ver {filtered.length} productos
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
