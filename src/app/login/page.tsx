"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { Input, PasswordInput } from "@/src/components";
import { AuthContext } from "@/src/contexts/auth";
import { handleApiErrors } from "@/src/handlers/handle-api-erros";
import { api } from "@/src/http/api";
import { notifySuccessPopUp } from "@/src/utils/notify-popups";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const submitData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const { data } = await api.post("/auth/login", submitData);
      login(data.access_token);
      router.push('/list-users');
      notifySuccessPopUp("Login realizado com sucesso!");
    } catch (error) {
      handleApiErrors(error);
    }
  }

  function tooglePasswordVisibility() {
    setIsPasswordVisible(value => !value);
  }

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-2xl">Olá,</h1>
        <h2>Acesse sua conta.</h2>
      </div>

      <form
        className="flex flex-col gap-4 max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <Input id="email" name="email" label="Email" />

        <PasswordInput
          id="password"
          name="password"
          label="Senha"
          isVisible={isPasswordVisible}
          onClick={tooglePasswordVisibility}
        />

        <button
          type="submit"
          className="mt-4 text-white p-2 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-500 transition-all"
        >
          Login
        </button>
      </form>

      <div className="mt-2">
        <span className="font-light">
          Não possui uma conta?{" "}
          <Link
            href="/register"
            className="font-bold text-emerald-600 hover:text-emerald-700"
          >
            Cadastre-se
          </Link>
        </span>
      </div>
    </div>
  );
}
