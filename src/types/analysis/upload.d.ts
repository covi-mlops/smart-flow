export interface UploadData {
    uploadDate: string;
    inspectionItem: string;
    inspectionData: {
        count: number;
        name: string;
    };
    isFolder: boolean;
}

export type ModalType = 'success' | 'error-format' | 'error-folder' | 'not-selected' | null;

export interface UploadModalProps {
    type: ModalType;
    onClose: () => void;
}

// ----------
// API: 생산 이력 업로드
export interface DataUploadRequest {
    production_name: string;
    folder_name?: string;
    files: File[];
    is_folder_upload: boolean;
}

export interface DataUploadItem {
    id: number;
    production_name: string;
    is_uploaded: string; // 파일명(확장자 포함) or 폴더명
    file_count: number;
    saved_files: string[];
    status: "collecting" | "classifying" | "completed" | "error"; // 사용X
}

export interface DataUploadResponse {
    status: "SUCCESS" | "FAIL";
    data: DataUploadItem;
}

// API: 업로드한 생산 이력 조회
interface UploadedDataItem {
    id: number;
    production_name: string;
    is_uploaded: string; // 파일명(확장자 포함) or 폴더명
    file_count: number;
    created_at: string;
}

interface UploadedData {
    count: number;
    next: string | null;
    previous: string | null;
    result: UploadedDataItem[];
}
export interface ViewUploadedDataResponse {
    status: "SUCCESS" | "FAIL";
    data: UploadedData[];
}