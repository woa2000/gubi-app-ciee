"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import LoginForm from "@/components/LoginForm";
import PromoSection from "@/components/PromoSection";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const result = await loginUser(email, password);
      
      // Usar o hook de autenticação para armazenar token e dados do usuário de forma segura
      await login(result);
      
      toast.success(`Bem-vindo(a) de volta, ${result.name}!`);
      
      // Redirecionar baseado no estado do usuário
      if (result.isFirstLogin) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
      
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao fazer login";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/gubi-logo.png"
              alt="Gubi"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sobre
            </Link>
            <Link href="/como-funciona" className="text-gray-600 hover:text-gray-900 transition-colors">
              Como Funciona
            </Link>
            <Link href="/cadastro" className="text-gray-600 hover:text-gray-900 transition-colors">
              Cadastrar
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: Two columns */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-12 md:items-start">
            {/* Left Column - Promo Section */}
            <div className="order-1">
              <PromoSection />
            </div>
            
            {/* Right Column - Login Form */}
            <div className="order-2 flex justify-center lg:justify-start">
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="md:hidden space-y-8">
            {/* Mobile: Login Form First */}
            <div className="flex justify-center">
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </div>
            
            {/* Mobile: Promo Section Second */}
            <div>
              <PromoSection />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/funcionalidades" className="text-gray-600 hover:text-gray-900">Funcionalidades</Link></li>
                <li><Link href="/precos" className="text-gray-600 hover:text-gray-900">Preços</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Suporte</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ajuda" className="text-gray-600 hover:text-gray-900">Central de Ajuda</Link></li>
                <li><Link href="/contato" className="text-gray-600 hover:text-gray-900">Contato</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacidade</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Termos</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Gubi</h3>
              <p className="text-sm text-gray-600">
                Conectando jovens ao futuro através de gamificação e autoconhecimento.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Gubi Tecnologia Educacional Ltda. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
