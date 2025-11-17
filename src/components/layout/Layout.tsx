'use client';

import Header from "./Header";
import MenuBar from "./MenuBar";

interface LayoutProps {
    headerTitle: string;
    children: React.ReactNode;
}

export default function Layout({ headerTitle, children }: LayoutProps) {
    return (
        <>
            <Header title={headerTitle} />
            <div className="flex-1 flex flex-row">
                <MenuBar />
                {children}
            </div>
        </>
    );
}