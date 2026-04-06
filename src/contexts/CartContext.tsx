import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export type ProductMediaType = "image" | "video";

export interface ProductMedia {
  url: string;
  type: ProductMediaType;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Keeping image for backwards compatibility with Catalog if needed
  images?: string[]; // Legacy array of strings
  media?: ProductMedia[]; // New structured data for easy images/videos
  category: "projector" | "tvbox";
  tag?: string;
  specs: string[];
  features?: string[];
  rating?: number;
  reviewCount?: number;
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Show toast notification instead of opening cart
    toast.success("Producto agregado al carrito", {
      duration: 3500,
      action: {
        label: "Ver carrito",
        onClick: () => setIsCartOpen(true),
      },
      cancel: {
        label: "Seguir comprando",
        onClick: () => {}, // Just dismisses the toast
      },
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
