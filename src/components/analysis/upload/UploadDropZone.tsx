import { Dispatch, SetStateAction, useRef, useState } from "react";

import { ModalType } from "@/types/analysis/upload";
import { BsImages } from "react-icons/bs";

interface UploadDropZoneProps {
    selectedItem: string;
    isUploading: boolean;
    onUpload: (files: File[], folderName: string) => void;
    onShowModal: (type: ModalType) => void;
    onWarning: Dispatch<SetStateAction<boolean>>;
}

export default function UploadDropZone(
    { selectedItem, isUploading, onUpload, onShowModal, onWarning }: UploadDropZoneProps
) {
    const [isDragging, setIsDragging] = useState(false); // 드래그 중인지의 여부
    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 ref 객체
    const folderInputRef = useRef<HTMLInputElement>(null); // 폴더 ref 객체
    // 이미지 파일 확장자 검증
    const validateFiles = (files: FileList | File[] | null): File[] | null => {
        if (!files || files.length === 0) return null;

        const fileArray = Array.isArray(files) ? files : Array.from(files); // 배열 처리
        const allTypeOk = fileArray.every(file =>
            file.type === 'image/png' ||
            file.type === "image/bmp" ||
            file.name.toLowerCase().endsWith('.png') ||
            file.name.toLowerCase().endsWith('.bmp')
        );

        if (!allTypeOk) {
            onShowModal('error-format');
            return null;
        }

        return fileArray;
    };
    // 파일 트리 순회 함수
    const traverseFileTree = async (
        item: FileSystemEntry,
        files: File[],
        basePath: string = '',
    ): Promise<void> => {
        if (item.isFile) {
            const fileEntry = item as FileSystemFileEntry;
            const file = await new Promise<File>((resolve) => {
                fileEntry.file(resolve);
            });

            const fullPath = basePath ? `${basePath}/${file.name}` : file.name;
            Object.defineProperty(file, 'fullPath', {
                value: fullPath,
                writable: false,
            });

            files.push(file);
        } else if (item.isDirectory) {
            const dirEntry = item as FileSystemDirectoryEntry;
            const reader = dirEntry.createReader();
            const entries = await new Promise<FileSystemEntry[]>((resolve) => {
                reader.readEntries(resolve);
            });

            const newBasePath = basePath ? `${basePath}/${dirEntry.name}` : dirEntry.name;
            for (const entry of entries) {
                await traverseFileTree(entry, files, newBasePath);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        onWarning(false);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (!selectedItem) {
            onShowModal('error-format');
            onWarning(false);
            return;
        } else if (selectedItem === '선택해주세요') {
            onShowModal('not-selected');
            onWarning(true);
            return;
        }

        const items = e.dataTransfer.items;
        const droppedFiles = e.dataTransfer.files;

        let folderName = '';
        let allFiles: File[] = [];

        if (items && items.length > 0) {
            const firstItem = items[0];
            const entry = firstItem.webkitGetAsEntry?.();

            if (entry?.isDirectory) {
                folderName = entry.name;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const itemEntry = item.webkitGetAsEntry?.();
                    if (itemEntry) {
                        await traverseFileTree(itemEntry, allFiles, '');
                    }
                }
            } else {
                allFiles = Array.from(droppedFiles);
            }
        } else {
            allFiles = Array.from(droppedFiles);
        }

        const files = validateFiles(allFiles);
        if (files) {
            onUpload(files, folderName);
        }
    };

    const handleFileClick = () => {
        if (selectedItem === '선택해주세요') {
            onShowModal('not-selected');
            onWarning(true);
            return;
        }

        fileInputRef.current?.click();
    };

    const handleFolderClick = () => {
        if (selectedItem === '선택해주세요') {
            onShowModal('not-selected');
            onWarning(true);
            return;
        }

        folderInputRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = validateFiles(e.target.files);

        if (files) {
            onUpload(files, '');
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        const firstFile = fileArray[0] as any;
        const folderName = firstFile.webkitRelativePath?.split('/')[0] || 'unknown_folder';

        const filesWithPath = fileArray.map(file => {
            const fileWithPath = file as any;
            if (fileWithPath.webkitRelativePath) {
                Object.defineProperty(file, 'fullPath', {
                    value: fileWithPath.webkitRelativePath,
                    writable: false,
                });
            }
            return file;
        });

        const vFiles = validateFiles(filesWithPath);
        if (vFiles) {
            onUpload(vFiles, folderName);
        }

        if (folderInputRef.current) {
            folderInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className={`
                border-[3px] border-dashed rounded-lg
                flex items-center justify-center
                min-h-[300px]
                transition-colors
                ${isDragging ? 'border-point-blue bg-point-blue/5' : 'border-light-gray'}
                ${isUploading ? 'bg-soft-white cursor-wait' : ''}
            `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {
                    isUploading ? (
                        <div className="flex flex-col items-center gap-4">
                            <BsImages size={40} />
                            <p className="text-xl font-bold text-medium-gray">( 업로드 중... )</p>
                        </div>
                    ) : (
                        <div className="text-center px-8">
                            <p className="text-lg text-medium-gray font-bold leading-relaxed">
                                검사를 원하는 데이터를 여기에 놓거나, 버튼 클릭 후 선택해주세요.
                            </p>
                            <p className="text-base text-medium-gray/70 mt-2">
                                ( .png, .bmp 파일이나 .png, .bmp 파일로 구성된 폴더만 업로드 가능합니다. )
                            </p>
                        </div>
                    )}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleFileClick}
                    disabled={isUploading || selectedItem === '선택해주세요'}
                    className={`flex-1 bg-point-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-point-green/90 disabled:bg-medium-gray ${isUploading || selectedItem === '선택해주세요' ? "" : "cursor-pointer"} transition`}
                >
                    📄 파일 선택
                </button>

                <button
                    onClick={handleFolderClick}
                    disabled={isUploading || selectedItem === '선택해주세요'}
                    className={`flex-1 bg-point-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-point-blue/90 disabled:bg-medium-gray ${isUploading || selectedItem === '선택해주세요' ? "" : "cursor-pointer"} transition`}
                >
                    📁 폴더 선택
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,image/png,.bmp,image/bmp"
                className="hidden"
                onChange={handleFileChange}
            />

            <input
                ref={folderInputRef}
                type="file"
                // @ts-ignore
                webkitdirectory=""
                directory=""
                multiple
                className="hidden"
                onChange={handleFolderChange}
            />
        </div>
    );
}