interface ButtonProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

export default function Button({ title, isActive = true, onClick }: ButtonProps) {
    const baseStyles = "w-[300px] h-[69px] text-2xl border-4 shadow-lg text-center";
    const variantStyles = {
        active: "border-light-gray bg-light-gray/60 font-bold text-white",
        inactive: "border-light-gray bg-white text-medium-gray font-medium hover:bg-light-gray hover:text-white cursor-pointer",
    }

    return (
        <button
            className={`${baseStyles} ${isActive ? variantStyles['active'] : variantStyles['inactive']}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}