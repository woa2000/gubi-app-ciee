"use client";

import React from "react";
import Image from "next/image";

export default function PrivacyPolicy() {

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
                    <p className="text-gray-600">04/07/2025</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <p className="text-gray-700">
                        A Gubi Tecnologia Educacional Ltda. valoriza a privacidade e segurança dos usuários que acessam o site www.gubi.com.br/cadastro, plataforma e aplicativos.
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introdução</h2>
                        <p className="text-gray-700">
                            Esta Política esclarece quais dados são coletados, como são utilizados e protegidos, e os direitos dos usuários, conforme a LGPD (Lei 13.709/2018).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Definições Importantes</h2>
                        <ul className="text-gray-700 space-y-2">
                            <li><strong>Usuário:</strong> pessoa física que utiliza nossos serviços.</li>
                            <li><strong>Dados Pessoais:</strong> informações que identificam uma pessoa.</li>
                            <li><strong>Dados Sensíveis:</strong> informações relacionadas à personalidade e intimidade do usuário.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Quais Dados Coletamos</h2>
                        <div className="text-gray-700 space-y-2">
                            <p><strong>a) Dados fornecidos por você:</strong> nome, e-mail, telefone, empresa, cargo, respostas a formulários.</p>
                            <p><strong>b) Dados coletados automaticamente:</strong> IP, localização, navegador, cookies.</p>
                            <p><strong>c) Histórico de interações:</strong> registros de acessos e downloads.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Finalidades</h2>
                        <p className="text-gray-700">
                            Personalizar a experiência, gerar relatórios, enviar conteúdos, cumprir obrigações legais.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Compartilhamento de Dados</h2>
                        <p className="text-gray-700">
                            Dados podem ser compartilhados com equipe Gubi, parceiros sob confidencialidade e autoridades públicas mediante obrigação legal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
                        <p className="text-gray-700">
                            Utilizamos cookies para análise de navegação. Você pode desativá-los no navegador.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Segurança e Armazenamento</h2>
                        <p className="text-gray-700">
                            Adotamos medidas técnicas e administrativas para proteger os dados. Os dados serão mantidos pelo tempo necessário às finalidades descritas.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Seus Direitos</h2>
                        <p className="text-gray-700">
                            Você pode solicitar acesso, correção ou exclusão de dados, entre outros direitos previstos na LGPD, pelo e-mail{" "}
                            <a href="mailto:privacidade@gubi.com.br" className="text-blue-600 hover:underline">
                                privacidade@gubi.com.br
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Alterações</h2>
                        <p className="text-gray-700">
                            Esta política pode ser alterada sem aviso prévio. Recomendamos consulta periódica.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contato</h2>
                        <p className="text-gray-700">
                            Dúvidas sobre esta política:{" "}
                            <a href="mailto:privacidade@gubi.com.br" className="text-blue-600 hover:underline">
                                privacidade@gubi.com.br
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};