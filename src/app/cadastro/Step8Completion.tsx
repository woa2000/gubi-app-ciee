"use client";

import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RegisterForm } from "@/types/user";

interface Props {
  formData: RegisterForm;
  updateFormData: (updates: Partial<RegisterForm>) => void;
}

export default function Step8Completion({
  formData,
  updateFormData,
}: Props) {
  const howFoundOptions = [
    { id: "escola", label: "Escola" },
    { id: "professor", label: "Professor" },
    { id: "instagram", label: "Instagram" },
    { id: "indicacao", label: "Indicação" },
    { id: "outro", label: "Outro" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Inicio da jornada
        </h2>
        <p className="text-gray-600">
          Últimas informações para começarmos sua jornada!
        </p>
      </div>

      {/* Como conheceu */}
      <div>
        <Label className="text-base font-medium">
          Como conheceu a Jornada ProFuturo? *
        </Label>
        <RadioGroup
          value={formData.howFoundUs}
          onValueChange={(value) =>
            updateFormData({ howFoundUs: value })
          }
          className="mt-2 space-y-2"
        >
          {howFoundOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={`howFoundUs-${opt.id}`} />
              <Label htmlFor={`howFoundUs-${opt.id}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
        {formData.howFoundUs == "outro" && (
          <Input
            id="customInterest"
            value={formData.customHowFoundUs}
            onChange={(e) =>
              updateFormData({ customHowFoundUs: e.target.value })
            }
            placeholder="Especifique *"
            className="mt-2 h-8"
          />
        )}
      </div>

      {/* Consentimento */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Consentimento *</h3>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptsTerms"
            checked={formData.acceptsTerms}
            onCheckedChange={(checked) =>
              updateFormData({ acceptsTerms: checked as boolean })
            }
            className="mt-1"
          />
          <Label
            htmlFor="acceptsTerms"
            className="text-sm leading-relaxed flex flex-wrap gap-x-1"
          >
            <span>Li e aceito os</span>
            <Link
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              termos de uso
            </Link>
            <span>e</span>
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              política de privacidade
            </Link>
            <span>.</span>
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptsDataUsage"
            checked={formData.acceptsDataUsage}
            onCheckedChange={(checked) =>
              updateFormData({ acceptsDataUsage: checked as boolean })
            }
            className="mt-1"
          />
          <Label
            htmlFor="acceptsDataUsage"
            className="text-sm leading-relaxed"
          >
            Autorizo o uso dos meus dados de forma anonimizada para fins
            educacionais e estratégicos.
          </Label>
        </div>
      </div>

      {/* Mensagem final */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🎉 Quase lá!
          </h3>
          <p className="text-gray-700">
            Você está prestes a começar uma jornada incrível de descobertas e
            crescimento. Estamos ansiosos para acompanhar seu desenvolvimento!
          </p>
        </div>
      </div>
    </div>
  );
}