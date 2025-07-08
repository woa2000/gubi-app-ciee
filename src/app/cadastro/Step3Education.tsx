"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export default function Step3Education({
  formData,
  updateFormData,
}: Props) {
  const isHighSchool = [
    "pretendo-fazer",
    "duvida-faculdade"
  ].includes(formData.wantsFaculty);

  const gradeOptions = [
    { id: "o6_ano",                 label: "6º ano do Ensino Fundamental" },
    { id: "o7_ano",                 label: "7º ano do Ensino Fundamental" },
    { id: "o8_ano",                 label: "8º ano do Ensino Fundamental" },
    { id: "o9_ano",                 label: "9º ano do Ensino Fundamental" },
    { id: "o1-ano_medio",           label: "1º ano do Ensino Médio" },
    { id: "o2-ano_medio",           label: "2º ano do Ensino Médio" },
    { id: "o3-ano_medio",           label: "3º ano do Ensino Médio" },
    { id: "ensino_medio-concluido", label: "Ensino Médio concluído" },
    { id: "curso_tecnico",          label: "Cursando técnico" },
    { id: "tecnico_concluido",      label: "Curso técnico concluído" },
    { id: "cursando_superior",      label: "Cursando superior" },
    { id: "superior_incompleto",    label: "Superior incompleta" },
    { id: "superior_concluido",     label: "Superior concluído" },
    { id: "pos_graduacao",          label: "Pós-graduação" },
    { id: "outro",                  label: "Outro" }
  ];

  const wantsFacultyOptions = [
    { id: "pretendo_fazer",   label: "Pretendo fazer faculdade" },
    { id: "cursando",         label: "Estou cursando faculdade" },
    { id: "ja_concluida",     label: "Já concluí a faculdade" },
    { id: "nao_pretendo",     label: "Não pretendo fazer" },
    { id: "duvida_faculdade", label: "Ainda estou em dúvida" },
  ];

  const studyFormatOptions = [
    { id: "online",     label: "Online" },
    { id: "hibrido",    label: "Híbrido" },
    { id: "presencial", label: "Presencial" },
  ];

  const inFacultyNeedsFinancialSupportOptions = [
    { id: "sim_financiamento",  label: "Sim, preciso de financiamento ou bolsa", },
    { id: "nao_preciso",        label: "Não, consigo pagar sem ajuda", }
  ];

  const needsFinancialSupportOptions = [
    { id: "sim_financiamento",  label: "Sim, preciso de financiamento ou bolsa", },
    { id: "sim_nao_sei",        label: "Sim, mas ainda não sei como conseguir", },
    { id: "nao_preciso",        label: "Não, consigo pagar sem ajuda", },
    { id: "nao_pensei",         label: "Ainda não pensei sobre isso", },
  ];

  const wantsFinancialInfoOptions = [
    { id: "sim", label: "Sim, quero receber informações" },
    { id: "nao", label: "Não, não quero receber" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Seu futuro no game
        </h2>
        <p className="text-gray-600">
          Vamos falar sobre seus planos para o ensino superior
        </p>
      </div>

      {/* Situação Educacional */}
      <div>
        <Label htmlFor="grade">Situação educacional *</Label>
        <div className="mb-2"></div>
        <Select value={formData.grade} onValueChange={(value) => updateFormData({ grade: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua situação atual" />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map(opt => (
              <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Situação com o ensino superior */}
      <div>
        <Label className="text-base font-medium">
          Qual sua situação com o ensino superior? *
        </Label>
        <RadioGroup
          value={formData.wantsFaculty}
          onValueChange={(value) =>
            updateFormData({ wantsFaculty: value })
          }
          className="mt-2 space-y-2"
        >
          {wantsFacultyOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Instituição Atual */}
      <div>
        <Label htmlFor="current-institution">
          Se você ainda estuda, qual o nome da instituição?
        </Label>
        <Input
          id="current-institution"
          value={formData.currentInstitution}
          onChange={(e) =>
            updateFormData({ currentInstitution: e.target.value })
          }
          placeholder={"Nome da sua instituição (opcional)"}
          className="mt-2"
        />
      </div>

      {/* Instituição Pretendida */}
      {isHighSchool && (<div>
        <Label htmlFor="institution">
          Já tem alguma instituição em mente?
        </Label>
        <Input
          id="institution"
          value={formData.institution}
          onChange={(e) =>
            updateFormData({ institution: e.target.value })
          }
          placeholder={"Nome da sua instituição de desejo (opcional)"}
          className="mt-2"
        />
      </div>
      )}

      {/* Formato preferido */}
      <div>
        <Label className="text-base font-medium">
          Qual formato de estudo combina mais com você? *
        </Label>
        <RadioGroup
          value={formData.studyFormat}
          onValueChange={(value) =>
            updateFormData({ studyFormat: value })
          }
          className="mt-2 space-y-2"
        >
          {studyFormatOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Apoio financeiro e info sobre bolsas */}
      <div>
        <Label className="text-base font-medium">
          {formData.wantsFaculty === "cursando"
            ? "Você precisa de apoio financeiro para fazer faculdade? *"
            : formData.wantsFaculty === "ja-concluida"
              ? "Você precisou de apoio financeiro para fazer faculdade? *"
              : formData.wantsFaculty === "nao-pretendo"
                ? "Você precisaria de apoio financeiro para fazer faculdade? *"
                : "Você precisará de apoio financeiro para fazer faculdade? *"}
        </Label>
        <RadioGroup
          value={formData.needsFinancialSupport}
          onValueChange={(value) =>
            updateFormData({ needsFinancialSupport: value })
          }
          className="mt-2 space-y-2"
        >
          {(
            formData.wantsFaculty === "cursando"
              ? inFacultyNeedsFinancialSupportOptions
              : formData.wantsFaculty === "ja-concluida"
                ? inFacultyNeedsFinancialSupportOptions
                : needsFinancialSupportOptions
          ).map(opt => (
            <div
              key={opt.id}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={opt.id} id={`${opt.id}-needs-financial-support`}/>
              <Label htmlFor={`${opt.id}-needs-financial-support`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">
          Quer receber informações sobre bolsas e financiamento? *
        </Label>
        <RadioGroup
          value={formData.wantsFinancialInfo}
          onValueChange={(value) =>
            updateFormData({ wantsFinancialInfo: value })
          }
          className="mt-2 space-y-2"
        >
          {wantsFinancialInfoOptions.map(opt => (
            <div
              key={opt.id}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={opt.id} id={`${opt.id}-info`} />
              <Label htmlFor={`${opt.id}-info`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}