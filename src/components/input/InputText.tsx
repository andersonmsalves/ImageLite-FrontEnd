import React from "react";

interface InputTextProps {
  name?: string;
  style?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  value?: string;
  type?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  id,
  name,
  style,
  placeholder,
  value,
  type = "text",
  onChange,
}: InputTextProps) => {
  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      className="border px-3 py-2 rounded-lg text-gray-900"
    />
  );
};
