import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "default";
}

export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "w-full h-[70px] rounded-[30px] text-2xl font-bold transition-colors";

  const variantStyles = {
    primary: "bg-light-gray text-white hover:bg-light-gray/80",
    secondary: "bg-black text-white hover:bg-black/80",
    default: "bg-white text-medium-gray border-2 border-medium-gray hover:bg-medium-gray/80 hover:text-white hover:border-none"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
