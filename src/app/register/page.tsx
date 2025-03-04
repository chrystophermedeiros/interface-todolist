"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useRedirectIfAuthenticated from "@/hooks/RedirectIfAuthenticated";
import apiTodolist from "@/services/api";
import { CreateUser } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  name: yup
    .string()
    .min(5, "O nome deve ter no mínimo 5 caracteres")
    .required("Nome obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha obrigatório"),
  usernameGitHub: yup
    .string()
    .min(4, "O usernamegithub deve ter no mínimo 4 caracteres")
    .required("usernamegithub obrigatório"),
});

export default function Register() {
  useRedirectIfAuthenticated();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientDataUser: CreateUser) => {
    try {
      const response = await apiTodolist.post(
        "users",
        {
          name: clientDataUser.name.toLowerCase(),
          email: clientDataUser.email.toLowerCase(),
          password: clientDataUser.password,
          usernameGitHub: clientDataUser.usernameGitHub.toLowerCase(),
        },
        {
          validateStatus: () => true,
        },
      );

      const { status, data } = response;

      if (status === 201 || status === 200) {
        toast.success("Cadastro realizado com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else if (status === 409) {
        if (data.field === "email") {
          toast.error("E-mail já cadastrado! Faça login para continuar.");
        } else if (data.field === "usernameGitHub") {
          toast.error(
            "Username do GitHub já cadastrado! Faça login para continuar.",
          );
        } else {
          toast.error(
            "E-mail ou GitHub já cadastrado! Faça login para continuar.",
          );
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Falha no sistema! Tente novamente!");
    }
  };

  return (
    <main className="flex flex-col h-screen w-full pt-5 items-center p-2 bg-background-primary">
      <div className="flex flex-col rounded-xl shadow-md bg-background-white gap-6 p-4 max-w-md w-full">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-2xl font-bold">Registro</h1>
          <Link
            title="Clique para ir ao login"
            className="hover:underline"
            href="/login"
          >
            Login
          </Link>
        </div>

        <p>Registre-se para acessar a plataforma </p>
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
          id="form-register-user"
        >
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="email-register-form"
                  idhtmlFor="email-register-form"
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  {...field}
                  nameLabel="E-mail *"
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
                  id="password-register-form"
                  idhtmlFor="password-register-form"
                  {...field}
                  nameLabel="Senha *"
                  inputType="password"
                  placeholder="Digite sua senha"
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

          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="name-register-form"
                  autoComplete="name"
                  idhtmlFor="name-register-form"
                  placeholder="Digite seu nome"
                  {...field}
                  nameLabel="Nome *"
                  inputType="text"
                  classNameInput="w-full"
                  className={
                    errors.name
                      ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                      : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                  }
                />
              )}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.name?.message}</span>
            )}
          </div>

          <div>
            <Controller
              name="usernameGitHub"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="usernamegithub-register-form"
                  idhtmlFor="usernamegithub-register-form"
                  placeholder="Digite seu username do GitHub"
                  {...field}
                  nameLabel="UsernameGitHub"
                  inputType="text"
                  classNameInput="w-full"
                  className={
                    errors.usernameGitHub
                      ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                      : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                  }
                />
              )}
            />
            {errors.password && (
              <span style={{ color: "red" }}>
                {errors.usernameGitHub?.message}
              </span>
            )}
          </div>

          <Button text="Cadastrar" id="login-button" nameType={"submit"} />
        </form>
      </div>
    </main>
  );
}
