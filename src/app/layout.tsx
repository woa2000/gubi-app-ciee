import type { Metadata } from "next";
import { Toaster } from 'sonner';

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
  title: "Gubi",
  description: "A Gubi é uma plataforma de aprendizado gamificado que transforma o estudo em uma jornada divertida e interativa. Com a Gubi, você aprende jogando, desenvolvendo habilidades essenciais para o futuro.",
  keywords: ["Gubi", "Educação", "Gamificação", "Aprendizado", "Plataforma de Aprendizado", "Jogo Educacional"],
  creator: "Gubi Tecnologia Educacional Ltda.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}