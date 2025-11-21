import { UploadModalProps } from "@/types/analysis/upload";
import { useEffect } from "react";

export default function UploadModal({ type, onClose }: UploadModalProps) {
    useEffect(() => {
        if (type) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [type, onClose]);

    if (!type) return null;

    const getModalContent = () => {
        switch (type) {
            case 'success':
                return {
                    color: 'bg-point-green',
                    message: '데이터 업로드가 완료되었습니다.'
                };
            case 'error-format':
                return {
                    color: 'bg-point-red',
                    message: '파일은 png 형식만 업로드 가능합니다.'
                };
            case 'error-folder':
                return {
                    color: 'bg-point-red',
                    message: '폴더에는 png 파일만 존재해야 합니다.'
                };
            case 'not-selected':
                return {
                    color: 'bg-point-red',
                    message: '옵션이 선택되지 않았습니다.'
                };
            default:
                return null;
        }
    };

    const content = getModalContent();
    if (!content) return null;

    return (
        <div className="fixed top-20 left-[55%] -translate-x-1/2 z-50 animate-fade-in">
            <div className="bg-white border-[2px] border-light-gray rounded-2xl px-8 py-6 shadow-lg flex items-center gap-4 min-w-[400px]">
                <div className={`w-4 h-4 rounded-full ${content.color} flex-shrink-0`} />
                <p className="text-lg text-medium-gray">{content.message}</p>
            </div>
        </div>
    );
}
