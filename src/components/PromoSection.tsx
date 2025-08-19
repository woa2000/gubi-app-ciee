"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, BarChart3, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    icon: PlayCircle,
    title: "Atividades gamificadas",
    description: "Jogos baseados em psicologia para descobrir seu potencial"
  },
  {
    icon: BarChart3,
    title: "Relatório personalizado",
    description: "Análise completa das suas competências e indicadores"
  },
  {
    icon: Target,
    title: "Desenvolvimento de skills",
    description: "Trilhas para aprimorar soft e hard skills"
  },
  {
    icon: Users,
    title: "Conexão com oportunidades",
    description: "Ponte entre seu perfil e o mercado de trabalho"
  }
];

export default function PromoSection() {
  return (
    <div className="space-y-8">
      {/* Hero Content */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Descubra seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              potencial
            </span>{" "}
            através de jogos!
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            A única plataforma gamificada que conecta jovens ao mercado de trabalho 
            através de <strong>autoconhecimento</strong> e <strong>capacitação</strong>.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 p-8">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/gubi-logo.png"
                alt="Jovens descobrindo potencial na Gubi"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
                priority
                loading="eager"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Por que escolher a Gubi?
        </h2>
        
        <div className="grid gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl text-white">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Pronto para começar?</h3>
              <p className="text-blue-100">
                Junte-se a milhares de jovens descobrindo seu potencial
              </p>
            </div>
            
            <Link href="/cadastro">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium"
              >
                Começar Jornada Gratuita
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            ✨ 100% gratuito • 🎯 Sem compromisso • 🚀 Resultados em minutos
          </p>
        </div>
      </div>
    </div>
  );
}
