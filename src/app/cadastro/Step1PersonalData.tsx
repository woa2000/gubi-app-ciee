"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterForm } from "@/types/user";

interface Props {
  formData: RegisterForm;
  updateFormData: (updates: Partial<RegisterForm>) => void;
}

export default function Step1PersonalData({
  formData,
  updateFormData,
}: Props) {
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
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Se tiver, qual o seu número?</Label>
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
          <Label htmlFor="password">Crie uma senha? *</Label>
          <div className="mb-2"></div>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            placeholder="Digite sua senha"
          />
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirme a senha senha? *</Label>
          <div className="mb-2"></div>
          <Input
            id="confirm-password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
            placeholder="Digite sua senha novamente"
          />
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
          <Label htmlFor="gender">Você se indentifica com que gênero? *</Label>
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
          <Label htmlFor="city">Onde você mora/reside? *</Label>
          <div className="mb-2"></div>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="Sua cidade e estado"
          />
        </div>
      </div>
    </div>
  );
}