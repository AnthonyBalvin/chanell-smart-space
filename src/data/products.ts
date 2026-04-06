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
    images: [
      productCubeliti, 
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1626084323674-d4f13459e9a5?q=80&w=800&auto=format&fit=crop"
    ],
    category: "projector",
    tag: "Más vendido",
    specs: ["Full HD 1080p", "450 ANSI Lumens", "Android 11", "WiFi 6"],
    features: ["Control por voz", "Alta potencia", "Apps instaladas"],
    rating: 4.8,
    reviewCount: 342,
    description: "El Cubeliti Max es nuestro proyector inteligente estrella diseñado para transformarse en tu cine en casa personal. Cuenta con una resolución nativa Full HD 1080p, sistema operativo Android 11 que te permite descargar tus apps favoritas directamente sin necesidad de otros dispositivos, y un brillo excepcional de 450 ANSI Lumens para imágenes nítidas y colores vibrantes en cualquier ambiente."
  },
  {
    id: "magcubic-hy450c",
    name: "Magcubic HY450 C",
    price: 849,
    image: productMagcubic,
    images: [
      productMagcubic, 
      "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop"
    ],
    category: "projector",
    tag: "Recomendado",
    specs: ["HD 720p Nativo", "350 ANSI Lumens", "Android 10", "Bluetooth 5.0"],
    features: ["Control por voz", "Apps instaladas"],
    rating: 4.6,
    reviewCount: 128,
    description: "Compacto pero poderoso, el proyector Magcubic HY450 C te ofrece una excelente relación calidad-precio. Viene con Android 10 incorporado para una experiencia smart fluida. Su conectividad robusta, que abarca Bluetooth 5.0 y múltiples puertos, asegura que siempre tengas una forma simple de conectar tus dispositivos y disfrutar."
  },
  {
    id: "amaran-touch",
    name: "Amaran Touch",
    price: 1249,
    image: productAmaran,
    images: [
      productAmaran, 
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=800&auto=format&fit=crop"
    ],
    category: "projector",
    specs: ["Full HD 1080p", "500 ANSI Lumens", "Pantalla táctil", "Android 12"],
    features: ["Control por voz", "Pantalla táctil", "Alta potencia", "Apps instaladas"],
    rating: 4.9,
    reviewCount: 89,
    description: "La cumbre de la innovación en proyección. El Amaran Touch lleva la experiencia de usuario a un nuevo nivel incorporando una sorprendente integración de controles táctiles e inteligentes. Con 500 ANSI Lumens es excepcionalmente brillante, logrando el mayor contraste y fidelidad que necesitas para películas o videojuegos, todo orquestado por el potente Android 12."
  },
  {
    id: "tvbox-4k",
    name: "TV Box 4K",
    price: 249,
    image: productTvbox,
    images: [
      productTvbox, 
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop"
    ],
    category: "tvbox",
    tag: "Más vendido",
    specs: ["4K Ultra HD", "4GB RAM", "64GB Storage", "Android 13"],
    features: ["Control por voz", "Apps instaladas"],
    rating: 4.7,
    reviewCount: 512,
    description: "Actualiza tu antiguo televisor al más moderno centro de entretenimiento con el TV Box 4K. Equipado con un veloz procesador, 4GB de memoria RAM y 64GB de almacenamiento para evitar cuellos de botella y trabas. Su capacidad de reproducir contenido en impresionante resolución 4K HDR garantiza que verás todo con una definición insuperable. Tu sala será la envidia de todos."
  },
];
