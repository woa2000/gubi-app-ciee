"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
import { toast } from "sonner";
import LoginForm from "@/components/LoginForm";
// import PromoSection from "@/components/PromoSection";
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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/ciee/bg-ciee.jpg)' }}
    >
      
      {/* Main Content */}
      <main className="min-h-screen flex">
        {/* Desktop: Split layout - Left side for background, Right side for login */}
        <div className="hidden md:flex w-full">
          {/* Left side - Background area */}
          <div className="flex-1"></div>
          
          {/* Right side - Login Form occupying full area */}
          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Mobile: Centered layout */}
        <div className="md:hidden w-full flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </div>
        </div>
      </main>      
    </div>
  );
}
