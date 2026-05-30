import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const basePath = "/Precificacao-Sacolas-Personalizadas";

export const metadata: Metadata = {
  title: "Sacolas Personalizadas — Precificador",
  description:
    "Sistema de precificação inteligente para sacolas personalizadas",
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
      <body className={outfit.className}>
        <div className="min-h-screen relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
