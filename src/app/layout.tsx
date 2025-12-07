import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Playfair_Display,
  Space_Grotesk,
  Cormorant_Garamond,
  Bebas_Neue,
  Caveat,
  Archivo_Black,
  Merriweather,
  Montserrat,
  Abril_Fatface,
  Inter,
  DM_Serif_Display,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Text to Art",
  description: "Create beautiful text visuals with dynamic shader backgrounds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${playfairDisplay.variable}
          ${spaceGrotesk.variable}
          ${cormorantGaramond.variable}
          ${bebasNeue.variable}
          ${caveat.variable}
          ${archivoBlack.variable}
          ${merriweather.variable}
          ${montserrat.variable}
          ${abrilFatface.variable}
          ${inter.variable}
          ${dmSerifDisplay.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
