import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Configuração da porta (opcional - os scripts do package.json têm prioridade)
  async rewrites() {
    return []
  },
  
  // Outras configurações podem ser adicionadas aqui
};

export default nextConfig;
