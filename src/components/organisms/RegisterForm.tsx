"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { useAuthStore } from "@/store/auth.store";

export function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    setFormError("");

    try {
      register({ name, email, password });
      router.push("/login");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erro ao cadastrar."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="name"
        label="Nome"
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <FormField
        id="password"
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

      <Button type="submit" variant="primary" fullWidth>
        Cadastrar
      </Button>
      <Button type="button" variant="ghost" fullWidth onClick={() => router.push("/login")}>
        Já tem uma conta? Faça login
      </Button>
    </form>
  );
}