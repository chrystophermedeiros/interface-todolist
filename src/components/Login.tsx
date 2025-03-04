import { useUser } from "@/hooks/UserContext";
import apiTodolist from "@/services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Button } from "./Button";
import { Input } from "./Input";

const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha obrigatória"),
});

export const LoginComponent: React.FC = () => {
  const router = useRouter();
  const { putUserData } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      toast.error("Você precisa aceitar os cookies para continuar.");
      return;
    }

    try {
      const { data: responseData } = await toast.promise(
        apiTodolist.post("/auth/login", {
          email: data.email.toLowerCase(),
          password: data.password,
        }),
        {
          pending: "Verificando seus dados...",
          success: "Seja bem-vindo 👌",
          error: "Verifique seu e-mail e senha 🤯",
        },
      );

      putUserData(responseData);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.done;
    }
  };

  return (
    <div className="flex flex-col rounded-xl shadow-md bg-background-white gap-6 p-4 max-w-md w-full">
      <div className="flex justify-between flex-wrap">
        <h1 className="text-2xl font-bold">Login</h1>
        <Link
          title="Clique para se cadastrar"
          className="hover:underline"
          href="/register"
        >
          Cadastrar-se
        </Link>
      </div>

      <p>Acesse sua conta</p>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
        id="form-login"
      >
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="email-login-form"
                idhtmlFor="email-login-form"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                {...field}
                nameLabel="E-mail"
                inputType="email"
                classNameInput="w-full"
                className={
                  errors.email
                    ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                    : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                }
              />
            )}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="password-login-form"
                idhtmlFor="password-login-form"
                placeholder="Digite sua senha"
                {...field}
                nameLabel="Senha"
                inputType="password"
                classNameInput="w-full"
                className={
                  errors.password
                    ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                    : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                }
              />
            )}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>

        <Button text="Entrar" id="login-button" nameType="submit" />
        <p>
          Esqueceu a senha entre em contato com o{" "}
          <Link
            href="mailto:suporte@seudominio.com"
            className="text-color-green-forest tex hover:underline"
          >
            Suporte
          </Link>
        </p>
      </form>
    </div>
  );
};
