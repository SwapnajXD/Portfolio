import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swapnaj.dev"),
  title: "Swapnaj — Cloud & DevOps",
  description:
    "Computer engineering student building cloud and DevOps projects — infrastructure, pipelines, and monitoring.",
  openGraph: {
    title: "Swapnaj — Cloud & DevOps",
    description:
      "Computer engineering student building cloud and DevOps projects — infrastructure, pipelines, and monitoring.",
    url: "https://swapnaj.dev",
    siteName: "Swapnaj — Cloud & DevOps",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swapnaj — Cloud & DevOps",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swapnaj — Cloud & DevOps",
    description:
      "Computer engineering student building cloud and DevOps projects — infrastructure, pipelines, and monitoring.",
    images: ["/og-image.png"],
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored ? stored === "dark" : systemDark;
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Nav />
        <ThemeToggle />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
