import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex items-center gap-4 w-full">
      {
        label && (
          <label className="text-black text-2xl font-normal whitespace-nowrap min-w-20">
            {label}
          </label>
        )
      }
      <input
        className={`flex-1 h-[70px] rounded-[30px] border-4 border-light-gray bg-white px-6 text-medium-gray text-base outline-none focus:border-medium-gray transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
