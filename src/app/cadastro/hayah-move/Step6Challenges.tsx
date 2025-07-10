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
    { id: "organizacao",          label: "Organização" },
    { id: "entendimento",         label: "Entendimento" },
    { id: "ansiedade",            label: "Ansiedade" },
    { id: "carreira",             label: "Carreira" },
    { id: "estrutura_de_estudo",  label: "Estrutura de estudo" },
    { id: "nenhuma",              label: "Nenhuma" },
  ];

  const deviceOptions = [
    { id: "celular",    label: "Celular" },
    { id: "computador", label: "Computador" },
    { id: "tablet",     label: "Tablet" },
    { id: "nenhum",     label: "Nenhum" }
  ];

  const thoughtOptions = [
    { id: "sim", label: "Sim" },
    { id: "nao", label: "Não" },
    { id: "prefiro_nao_responder", label: "Prefiro não responder", },
  ];

  const internetOptions = [
    { id: "wifi", label: "Wi-Fi" },
    { id: "so_celular", label: "Só celular" },
    { id: "sem_acesso_confiavel", label: "Sem acesso confiável", },
  ];

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
            <div key={`difficulty-${opt.id}`} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${opt.id}`}
                checked={formData.currentDifficulties?.includes(opt.id)}
                onCheckedChange={checked =>
                  handleCheckbox("currentDifficulties", opt.id, checked as boolean)
                }
              />
              <Label htmlFor={`difficulty-${opt.id}`} className="text-sm">
                {opt.label}
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
              <RadioGroupItem value={opt.id} id={`${opt.id}-thought`} />
              <Label htmlFor={`${opt.id}-thought`}>{opt.label}</Label>
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
              <RadioGroupItem value={opt.id} id={`${opt.id}-internet`} />
              <Label htmlFor={`${opt.id}-internet`}>{opt.label}</Label>
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
            <div key={`device-${opt.id}`} className="flex items-center space-x-2">
              <Checkbox
                id={`device-${opt.id}`}
                checked={formData.availableDevices?.includes(opt.id)}
                onCheckedChange={checked =>
                  handleCheckbox("availableDevices", opt.id, checked as boolean)
                }
              />
              <Label htmlFor={`device-${opt.id}`} className="text-sm">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}