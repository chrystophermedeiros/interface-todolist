import React, { FC } from "react";

interface ButtonProps {
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  cleanStyle?: boolean; 
  nameTitle?: string;
  action?: () => void;
  nameType?: "button" | "submit";
  id: string;
}

export const Button: FC<ButtonProps> = ({
  text,
  className = "",
  icon,
  cleanStyle = false,
  action,
  nameType = "button",
  nameTitle,
  id,
}) => {
  const baseClass =
    cleanStyle && icon && !text
      ? "p-2"
      : "flex border-2 border-transparent rounded-xl p-2 text-color-white shadow-md items-center justify-center ";

  const conditionalClass =
    text === "Cancelar" ? "bg-color-orange-fire " : "bg-color-green-forest ";

  const finalClass =
    cleanStyle && icon && !text
      ? `${className}`
      : `${baseClass}${conditionalClass}${className}`;

  return (
    <button
      id={id}
      onClick={action}
      type={nameType}
      title={nameTitle}
      className={finalClass.trim()} 
    >
      <div className="flex items-center gap-2">
        {icon}
        {text && <p>{text}</p>}
      </div>
    </button>
  );
};
