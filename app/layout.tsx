import type { Metadata } from "next";
import { Bangers, Inter, Permanent_Marker } from "next/font/google";
import type { ReactNode } from "react";
import { P5Cursor } from "@/components/P5Cursor";
import { MetaverseToggle } from "@/components/MetaverseToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
});

export const metadata: Metadata = {
  title: "Persona 5 Portfolio | Phantom Thief Developer",
  description: "A high-energy, stylized portfolio inspired by Persona 5. Motion-first design, jagged geometry, and aggressive UI engineering.",
  keywords: ["Frontend", "Motion Design", "Persona 5", "React", "Next.js", "UI/UX"],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Persona 5 Portfolio | Phantom Thief Developer",
    description: "A high-energy, stylized portfolio inspired by Persona 5 UI. Motion-first, jagged, aggressive.",
    url: "https://persona5-portfolio.dev",
    siteName: "Phantom Thieves Portfolio",
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630'%3E%3Crect width='1200' height='630' fill='%230d0d0d'/%3E%3Crect x='100' y='100' width='1000' height='430' fill='%23d92323' transform='skewX(-8)'/%3E%3Ctext x='600' y='340' font-size='96' font-weight='bold' fill='%23ebe6e6' text-anchor='middle' font-family='system-ui' letter-spacing='4'%3EPHANTOM%3C/text%3E%3Ctext x='600' y='420' font-size='96' font-weight='bold' fill='%230d0d0d' text-anchor='middle' font-family='system-ui' letter-spacing='4'%3ETHEIVES%3C/text%3E%3C/svg%3E",
        width: 1200,
        height: 630,
        alt: "Persona 5 Portfolio",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23d92323'/%3E%3Cpath d='M16 4L20 14L30 16L20 18L16 28L12 18L2 16L12 14Z' fill='%230d0d0d'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${bangers.variable} ${permanentMarker.variable} bg-p5-black text-p5-white antialiased`}
      >
        <ThemeProvider>
          <P5Cursor />
          <MetaverseToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
