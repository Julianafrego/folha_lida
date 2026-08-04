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
  const [ConfirmPassword, setConfirmPassword] = useState("");
  
  const [formError, setFormError] = useState("");

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    setFormError("");
    if (name === "" || email === "" || password === "" || ConfirmPassword === "") {
      setFormError("Preencha todos os campos corretamente.");
      return;
    } else if (validarEmail(email).valido === false) {
      return;
    } else if (criteriosDeSenha(password).valido === false) {
      return;
    } else if (validarMesmaSenha(ConfirmPassword, password).valido === false) {
      return;
    } 
    try {
      register({ name, email, password });
      router.push("/login");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erro ao cadastrar."
      );
    }
  };

  function criteriosDeSenha(senha: string) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regex.test(senha) || senha === "")  return { valido: true, texto: "" };
    else
      return {
        valido: false,
        texto:
          "A senha deve ter pelo menos 8 caracteres, incluindo letras e números.",
      };
  }

  function validarMesmaSenha(confsenha: string, senha: string) {
    console.log("Valores: " + senha + " " + confsenha);
    if (senha === confsenha) return { valido: true, texto: "" };
    else return { valido: false, texto: "Senha não confere!" };
  }

  function validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) || email === "") return { valido: true, texto: "" };
    else return { valido: false, texto: "Email inválido!" };
  }
  

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

      {validarEmail(email).valido === false ? (
        <p className="text-sm text-red-600">{validarEmail(email).texto}</p>
      ) : null
      }

      <FormField
        id="password"
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}

        onBlur={(event) => {
          setPassword(event.target.value);
          console.log("Mandou: " + event.target.value);
          criteriosDeSenha(event.target.value);
        }}
      />

      {criteriosDeSenha(password).valido === false ? (
        <p className="text-sm text-red-600">{criteriosDeSenha(password).texto}</p>
      ) : null
      }

      <FormField
        id="confirmPassword"
        label="Confirmar Senha"
        type="password"
        placeholder="Digite sua senha novamente"
        value={ConfirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}

        onBlur={(event) => {
          setConfirmPassword(event.target.value);
          console.log("Mandou: " + [password, event.target.value]);
          validarMesmaSenha(event.target.value, password);
        }}
      />

      {validarMesmaSenha(ConfirmPassword, password).valido === false ? (
        <p className="text-sm text-red-600">
          {validarMesmaSenha(ConfirmPassword, password).texto}
        </p>
      ) : null
      }

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