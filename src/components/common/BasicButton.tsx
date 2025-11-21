import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "default";
  disabled?: boolean;
}

export default function BasicButton({
  children,
  variant = "default",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "w-full h-[70px] rounded-[30px] text-2xl font-bold transition-colors";
  const variantStyles = {
    primary: "bg-medium-gray text-white",
    secondary: "bg-black text-white border-2 border-black hover:bg-white hover:text-black cursor-pointer",
    default: "bg-white text-medium-gray border-2 border-medium-gray hover:bg-medium-gray/80 hover:text-white hover:border-none cursor-pointer"
  };

  return (
    <button
      className={
        !disabled
          ? `${baseStyles} ${variantStyles[variant]} ${className}`
          : `${baseStyles} bg-light-gray text-white`
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
