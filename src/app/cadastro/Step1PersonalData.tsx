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
import { FormData } from "./page";

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step1PersonalData({
  formData,
  updateFormData,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Dados Pessoais
        </h2>
        <p className="text-gray-600">
          Vamos começar conhecendo você melhor
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">Nome completo *</Label>
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
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Celular (WhatsApp - opcional)</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <Label htmlFor="birthDate">Data de nascimento *</Label>
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
          <Label htmlFor="gender">Gênero *</Label>
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              placeholder="Sua cidade"
            />
          </div>
          <div>
            <Label htmlFor="state">Estado *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              placeholder="Seu estado"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="school">
            Nome da escola ou instituição *
          </Label>
          <Input
            id="school"
            value={formData.school}
            onChange={(e) =>
              updateFormData({ school: e.target.value })
            }
            placeholder="Nome da sua escola/faculdade"
          />
        </div>

        <div>
          <Label htmlFor="grade">Situação educacional *</Label>
          <Select
            value={formData.grade}
            onValueChange={(value) =>
              updateFormData({ grade: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua situação atual" />
            </SelectTrigger>
            <SelectContent>
              {/* ...itens como antes */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="currentStatus">Você está: *</Label>
          <Select
            value={formData.currentStatus}
            onValueChange={(value) =>
              updateFormData({ currentStatus: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua situação atual" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="estudando">Estudando</SelectItem>
              <SelectItem value="trabalhando">Trabalhando</SelectItem>
              <SelectItem value="procurando-emprego">
                Procurando emprego
              </SelectItem>
              <SelectItem value="nenhuma">
                Nenhuma das opções acima
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}