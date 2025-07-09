"use client";


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Step1Email from "./Step1Email";
import Step2Verify from "./Step2Verify";
import Step3NewPassword from "./Step3NewPassword";
import Step4Success from "./Step4Success";
import { sendRecoveryCode, verifyRecoveryCode, resetPassword } from "@/services/auth";
import { toast } from "sonner";

type Step = "email" | "verify" | "newPassword" | "success";

export default function ForgotPassword() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (currentStep === "verify") {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [currentStep]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await sendRecoveryCode(email);
            setCurrentStep("verify");
            setTimeLeft(300);
            setCanResend(false);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Erro ao enviar o código. Tente novamente.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length !== 6) return;
        setIsLoading(true);
        try {
            await verifyRecoveryCode(email, code);
            setCurrentStep("newPassword");
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Código inválido ou expirado. Tente novamente.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        setIsLoading(true);
        try {
            await resetPassword(email, code, password);
            setCurrentStep("success");
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Erro ao redefinir senha. Tente novamente.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setCanResend(false);
        setTimeLeft(300);
        try {
            await sendRecoveryCode(email);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBack = () => {
        if (currentStep === "verify") {
            setCurrentStep("email");
            setCode("");
        }
        else if (currentStep === "newPassword") {
            setCurrentStep("email");
            setCode("");
            setPassword("");
            setConfirmPassword("");
        }
        else router.push("/");
    };

    const renderStep = () => {
        switch (currentStep) {
            case "email":
                return (
                    <Step1Email
                        email={email}
                        setEmail={setEmail}
                        onSubmit={handleEmailSubmit}
                        isLoading={isLoading}
                    />
                );
            case "verify":
                return (
                    <Step2Verify
                        email={email}
                        code={code}
                        setCode={setCode}
                        onSubmit={handleCodeSubmit}
                        onResend={handleResend}
                        isLoading={isLoading}
                        timeLeft={timeLeft}
                        canResend={canResend}
                    />
                );
            case "newPassword":
                return (
                    <Step3NewPassword
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        onSubmit={handlePasswordSubmit}
                        isLoading={isLoading}
                    />
                );
            case "success":
                return <Step4Success onFinish={handleStartJourney} />;
            default:
                return null;
        }
    };

    const handleStartJourney = () => {
        window.location.href = "https://discovery.gubi.com.br";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-6">
                        {(currentStep !== "success" && currentStep !== "email") && (
                            <Button variant="ghost" onClick={handleBack} className="mb-4 p-0">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Button>
                        )}
                        {renderStep()}
                        {/* {currentStep === "email" && (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Lembrou da senha?{' '}
                                    <Button variant="link" onClick={() => router.push('/login')} className="p-0 h-auto font-medium text-primary">
                                        Fazer login
                                    </Button>
                                </p>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}