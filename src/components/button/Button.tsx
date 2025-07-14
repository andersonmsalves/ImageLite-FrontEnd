import React from "react";

interface ButtonProps {
  color?: string;
  label?: string;
  style?: string;
  onClick?: (event: any) => void;
  type?: "submit" | "button" | "reset" | undefined; // Equivalente a enumerated
}

export const Button: React.FC<ButtonProps> = ({
  color,
  label,
  style,
  type,
  onClick,
}: ButtonProps) => {
  const buttonCss = `${style} bg-${color}-500 text-white px-4 py-2 rounded-lg hover:bg-${color}-300`;

  return (
    <button type={type} className={buttonCss} onClick={onClick}>
      {label}
    </button>
  );
};
