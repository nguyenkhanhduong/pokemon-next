import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon World - Discover and Explore Pokemon",
  description: "Explore the amazing world of Pokemon! Browse through hundreds of Pokemon, filter by type, and discover your favorites in this comprehensive Pokemon directory.",
  keywords: "pokemon, pokedex, pokemon types, pokemon list, pokemon directory",
  authors: [{ name: "Pokemon World" }],
  openGraph: {
    title: "Pokemon World - Discover and Explore Pokemon",
    description: "Explore the amazing world of Pokemon! Browse through hundreds of Pokemon, filter by type, and discover your favorites.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
