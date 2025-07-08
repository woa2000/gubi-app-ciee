"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SuccessScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [points, setPoints] = useState<
    { left: string; top: string }[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const generatedPoints = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));

    setPoints(generatedPoints);

    return () => clearTimeout(timer);
  }, []);

  const handleStartJourney = () => {
    window.location.href = "https://discovery.gubi.com.br";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className={`text-center transform transition-all duration-1000 ${isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95"
          }`}
      >
        {/* Logo */}
        <div className={`transform transition-all duration-700 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src="/gubi-logo-2.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Success message */}
        <div className={`transform transition-all duration-700 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cadastro Concluído!</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-100 mb-6">🎉 Bem-vindo à Jornada ProFuturo!</h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Parabéns! Você deu o primeiro passo em direção ao seu futuro.
            Sua jornada de crescimento e descobertas está apenas começando.
          </p>
        </div>

        {/* Button */}
        <div className={`mb-12 transform transition-all duration-700 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <Button
            onClick={handleStartJourney}
            className="bg-white text-purple-700 hover:bg-purple-50 font-semibold py-3 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🎮 Iniciar sua jornada
          </Button>
        </div>
      </div>

      {/* Floating Static Points */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {points.map((point, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: point.left,
              top: point.top,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SuccessScreen;