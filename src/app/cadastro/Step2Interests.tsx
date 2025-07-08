"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

export default function Step2Interests({
  formData,
  updateFormData,
}: Props) {
  const interestOptions = [
    { id: "saude",                 label: "Saúde" },
    { id: "tecnologia",            label: "Tecnologia" },
    { id: "negocios",              label: "Negócios" },
    { id: "engenharia",            label: "Engenharia" },
    { id: "arte_design",           label: "Arte e Design" },
    { id: "comunicacao",           label: "Comunicação" },
    { id: "meio-ambiente",         label: "Meio Ambiente" },
    { id: "educacao",              label: "Educação" },
    { id: "empreendedorismo",      label: "Empreendedorismo" },
    { id: "financas",              label: "Finanças" }
  ];

  const userSkillOptions = [
    { id: "comunicacao",           label: "Comunicação" },
    { id: "organizacao",           label: "Organização" },
    { id: "criatividade",          label: "Criatividade" },
    { id: "logica",                label: "Lógica e raciocínio" },
    { id: "lideranca",             label: "Liderança" },
    { id: "adaptabilidade",        label: "Adaptabilidade" },
    { id: "trabalho_equipe",       label: "Trabalho em equipe" },
    { id: "idiomas",               label: "Idiomas" },
    { id: "programacao",           label: "Programação" },
    { id: "excel",                 label: "Excel ou similares" },
    { id: "ferramentas_digitais",  label: "Ferramentas digitais" },
    { id: "resolucao_problemas",   label: "Resolução de problemas" }
  ];

  const workPreferenceOptions = [
    { id: "sozinho",               label: "Trabalhar sozinho" },
    { id: "equipe",                label: "Trabalhar em equipe" },
    { id: "depende",               label: "Depende da atividade" },
  ];

  const workEnvironmentOptions = [
    { id: "remoto",                label: "Trabalho remoto" },
    { id: "hibrido",               label: "Trabalho híbrido" },
    { id: "presencial",            label: "Trabalho presencial" },
  ];

  const companyTypeOptions = [
    { id: "tradicional",           label: "Empresa tradicional" },
    { id: "inovacao",              label: "Empresa de inovação" },
  ];

  const handleInterestChange = (id: string, checked: boolean) => {
    const current = formData.userInterests || [];
    if (checked && current.length < 3) {
      updateFormData({ userInterests: [...current, id] });
    } else if (!checked) {
      updateFormData({ userInterests: current.filter((i) => i !== id) });
    }
  };

  const handleSkillChange = (id: string, checked: boolean) => {
    const current = formData.userSkills || [];
    if (checked && current.length < 3) {
      updateFormData({ userSkills: [...current, id] });
    } else if (!checked) {
      updateFormData({ userSkills: current.filter((s) => s !== id) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Quais são seus interesses profissionais?
        </h2>
        <p className="text-gray-600">
          Conte-nos sobre seus interesses e como gosta de trabalhar
        </p>
      </div>

      {/* Interesses */}
      <div>
        <Label htmlFor="interests-group" className="text-base font-medium">
          Quais áreas mais despertam o seu interesse? (até 3) *
        </Label>
        <div id="interests-group" className="grid grid-cols-2 gap-3 mt-3">
          {interestOptions.map((opt) => (
            <div key={opt.id} className="flex items-center space-x-2">
              <Checkbox
                id={`interest-${opt.id}`}
                checked={formData.userInterests?.includes(opt.id)}
                onCheckedChange={(checked) =>
                  handleInterestChange(opt.id, checked as boolean)
                }
                disabled={
                  !formData.userInterests?.includes(opt.id) &&
                  (formData.userInterests?.length || 0) >= 3
                }
              />
              <Label htmlFor={`interest-${opt.id}`} className="text-sm">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
        {/* “Outro” */}
          <div className={`${formData.userInterests?.includes("outro") ? "mt-1" : "mt-2.5 mb-3.5"} flex items-center space-x-2`}>
            <Checkbox
              id="interest-outro"
              checked={formData.userInterests?.includes("outro")}
              onCheckedChange={(checked) =>
                handleInterestChange("outro", checked as boolean)
              }
              disabled={
                !formData.userInterests?.includes("outro") &&
                (formData.userInterests?.length || 0) >= 3
              }
            />
            <Label htmlFor="interest-outro" className="text-sm">
              Outro:
            </Label>
            {formData.userInterests?.includes("outro") && (
              <Input
                id="customInterest"
                value={formData.customInterest}
                onChange={(e) =>
                  updateFormData({ customInterest: e.target.value })
                }
                placeholder="Especifique"
                className="ml-2 h-8"
              />
            )}
          </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionados: {formData.userInterests?.length || 0}/3
        </p>
      </div>

      {/* Preferência de trabalho */}
      <div>
        <Label className="text-base font-medium">
          Como você prefere trabalhar? *
        </Label>
        <Select
          value={formData.workPreference}
          onValueChange={(value) =>
            updateFormData({ workPreference: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua preferência" />
          </SelectTrigger>
          <SelectContent>
            {workPreferenceOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ambiente de trabalho */}
      <div>
        <Label className="text-base font-medium">
          Com qual ambiente você mais se identifica para trabalhar? *
        </Label>
        <Select
          value={formData.workEnvironment}
          onValueChange={(value) =>
            updateFormData({ workEnvironment: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua preferência" />
          </SelectTrigger>
          <SelectContent>
            {workEnvironmentOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tipo de empresa */}
      <div>
        <Label className="text-base font-medium">
          Com qual tipo de empresa você mais se identifica para trabalhar? *
        </Label>
        <Select
          value={formData.companyType}
          onValueChange={(value) =>
            updateFormData({ companyType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua preferência" />
          </SelectTrigger>
          <SelectContent>
            {companyTypeOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Habilidades */}
      <div>
        <Label htmlFor="skills-group" className="text-base font-medium">
          Quais dessas habilidades você tem como destaque? (até 3) *
        </Label>
        <div id="skills-group" className="grid grid-cols-2 gap-3 mt-3">
          {userSkillOptions.map((opt) => (
            <div key={opt.id} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${opt.id}`}
                checked={formData.userSkills?.includes(opt.id)}
                onCheckedChange={(checked) =>
                  handleSkillChange(opt.id, checked as boolean)
                }
                disabled={
                  !formData.userSkills?.includes(opt.id) &&
                  (formData.userSkills?.length || 0) >= 3
                }
              />
              <Label htmlFor={`skill-${opt.id}`} className="text-sm">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
        {/* “Outra” */}
          <div className={`${formData.userSkills?.includes("outra") ? "mt-1" : "mt-2.5 mb-3.5"} flex items-center space-x-2`}>
            <Checkbox
              id="skill-outra"
              checked={formData.userSkills?.includes("outra")}
              onCheckedChange={(checked) =>
                handleSkillChange("outra", checked as boolean)
              }
              disabled={
                !formData.userSkills?.includes("outra") &&
                (formData.userSkills?.length || 0) >= 3
              }
            />
            <Label htmlFor="skill-outra" className="text-sm">
              Outra:
            </Label>
            {formData.userSkills?.includes("outra") && (
              <Input
                id="customSkill"
                value={formData.customSkill}
                onChange={(e) =>
                  updateFormData({ customSkill: e.target.value })
                }
                placeholder="Especifique"
                className="ml-2 h-8"
              />
            )}
          </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.userSkills?.length || 0}/3
        </p>
      </div>
    </div>
  );
}