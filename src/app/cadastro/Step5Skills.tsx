"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function Step5Skills({
  formData,
  updateFormData,
}: Props) {
  const softSkillOptions = [
    "Comunicação",
    "Criatividade",
    "Persistência",
    "Organização",
    "Trabalho em equipe",
    "Empatia",
    "Liderança",
    "Flexibilidade",
    "Resolução de problemas",
    "Inteligência emocional",
  ];

  const hardSkillOptions = [
    "Excel",
    "Power BI",
    "Canva",
    "Python",
    "Banco de dados",
    "Atendimento ao cliente",
    "Criação de conteúdo",
    "Vendas",
    "Design gráfico",
    "Nenhuma",
  ];

  const handleCheckboxChange = (
    field: keyof RegisterForm,
    limit: number | null,
    value: string,
    checked: boolean
  ) => {
    const current = (formData[field] as string[]) || [];
    let updated: string[];
    if (checked) {
      updated = limit && current.length >= limit
        ? current
        : [...current, value];
    } else {
      updated = current.filter(v => v !== value);
    }
    updateFormData({ [field]: updated } as Partial<RegisterForm>);
  };

  const learningPrefs = [
    { id: "aulas-praticas", label: "Aulas práticas" },
    { id: "videos-curtos", label: "Vídeos curtos" },
    { id: "exercicios", label: "Exercícios" },
    { id: "leitura", label: "Leitura" },
    { id: "conversas", label: "Conversas" },
    { id: "games-educativos", label: "Games educativos" },
  ];

  const frequencies = [
    { id: "todos-dias", label: "Todos os dias" },
    { id: "algumas-vezes", label: "Algumas vezes por semana" },
    { id: "raramente", label: "Raramente" },
    { id: "nunca", label: "Nunca" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Suas forças e desafios no jogo
        </h2>
        <p className="text-gray-600">
          Identifique suas habilidades e como aprende melhor
        </p>
      </div>

      {/* Soft Skills */}
      <div>
        <Label className="text-base font-medium">
          Soft Skills (até 2 fortes): *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {softSkillOptions.map(skill => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`soft-${skill}`}
                checked={formData.softSkills?.includes(skill)}
                onCheckedChange={checked =>
                  handleCheckboxChange(
                    "softSkills",
                    2,
                    skill,
                    checked as boolean
                  )
                }
                disabled={
                  !formData.softSkills?.includes(skill) &&
                  (formData.softSkills?.length || 0) >= 2
                }
              />
              <Label htmlFor={`soft-${skill}`} className="text-sm">
                {skill}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.softSkills?.length || 0}/2
        </p>
      </div>

      {/* Habilidades a desenvolver */}
      <div>
        <Label className="text-base font-medium">
          Habilidades a desenvolver (até 3): *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {softSkillOptions.map(skill => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`improve-${skill}`}
                checked={formData.skillsToImprove?.includes(skill)}
                onCheckedChange={checked =>
                  handleCheckboxChange(
                    "skillsToImprove",
                    3,
                    skill,
                    checked as boolean
                  )
                }
                disabled={
                  !formData.skillsToImprove?.includes(skill) &&
                  (formData.skillsToImprove?.length || 0) >= 3
                }
              />
              <Label htmlFor={`improve-${skill}`} className="text-sm">
                {skill}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.skillsToImprove?.length || 0}/3
        </p>
      </div>

      {/* Hard Skills */}
      <div>
        <Label className="text-base font-medium">
          Hard Skills/Ferramentas conhecidas:
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {hardSkillOptions.map(skill => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`hard-${skill}`}
                checked={formData.hardSkills?.includes(skill)}
                onCheckedChange={checked =>
                  handleCheckboxChange(
                    "hardSkills",
                    null,
                    skill,
                    checked as boolean
                  )
                }
              />
              <Label htmlFor={`hard-${skill}`} className="text-sm">
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Estilo de Aprendizagem */}
      <div>
        <Label className="text-base font-medium">
          Como prefere aprender? *
        </Label>
        <div className="mb-2"></div>
        <Select
          value={formData.learningPreference}
          onValueChange={(value) =>
            updateFormData({ learningPreference: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu objetivo" />
          </SelectTrigger>
          <SelectContent>
            {learningPrefs.map(opt => (
              <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Frequência de Estudo */}
      <div>
        <Label className="text-base font-medium">
          Frequência de estudo fora da escola: *
        </Label>
        <RadioGroup
          value={formData.studyFrequency}
          onValueChange={value =>
            updateFormData({ studyFrequency: value })
          }
          className="mt-2 space-y-2"
        >
          {frequencies.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}