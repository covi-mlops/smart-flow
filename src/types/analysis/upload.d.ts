export interface UploadData {
    uploadDate: string;
    inspectionItem: string;
    inspectionData: string;
}

export type ModalType = 'success' | 'error-format' | 'error-folder' | 'not-selected' | null;

export interface UploadModalProps {
    type: ModalType;
    onClose: () => void;
}
