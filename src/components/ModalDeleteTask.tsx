import { useTasks } from "@/hooks/TaskContext";
import apiTodolist from "@/services/api";
import { toast } from "react-toastify";

import { Modal } from "./Modal";

interface ModalDeleteTaskProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDeleteTask = ({
  taskId,
  isOpen,
  onClose,
}: ModalDeleteTaskProps) => {
  const { deleteTask } = useTasks();

  const handleConfirmDelete = async () => {
    if (!taskId) return;

    try {
      const response = await apiTodolist.delete(`/task/${taskId}`);
      if (response.status === 200) {
        toast.success("Tarefa deletada com sucesso!");
        deleteTask(taskId);
      } else {
        toast.error("Erro ao deletar a tarefa.");
      }
    } catch (error) {
      toast.error("Erro ao deletar a tarefa.");
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmDelete}
      title="Confirmar Exclusão"
      labelButtonCancel="Cancelar"
      labelButtonconfirm="Excluir"
      buttonType="button"
    >
      <div>
        <p>Você tem certeza que deseja excluir esta tarefa?</p>
      </div>
    </Modal>
  );
};
