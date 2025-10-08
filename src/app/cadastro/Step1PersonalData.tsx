"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

import { RegisterForm } from "@/types/user";

interface Props {
  formData: RegisterForm;
  updateFormData: (updates: Partial<RegisterForm>) => void;
}

export default function Step1PersonalData({
  formData,
  updateFormData,
}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const passwordValidation = {
    minLength: (formData.password || "").length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password || ""),
    hasLowerCase: /[a-z]/.test(formData.password || ""),
    hasNumber: /\d/.test(formData.password || ""),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password || "")
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const hasPasswordContent = (formData.password || "").length > 0;

  const incompleteRequirements = Object.entries({
    minLength: "Pelo menos 8 caracteres",
    hasUpperCase: "Pelo menos 1 letra maiúscula",
    hasLowerCase: "Pelo menos 1 letra minúscula",
    hasNumber: "Pelo menos 1 número",
    hasSpecialChar: "Pelo menos 1 caractere especial"
  }).filter(([key]) => !passwordValidation[key as keyof typeof passwordValidation]);

  const shouldShowRequirements = hasPasswordContent && !isPasswordValid;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (digits.length === 0) return ""
    if (digits.length < 3) return `(${digits}`

    if (digits.length < 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`

    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  function formatInternationalPhone(raw: string): string {
    return raw.replace(/[^0-9+\-()]/g, "");
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Quem é você no seu jogo?
        </h2>
        <p className="text-gray-600">
          Vamos começar conhecendo você melhor
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">Como você se chama? *</Label>
          <div className="mb-2"></div>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) =>
              updateFormData({ fullName: e.target.value })
            }
            placeholder="Digite seu nome completo"
          />
        </div>

        <div>
          <Label htmlFor="email">Qual o seu e-mail? *</Label>
          <div className="mb-2"></div>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value.toLowerCase() })}
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Se tiver WhatsApp, qual é o número?</Label>
          <div className="mb-2"></div>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => {
              if (formData.country === "BR") {
                const formatted = formatPhone(e.target.value)
                updateFormData({ phone: formatted })
              }
              else {
                const formatted = formatInternationalPhone(e.target.value)
                updateFormData({ phone: formatted })
              }
            }}
            placeholder="Digite o seu número de WhatsApp"
          />
        </div>

        <div>
          <Label htmlFor="password">Senha *</Label>
          <div className="mb-2"></div>
          {shouldShowRequirements && (
            <div className="mb-3 p-3 bg-gray-50 rounded-md border">
              <p className="text-sm font-medium text-gray-700 mb-2">Requisitos da senha:</p>
              <div className="space-y-1">
                {incompleteRequirements.map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password || ""}
              onChange={(e) => updateFormData({ password: e.target.value })}
              placeholder="Digite sua senha"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar senha *</Label>
          <div className="mb-2"></div>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword || ""}
              onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
              placeholder="Confirme sua senha"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}