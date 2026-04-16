import { RegisterForm } from "@/components/organisms/RegisterForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <AuthTemplate title="Cadastro">
        <RegisterForm />
      </AuthTemplate>
    </main>
  );
}