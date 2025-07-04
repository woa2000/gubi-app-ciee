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
import { FormData } from "./page";

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step3Education({
  formData,
  updateFormData,
}: Props) {
  const isHighSchool = [
    "pretendo-fazer",
    "duvida-faculdade"
  ].includes(formData.wantsFaculty);

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
            <SelectItem value="6o-ano">6º ano do Ensino Fundamental</SelectItem>
            <SelectItem value="7o-ano">7º ano do Ensino Fundamental</SelectItem>
            <SelectItem value="8o-ano">8º ano do Ensino Fundamental</SelectItem>
            <SelectItem value="9o-ano">9º ano do Ensino Fundamental</SelectItem>
            <SelectItem value="1o-ano-medio">1º ano do Ensino Médio</SelectItem>
            <SelectItem value="2o-ano-medio">2º ano do Ensino Médio</SelectItem>
            <SelectItem value="3o-ano-medio">3º ano do Ensino Médio</SelectItem>
            <SelectItem value="ensino-medio-concluido">Ensino Médio concluído</SelectItem>
            <SelectItem value="curso-tecnico">Cursando técnico</SelectItem>
            <SelectItem value="tecnico-concluido">Curso técnico concluído</SelectItem>
            <SelectItem value="cursando-superior">Cursando faculdade</SelectItem>
            <SelectItem value="superior-incompleto">Faculdade incompleta</SelectItem>
            <SelectItem value="superior-concluido">Faculdade concluída</SelectItem>
            <SelectItem value="pos-graduacao">Pós-graduação</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
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
          {[
            { id: "pretendo-fazer", label: "Pretendo fazer faculdade" },
            { id: "cursando", label: "Estou cursando faculdade" },
            { id: "ja-concluida", label: "Já concluí a faculdade" },
            { id: "nao-pretendo", label: "Não pretendo fazer" },
            { id: "duvida-faculdade", label: "Ainda estou em dúvida" },
          ].map(opt => (
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
          Se você ainda estuda, estuda em que instituição?
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
          {[
            { id: "presencial", label: "Presencial" },
            { id: "ead", label: "EAD" },
            { id: "hibrido", label: "Híbrido" },
          ].map(opt => (
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
            ? "Você precisa de apoio financeiro para estudar? *"
            : formData.wantsFaculty === "ja-concluida"
              ? "Você precisou de apoio financeiro para estudar? *"
              : formData.wantsFaculty === "nao-pretendo"
                ? "Você precisaria de apoio financeiro para estudar? *"
                : "Você precisará de apoio financeiro para estudar? *"}
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
              ? [
                {
                  id: "sim-financiamento",
                  label: "Sim, preciso de financiamento ou bolsa",
                },
                {
                  id: "nao-preciso",
                  label: "Não, consigo pagar sem ajuda",
                }
              ]
              : formData.wantsFaculty === "ja-concluida"
                ? [
                  {
                    id: "sim-financiamento",
                    label: "Sim, precisei de financiamento ou bolsa",
                  },
                  {
                    id: "nao-preciso",
                    label: "Não, consegui pagar sem ajuda",
                  }
                ]
                : [
                  {
                    id: "sim-financiamento",
                    label: "Sim, preciso de financiamento ou bolsa",
                  },
                  {
                    id: "sim-nao-sei",
                    label: "Sim, mas ainda não sei como conseguir",
                  },
                  {
                    id: "nao-preciso",
                    label: "Não, consigo pagar sem ajuda",
                  },
                  {
                    id: "nao-pensei",
                    label: "Ainda não pensei sobre isso",
                  },
                ]
          ).map(opt => (
            <div
              key={opt.id}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
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
          {[
            { id: "sim-info", label: "Sim" },
            { id: "nao-info", label: "Não" },
          ].map(opt => (
            <div
              key={opt.id}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}