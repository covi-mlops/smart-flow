'use client';

import Header from "./Header";
import MenuBar from "./MenuBar";

interface LayoutProps {
    headerTitle: string;
    children: React.ReactNode;
}

export default function Layout({ headerTitle, children }: LayoutProps) {
    return (
        <div className="h-full">
            <div className="w-full fixed top-0 left-0 flex-1 z-50">
                <Header title={headerTitle} />
            </div>
            <div className="flex-1 flex flex-row pt-[140px]">
                {/* <div className="h-full">
                    <MenuBar />
                </div> */}
                <MenuBar />
                <div className="w-full overflow-hidden overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}