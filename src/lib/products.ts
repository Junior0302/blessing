export type ProductSize = "petit" | "moyen" | "grand";

export interface ProductSizeOption {
  id: ProductSize;
  label: string;
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  accent: string;
  sizes: ProductSizeOption[];
}

export const PRODUCTS: Product[] = [
  {
    id: "pancakes-dores",
    name: "Pancakes Dorés",
    description: "Sirop d'érable, beurre noisette et fruits de saison.",
    longDescription:
      "Pancakes moelleux cuits à la minute, dorés à point. Servis avec sirop d'érable artisanal, beurre noisette et fruits frais de saison. Une texture nuageuse, un parfum de vanille bourbon.",
    image: "/images/1.png",
    accent: "Signature",
    sizes: [
      { id: "petit", label: "Petit (2 pcs)", weight: "280 g", price: 9.5 },
      { id: "moyen", label: "Moyen (3 pcs)", weight: "420 g", price: 12.9 },
      { id: "grand", label: "Grand (4 pcs)", weight: "560 g", price: 15.9 },
    ],
  },
  {
    id: "gaufres-liegeoises",
    name: "Gaufres Liégeoises",
    description: "Croustillantes à l'extérieur, fondantes à l'intérieur.",
    longDescription:
      "Pâte levée traditionnelle, perles de sucre caramélisées. Chaque gaufre est cuite sur plaque de fonte pour un croustillant incomparable et un cœur fondant.",
    image: "/images/2.png",
    accent: "Classique",
    sizes: [
      { id: "petit", label: "1 gaufre", weight: "180 g", price: 7.5 },
      { id: "moyen", label: "2 gaufres", weight: "360 g", price: 11.5 },
      { id: "grand", label: "3 gaufres", weight: "540 g", price: 14.5 },
    ],
  },
  {
    id: "smoothies-veloutes",
    name: "Smoothies Veloutés",
    description: "Fruits frais, textures soyeuses, saveurs éclatantes.",
    longDescription:
      "Fruits pressés à froid, yaourt grec et miel d'acacia. Texture onctueuse, sans additifs. Parfait en accompagnement ou en pause gourmande.",
    image: "/images/3.png",
    accent: "Fraîcheur",
    sizes: [
      { id: "petit", label: "25 cl", weight: "320 g", price: 6.9 },
      { id: "moyen", label: "40 cl", weight: "480 g", price: 8.9 },
      { id: "grand", label: "50 cl", weight: "600 g", price: 10.5 },
    ],
  },
  {
    id: "coulis-chocolat",
    name: "Coulis Chocolat",
    description: "Coulis fondant en zigzag, fraises fraîches.",
    longDescription:
      "Pancakes empilés, coulis de chocolat noir 70% en zigzag, fraises gariguette. Le chocolat est tempéré maison chaque matin pour une brillance parfaite.",
    image: "/images/4.png",
    accent: "Indulgence",
    sizes: [
      { id: "petit", label: "Petit (2 pcs)", weight: "300 g", price: 10.5 },
      { id: "moyen", label: "Moyen (3 pcs)", weight: "450 g", price: 13.9 },
      { id: "grand", label: "Grand (4 pcs)", weight: "600 g", price: 17.5 },
    ],
  },
];

export const TAX_RATE = 0.1;
export const DELIVERY_FEE = 3.5;

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
