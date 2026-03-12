import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { itemCount, setIsCartOpen, items } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSolid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = isHome
    ? [
      { label: "Productos", href: "#productos" },
      { label: "Catálogo", to: "/catalogo" },
      { label: "Garantía", href: "#garantia" },
      { label: "FAQ", href: "#faq" },
    ]
    : [
      { label: "Inicio", to: "/" },
      { label: "Garantía", to: "/#garantia" },
      { label: "FAQ", to: "/#faq" },
    ];

  const recentItems = items.slice(-3).reverse(); // Show up to 3 most recently added items

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSolid || (mobileOpen && isSolid)
          ? "bg-white/40 backdrop-blur-2xl border-b border-gray-200/50 shadow-sm"
          : mobileOpen
            ? "bg-transparent"
            : "bg-transparent"
        }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20 py-2">
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-tight">
          <span className="gradient-text">Chanell</span>{" "}
          <span className={isSolid ? "text-gray-900" : "text-white"}>Tecnología</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            'to' in link && link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-300 ${isSolid
                    ? "text-gray-900 hover:text-blue-500"
                    : "text-white/90 hover:text-blue-400 drop-shadow-md"
                  }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={'href' in link ? link.href : '#'}
                className={`text-sm font-medium transition-colors duration-300 ${isSolid
                    ? "text-gray-900 hover:text-blue-500"
                    : "text-white/90 hover:text-blue-400 drop-shadow-md"
                  }`}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4 relative">

          {/* Cart Icon & Mini-cart Wrapper */}
          <div className="relative group">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2 p-2 px-3 rounded-full md:rounded-xl transition-all shadow-sm ${isSolid
                  ? "hover:bg-gray-100 border border-transparent hover:border-gray-200 bg-black/5 backdrop-blur-sm text-gray-900"
                  : "bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/40 text-white"
                }`}
            >
              <ShoppingCart className={`w-5 h-5 ${isSolid ? "text-gray-900" : "text-white"}`} />
              <span className={`text-sm font-semibold hidden sm:inline-block ${isSolid ? "text-gray-900" : "text-white"}`}>
                Carrito ({itemCount})
              </span>
              {/* Mobile badge */}
              {itemCount > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Desktop Mini-cart Dropdown (Hover) */}
            <div className="hidden lg:block absolute top-[110%] right-0 w-80 bg-card/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
              <div className="p-4 border-b border-border/50">
                <h4 className="font-heading font-semibold text-[15px]">Carrito de compras</h4>
              </div>

              <div className="p-2 max-h-[300px] overflow-y-auto">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {recentItems.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-muted/40 p-1 shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Cant: {item.quantity} × S/{item.product.price}</p>
                        </div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <p className="text-xs text-center text-muted-foreground pt-2 pb-1">
                        + {items.length - 3} producto(s) más
                      </p>
                    )}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-3 bg-muted/20 border-t border-border/50">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="w-full btn-primary-gradient !py-2.5 text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    Ver carrito completo
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-xl transition-all shadow-sm ${isSolid
                ? "hover:bg-gray-100 border border-transparent hover:border-gray-200 bg-black/5 backdrop-blur-sm text-gray-900"
                : "bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/40 text-white"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className={`w-5 h-5 ${isSolid ? "text-gray-900" : "text-white"}`} /> : <Menu className={`w-5 h-5 ${isSolid ? "text-gray-900" : "text-white"}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className={`md:hidden backdrop-blur-2xl transition-all ${isSolid
            ? "bg-white/95 border-b border-gray-200 text-gray-900"
            : "bg-black/60 border-b border-white/10 text-white"
          } px-4 pb-4`}>
          {navLinks.map((link) =>
            'to' in link && link.to ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block w-full py-3 text-center text-[15px] font-medium transition-colors duration-300 ${isSolid
                    ? "text-gray-900 hover:text-blue-500"
                    : "text-white/80 hover:text-blue-400"
                  }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={'href' in link ? link.href : '#'}
                onClick={() => setMobileOpen(false)}
                className={`block w-full py-3 text-center text-[15px] font-medium transition-colors duration-300 ${isSolid
                    ? "text-gray-900 hover:text-blue-500"
                    : "text-white/80 hover:text-blue-400"
                  }`}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
