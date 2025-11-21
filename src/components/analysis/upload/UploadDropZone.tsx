import { useRef, useState } from "react";

import { ModalType } from "@/types/analysis/upload";
import { BsImages } from "react-icons/bs";

interface UploadDropZoneProps {
    selectedItem: string;
    isUploading: boolean;
    onUpload: (files: File[]) => void;
    onShowModal: (type: ModalType) => void;
}
// TODO: png 파일 문제 해결하기
export default function UploadDropZone({ selectedItem, isUploading, onUpload, onShowModal }: UploadDropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFiles = (files: FileList | null): File[] | null => {
        if (!files || files.length === 0) return null;

        const fileArray = Array.from(files);
        const allPng = fileArray.every(file => file.type === 'image/png' || file.name.toLowerCase().endsWith('.png'));
        console.log(allPng);
        console.log(fileArray);
        if (!allPng) {
            onShowModal('error-format');
            return null;
        }

        return fileArray;
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (!selectedItem) {
            onShowModal('error-format');
            return;
        } else if (selectedItem === '선택해주세요') {
            onShowModal('not-selected');
            return;
        }
        const files = validateFiles(e.dataTransfer.files);
        if (files) {
            onUpload(files);
        }
    };

    const handleClick = () => {
        if (selectedItem === '선택해주세요') {
            onShowModal('not-selected');
            return;
        }

        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = validateFiles(e.target.files);
        if (files) {
            onUpload(files);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div
            className={`
                border-[3px] border-dashed rounded-lg
                flex items-center justify-center
                min-h-[300px] cursor-pointer
                transition-colors
                ${isDragging ? 'border-point-blue bg-point-blue/5' : 'border-light-gray'}
                ${isUploading ? 'bg-soft-white cursor-wait' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,image/png"
                className="hidden"
                onChange={handleFileChange}
            />

            {
                isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                        <BsImages size={40} />
                        <p className="text-xl font-bold text-medium-gray">(업로드 중...)</p>
                    </div>
                ) : (
                    <div className="text-center px-8">
                        <p className="text-lg text-medium-gray font-bold leading-relaxed">
                            검사를 원하는 데이터를 여기에 놓거나 탭 후 선택해주세요.
                        </p>
                        <p className="text-base text-medium-gray/70 mt-2">
                            (png 파일이나 png 파일로 구성된 폴더만 업로드 가능합니다.)
                        </p>
                    </div>
                )}
        </div>
    );
}
