import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Permite carregar imagens remotas do Unsplash usadas nos cards de atividades
    domains: ["images.unsplash.com"],
    // (Opcional futuro) Se precisar de padrões mais específicos, usar remotePatterns
  },
  // Configuração da porta (opcional - os scripts do package.json têm prioridade)
  async rewrites() {
    return []
  },
  // Outras configurações podem ser adicionadas aqui
};

export default nextConfig;
