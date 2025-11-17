'use client';

import Image from "next/image";
import { lazy, Suspense } from 'react';
import { useMemberStore } from "@/store/store";

interface HeaderProps {
    title: string;
}

const BiDown = lazy(() => import('react-icons/bi').then(module => ({
    default: module.BiChevronDown
})));

export default function Header({ title }: HeaderProps) {
    const { id } = useMemberStore();

    return (
        <div className="bg-white text-black border-b-[4px] border-point-red w-full h-[140px] px-[30px]">
            <div className="flex flex-row items-center justify-between gap-5">
                <Image
                    src="/assets/nexten_logo_B.png"
                    alt="nexten logo"
                    className="w-[200px] py-[20px]"
                    width={200}
                    height={95}
                    priority
                    fetchPriority="high"
                />

                <div className="w-[4px] h-[140px] bg-point-red" />

                <div className="flex flex-row w-full items-center justify-between">
                    <p className="text-4xl font-bold">{title}</p>
                    <button
                        className="flex flex-row items-center gap-4 cursor-pointer"
                    >
                        <p className="text-3xl font-bold">{id}</p>
                        <Suspense fallback={<div></div>}>
                            <BiDown size={50} />
                        </Suspense>
                    </button>
                </div>
            </div>
        </div>
    );
}