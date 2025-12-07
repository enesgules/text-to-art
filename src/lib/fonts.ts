export const FONTS = [
  {
    name: "Playfair Display",
    value: "playfair",
    cssVar: "var(--font-playfair)",
    category: "serif",
  },
  {
    name: "Space Grotesk",
    value: "space-grotesk",
    cssVar: "var(--font-space-grotesk)",
    category: "sans-serif",
  },
  {
    name: "Cormorant Garamond",
    value: "cormorant",
    cssVar: "var(--font-cormorant)",
    category: "serif",
  },
  {
    name: "Bebas Neue",
    value: "bebas",
    cssVar: "var(--font-bebas)",
    category: "display",
  },
  {
    name: "Caveat",
    value: "caveat",
    cssVar: "var(--font-caveat)",
    category: "handwriting",
  },
  {
    name: "Archivo Black",
    value: "archivo-black",
    cssVar: "var(--font-archivo-black)",
    category: "display",
  },
  {
    name: "Merriweather",
    value: "merriweather",
    cssVar: "var(--font-merriweather)",
    category: "serif",
  },
  {
    name: "Montserrat",
    value: "montserrat",
    cssVar: "var(--font-montserrat)",
    category: "sans-serif",
  },
] as const;

export type FontValue = (typeof FONTS)[number]["value"];
