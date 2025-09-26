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
    { id: "saude",                 label: "Saúde e bem-estar" },
    { id: "tecnologia",            label: "Tecnologia e informática" },
    { id: "ciencias",              label: "Ciências (exatas, biológicas, humanas)" },
    { id: "arte_design",           label: "Artes (música, teatro, dança, desenho, etc.)" },
    { id: "comunicacao",           label: "Comunicação e mídias sociais" },
    { id: "meio_ambiente",         label: "Sustentabilidade e meio ambiente" },
    { id: "educacao",              label: "Educação e ensino" },
    { id: "empreendedorismo",      label: "Negócios e empreendedorismo" },
    { id: "esportes",              label: "Esportes" },
  ];

  const learningOptions = [
    { id: "pratica",                 label: "Práticas (colocar a mão na massa, testar, experimentar)" },
    { id: "teoria",            label: "Teóricas (ler, estudar, pesquisar, analisar)" },
    { id: "comunicacao",              label: "De comunicação (falar, apresentar, interagir com pessoas)" },
    { id: "criativa",            label: "Criativas (inventar, imaginar, desenhar, criar coisas novas)" },
    { id: "digital",           label: "Digitais (usar tecnologia, aplicativos, jogos, internet)" },
  ];


  const motivationOptions = [
    { id: "estabilidade-financeira",               label: "Ter uma profissão com estabilidade financeira" },
    { id: "equipe",                label: "Trabalhar com algo que eu goste e me faça feliz" },
    { id: "ajudar",               label: "Ajudar pessoas ou causas sociais" },
    { id: "empreender",               label: "Criar coisas novas ou ter meu próprio negócio" },
    { id: "crescer",               label: "Crescer na carreira e ter reconhecimento profissional" },
    { id: "equilibrio",               label: "Ter equilíbrio entre vida pessoal e profissional" },
  ];

  const handleInterestChange = (id: string, checked: boolean) => {
    const current = formData.userInterests || [];
    if (checked && current.length < 3) {
      updateFormData({ userInterests: [...current, id] });
    } else if (!checked) {
      updateFormData({ userInterests: current.filter((i) => i !== id) });
    }
  };

  const handleLearningChange = (id: string, checked: boolean) => {
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

      {/* Estilo Aprender */}
      <div>
        <Label htmlFor="learning-group" className="text-base font-medium">
         De que forma você prefere aprender ou desenvolver suas atividades no dia a dia? (até 3) *
        </Label>
        <div id="learning-group" className="grid grid-cols-2 gap-3 mt-3">
          {learningOptions.map((opt) => (
            <div key={opt.id} className="flex items-center space-x-2">
              <Checkbox
                id={`learning-${opt.id}`}
                checked={formData.userSkills?.includes(opt.id)}
                onCheckedChange={(checked) =>
                  handleLearningChange(opt.id, checked as boolean)
                }
                disabled={
                  !formData.userSkills?.includes(opt.id) &&
                  (formData.userSkills?.length || 0) >= 3
                }
              />
              <Label htmlFor={`learning-${opt.id}`} className="text-sm">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>        
        <p className="text-xs text-gray-500 mt-2">
          Selecionados: {formData.userSkills?.length || 0}/3
        </p>
      </div>

      {/* Preferência de trabalho */}
      <div>
        <Label className="text-base font-medium mb-2">
          Quando você pensa no futuro, o que mais te motiva? *
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
            {motivationOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>      
    </div>
  );
}