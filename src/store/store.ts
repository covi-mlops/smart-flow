import { SortConfigStore } from '@/types/analysis/types';
import { MemberStore } from '@/types/member/types';
import { ModalStore } from '@/types/modal/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* 회원 */
export const useMemberStore = create<MemberStore>()(
    persist(
        (set) => ({
            username: 'username',
            setUsername: (newState) => set({ username: newState }),
            role: 'user',
            isLogin: false,
            setIsLogin: (state) => set({ isLogin: state }),
        }),
        {
            name: 'memberStorage',
        }
    )
)

/* 모달창 */
export const useMemberModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useLoginSuccessStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useSignupSuccessStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useLogoutStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useEditInfoSuccessStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useSuccessChangeStandardStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

/* 분석 플랫폼 */
// 인공지능 페이지
export const useSortConfigStore = create<SortConfigStore>((set) => ({
    isDesc: true,
    setDesc: () => set({ isDesc: true }),
    setAsc: () => set({ isDesc: false }),
}))

/* 가공 플랫폼 */
// 데이터 가공 - 결과 상세 조회 페이지
interface SelectedImageStore {
    selectedImageId: string;
    setSelectedImageId: (id: string) => void;
}
export const useSelectedImageStore = create<SelectedImageStore>((set) => ({
    selectedImageId: '',
    setSelectedImageId: (id) => set({ selectedImageId: id }),
}))