'use client';

import { useLogoutStore, useMemberStore } from "@/store/store";
import Header from "./Header";
import MenuBar from "./MenuBar";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";

interface LayoutProps {
    headerTitle: string;
    children: React.ReactNode;
}

export default function Layout({ headerTitle, children }: LayoutProps) {
    const { isLogin } = useMemberStore();
    const { isModalOpen, setIsModalClose } = useLogoutStore();

    const router = useRouter();

    return (
        <div className="h-full">
            <div className="w-full fixed top-0 left-0 flex-1 z-50">
                <Header title={headerTitle} />
            </div>
            <div className="flex-1 flex flex-row pt-[140px]">
                <MenuBar />
                <div className="w-full overflow-hidden overflow-y-auto">
                    {children}
                </div>
            </div>

            {
                !isLogin && isModalOpen
                && <Modal
                    text={`로그아웃되어 로그인 페이지로 이동합니다.`}
                    onClick={() => {
                        setIsModalClose();
                        router.push('/')
                    }}
                    onClose={() => {
                        setIsModalClose();
                        router.push('/')
                    }}
                />
            }
        </div>
    );
}