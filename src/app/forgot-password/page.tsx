import ForgotPassword from "./ForgotPassword";

export const metadata = {
    title: "Esqueci minha senha",
    description: "Recupere o acesso à sua conta com facilidade.",
    keywords: ["Gubi", "Esqueci minha senha", "Recuperação de conta", "Acesso à conta"],
    creator: "Gubi Tecnologia Educacional Ltda.",
};

export default function Page() {
    return <ForgotPassword />;
}