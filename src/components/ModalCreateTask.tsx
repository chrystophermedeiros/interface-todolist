"use client";
import { Input } from "@/components/Input";
import { useTasks } from "@/hooks/TaskContext";
import { useUser } from "@/hooks/UserContext";
import apiTodolist from "@/services/api";
import { Task } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres")
    .max(255, "O título deve ter no maximo 255 caracteres")
    .required("Título obrigatório"),
  description: yup
    .string()
    .min(5, "A desencrição deve ter no mínimo 5 caracteres")
    .max(510, "A descrição deve ter no.maximo 510 caracteres")
    .required("Descrição obrigatória"),
  expirationDate: yup.string().required("Data obrigatória"),
  userId: yup.string(),
});
export const CreateUser = () => {
  const { userData } = useUser();
  const { addTask } = useTasks();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientDataTask: Task) => {
    try {
      const { data, status } = await apiTodolist.post("/task", {
        title: clientDataTask.title,
        description: clientDataTask.description,
        userId: userData?.user.id,
        expirationDate: clientDataTask.expirationDate,
      });

      if (status === 201 || status === 200) {
        toast.success("Cadastro realizado com sucesso!");
        addTask(data.task);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        if (response) {
          const { status } = response;
          if (status === 409) {
            toast.error("Tarefa já cadastrada com esse título");
          } else if (status === 400) {
            toast.error("Descrição ou data obrigatoria.");
          } else {
            toast.error(response?.data?.message || "Erro desconhecido.");
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col rounded-xl shadow-md bg-background-white gap-6 p-4 max-w-md w-full">
      <form
        className="flex flex-col gap-4"
        id="form-create-task"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="titulo-task-form"
                idhtmlFor="titulo-task-form"
                placeholder="Digite um título"
                {...field}
                nameLabel="Título *"
                inputType="text"
                classNameInput="w-full"
                className={
                  errors.title
                    ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                    : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                }
              />
            )}
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title?.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="description-task-form"
                idhtmlFor="description-task-form"
                placeholder="Digite uma descrição"
                {...field}
                nameLabel="Descrição *"
                inputType="text"
                classNameInput="w-full"
                className={
                  errors.description
                    ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                    : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                }
              />
            )}
          />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description?.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="expirationDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="expirationdate-task-form"
                idhtmlFor="expirationdate-task-form"
                placeholder="Escolha uma data"
                {...field}
                nameLabel="Data de expiração *"
                inputType="date"
                classNameInput="w-full"
                className={
                  errors.expirationDate
                    ? "border-color-orange-fire focus:border-color-orange-fire focus:ring-1 focus:ring-color-orange-fire outline-none"
                    : "border-color-green-forest focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                }
              />
            )}
          />
          {errors.expirationDate && (
            <span style={{ color: "red" }}>
              {errors.expirationDate?.message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
