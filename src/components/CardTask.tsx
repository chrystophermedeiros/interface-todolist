import { TaskStatusEnum } from "@/enums/taskStatus";
import { useTasks } from "@/hooks/TaskContext";
import { IcBaselineDelete } from "@/icons/baseline-delete";
import { IcBaselineEdit } from "@/icons/baseline-edit";
import apiTodolist from "@/services/api";
import { Task } from "@/types";
import { formatDate } from "@/util/formatDate";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "./Button";
import { InfoItem } from "./InfoItem";
import { Input } from "./Input";
import { Loading } from "./Loading";
import { ModalDeleteTask } from "./ModalDeleteTask";
import { ModalUpdateTask } from "./MoldalEditTask";

export const CardTask = () => {
  const { tasks, setTasks, putTaskStatus } = useTasks();
  const [loading, setLoading] = useState(true);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState<string | null>(null);

  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await apiTodolist.get("/task");

        if (response.status === 200 && response.data.length > 0) {
          setTasks(response.data);
          Cookies.set("tasksData", JSON.stringify(response.data));
        } else {
          setTasks([]);
          Cookies.remove("tasksData");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response?.status === 404) {
          setTasks([]);
          Cookies.remove("tasksData");
        } else {
          toast.error("Erro ao carregar as tarefas.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [setTasks]);

  useEffect(() => {
    let filtered = tasks;

    if (searchName) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchName.toLowerCase()) ||
          task.description.toLowerCase().includes(searchName.toLowerCase()),
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [searchName, statusFilter, tasks]);

  const handleUpdateStatus = async (id: string, status: TaskStatusEnum) => {
    try {
      const response = await apiTodolist.patch(`/task/${id}`, { status });
      if (response.status === 200) {
        toast.success("Tarefa editada com sucesso!");
        putTaskStatus(id);
      } else {
        toast.error("Erro ao editar a tarefa.");
      }
    } catch (error) {
      toast.error("Erro ao editar a tarefa.");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex gap-4 mb-4">
        <Input
          id="testemudar"
          type="text"
          placeholder="Título/descrição."
          value={searchName}
          actionOnchage={handleSearchChange}
          classNameInput="w-8/12"
          nameLabel=""
        />
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="p-2 bg-background-white shadow-sm h-14 border-2 rounded-lg text-color-balck w-6/12"
        >
          <option value="">Todos Status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>

      {filteredTasks && filteredTasks.length > 0 ? (
        filteredTasks.map((task: Task) => (
          <aside
            key={task.id}
            title={task.status}
            className="flex w-full justify-between items-center p-4 border-2 rounded-lg"
          >
            <article className="flex w-full flex-col gap-2 relative">
              <div className="flex justify-between">
                <InfoItem label="Título" value={task.title} />
                <span
                  className={`${
                    task.status === "PENDENTE"
                      ? "bg-color-orange-fire"
                      : "bg-color-green-forest"
                  } w-4 h-4 rounded-full absolute -top-2 -right-2`}
                ></span>
              </div>
              <div className="flex justify-between">
                <details
                  title="Clique para ver mais informações"
                  className="flex flex-col gap-2"
                >
                  <summary>Veja mais</summary>
                  <InfoItem label="Descrição" value={task.description} />
                  <InfoItem
                    valueClass={`${
                      task.status === "PENDENTE"
                        ? "text-color-orange-fire"
                        : "text-color-green-forest"
                    }`}
                    label="Status"
                    value={task.status}
                  />
                  <InfoItem
                    label="Expiração"
                    value={
                      task.expirationDate
                        ? formatDate(task.expirationDate)
                        : "Sem data"
                    }
                  />
                </details>
                <div className="flex items-start">
                  <div className="flex items-center gap-3">
                    <Button
                      action={() => {
                        setTaskIdToEdit(task.id as string);
                        setIsModalEditOpen(true);
                      }}
                      icon={
                        <IcBaselineEdit className="text-color-black size-5" />
                      }
                      nameTitle="Editar tarefa"
                      nameType="button"
                      id={`edit-${task.id}`}
                      cleanStyle={true}
                    />

                    <Button
                      action={() => {
                        setTaskToDelete(task.id as string);
                        setIsModalOpen(true);
                      }}
                      icon={
                        <IcBaselineDelete className="text-color-black size-5" />
                      }
                      nameTitle="Excluir tarefa"
                      nameType="button"
                      id={`delete-${task.id}`}
                      cleanStyle={true}
                    />
                    <input
                      type="checkbox"
                      name="checktask"
                      className="size-4"
                      title={`${task.status === "PENDENTE" ? "Tarefa pendente" : "Tarefa concluída"}`}
                      id={`checktask-${task.id}`}
                      checked={task.status === "CONCLUIDA"}
                      onChange={() =>
                        handleUpdateStatus(
                          task.id as string,
                          task.status === TaskStatusEnum.PENDING
                            ? TaskStatusEnum.DONE
                            : TaskStatusEnum.PENDING,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </article>
          </aside>
        ))
      ) : (
        <article className="flex flex-col gap-2">
          <p className="text-center">Nenhuma tarefa encontrada.</p>
        </article>
      )}

      <ModalDeleteTask
        taskId={taskToDelete}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToDelete(null);
        }}
      />

      <ModalUpdateTask
        taskId={taskIdToEdit}
        isOpen={isModalEditOpen}
        onClose={() => {
          setIsModalEditOpen(false);
          setTaskIdToEdit(null);
        }}
      />
    </main>
  );
};
