import { InputHTMLAttributes, useState } from "react";
import { IoEyeSharp, IoEyeOffOutline } from "react-icons/io5";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isCorrect: boolean;
}

export default function Input({ label, isCorrect = true, className = "", type = "text", ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="w-[130px]">
        {
          label && (
            <label className="text-black text-2xl font-normal whitespace-nowrap min-w-20">
              {label}
            </label>
          )
        }
      </div>

      <div className="relative flex-1 w-[440px]">
        <input
          className={`flex-1 w-full h-[70px] rounded-[30px] border-4 bg-white px-6 text-medium-gray text-xl outline-none focus:border-medium-gray transition-colors 
            ${isCorrect ? 'border-light-gray' : 'border-point-red'} ${className}`}
          type={inputType}
          {...props}
        />
        {
          isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-light-gray hover:text-medium-gray"
            >
              {showPassword ? <IoEyeOffOutline size={30} /> : <IoEyeSharp size={30} />}
            </button>
          )
        }
      </div>
    </div>
  );
}
