/* 상태 관리 */
export interface ModalStore {
    isModalOpen: boolean;
    setIsModalOpen: () => void;
    setIsModalClose: () => void;
}
