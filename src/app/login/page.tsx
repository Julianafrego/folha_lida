import { LoginForm } from "@/components/organisms/LoginForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <AuthTemplate title="Login">
        <LoginForm />
      </AuthTemplate>
    </main>
  );
}