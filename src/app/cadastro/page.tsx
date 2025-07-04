'use client'

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner"
import { ArrowLeft, ArrowRight } from "lucide-react";

import Step1PersonalData from "./Step1PersonalData";
import Step2Interests from "./Step2Interests";
import Step3Education from "./Step3Education";
import Step4Employment from "./Step4Employment";
import Step5Skills from "./Step5Skills";
import Step6Challenges from "./Step6Challenges";
import Step7Socioeconomic from "./Step7Socioeconomic";
import Step8Completion from "./Step8Completion";

export interface FormData {
    // 1
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: string;
    customGender: string;
    city: string;
    state: string;
    school: string;
    grade: string;
    currentStatus: string;

    // 2
    interests: string[];
    customInterest: string;
    workPreference: string;
    workEnvironment: string;
    customEnvironment: string;
    skills: string[];
    customSkill: string;

    // 3
    wantsFaculty: string;
    studyFormat: string;
    institution: string;
    needsFinancialSupport: string;
    wantsFinancialInfo: string;

    // 4
    twoYearGoal: string;
    workWhileStudying: string;
    hasInternshipExperience: string;

    // 5
    softSkills: string[];
    skillsToImprove: string[];
    hardSkills: string[];
    learningPreference: string;
    studyFrequency: string;

    // 6
    currentDifficulties: string[];
    thoughtAboutQuitting: string;
    internetAccess: string;
    availableDevices: string[];

    // 7
    participatesInSocialProgram: string;
    householdSize: string;
    peopleWithIncome: string;

    // 8
    motivation: string;
    howFoundUs: string;
    acceptsTerms: boolean;
    acceptsDataUsage: boolean;
}

export default function Cadastro() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        birthDate: "",
        gender: "",
        customGender: "",
        city: "",
        state: "",
        school: "",
        grade: "",
        currentStatus: "",
        interests: [],
        customInterest: "",
        workPreference: "",
        workEnvironment: "",
        customEnvironment: "",
        skills: [],
        customSkill: "",
        wantsFaculty: "",
        studyFormat: "",
        institution: "",
        needsFinancialSupport: "",
        wantsFinancialInfo: "",
        twoYearGoal: "",
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
        householdSize: "",
        peopleWithIncome: "",
        motivation: "",
        howFoundUs: "",
        acceptsTerms: false,
        acceptsDataUsage: false,
    });

    const totalSteps = 8;
    const progress = (currentStep / totalSteps) * 100;
    const stepTitles = [
        "Dados Pessoais",
        "Interesses e Preferências",
        "Educação Superior",
        "Empregabilidade",
        "Habilidades",
        "Desafios e Acesso Digital",
        "Situação Socioeconômica",
        "Finalização"
    ];

    const updateFormData = (updates: Partial<FormData>) => setFormData(prev => ({ ...prev, ...updates }));

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(formData.fullName && formData.email && formData.birthDate &&
                    formData.gender && formData.city && formData.state &&
                    formData.school && formData.grade && formData.currentStatus);
            case 2:
                return !!(formData.interests.length > 0 && formData.workPreference &&
                    formData.workEnvironment && formData.skills.length > 0);
            case 3:
                return !!(formData.wantsFaculty && formData.studyFormat &&
                    formData.needsFinancialSupport && formData.wantsFinancialInfo);
            case 4:
                return !!(formData.twoYearGoal && formData.workWhileStudying &&
                    formData.hasInternshipExperience);
            case 5:
                return !!(formData.softSkills.length > 0 && formData.skillsToImprove.length > 0 &&
                    formData.learningPreference && formData.studyFrequency);
            case 6:
                return !!(formData.thoughtAboutQuitting && formData.internetAccess &&
                    formData.availableDevices.length > 0);
            case 7:
                return !!(formData.participatesInSocialProgram && formData.householdSize &&
                    formData.peopleWithIncome);
            case 8:
                return !!(formData.motivation && formData.howFoundUs &&
                    formData.acceptsTerms && formData.acceptsDataUsage);
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (!validateStep(currentStep)) {
            toast("Campos obrigatórios", { description: "Preencha tudo antes de continuar." });
            return;
        }

        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
        else handleSubmit();
    };


    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        console.log("Dados do formulário:", formData);
        toast("Formulário enviado com sucesso! 🎉", { description: "Bem-vindo à Jornada ProFuturo!" });
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="min-h-screen py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gubi Jornada ProFuturo</h1>
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
