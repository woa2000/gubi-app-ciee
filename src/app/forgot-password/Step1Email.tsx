"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface Props {
    email: string;
    setEmail: (email: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export default function Step1Email({ email, setEmail, onSubmit, isLoading }: Props) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Recuperar Senha
                </h2>
                <p className="text-gray-600">
                    Digite seu email para receber o código de verificação
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                        required
                        className="w-full"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !email}
                >
                    {isLoading ? "Enviando..." : "Enviar Código"}
                </Button>
            </form>
        </div>
    );
}