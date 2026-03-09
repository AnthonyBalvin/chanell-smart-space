import productCubeliti from "@/assets/product-cubeliti.png";
import productMagcubic from "@/assets/product-magcubic.png";
import productAmaran from "@/assets/product-amaran.png";
import productTvbox from "@/assets/product-tvbox.png";
import type { Product } from "@/contexts/CartContext";

export const products: Product[] = [
  {
    id: "cubeliti-max",
    name: "Cubeliti Max",
    price: 1099,
    image: productCubeliti,
    category: "projector",
    tag: "Más vendido",
    specs: ["Full HD 1080p", "450 ANSI Lumens", "Android 11", "WiFi 6"],
    features: ["Control por voz", "Alta potencia", "Apps instaladas"],
  },
  {
    id: "magcubic-hy450c",
    name: "Magcubic HY450 C",
    price: 849,
    image: productMagcubic,
    category: "projector",
    tag: "Recomendado",
    specs: ["HD 720p Nativo", "350 ANSI Lumens", "Android 10", "Bluetooth 5.0"],
    features: ["Control por voz", "Apps instaladas"],
  },
  {
    id: "amaran-touch",
    name: "Amaran Touch",
    price: 1249,
    image: productAmaran,
    category: "projector",
    specs: ["Full HD 1080p", "500 ANSI Lumens", "Pantalla táctil", "Android 12"],
    features: ["Control por voz", "Pantalla táctil", "Alta potencia", "Apps instaladas"],
  },
  {
    id: "tvbox-4k",
    name: "TV Box 4K",
    price: 249,
    image: productTvbox,
    category: "tvbox",
    tag: "Más vendido",
    specs: ["4K Ultra HD", "4GB RAM", "64GB Storage", "Android 13"],
    features: ["Control por voz", "Apps instaladas"],
  },
];
