import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppWeb Plus — Solutions Digitales Premium",
  description:
    "AppWeb Plus — Agence digitale. Création de sites web, e-commerce, applications, design & intégration. Découvrez nos projets et contactez-nous.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A//www.w3.org/2000/svg'%20viewBox%3D'0%200%2064%2064'%3E%3Crect%20x%3D'6'%20y%3D'6'%20width%3D'52'%20height%3D'52'%20rx%3D'14'%20fill%3D'%2308090d'/%3E%3Cpath%20d%3D'M22%2044V20h9.6c6.7%200%2011%203.2%2011%209.1%200%205.9-4.3%209-11%209H27.3V44H22zm5.3-10.2h4.3c3.8%200%205.8-1.6%205.8-4.7%200-3.2-2-4.9-5.8-4.9h-4.3v9.6z'%20fill%3D'%23c8a96e'/%3E%3Cpath%20d%3D'M45.8%2041.8h-3.2v-3.1h-3.1v-3.2h3.1v-3.1h3.2v3.1h3.1v3.2h-3.1v3.1z'%20fill%3D'%23c8a96e'/%3E%3C/svg%3E",
  },
};

export const viewport = {
  themeColor: "#08090d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout, not pages/_document */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
