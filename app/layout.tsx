import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const basePath = "/Precificacao-Sacolas-Personalizadas";

export const metadata: Metadata = {
  title: "Sacolas Personalizadas - Precificador",
  description: "Sistema de precificacao inteligente para sacolas personalizadas",
  icons: {
    icon: [{ url: `${basePath}/icon.svg`, type: "image/svg+xml" }],
    shortcut: [{ url: `${basePath}/icon.svg`, type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
