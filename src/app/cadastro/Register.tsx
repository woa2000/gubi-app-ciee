'use client'

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner"
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image'

import { RegisterForm } from "@/types/user";

import { registerUser } from "@/services/user";

import Step1PersonalData from "./Step1PersonalData";
import Step2Interests from "./Step2Interests";
import Step3Education from "./Step3Education";
import Step4Employment from "./Step4Employment";
import Step5Skills from "./Step5Skills";
import Step6Challenges from "./Step6Challenges";
import Step7Socioeconomic from "./Step7Socioeconomic";
import Step8Completion from "./Step8Completion";
import SuccessScreen from "./SuccessScreen";

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState<RegisterForm>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
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

    const totalSteps = 8;
    const progress = (currentStep / (totalSteps + 1)) * 100;
    const stepTitles = [
        "Quem é você no seu jogo?",
        "Quais são seus interesses profissionais?",
        "Seu futuro no game",
        "Missões e experiências na vida real",
        "Suas forças e desafios no jogo",
        "Seu mundo digital e desafios",
        "Seu time e suporte na jornada",
        "Inicio da jornada"
    ];

    const updateFormData = (updates: Partial<RegisterForm>) => setFormData(prev => ({ ...prev, ...updates }));

    const shouldShowSchoolField = [
        "o6_ano",
        "o7_ano",
        "o8_ano",
        "o9_ano",
        "o1-ano_medio",
        "o2-ano_medio",
        "o3-ano_medio"
    ].includes(formData.grade);

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(formData.fullName && formData.email && formData.password &&
                    formData.confirmPassword && formData.birthDate &&
                    formData.gender && formData.location);
            case 2:
                return !!(formData.userInterests.length > 0 && formData.workPreference &&
                    formData.workEnvironment && formData.companyType && formData.userSkills.length > 0);
            case 3:
                return !!(formData.grade && (!shouldShowSchoolField || formData.currentInstitution) && formData.wantsFaculty &&
                    formData.studyFormat && formData.needsFinancialSupport && formData.wantsFinancialInfo);
            case 4:
                return !!(formData.twoYearGoals.length > 0 && formData.workWhileStudying &&
                    formData.hasInternshipExperience);
            case 5:
                return !!(formData.softSkills.length > 0 && formData.skillsToImprove.length > 0 &&
                    formData.learningPreference && formData.studyFrequency);
            case 6:
                return !!(formData.thoughtAboutQuitting && formData.internetAccess &&
                    formData.availableDevices.length > 0);
            case 7:
                return !!(
                    formData.householdSize &&
                    formData.peopleWithIncome &&
                    (
                        formData.participatesInSocialProgram !== "sim" ||
                        (formData.participatesInSocialProgram === "sim" && formData.socialProgram)
                    )
                );
            case 8:
                return !!(
                    formData.howFoundUs && formData.acceptsTerms &&
                    formData.acceptsDataUsage &&
                    (
                        formData.howFoundUs !== "outro" ||
                        (formData.howFoundUs === "outro" && formData.customHowFoundUs)
                    ));
            default:
                return true;
        }
    };

    const isValidPhone = (phone: string): boolean => {
        if (phone.trim() === "") return true;
        return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
    };

    const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.toLowerCase())

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
                toast.error("Campos obrigatórios", { description: "Preencha tudo antes de continuar." });
                return;
            }
            if (!isValidEmail(formData.email)) {
                toast.error("E-mail inválido", { description: "Por favor, insira um e-mail válido." });
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error("Senhas não coincidem", { description: "Por favor, verifique suas senhas." });
                return;
            }
            if (!isValidPhone(formData.phone)) {
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
        } else handleSubmit();
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        try {
            await registerUser(formData);
            toast.success("Cadastro realizado com sucesso!", {
                description: "Você está pronto para começar sua jornada!",
            });
            setIsRegistered(true);
        } catch (error: unknown) {
            console.error("Erro ao registrar usuário:", error);

            let errorMessage = "Ocorreu um erro ao tentar registrar seu cadastro. Por favor, tente novamente mais tarde.";

            if (error instanceof Error) errorMessage = error.message;
            else if (typeof error === "string") errorMessage = error;

            toast.error("Erro ao registrar usuário", {
                description: errorMessage,
            });
        }
    };

    const renderStep = () => {
        const props = { formData, updateFormData };
        switch (currentStep) {
            case 1: return <Step1PersonalData {...props} />;
            case 2: return <Step2Interests {...props} />;
            case 3: return <Step3Education {...props} />;
            case 4: return <Step4Employment {...props} />;
            case 5: return <Step5Skills {...props} />;
            case 6: return <Step6Challenges {...props} />;
            case 7: return <Step7Socioeconomic {...props} />;
            case 8: return <Step8Completion {...props} />;
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

                        <Button onClick={handleNext} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                            {currentStep === totalSteps ? "🎮 Começar a Jornada" : "Próximo"}
                            {currentStep !== totalSteps && <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
