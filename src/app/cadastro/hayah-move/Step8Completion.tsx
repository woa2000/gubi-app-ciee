"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const churches = [
    "Igreja Batista Imperial",
    "Igreja Batista Imperial Aquidauana",
    "Igreja Batista Imperial em Células",
    "Igreja Batista Imperial Moreninha",
    "Igreja Batista Imperial Nova Lima",
    "Igreja Batista Imperial Parque dos Poderes",
    "Igreja Batista Lagoinha Milanez",
    "Igreja Batista Nova Vida",
    "Igreja Batista Imperial Julho Castilho",
    "Igreja Batista Camboinha",
    "Gerar Vidas Em Cristo",
    "La Vite Milano (Italia)",
    "Videira Anápolis",
    "Videira Araés",
    "Videira Assis",
    "Videira Barueri",
    "Videira Belo Horizonte",
    "Videira Campinas",
    "Videira Caxias",
    "Videira Cotia",
    "Videira Cuiabá",
    "Videira Curitiba",
    "Videira da Beira Chaimite",
    "Videira da Beira Massamba",
    "Videira da Beira na Manga",
    "Videira de Candido Mota",
    "Videira Diadema",
    "Videira Francisco Morato",
    "Videira Gramado",
    "Videira Guarulhos",
    "Videira Hamburg",
    "Videira Interlagos",
    "Videira Itaquera",
    "Videira Jaraguá",
    "Videira Lisboa",
    "Videira Mirassol",
    "Videira Mogi das Cruzes",
    "Videira Nações",
    "Videira Osasco",
    "Videira Ourinhos",
    "Videira Patos de Minas",
    "Videira Pedra 90",
    "Videira Peruíbe",
    "Videira Pindamonhangaba",
    "Videira Pontão",
    "Videira Porto Alegre",
    "Videira Porto Portugal",
    "Videira Praia Grande",
    "Videira Presidente Prudente",
    "Videira Recanto Mônica",
    "Videira Ribeirão Preto",
    "Videira Rio de Janeiro",
    "Videira Santo André",
    "Videira São José do Rio Preto",
    "Videira Setúbal",
    "Videira Suzano",
    "Videira Uberlândia",
    "Videira Vila Mariana",
    "Videira Várzea Grande",
    "Vine Cape Town",
    "Igreja Metodista Livre",
    "Ministério Rede Ágape de Araputanga",
    "Ministério Vida na Palavra",
    "NO'HA",
    "Igreja Presbiteriana Pentecostal Gileade",
    "Igreja Cara de Leão Vilar dos Teles",
    "Vida em células",
    "Treinamento On-line",
    "Outra"
  ];

  const [selected, setSelected] = useState<string>(() => {
    if (churches.includes(formData.customHowFoundUs)) {
      return formData.customHowFoundUs;
    }
    return "";
  });

  const handleSelectChange = (value: string) => {
    setSelected(value);

    if (value !== "Outra") updateFormData({ customHowFoundUs: value });
    else updateFormData({ customHowFoundUs: "" });
  };

  return (
    <div className="space-y-6" >
      {/* Cabeçalho */}
      < div className="text-center mb-6" >
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Inicio da jornada
        </h2>
        <p className="text-gray-600">
          Últimas informações para começarmos sua jornada!
        </p>
      </div>

      {/* Como conheceu */}
      < div >
        <Label className="text-base font-medium">
          Qual é a sua igreja? *
        </Label>
        <div className="mb-2" />
        <Select value={selected} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua igreja" />
          </SelectTrigger>
          <SelectContent>
            {churches.map(opt => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selected === "Outra" && (
          <Input
            id="customHowFoundUs"
            value={formData.customHowFoundUs}
            onChange={(e) =>
              updateFormData({ customHowFoundUs: e.target.value })
            }
            placeholder="Especifique *"
            className="mt-2 h-8"
          />
        )}
      </div >

      {/* Consentimento */}
      < div className="space-y-4 pt-4 border-t border-gray-200" >
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
      </div >

      {/* Mensagem final */}
      < div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200" >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🎉 Quase lá!
          </h3>
          <p className="text-gray-700">
            Você está prestes a começar uma jornada incrível de descobertas e
            crescimento. Estamos ansiosos para acompanhar seu desenvolvimento!
          </p>
        </div>
      </div >
    </div >
  );
}