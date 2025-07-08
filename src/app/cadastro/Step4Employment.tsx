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

export default function Step4Employment({
  formData,
  updateFormData,
}: Props) {
  const twoYearOptions = [
    { id: "conseguir_emprego", label: "Conseguir emprego" },
    { id: "ingressar_faculdade", label: "Ingressar na faculdade" },
    { id: "curso_tecnico", label: "Curso técnico" },
    { id: "empreender", label: "Empreender" },
    { id: "aprender_ferramenta_tecnica", label: "Aprender alguma ferramenta técnica" },
    { id: "melhorar_habilidades_sociais", label: "Melhorar habilidades sociais" },
    { id: "fazer_intercambio", label: "Fazer intercâmbio" },
    { id: "aprender_idioma", label: "Aprender idioma" },
    { id: "ainda_nao_sei", label: "Ainda não sei" },
  ];

  const workWhileStudyingOptions = [
    { id: "sim_trabalhar", value: "sim", label: "Sim" },
    { id: "nao_trabalhar", value: "nao", label: "Não" },
    { id: "talvez_trabalhar", value: "talvez", label: "Talvez" },
  ];

  const internshipOptions = [
    { id: "sim_estagio", value: "sim", label: "Sim" },
    { id: "nao_estagio", value: "nao", label: "Não" },
  ];

  const handleTwoYearChange = (id: string, checked: boolean) => {
    const current = formData.twoYearGoals || [];
    if (checked && current.length < 3) {
      updateFormData({ twoYearGoals: [...current, id] });
    } else if (!checked) {
      updateFormData({ twoYearGoals: current.filter((i) => i !== id) });
    }
  };

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
          Seu maior objetivo nos próximos 2 anos (até 2): *
        </Label>
        <div className="mb-2"></div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {twoYearOptions.map(twoYear => (
            <div key={twoYear.id} className="flex items-center space-x-2">
              <Checkbox
                id={`two-year-${twoYear.id}`}
                checked={formData.twoYearGoals?.includes(twoYear.id)}
                onCheckedChange={checked =>
                  handleTwoYearChange(
                    twoYear.id,
                    checked as boolean
                  )
                }
                disabled={
                  !formData.twoYearGoals?.includes(twoYear.id) &&
                  (formData.twoYearGoals?.length || 0) >= 2
                }
              />
              <Label htmlFor={`two-year-${twoYear.id}`} className="text-sm">
                {twoYear.label}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.twoYearGoals?.length || 0}/2
        </p>
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