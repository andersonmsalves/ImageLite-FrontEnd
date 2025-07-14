import React from "react";

interface ButtonProps {
  color?: string;
  label?: string;
  onClick?: (event: any) => void;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  label,
  onClick,
}: ButtonProps) => {
  const buttonCss = `bg-${color}-500 text-white px-4 py-2 rounded-lg hover:bg-${color}-300`;

  return (
    <button className={buttonCss} onClick={onClick}>
      {label}
    </button>
  );
};
