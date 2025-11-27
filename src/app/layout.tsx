import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/common/Footer";

const nanumSquare = localFont({
  src: [
    { path: "../../public/fonts/NanumSquareOTF_R.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/NanumSquareOTF_B.woff", weight: "800", style: "normal" },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Smart-Flow",
  description: "NEXTEN ELECTRONCS CONTACT PIN INSPECTION PLATFORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumSquare.className} flex flex-col min-h-screen`}
      >
        <main className="flex-1 flex flex-col h-full w-full bg-white text-black dark:bg-white dark:text-black">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
