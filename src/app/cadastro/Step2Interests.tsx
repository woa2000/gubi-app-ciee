"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormData } from "./page";

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step2Interests({
  formData,
  updateFormData,
}: Props) {
  const interestOptions = [
    "Saúde",
    "Tecnologia",
    "Negócios",
    "Engenharia",
    "Arte e Design",
    "Comunicação",
    "Meio Ambiente",
    "Educação",
    "Empreendedorismo",
  ];

  const environmentOptions = [
    "Escritório tradicional",
    "Trabalho remoto",
    "Campo/público",
    "Ambientes criativos",
    "Locais com movimento"
  ];

  const skillOptions = [
    "Comunicação",
    "Organização",
    "Criatividade",
    "Lógica e raciocínio",
    "Liderança",
    "Adaptabilidade",
    "Trabalho em equipe",
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    const current = formData.interests || [];
    if (checked && current.length < 3) {
      updateFormData({ interests: [...current, interest] });
    } else if (!checked) {
      updateFormData({ interests: current.filter(i => i !== interest) });
    }
  };

  const handleEnvironmentsChange = (environment: string, checked: boolean) => {
    const current = formData.workEnvironments || [];
    if (checked && current.length < 3) {
      updateFormData({ workEnvironments: [...current, environment] });
    } else if (!checked) {
      updateFormData({ workEnvironments: current.filter(i => i !== environment) });
    }
  };
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    const current = formData.skills || [];
    if (checked && current.length < 3) {
      updateFormData({ skills: [...current, skill] });
    } else if (!checked) {
      updateFormData({ skills: current.filter(s => s !== skill) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Seu estilo e escolhas no jogo da vida
        </h2>
        <p className="text-gray-600">
          Conte-nos sobre seus interesses e como gosta de trabalhar
        </p>
      </div>

      {/* Interesses */}
      <div>
        <Label className="text-base font-medium">
          Quais áreas mais despertam o seu interesse? (até 3) *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {interestOptions.map(interest => (
            <div key={`${interest}-interesse`} className="flex items-center space-x-2">
              <Checkbox
                id={`${interest}-interesse`}
                checked={formData.interests?.includes(interest)}
                onCheckedChange={checked =>
                  handleInterestChange(interest, checked as boolean)
                }
                disabled={
                  !formData.interests?.includes(interest) &&
                  (formData.interests?.length || 0) >= 3
                }
              />
              <Label htmlFor={`${interest}-interesse`} className="text-sm">
                {interest}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <Checkbox
            id="outro-interesse"
            checked={formData.interests?.includes("outro")}
            onCheckedChange={checked =>
              handleInterestChange("outro", checked as boolean)
            }
            disabled={
              !formData.interests?.includes("outro") &&
              (formData.interests?.length || 0) >= 3
            }
          />
          <Label htmlFor="outro-interesse" className="text-sm">
            Outro:
          </Label>
          {formData.interests?.includes("outro") && (
            <Input
              value={formData.customInterest}
              onChange={e =>
                updateFormData({ customInterest: e.target.value })
              }
              placeholder="Especifique"
              className="ml-2 h-8"
            />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionados: {formData.interests?.length || 0}/3
        </p>
      </div>

      {/* Preferência de trabalho */}
      <div>
        <Label className="text-base font-medium">Escolha como você prefere jogar: *</Label>
        <RadioGroup
          value={formData.workPreference}
          onValueChange={value => updateFormData({ workPreference: value })}
          className="mt-2 space-y-2"
        >
          {[
            { id: "sozinho", label: "Trabalhar sozinho" },
            { id: "equipe", label: "Trabalhar em equipe" },
            { id: "depende", label: "Depende da atividade" },
          ].map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Ambiente de trabalho */}
      <div>
        <Label className="text-base font-medium">
          Qual cenário combina mais com você para jogar/trabalhar? (até 2) *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {environmentOptions.map(environment => (
            <div key={environment} className="flex items-center space-x-2">
              <Checkbox
                id={environment}
                checked={formData.workEnvironments?.includes(environment)}
                onCheckedChange={checked =>
                  handleEnvironmentsChange(environment, checked as boolean)
                }
                disabled={
                  !formData.workEnvironments?.includes(environment) &&
                  (formData.workEnvironments?.length || 0) >= 2
                }
              />
              <Label htmlFor={environment} className="text-sm">
                {environment}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <Checkbox
            id="outro-ambiente"
            checked={formData.workEnvironments?.includes("outro")}
            onCheckedChange={checked =>
              handleEnvironmentsChange("outro", checked as boolean)
            }
            disabled={
              !formData.workEnvironments?.includes("outro") &&
              (formData.workEnvironments?.length || 0) >= 2
            }
          />
          <Label htmlFor="outro-ambiente" className="text-sm">
            Outro:
          </Label>
          {formData.workEnvironments?.includes("outro") && (
            <Input
              value={formData.customEnvironment}
              onChange={e =>
                updateFormData({ customEnvironment: e.target.value })
              }
              placeholder="Especifique"
              className="ml-2 h-8"
            />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionados: {formData.workEnvironments?.length || 0}/2
        </p>
      </div>

      {/* Habilidades */}
      <div>
        <Label className="text-base font-medium">
          Quais habilidades você tem como superpoder? (até 3) *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {skillOptions.map(skill => (
            <div key={`${skill}-habilidade`} className="flex items-center space-x-2">
              <Checkbox
                id={`${skill}-habilidade`}
                checked={formData.skills?.includes(skill)}
                onCheckedChange={checked =>
                  handleSkillChange(skill, checked as boolean)
                }
                disabled={
                  !formData.skills?.includes(skill) &&
                  (formData.skills?.length || 0) >= 3
                }
              />
              <Label htmlFor={`${skill}-habilidade`} className="text-sm">
                {skill}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <Checkbox
            id="outra-habilidade"
            checked={formData.skills?.includes("outra")}
            onCheckedChange={checked =>
              handleSkillChange("outra", checked as boolean)
            }
            disabled={
              !formData.skills?.includes("outra") &&
              (formData.skills?.length || 0) >= 3
            }
          />
          <Label htmlFor="outra-habilidade" className="text-sm">
            Outra:
          </Label>
          {formData.skills?.includes("outra") && (
            <Input
              value={formData.customSkill}
              onChange={e =>
                updateFormData({ customSkill: e.target.value })
              }
              placeholder="Especifique"
              className="ml-2 h-8"
            />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.skills?.length || 0}/3
        </p>
      </div>
    </div>
  );
}