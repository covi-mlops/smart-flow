import { MemberStore } from '@/types/member/member';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* 회원 */
export const useMemberStore = create<MemberStore>()(
    persist(
        (set) => ({
            id: 'covi', /* TODO: API 연결 시 수정 */
            setId: (newState) => set({ id: newState }),
        }),
        {
            name: 'memberNameStorage',
        }
    )
)