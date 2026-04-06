import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Star, Share2, ZoomIn, 
  ShieldCheck, Truck, Lock, MessageCircle,
  ShoppingCart, ChevronDown, ChevronUp, CheckCircle2,
  X
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);
  
  const [activeImage, setActiveImage] = useState<string>("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || product.image);
    }
  }, [product]);

  // Handle Share functionality
  const handleShare = async () => {
    const shareData = {
      title: product?.name,
      text: `Mira este increíble producto: ${product?.name}`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Enlace copiado al portapapeles");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hola, quiero comprar el siguiente producto:\n\n• ${product.name}\n  Precio: S/${product.price}\n  Cantidad: 1\n  Subtotal: S/${product.price}\n\n*Total: S/${product.price}*`
    );
    window.open(`https://wa.me/51932557893?text=${message}`, "_blank");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-transparent relative flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <button onClick={() => navigate("/catalogo")} className="btn-primary-gradient !px-6 !py-3">
            Volver al catálogo
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Fallback rating if not provided
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 100;

  return (
    <div className="min-h-screen bg-transparent relative flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10 pointer-events-none" />
      <Navbar />
      <CartDrawer />

      {/* Fullscreen Zoom Overlay */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={activeImage} 
            alt={`Zoom de ${product.name}`} 
            className="max-w-full max-h-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <main className="flex-1 pt-24 pb-20">
        <div className="section-container max-w-6xl mx-auto">
          
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Column (60% Desktop) - Product Gallery */}
            <div className="w-full lg:w-[60%] flex flex-col gap-4">
              <div className="relative aspect-square md:aspect-video lg:aspect-square bg-card/30 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center p-8 group">
                
                {/* Check if active media is video or image */}
                {activeImage.endsWith('.mp4') || activeImage.endsWith('.webm') ? (
                  <video 
                    src={activeImage}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={activeImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain cursor-zoom-in transition-transform duration-500 ease-in-out group-hover:scale-105"
                    onClick={() => setIsZoomOpen(true)}
                  />
                )}
                
                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button 
                    onClick={handleShare}
                    className="p-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm hover:text-primary hover:scale-110 active:scale-95 transition-all outline-none"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsZoomOpen(true)}
                    className="p-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm hover:text-primary hover:scale-110 active:scale-95 transition-all outline-none"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              {/* Supports both legacy product.images and new product.media */}
              {(product.media || product.images) && (
                <div className="flex gap-4 overflow-x-auto py-2 px-2 mr-2 snap-x hide-scrollbar">
                  {/* Map over media if exists, else map over images */}
                  {(product.media ? product.media.map(m => m.url) : product.images || []).map((mediaUrl, idx) => {
                    const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm');
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(mediaUrl)}
                        onMouseEnter={() => setActiveImage(mediaUrl)}
                        className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-2 bg-card/50 snap-center outline-none ${
                          activeImage === mediaUrl ? "border-primary shadow-md shadow-primary/20 scale-105" : "border-transparent hover:border-border hover:scale-105"
                        }`}
                      >
                        {isVideo ? (
                          <div className="w-full h-full bg-black/80 flex items-center justify-center rounded-lg">
                            <span className="text-[10px] text-white font-bold">VIDEO</span>
                          </div>
                        ) : (
                          <img src={mediaUrl} alt={`${product.name} miniatura ${idx + 1}`} className="w-full h-full object-contain pointer-events-none" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Right Column (40% Desktop) - Product Info */}
            <div className="w-full lg:w-[40%] flex flex-col">
              
              {/* Product Name */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current opacity-50" />
                </div>
                <span className="text-sm font-medium">{rating} estrellas</span>
                <span className="text-sm text-muted-foreground underline decoration-dashed underline-offset-4 cursor-pointer">
                  ({reviewCount} reseñas)
                </span>
              </div>

              <div className="w-full h-px bg-border/50 mb-6" />

              {/* Price and Microcopy */}
              <div className="mb-8">
                <div className="text-4xl font-heading font-bold gradient-text pb-1 mb-3">
                  S/ {product.price}
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Compra segura
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Garantía incluida
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Stock limitado
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <button 
                  onClick={() => addToCart(product)}
                  className="btn-primary-gradient !py-4 w-full flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-primary/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al carrito
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-xl border border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  Comprar ahora
                </button>
              </div>

              {/* Trust Block */}
              <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-sm font-medium leading-tight">Garantía<br/>12 meses</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-sm font-medium leading-tight">Envíos a<br/>todo el país</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-sm font-medium leading-tight">Pago 100%<br/>seguro</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-sm font-medium leading-tight">Soporte por<br/>WhatsApp</span>
                </div>
              </div>

              <div className="w-full h-px bg-border/50 mb-8" />

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-lg mb-4 text-foreground/90">Características clave</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        <span className="pt-0.5">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description (Collapsible) */}
              {product.description && (
                <div className="mb-4">
                  <button 
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="w-full flex items-center justify-between font-heading font-semibold text-lg py-2 text-foreground/90 transition-colors hover:text-foreground"
                  >
                    Descripción
                    {isDescriptionExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDescriptionExpanded ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
