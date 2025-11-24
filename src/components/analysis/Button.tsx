interface ButtonProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

export default function Button({ title, isActive = true, onClick }: ButtonProps) {
    const baseStyles = "w-[300px] h-[69px] text-2xl border-4 shadow-lg text-center";
    const variantStyles = {
        active: "border-none bg-point-blue font-bold text-white",
        inactive: "border-light-gray bg-white text-medium-gray font-medium hover:bg-point-blue/90 hover:border-none hover:font-bold hover:text-white cursor-pointer",
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