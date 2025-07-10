"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { STATES, fetchCitiesByState, CityOption } from "@/services/locationService";

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
  const [citiesList, setCitiesList] = useState<CityOption[]>([]);
  const [city, setCity] = useState(formData.location.split(" - ")[0] || "");
  const [state, setState] = useState(formData.location.split(" - ")[1] || "");

  useEffect(() => {
    if (!state) {
      setCitiesList([]);
      setCity("");
      return;
    }

    fetchCitiesByState(state)
      .then((data) => setCitiesList(data))
      .catch(() => setCitiesList([]));
  }, [state]);

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
              const formatted = formatPhone(e.target.value)
              updateFormData({ phone: formatted })
            }}
            placeholder="(11) 99999-9999"
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

        <div>
          <Label htmlFor="birthDate">Quando é o seu aniversário? *</Label>
          <div className="mb-2"></div>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) =>
              updateFormData({ birthDate: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="gender">Você se identifica com que gênero? *</Label>
          <div className="mb-2"></div>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              updateFormData({ gender: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="prefiro-nao-responder">
                Prefiro não responder
              </SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>

          {formData.gender === "outro" && (
            <Input
              value={formData.customGender}
              onChange={(e) =>
                updateFormData({ customGender: e.target.value })
              }
              placeholder="Especifique"
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Label htmlFor="state">Qual seu estado? *</Label>
          <div className="mb-2" />
          <Select
            value={state}
            onValueChange={(value) => {
              setState(value);

              if (!value) updateFormData({ location: "" });
              else updateFormData({ location: `${city} - ${value}` });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu estado" />
            </SelectTrigger>
            <SelectContent>
              {STATES.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">Qual sua cidade? *</Label>
          <div className="mb-2" />
          <Select
            value={city}
            onValueChange={(value) => {
              setCity(value);
              updateFormData({ location: `${value} - ${state}` });
            }}
            disabled={!state}
          >
            <SelectTrigger>
              <SelectValue placeholder={state ? "Selecione sua cidade" : "Escolha o estado primeiro"} />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-auto">
              {citiesList.map((c) => (
                <SelectItem key={c.id} value={c.nome}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}