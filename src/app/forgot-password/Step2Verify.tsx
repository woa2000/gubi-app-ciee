"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, Clock } from "lucide-react";

interface Props {
  email: string;
  code: string;
  setCode: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  isLoading: boolean;
  timeLeft: number;
  canResend: boolean;
}

export default function Step2Verify({
  email,
  code,
  setCode,
  onSubmit,
  onResend,
  isLoading,
  timeLeft,
  canResend,
}: Props) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "2")}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Verificar Código
        </h2>
        <p className="text-gray-600">
          Digite o código de 6 dígitos enviado para {email}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <InputOTPSlot key={idx} index={idx} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
            <Clock className="w-4 h-4" />
            <span>
              {timeLeft > 0
                ? `Código expira em ${formatTime(timeLeft)}`
                : "Código expirado"}
            </span>
          </div>

          {canResend ? (
            <Button
              type="button"
              variant="link"
              onClick={onResend}
              className="p-0 h-auto font-medium text-primary"
            >
              Reenviar código
            </Button>
          ) : (
            <p className="text-sm text-gray-500">
              Não recebeu? Aguarde para reenviar
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || code.length !== 6 || timeLeft === 0}
        >
          {isLoading ? "Verificando..." : "Verificar Código"}
        </Button>
      </form>
    </div>
  );
}
