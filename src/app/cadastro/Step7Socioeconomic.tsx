"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { FormData } from "./page";

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step7Socioeconomic({
  formData,
  updateFormData,
}: Props) {
  const socialProgramOptions = [
    { id: "sim-programa", value: "sim", label: "Sim" },
    { id: "nao-programa", value: "nao", label: "Não" },
    { id: "nao-sei-programa", value: "nao-sei", label: "Não sei" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Situação Socioeconômica
        </h2>
        <p className="text-gray-600">
          Estas informações são opcionais e nos ajudam a entender melhor seu contexto
        </p>
      </div>

      {/* Programa social */}
      <div>
        <Label className="text-base font-medium">
          Participa de programa social? *
        </Label>
        <RadioGroup
          value={formData.participatesInSocialProgram}
          onValueChange={(value) =>
            updateFormData({ participatesInSocialProgram: value })
          }
          className="mt-2 space-y-2"
        >
          {socialProgramOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Tamanho da família */}
      <div>
        <Label htmlFor="householdSize">
          Quantas pessoas vivem em sua casa? *
        </Label>
        <Input
          id="householdSize"
          type="number"
          min={1}
          value={formData.householdSize}
          onChange={(e) =>
            updateFormData({ householdSize: e.target.value })
          }
          placeholder="Número de pessoas"
          className="mt-2"
        />
      </div>

      {/* Pessoas com renda fixa */}
      <div>
        <Label htmlFor="peopleWithIncome">
          Quantas têm renda fixa? *
        </Label>
        <Input
          id="peopleWithIncome"
          type="number"
          min={0}
          value={formData.peopleWithIncome}
          onChange={(e) =>
            updateFormData({ peopleWithIncome: e.target.value })
          }
          placeholder="Número de pessoas com renda"
          className="mt-2"
        />
      </div>

      {/* Aviso de privacidade */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Privacidade:</strong> Estas informações são tratadas com total confidencialidade 
          e usadas apenas para fins estatísticos e melhoria dos nossos programas.
        </p>
      </div>
    </div>
  );
}