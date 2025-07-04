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
          Interesses e Preferências Profissionais
        </h2>
        <p className="text-gray-600">
          Conte-nos sobre seus interesses e como gosta de trabalhar
        </p>
      </div>

      {/* Interesses */}
      <div>
        <Label className="text-base font-medium">
          Quais áreas você mais tem interesse? (até 3) *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {interestOptions.map(interest => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                checked={formData.interests?.includes(interest)}
                onCheckedChange={checked =>
                  handleInterestChange(interest, checked as boolean)
                }
                disabled={
                  !formData.interests?.includes(interest) &&
                  (formData.interests?.length || 0) >= 3
                }
              />
              <Label htmlFor={interest} className="text-sm">
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
        <Label className="text-base font-medium">Você prefere: *</Label>
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
          Ambiente de trabalho ideal *
        </Label>
        <RadioGroup
          value={formData.workEnvironment}
          onValueChange={value =>
            updateFormData({ workEnvironment: value })
          }
          className="mt-2 space-y-2"
        >
          {[
            { id: "escritorio-tradicional", label: "Escritório tradicional" },
            { id: "trabalho-remoto", label: "Trabalho remoto" },
            { id: "campo-publico", label: "Campo/público" },
            { id: "ambientes-criativos", label: "Ambientes criativos" },
            { id: "locais-movimento", label: "Locais com movimento" },
          ].map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
          {/* Outro ambiente */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="outro-ambiente" id="outro-ambiente" />
            <Label htmlFor="outro-ambiente">Outro:</Label>
            {formData.workEnvironment === "outro-ambiente" && (
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
        </RadioGroup>
      </div>

      {/* Habilidades */}
      <div>
        <Label className="text-base font-medium">
          Habilidades (até 3) *
        </Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {skillOptions.map(skill => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={skill}
                checked={formData.skills?.includes(skill)}
                onCheckedChange={checked =>
                  handleSkillChange(skill, checked as boolean)
                }
                disabled={
                  !formData.skills?.includes(skill) &&
                  (formData.skills?.length || 0) >= 3
                }
              />
              <Label htmlFor={skill} className="text-sm">
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