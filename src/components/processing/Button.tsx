interface ButtonProps {
    type: "selectAll" | "default";
    title: string;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({ type, title, disabled, onClick, ...props }: ButtonProps) {
    return (
        <button
            className={
                `px-6 py-3 
                ${type === "selectAll"
                    ? "bg-point-blue text-white border-none hover:bg-point-blue/80 cursor-pointer"
                    : disabled
                        ? "bg-light-gray text-white"
                        : "bg-white text-medium-gray border border-medium-gray hover:bg-soft-white cursor-pointer"
                } 
                rounded font-bold shadow-md`
            }
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {title}
        </button>
    );
}