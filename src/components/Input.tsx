"use client";
import { IcBaselineVisibility } from "@/icons/baseline-visibility";
import { IcBaselineVisibilityOff } from "@/icons/baseline-visibility-off";
import React, { FC, useState, ComponentProps } from "react";

interface inputProps extends ComponentProps<"input"> {
  text?: string;
  id: string;
  idhtmlFor?: string;
  className?: string;
  classNameInput?: string;
  nameLabel: string;
  inputType?: "text" | "password" | "email" | "date";
  actionOnchage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<inputProps> = ({
  nameLabel,
  className,
  classNameInput,
  inputType,
  idhtmlFor,
  actionOnchage,
  ...rest
}) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setVisiblePassword((show) => !show);

  return (
    <div className={classNameInput || "w-60"}>
      <label htmlFor={idhtmlFor}>{nameLabel}</label>
      <div className="flex rounded-lg items-center relative shadow-md">
        <input
          className={`${className} w-full pr-8 text-color-black bg-background-white h-14 border-2 rounded-lg p-2 focus:border-color-green-forest focus:ring-1 focus:ring-color-green-forest outline-none`}
          type={
            inputType === "password" && visiblePassword ? "text" : inputType
          }
          onChange={actionOnchage}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          {...rest}
        />
        {inputType === "password" && (
          <button
            type="button"
            className="text-color-black absolute right-2 text-2xl w-6 items-center justify-center"
            onClick={handleClickShowPassword}
          >
            {visiblePassword ? (
              <IcBaselineVisibility />
            ) : (
              <IcBaselineVisibilityOff />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
