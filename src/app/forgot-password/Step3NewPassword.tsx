"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

interface Props {
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export default function Step3NewPassword({
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onSubmit,
    isLoading,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordValidation = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    const passwordsMatch = password === confirmPassword && password.length > 0;
    const hasPasswordContent = password.length > 0;

    const requirementsMap: Record<string, string> = {
        minLength: "Pelo menos 8 caracteres",
        hasUpperCase: "Pelo menos 1 letra maiúscula",
        hasLowerCase: "Pelo menos 1 letra minúscula",
        hasNumber: "Pelo menos 1 número",
        hasSpecialChar: "Pelo menos 1 caractere especial",
    };

    const incompleteRequirements = (Object.keys(passwordValidation) as Array<keyof typeof passwordValidation>)
        .filter((key) => !passwordValidation[key])
        .map((key) => requirementsMap[key]);

    const shouldShowRequirements = hasPasswordContent && !isPasswordValid;

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Nova Senha
                </h2>
                <p className="text-gray-600">
                    Crie uma senha segura para sua conta
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Nova Senha</Label>

                    {shouldShowRequirements && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-md border">
                            <p className="text-sm font-medium text-gray-700 mb-2">Requisitos da senha:</p>
                            <div className="space-y-1">
                                {incompleteRequirements.map((label) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-gray-300" />
                                        <span className="text-sm text-gray-500">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua nova senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua nova senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isLoading || !isPasswordValid || !passwordsMatch}
                >
                    {isLoading ? "Salvando..." : "Salvar nova senha"}
                </Button>
            </form>
        </div>
    );
}