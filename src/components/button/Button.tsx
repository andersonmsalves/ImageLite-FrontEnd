import React from "react";

interface ButtonProps {
  color?: string;
  label?: string;
  style?: string;
  onClick?: (event: any) => void;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  label,
  style,
  onClick,
}: ButtonProps) => {
  const buttonCss = `${style} bg-${color}-500 text-white px-4 py-2 rounded-lg hover:bg-${color}-300`;

  return (
    <button className={buttonCss} onClick={onClick}>
      {label}
    </button>
  );
};
