export const BRAND = {
  name: "Blessing",
  tagline: "L'art du dessert",
  description:
    "Une pâtisserie d'exception où chaque création raconte une histoire de passion, de précision et de saveurs inoubliables.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/creations", label: "Créations" },
  { href: "/experience", label: "Expérience" },
  { href: "/about", label: "À propos" },
] as const;

export const CREATIONS = [
  {
    title: "Pancakes Dorés",
    description: "Sirop d'érable, beurre noisette et fruits de saison.",
    accent: "Signature",
    image: "/images/1.png",
  },
  {
    title: "Gaufres Liégeoises",
    description: "Croustillantes à l'extérieur, fondantes à l'intérieur.",
    accent: "Classique",
    image: "/images/2.png",
  },
  {
    title: "Smoothies Veloutés",
    description: "Fruits frais, textures soyeuses, saveurs éclatantes.",
    accent: "Fraîcheur",
    image: "/images/3.png",
  },
  {
    title: "Coulis Chocolat",
    description: "Coulis fondant en zigzag sur pancakes dorés, fraises fraîches.",
    accent: "Signature",
    image: "/images/4.png",
  },
] as const;

export const COLORS = {
  noir: "#1a1816",
  amber: "#c87941",
  cream: "#faf6f1",
  gold: "#c9a962",
} as const;
