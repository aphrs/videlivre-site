import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VideLivre — Vendez vos livres en 30 secondes",
  description:
    "Scannez le code-barres ISBN de votre livre et publiez votre annonce en quelques secondes. VideLivre simplifie la vente de livres d'occasion.",
  openGraph: {
    title: "VideLivre — Vendez vos livres en 30 secondes",
    description:
      "Scannez, vérifiez, publiez. La façon la plus rapide de donner une seconde vie à vos livres.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
