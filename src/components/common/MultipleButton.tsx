interface ButtonProps {
    type: "selectAll" | "simple" | "default" | "warning" | "danger";
    title: string;
    disabled?: boolean;
    className?: string;
    onClick: () => void;
}

export default function MultipleButton({ type, title, disabled, className = "", onClick, ...props }: ButtonProps) {
    return (
        <button
            className={
                `px-4 py-3 h-[56px]
                ${disabled
                    ? "bg-light-gray text-white flex items-center justify-center"
                    : type === "selectAll"
                        ? "bg-point-blue text-white border-none hover:bg-point-blue/80 cursor-pointer"
                        : type === "simple"
                            ? "w-12 h-12 flex items-center justify-center bg-point-blue text-white text-2xl font-bold rounded hover:bg-medium-gray/80 disabled:bg-light-gray disabled:cursor-not-allowed"
                            : type === "warning"
                                ? "bg-yellow-500 text-white border-none hover:bg-yellow-600 cursor-pointer"
                                : type === "danger"
                                    ? "bg-point-red text-white border-none hover:bg-point-red/80 cursor-pointer"
                                    : "flex items-center justify-center bg-white text-medium-gray border-2 border-medium-gray hover:bg-soft-white cursor-pointer"
                }
                rounded font-bold shadow-md ${className}`
            }
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {title}
        </button>
    );
}