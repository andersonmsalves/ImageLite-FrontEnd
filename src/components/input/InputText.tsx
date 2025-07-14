import React from "react";

interface InputTextProps {
  name?: string;
  style?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  name,
  style,
  placeholder,
  onChange,
}: InputTextProps) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type="text"
      className="border px-3 py-2 rounded-lg text-gray-900"
    />
  );
};
