"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { FormData } from "./page";

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step3Education({
  formData,
  updateFormData,
}: Props) {
  const showStudyFormat = [
    "pretendo-fazer",
    "cursando",
    "duvida",
  ].includes(formData.wantsFaculty);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Educação Superior
        </h2>
        <p className="text-gray-600">
          Vamos falar sobre seus planos para o ensino superior
        </p>
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

      {/* Formato preferido */}
      {showStudyFormat && (
        <div>
          <Label className="text-base font-medium">
            Formato preferido: *
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
      )}

      {/* Instituição */}
      {showStudyFormat && (
        <div>
          <Label htmlFor="institution">
            {formData.wantsFaculty === "cursando"
              ? "Em qual instituição você estuda?"
              : formData.wantsFaculty === "ja-concluida"
                ? "Em qual instituição você se formou?"
                : "Já tem alguma instituição em mente?"}
          </Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) =>
              updateFormData({ institution: e.target.value })
            }
            placeholder={
              formData.wantsFaculty === "cursando"
                ? "Nome da sua faculdade atual"
                : formData.wantsFaculty === "ja-concluida"
                  ? "Nome da instituição onde se formou"
                  : "Nome da instituição (opcional)"
            }
            className="mt-2"
            disabled={formData.wantsFaculty === "nao-pretendo"}
          />
        </div>
      )}

      {/* Apoio financeiro e info sobre bolsas */}
      {showStudyFormat && (
        <>
          <div>
            <Label className="text-base font-medium">
              Você precisará de apoio financeiro para estudar? *
            </Label>
            <RadioGroup
              value={formData.needsFinancialSupport}
              onValueChange={(value) =>
                updateFormData({ needsFinancialSupport: value })
              }
              className="mt-2 space-y-2"
            >
              {[
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

          <div>
            <Label className="text-base font-medium">
              Interesse em receber informações sobre bolsas ou financiamento? *
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
        </>
      )}
    </div>
  );
}