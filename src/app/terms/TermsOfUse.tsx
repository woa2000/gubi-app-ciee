"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TermsOfUse() {
    const router = useRouter();
    const [hasReferrer, setHasReferrer] = useState(false);

    useEffect(() => {
        if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
            setHasReferrer(true);
        }
    }, []);

    const handleBack = () => {
        if (hasReferrer) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-6 flex flex-col items-center justify-start">
                    <Image
                        src="/gubi-logo.png"
                        alt="Logo"
                        width={150}
                        height={150}
                    />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceitação</h2>
                        <p className="text-gray-700">
                            Ao acessar nossos serviços, você aceita integralmente estes termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Uso Permitido</h2>
                        <p className="text-gray-700">
                            Você deve utilizar a plataforma de forma ética e legal. É proibido realizar engenharia reversa, acessar áreas restritas sem autorização ou usar nossos serviços para fins ilícitos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Propriedade Intelectual</h2>
                        <p className="text-gray-700">
                            Todo o conteúdo pertence à Gubi e é protegido por direitos autorais.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Limitação de Responsabilidade</h2>
                        <p className="text-gray-700">
                            A Gubi não se responsabiliza por danos decorrentes do uso inadequado da plataforma ou falhas técnicas externas.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Modificações nos Serviços</h2>
                        <p className="text-gray-700">
                            Podemos alterar ou suspender funcionalidades da plataforma a qualquer momento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Foro</h2>
                        <p className="text-gray-700">
                            Fica eleito o foro da Comarca de Santo André/SP para dirimir eventuais controvérsias.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};