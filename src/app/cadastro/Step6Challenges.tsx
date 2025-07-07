"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterForm } from "@/types/user";

interface Props {
  formData: RegisterForm;
  updateFormData: (updates: Partial<RegisterForm>) => void;
}

export default function Step6Challenges({
  formData,
  updateFormData,
}: Props) {
  const difficultyOptions = [
    "Organização",
    "Entendimento",
    "Ansiedade",
    "Carreira",
    "Estrutura de estudo",
    "Nenhuma",
  ];

  const deviceOptions = ["Celular", "Computador", "Tablet", "Nenhum"];

  const handleCheckbox = (
    field: keyof RegisterForm,
    value: string,
    checked: boolean
  ) => {
    const current = (formData[field] as string[]) || [];
    const updated = checked
      ? [...current, value]
      : current.filter(v => v !== value);
    updateFormData({ [field]: updated } as Partial<RegisterForm>);
  };

  const thoughtOptions = [
    { id: "sim-desistir", value: "sim", label: "Sim" },
    { id: "nao-desistir", value: "nao", label: "Não" },
    {
      id: "prefiro-nao-responder-desistir",
      value: "prefiro-nao-responder",
      label: "Prefiro não responder",
    },
  ];

  const internetOptions = [
    { id: "wifi", value: "wifi", label: "Wi-Fi" },
    { id: "so-celular", value: "so-celular", label: "Só celular" },
    {
      id: "sem-acesso-confiavel",
      value: "sem-acesso-confiavel",
      label: "Sem acesso confiável",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Seu mundo digital e desafios
        </h2>
        <p className="text-gray-600">
          Identifique desafios e recursos disponíveis
        </p>
      </div>

      {/* Dificuldades atuais */}
      <div>
        <Label className="text-base font-medium">
          Dificuldades atuais (marcar se sim):
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {difficultyOptions.map(opt => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${opt}`}
                checked={formData.currentDifficulties?.includes(opt)}
                onCheckedChange={checked =>
                  handleCheckbox("currentDifficulties", opt, checked as boolean)
                }
              />
              <Label htmlFor={`difficulty-${opt}`} className="text-sm">
                {opt}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Pensou em desistir */}
      <div>
        <Label className="text-base font-medium">
          Já pensou em desistir dos estudos? *
        </Label>
        <RadioGroup
          value={formData.thoughtAboutQuitting}
          onValueChange={value =>
            updateFormData({ thoughtAboutQuitting: value })
          }
          className="mt-2 space-y-2"
        >
          {thoughtOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Acesso à internet */}
      <div>
        <Label className="text-base font-medium">Acesso à internet: *</Label>
        <RadioGroup
          value={formData.internetAccess}
          onValueChange={value =>
            updateFormData({ internetAccess: value })
          }
          className="mt-2 space-y-2"
        >
          {internetOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Dispositivos disponíveis */}
      <div>
        <Label className="text-base font-medium">
          Dispositivos disponíveis: *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {deviceOptions.map(opt => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox
                id={`device-${opt}`}
                checked={formData.availableDevices?.includes(opt)}
                onCheckedChange={checked =>
                  handleCheckbox("availableDevices", opt, checked as boolean)
                }
              />
              <Label htmlFor={`device-${opt}`} className="text-sm">
                {opt}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}