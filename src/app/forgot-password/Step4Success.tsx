"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

interface Props {
    onFinish?: () => void;
}

export default function Step4Success({ onFinish }: Props) {
    const handleClick = () => {
        if (onFinish) onFinish();
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div className="flex justify-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                    <Sparkles className="w-6 h-6 text-green-500 animate-pulse delay-150" />
                    <Sparkles className="w-5 h-5 text-green-400 animate-pulse delay-300" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Senha Resetada com Sucesso!
                </h2>
                <p className="text-gray-600 mb-8">
                    Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-700 text-sm">
                        ✅ Sua conta está segura e pronta para uso
                    </p>
                </div>

                <Button onClick={handleClick} className="w-full bg-green-600 hover:bg-green-700">
                    Fazer Login
                </Button>
            </div>
        </div>
    );
}