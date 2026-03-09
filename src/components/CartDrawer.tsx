import { X, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const productLines = items
      .map(
        (i) =>
          `• ${i.product.name}\n  Precio: S/${i.product.price}\n  Cantidad: ${i.quantity}\n  Subtotal: S/${i.product.price * i.quantity}`
      )
      .join("\n\n");

    const message = encodeURIComponent(
      `Hola, quiero comprar los siguientes productos:\n\n${productLines}\n\n*Total: S/${total}*\n\nMi nombre es:\nMi distrito es:`
    );

    window.open(`https://wa.me/51934301716?text=${message}`, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-lg font-semibold">Tu carrito</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Tu carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 rounded-xl bg-muted/50">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded-lg bg-card"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.product.name}</h3>
                  <p className="text-primary font-semibold">S/{item.product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-card transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-card transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors self-start"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-heading font-semibold">Total</span>
              <span className="font-heading text-xl font-bold gradient-text">S/{total}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary-gradient w-full flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Pagar por WhatsApp
            </button>
            <button onClick={clearCart} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
