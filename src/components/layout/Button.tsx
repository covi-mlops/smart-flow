interface ButtonProps {
    title: string;
    isActive: boolean;
    disabled: boolean;
    onClick: () => void;
}

export default function Button({ title, isActive = true, disabled, onClick }: ButtonProps) {
    const baseStyles = "w-[185px] h-[69px] text-2xl border-4 shadow-lg";
    const variantStyles = {
        active: "border-medium-gray bg-light-gray/60 font-bold text-white text-stroke-1",
        disabled: "border-light-gray bg-white text-medium-gray font-medium hover:bg-light-gray hover:text-white",
    }

    return (
        <button
            className={`${baseStyles} ${isActive ? variantStyles['active'] : variantStyles['disabled']} ${disabled ? "" : "cursor-pointer"}`}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
}