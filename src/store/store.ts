import { SortConfigStore } from '@/types/analysis/types';
import { MemberStore } from '@/types/member/types';
import { ModalStore } from '@/types/modal/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* 회원 */
export const useMemberStore = create<MemberStore>()(
    persist(
        (set) => ({
            username: 'covi', /* TODO: API 연결 시 수정 */
            setUsername: (newState) => set({ username: newState }),
            role: 'USER',
        }),
        {
            name: 'memberNameStorage',
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

/* 분석 플랫폼 */
// 인공지능 페이지
export const useSortConfigStore = create<SortConfigStore>((set) => ({
    isDesc: true,
    setDesc: () => set({ isDesc: true }),
    setAsc: () => set({ isDesc: false }),
}))