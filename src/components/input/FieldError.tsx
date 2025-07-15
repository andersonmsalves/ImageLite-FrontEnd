import React from "react";

interface FieldErrorProps {
  message?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({
  message,
}: FieldErrorProps) => {
  return <span className="text-red-500 text-sm">{message}</span>;
};
