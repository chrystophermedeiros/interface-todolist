import { TaskStatusEnum } from "@/enums/taskStatus";
import { useTasks } from "@/hooks/TaskContext";
import apiTodolist from "@/services/api";
import { Task } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Input } from "./Input";
import { Modal } from "./Modal";

interface ModalUpdateTaskProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres")
    .required("O título é obrigatório"),
  description: yup.string().min(5, "O título deve ter no mínimo 3 caracteres"),
  expirationDate: yup.string(),
  status: yup.string(),
});

interface FormData {
  title: string;
  description?: string;
  expirationDate?: string;
  status?: string;
}

export const ModalUpdateTask = ({
  taskId,
  isOpen,
  onClose,
}: ModalUpdateTaskProps) => {
  const { putTask } = useTasks();
  const [taskData, setTaskData] = useState<Task | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      try {
        const response = await apiTodolist.get(`/task/${taskId}`);
        if (response.status === 200) {
          setTaskData(response.data);
          setValue("title", response.data.title);
          setValue("description", response.data.description);
          setValue("status", response.data.status);
        }
      } catch (error) {
        toast.error("Erro ao buscar a tarefa.");
      }
    };

    if (taskId && isOpen) {
      fetchTask();
    }
  }, [taskId, isOpen, setValue]);

  const handleConfirmUpdate = async (data: FormData) => {
    if (!taskData) return;

    const formattedData = {
      title: data.title.toUpperCase(),
      description: data.description?.toUpperCase() || "",
      status: data.status,
    };

    try {
      const response = await apiTodolist.patch(
        `/task/${taskId}`,
        formattedData,
      );
      if (response.status === 200) {
        toast.success("Tarefa atualizada com sucesso!");
        putTask(response.data.task);
      } else {
        toast.error("Erro ao atualizar a tarefa.");
      }
    } catch (error) {
      toast.error("Erro ao atualizar a tarefa.");
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit(handleConfirmUpdate)}
      title="Editar Tarefa"
      labelButtonCancel="Cancelar"
      labelButtonconfirm="Atualizar"
      buttonType="button"
    >
      <div className="flex flex-col rounded-xl shadow-md bg-background-white gap-6 p-4 max-w-md w-full">
        <form id="taskupdate-form" className="flex flex-col gap-4">
          <div>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="titulo-taskedit-form"
                  idhtmlFor="titulo-taskedit-form"
                  placeholder="Digite um título"
                  {...field}
                  nameLabel="Título"
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
            <label>
              Descrição:
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    name="description"
                    placeholder="Descrição da tarefa"
                    className="w-full border-2 p-2 bg-background-white rounded-xl focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none"
                  />
                )}
              />
            </label>
          </div>
          <div>
            <Controller
              name="status"
              control={control}
              defaultValue={TaskStatusEnum.PENDING}
              render={({ field }) => (
                <label>
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value === TaskStatusEnum.DONE}
                    onChange={(e) => {
                      const newStatus = e.target.checked
                        ? TaskStatusEnum.DONE
                        : TaskStatusEnum.PENDING;
                      setTaskData((prev) =>
                        prev ? { ...prev, status: newStatus } : null,
                      );
                      field.onChange(newStatus);
                    }}
                  />
                  {field.value === TaskStatusEnum.DONE
                    ? "Tarefa Concluída"
                    : "Tarefa Pendente"}
                </label>
              )}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
