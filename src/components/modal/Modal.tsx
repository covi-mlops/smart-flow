import BasicButton from "../common/BasicButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface ModalProps {
    text: string;
    onClick: () => void;
    onClose: () => void;
}

export default function Modal({ text, onClick, onClose }: ModalProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="flex flex-col items-center justify-between bg-white rounded-xl border-4 border-black shadow-lg px-6 py-6 min-w-[400px] min-h-[300px]">
                <IoMdCheckmarkCircleOutline size={80} />
                <p className="text-medium-gray text-2xl font-bold">
                    {text}
                </p>
                <BasicButton onClick={onClick}>
                    확인
                </BasicButton>
            </div>
        </div>
    );
}