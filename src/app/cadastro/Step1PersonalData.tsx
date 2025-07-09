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
  const [city, setCity] = React.useState(formData.location.split(" - ")[0] || "");
  const [state, setState] = React.useState(formData.location.split(" - ")[1] || "");

  const states = [
    { id: "AC", label: "Acre" },
    { id: "AL", label: "Alagoas" },
    { id: "AP", label: "Amapá" },
    { id: "AM", label: "Amazonas" },
    { id: "BA", label: "Bahia" },
    { id: "CE", label: "Ceará" },
    { id: "DF", label: "Distrito Federal" },
    { id: "ES", label: "Espírito Santo" },
    { id: "GO", label: "Goiás" },
    { id: "MA", label: "Maranhão" },
    { id: "MT", label: "Mato Grosso" },
    { id: "MS", label: "Mato Grosso do Sul" },
    { id: "MG", label: "Minas Gerais" },
    { id: "PA", label: "Pará" },
    { id: "PB", label: "Paraíba" },
    { id: "PR", label: "Paraná" },
    { id: "PE", label: "Pernambuco" },
    { id: "PI", label: "Piauí" },
    { id: "RJ", label: "Rio de Janeiro" },
    { id: "RN", label: "Rio Grande do Norte" },
    { id: "RS", label: "Rio Grande do Sul" },
    { id: "RO", label: "Rondônia" },
    { id: "RR", label: "Roraima" },
    { id: "SC", label: "Santa Catarina" },
    { id: "SP", label: "São Paulo" },
    { id: "SE", label: "Sergipe" },
    { id: "TO", label: "Tocantins" }
  ];

  const updateLocation = (newCity: string, newState: string) => {
    const location = `${newCity.trim()} - ${newState.trim()}`;
    updateFormData({ location });
  };

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
          <Label htmlFor="confirm-password">Confirme a senha? *</Label>
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
          <Label htmlFor="city">Qual sua cidade? *</Label>
          <div className="mb-2"></div>
          <Input
            id="city"
            value={city}
            onChange={(e) => {
              const newCity = e.target.value;
              setCity(newCity);
              updateLocation(newCity, state);
            }}
            placeholder="Digite sua cidade"
          />
        </div>

        <div>
          <Label htmlFor="state">Qual seu estado? *</Label>
          <div className="mb-2"></div>
          <Select
            value={state}
            onValueChange={(value) => {
              setState(value);
              updateLocation(city, value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu estado" />
            </SelectTrigger>
            <SelectContent>
              {states.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
}