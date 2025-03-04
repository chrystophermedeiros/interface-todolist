"use client";

import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const sizeClasses = {
  small: "w-6 h-6 border-2",
  medium: "w-12 h-12 border-4",
  large: "w-16 h-16 border-4",
};

export const Loading: React.FC<LoadingProps> = ({
  size = "medium",
  color = "border-color-green-forest",
}) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className={`${sizeClasses[size]} ${color} border-t-transparent border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
};
