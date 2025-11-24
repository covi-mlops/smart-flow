'use client';

import Image from "next/image";
import { lazy, Suspense } from 'react';
import { useMemberModalStore, useMemberStore } from "@/store/store";
import MemberModal from "../modal/MemberModal";

interface HeaderProps {
    title: string;
}

const BiDown = lazy(() => import('react-icons/bi').then(module => ({
    default: module.BiChevronDown
})));

export default function Header({ title }: HeaderProps) {
    const { username, role } = useMemberStore();
    const { isModalOpen, setIsModalOpen, setIsModalClose } = useMemberModalStore();

    return (
        <div className="bg-white text-black border-b-[4px] border-point-red w-full h-[140px] px-[30px]">
            <div className="flex flex-row items-center justify-between gap-5">
                <Image
                    src="/assets/nexten_logo_b.png"
                    alt="nexten logo"
                    className="min-w-[188px] py-[20px]"
                    width={200}
                    height={95}
                    priority
                    fetchPriority="high"
                />

                <div className="w-[4px] h-[140px] bg-point-red" />

                <div className="flex flex-row w-full items-center justify-between">
                    <p className="text-[44px] font-bold whitespace-nowrap">{title}</p>
                    <button
                        className="flex flex-row items-center gap-4 cursor-pointer"
                        onClick={() => setIsModalOpen()}
                    >
                        {
                            role === "ADMIN"
                            && <div className="w-[100px] h-[50px] bg-medium-gray text-white flex items-center justify-center font-bold rounded-xl">
                                관리자
                            </div>
                        }
                        <p className="text-3xl font-bold whitespace-nowrap">{username}</p>
                        <Suspense fallback={<div></div>}>
                            <BiDown size={50} />
                        </Suspense>
                    </button>
                    {
                        isModalOpen && <MemberModal onClose={() => setIsModalClose()} />
                    }
                </div>
            </div>
        </div>
    );
}