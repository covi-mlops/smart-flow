import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { BsPerson } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa6";

interface MemberModalProps {
    onClose: () => void;
}

export default function MemberModal({ onClose }: MemberModalProps) {
    const router = useRouter();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleLogout = () => {
        onClose();
        // TODO: 로그아웃 구현 시 로직 추가
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-start justify-end pt-25 mt-2 mr-[30px]"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg px-6 py-2 flex flex-col items-center justify-center min-w-[200px] min-h-[150px] border border-light-gray">
                <button
                    name="header member modal mypage button"
                    className="h-[50px] flex-shrink-0 flex flex-row gap-2 items-center text-xl cursor-pointer"
                    onClick={() => {
                        onClose();
                        router.push('/edit-info');
                    }}
                >
                    <BsPerson size={24} className="dark:text-black" />
                    <p className="dark:text-black">내 정보 변경</p>
                </button>
                <div className="w-full h-1 bg-gray-300 rounded-xl my-2" />
                <button
                    name="header member modal logout button"
                    className="h-[50px] flex-shrink-0 flex flex-row gap-2 items-center text-xl cursor-pointer"
                // onClick={handleLogout}
                >
                    <FaPowerOff size={24} className="dark:text-black" />
                    <p className="dark:text-black">로그아웃</p>
                </button>
            </div>
        </div>,
        document.body
    );
}
