'use client'

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner"
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image'

import { RegisterForm } from "@/types/user";

import { registerUser, checkEmailExists } from "@/services/auth";

import Step1PersonalData from "./Step1PersonalData";
import Step2Interests from "./Step2Interests";
// import Step3Education from "./Step3Education";
// import Step4Employment from "./Step4Employment";
// import Step5Skills from "./Step5Skills";
// import Step6Challenges from "./Step6Challenges";
// import Step7Socioeconomic from "./Step7Socioeconomic";
import Step8Completion from "./Step8Completion";
import SuccessScreen from "./SuccessScreen";

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingMessage, setSubmittingMessage] = useState("");
    const [formData, setFormData] = useState<RegisterForm>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        phone: "",
        birthDate: "",
        gender: "",
        customGender: "",
        location: "",
        userInterests: [],
        customInterest: "",
        workPreference: "",
        workEnvironment: "",
        companyType: "",
        userSkills: [],
        customSkill: "",
        grade: "",
        wantsFaculty: "",
        currentInstitution: "",
        institution: "",
        studyFormat: "",
        courseName: "",
        startCourseDate: "",
        endCourseDate: "",
        needsFinancialSupport: "",
        wantsFinancialInfo: "",
        twoYearGoals: [],
        workWhileStudying: "",
        hasInternshipExperience: "",
        softSkills: [],
        skillsToImprove: [],
        hardSkills: [],
        learningPreference: "",
        studyFrequency: "",
        currentDifficulties: [],
        thoughtAboutQuitting: "",
        internetAccess: "",
        availableDevices: [],
        participatesInSocialProgram: "",
        socialProgram: "",
        householdSize: "",
        peopleWithIncome: "",
        howFoundUs: "",
        customHowFoundUs: "",
        acceptsTerms: false,
        acceptsDataUsage: false,
    });

    const totalSteps = 3;
    const progress = (currentStep / (totalSteps + 1)) * 100;
    const stepTitles = [
        "Quem é você no seu jogo?",
        "Quais são seus interesses profissionais?",       
        "Inicio da jornada"
    ];

    const updateFormData = (updates: Partial<RegisterForm>) => setFormData(prev => ({ ...prev, ...updates }));

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(formData.fullName && formData.email && formData.password &&
                    formData.confirmPassword);
            case 2:
                return !!(formData.userInterests.length > 0 && formData.workPreference &&
                    formData.userSkills.length > 0);            
            case 3:
                // Validações adicionais para o step final
                if (!formData.acceptsTerms || !formData.acceptsDataUsage) {
                    return false;
                }
                
                // Verificar se temos dados mínimos necessários
                const hasBasicInfo = !!(
                    formData.fullName?.trim() &&
                    formData.email?.trim() &&
                    formData.password
                );
                
                const hasInterests = formData.userInterests.length > 0;
                const hasSkills = formData.userSkills.length > 0;
                
                if (!hasBasicInfo) {
                    toast.error("Dados básicos incompletos", { 
                        description: "Nome, email e senha são obrigatórios." 
                    });
                    return false;
                }
                
                if (!hasInterests) {
                    toast.error("Interesses obrigatórios", { 
                        description: "Selecione pelo menos um interesse profissional." 
                    });
                    return false;
                }
                
                if (!hasSkills) {
                    toast.error("Habilidades obrigatórias", { 
                        description: "Selecione pelo menos uma habilidade." 
                    });
                    return false;
                }
                
                return true;
            default:
                return true;
        }
    };

    const isValidPhone = (phone: string): boolean => {
        if (phone.trim() === "") return true;
        return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
    };

    const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.toLowerCase())

    const handleNext = async () => {
        setIsSubmitting(true);

        try {
            setSubmittingMessage("");

            if (currentStep === 1) {
                if (!formData.fullName || !formData.email || !formData.password ||
                    !formData.confirmPassword ) {
                    toast.error("Campos obrigatórios", { description: "Preencha tudo antes de continuar." });
                    return;
                }

                const emailExists = await checkEmailExists(formData.email);

                if (!isValidEmail(formData.email) && !emailExists.exists) {
                    toast.error("E-mail inválido", { description: "Por favor, insira um e-mail válido." });
                    return;
                } else if (emailExists.exists) {
                    toast.error("E-mail já cadastrado", { description: "Já existe um usuário com este e-mail." });
                    return;
                }

                const passwordValid = formData.password && formData.password.length >= 8 &&
                    /[A-Z]/.test(formData.password) &&
                    /[a-z]/.test(formData.password) &&
                    /\d/.test(formData.password) &&
                    /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
                const passwordsMatch = formData.password === formData.confirmPassword

                if (!passwordValid) {
                    toast.error("Senha inválida", { description: "A senha não segue os requisitos necessários." });
                    return;
                }
                if (!passwordsMatch) {
                    toast.error("Senhas não coincidem", { description: "Por favor, verifique suas senhas." });
                    return;
                }

                if (formData.country === "BR" && !isValidPhone(formData.phone)) {
                    toast.error("Telefone inválido", { description: "Por favor, insira um telefone válido." });
                    return;
                }
            }

            if (!validateStep(currentStep)) {
                toast.error("Campos obrigatórios", { description: "Preencha tudo antes de continuar." });
                return;
            }

            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            } else await handleSubmit();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        setSubmittingMessage("Registrando usuário...");

        try {
            console.log('[Register] Iniciando registro com dados:', {
                email: formData.email,
                fullName: formData.fullName,
                hasRequiredFields: !!(formData.fullName && formData.email && formData.password),
                dataSize: JSON.stringify(formData).length
            });
            
            await registerUser(formData);
            
            toast.success("Cadastro realizado com sucesso!", {
                description: "Você está pronto para começar sua jornada!",
            });
            setIsRegistered(true);
        } catch (error: unknown) {
            console.error("[Register] Erro detalhado ao registrar usuário:", {
                error,
                errorType: typeof error,
                errorMessage: error instanceof Error ? error.message : String(error),
                formDataKeys: Object.keys(formData),
                timestamp: new Date().toISOString()
            });

            let errorMessage = "Ocorreu um erro no servidor. Tente novamente em alguns instantes.";

            if (error instanceof Error) {
                errorMessage = error.message;
                
                // Mensagens mais amigáveis para erros comuns
                if (error.message.includes('email')) {
                    errorMessage = "Problema com o e-mail informado. Verifique se está correto.";
                } else if (error.message.includes('password')) {
                    errorMessage = "Problema com a senha. Verifique os requisitos de segurança.";
                } else if (error.message.includes('validation')) {
                    errorMessage = "Alguns dados não estão no formato correto. Verifique os campos obrigatórios.";
                } else if (error.message.includes('duplicate') || error.message.includes('exists')) {
                    errorMessage = "Este e-mail já está cadastrado. Tente fazer login ou usar outro e-mail.";
                }
            } else if (typeof error === "string") {
                errorMessage = error;
            }

            toast.error("Erro ao registrar usuário", {
                description: errorMessage,
                duration: 6000
            });
        } finally {
            setSubmittingMessage("");
        }
    };

    const renderStep = () => {
        const props = { formData, updateFormData };
        switch (currentStep) {
            case 1: return <Step1PersonalData {...props} />;
            case 2: return <Step2Interests {...props} />;            
            case 3: return <Step8Completion {...props} />;
            default: return null;
        }
    };

    if (isRegistered) return <SuccessScreen />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="min-h-screen py-8 px-4">
                <div className="max-w-2xl py-4 mx-auto">
                    <div className="text-center mb-8 flex flex-col items-center justify-start">
                        <Image
                            src="/gubi-logo.png"
                            alt="Logo"
                            width={150}
                            height={150}
                        />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Jornada ProFuturo</h1>
                        <p className="text-gray-600">
                            Etapa {currentStep} de {totalSteps}: {stepTitles[currentStep - 1]}
                        </p>
                    </div>

                    <div className="mb-8">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                            <span>Início</span>
                            <span>{Math.round(progress)}% completo</span>
                            <span>Finalização</span>
                        </div>
                    </div>

                    <Card className="p-6 mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        {renderStep()}
                    </Card>

                    <div className="flex justify-between">
                        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Anterior
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            {isSubmitting && submittingMessage
                                ? submittingMessage
                                : currentStep === totalSteps
                                    ? "🎮 Começar a Jornada"
                                    : "Próximo"
                            }
                            {!isSubmitting && currentStep !== totalSteps && (
                                <ArrowRight className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
