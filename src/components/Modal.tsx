type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  buttonType?: "submit" | "button";
  title: string;
  idForm?: string;
  labelButtonconfirm?: string;
  labelButtonCancel?: string;
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  buttonType,
  title,
  children,
  idForm,
  labelButtonCancel,
  labelButtonconfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center  bg-black bg-opacity-80">
      <div className=" bg-background-white rounded-lg m-4 p-4 w-full md:w-[90%] lg:w-[70%] xl:w-[50%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="bg-color-orange-fire rounded-full text-color-white h-8 w-8 hover:text-color-black"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mb-5 ">
          {children}
        </div>
        <div className="flex flex-row  justify-center gap-8">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            {labelButtonCancel ? labelButtonCancel : "Cancelar"}
          </button>
          <button
            onClick={onConfirm}
            form={idForm}
            type={buttonType}
            className="bg-color-green-forest text-color-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {labelButtonconfirm ? labelButtonconfirm : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};
