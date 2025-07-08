import PrivacyPolicy from "./PrivacyPolicy";

export const metadata = {
    title: "Política de Privacidade",
    description: "Leia nossa política de privacidade para entender como protegemos seus dados.",
    keywords: ["Gubi", "Política de Privacidade", "LGPD", "Dados Pessoais"],
    creator: "Gubi Tecnologia Educacional Ltda.",
};

export default function Page() {
    return <PrivacyPolicy />;
}