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
  title: "Aniversário da Vó Zezé",
  description: "Venha comemorar o aniversário da Vó Zezé!",
  openGraph: {
    title: "Aniversário da Vó Zezé",
    description: "Venha comemorar o aniversário da Vó Zezé!",
    images: [
      {
        url: "/share-image.jpg",
        width: 800,
        height: 600,
        alt: "Aniversário da Vó Zezé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniversário da Vó Zezé",
    description: "Venha comemorar o aniversário da Vó Zezé!",
    images: ["/share-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta property="og:title" content="Aniversário da Vó Zezé" />
        <meta property="og:description" content="Venha comemorar o aniversário da Vó Zezé!" />
        <meta property="og:image" content="/share-image.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
