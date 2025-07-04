"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "./page";

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step4Employment({
  formData,
  updateFormData,
}: Props) {
  const twoYearOptions = [
    { id: "conseguir-emprego", label: "Conseguir emprego" },
    { id: "ingressar-faculdade", label: "Ingressar na faculdade" },
    { id: "curso-tecnico", label: "Curso técnico" },
    { id: "empreender", label: "Empreender" },
    { id: "ainda-nao-sei", label: "Ainda não sei" },
  ];

  const workWhileStudyingOptions = [
    { id: "sim-trabalhar", value: "sim", label: "Sim" },
    { id: "nao-trabalhar", value: "nao", label: "Não" },
    { id: "talvez-trabalhar", value: "talvez", label: "Talvez" },
  ];

  const internshipOptions = [
    { id: "sim-estagio", value: "sim", label: "Sim" },
    { id: "nao-estagio", value: "nao", label: "Não" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Missões e experiências na vida real
        </h2>
        <p className="text-gray-600">
          Fale sobre seus objetivos profissionais
        </p>
      </div>

      {/* Objetivo em 2 anos */}
      <div>
        <Label className="text-base font-medium">
          Seu maior objetivo nos próximos 2 anos: *
        </Label>
        <RadioGroup
          value={formData.twoYearGoal}
          onValueChange={(value) =>
            updateFormData({ twoYearGoal: value })
          }
          className="mt-2 space-y-2"
        >
          {twoYearOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Trabalhar enquanto estuda */}
      <div>
        <Label className="text-base font-medium">
          Pretende trabalhar enquanto estuda? *
        </Label>
        <RadioGroup
          value={formData.workWhileStudying}
          onValueChange={(value) =>
            updateFormData({ workWhileStudying: value })
          }
          className="mt-2 space-y-2"
        >
          {workWhileStudyingOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Experiência de estágio */}
      <div>
        <Label className="text-base font-medium">
          Já participou de estágio ou jovem aprendiz? *
        </Label>
        <RadioGroup
          value={formData.hasInternshipExperience}
          onValueChange={(value) =>
            updateFormData({ hasInternshipExperience: value })
          }
          className="mt-2 space-y-2"
        >
          {internshipOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}