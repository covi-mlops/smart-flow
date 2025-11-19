interface ButtonProps {
    type: "selectAll" | "simple" | "default";
    title: string;
    disabled?: boolean;
    className?: string;
    onClick: () => void;
}

export default function Button({ type, title, disabled, className = "", onClick, ...props }: ButtonProps) {
    return (
        <button
            className={
                `px-4 py-3 h-[56px]
                ${disabled
                    ? "bg-light-gray text-white"
                    : type === "selectAll"
                        ? "bg-point-blue text-white border-none hover:bg-point-blue/80 cursor-pointer"
                        : type === "simple"
                            ? "w-12 h-12 flex items-center justify-center bg-medium-gray text-white text-2xl font-bold rounded hover:bg-medium-gray/80 disabled:bg-light-gray disabled:cursor-not-allowed"
                            : "bg-white text-medium-gray border-2 border-medium-gray hover:bg-soft-white cursor-pointer"
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