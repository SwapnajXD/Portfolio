import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";
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
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Swapnaj",
  url: "https://swapnaj.dev",
  jobTitle: "Computer Engineering Student",
  description:
    "Computer engineering student building cloud and DevOps projects — infrastructure, pipelines, and monitoring.",
  knowsAbout: [
    "Cloud Computing",
    "DevOps",
    "AWS",
    "Docker",
    "Terraform",
    "Kubernetes",
    "Linux",
  ],
  sameAs: [
    "https://github.com/SwapnajXD",
    "https://www.linkedin.com/in/swapnajxd",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Swapnaj — Journal RSS"
          href="/journal/rss.xml"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-surface"
        >
          Skip to content
        </a>
        <Nav />
        <ThemeToggle />
        <CommandPalette />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
