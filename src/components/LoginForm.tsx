"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      await onSubmit(email.toLowerCase().trim(), password);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="space-y-4">
        {/* Logos Section */}
        <div className="flex items-center justify-center space-x-6 py-2">
          <div className="flex items-end justify-center h-20">
            <Image
              src="/gubi-logo.png"
              alt="Gubi Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-center h-20">
            <Image
              src="/ciee/logo-expo-ciee-color.png"
              alt="CIEE Logo"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="space-y-1">          
          <p className="text-md text-gray-600 text-center">
            Continue sua jornada de autoconhecimento
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                minLength={4}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          <div className="space-y-3 pt-2">
            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link 
                href="/cadastro" 
                className="text-primary hover:underline font-medium"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
