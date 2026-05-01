import type { Metadata } from "next";
import { Bangers, Inter, Permanent_Marker } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
});

export const metadata: Metadata = {
  title: "Persona 5 Portfolio",
  description: "A stylized portfolio inspired by Persona 5 UI and motion language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bangers.variable} ${permanentMarker.variable} bg-p5-black text-p5-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
