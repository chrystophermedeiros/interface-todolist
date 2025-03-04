"use client";

import { Button } from "@/components/Button";
import { CardTask } from "@/components/CardTask";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { CreateUser } from "@/components/ModalCreateTask";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <main className=" h-screen flex flex-col justify-between">
      <Header />
      <aside className="py-20">
        <article className="flex items-center justify-between p-4 flex-wrap">
          <h1>Minhas tarefas</h1>
          <Button
            nameType="button"
            action={handleClick}
            className="bg-color-green-forest text-color-white rounded-lg p-1"
            id="button-create-task"
            nameTitle="Criar tarefa"
            text="Criar tarefa"
          />
        </article>

        <article>
          <CardTask />
        </article>

        <Modal
          children={<CreateUser />}
          title="Criar tarefa"
          isOpen={isOpen}
          buttonType="submit"
          labelButtonconfirm="Cadastrar"
          idForm="form-create-task"
          onClose={handleCloseModal}
        />
      </aside>
      <Footer />
    </main>
  );
}