"use client";

import MultipleButton from "@/components/common/MultipleButton";
import Pagination from "@/components/common/Pagination";
import Layout from "@/components/layout/Layout";
import { LIST_MOCK_DATA } from "@/mock/learning/mock";
import { LearningDataItem } from "@/types/learning/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProgressPage() {
    const router = useRouter();

    const [data, setData] = useState<LearningDataItem[]>(LIST_MOCK_DATA);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState(1);

    return (
        <Layout headerTitle="AI 모델 학습 플랫폼">
            <div className="flex flex-col gap-6 w-full h-full p-6">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-3xl text-black font-bold">인공지능 학습 목록</h2>
                    <MultipleButton
                        type="simple"
                        title="인공지능 학습"
                        className="w-40 text-xl hover:bg-point-blue/80"
                        onClick={() => router.push('/learning/progress/new')}
                    />
                </div>

                <div className="bg-white border-y-2 border-light-gray overflow-hidden h-full">
                    <table className="w-full">
                        <thead className="h-[60px] border-b border-light-gray bg-soft-white py-3 text-center font-bold text-base xl:text-lg font-bold text-black">
                            <tr>
                                <th className="py-3 w-16">No</th>
                                <th className="py-3 w-[450px]">검사 항목</th>
                                <th className="py-3">데이터 수</th>
                                <th className="py-3">AI 검사 결과</th>
                                <th className="py-3">학습 시작일</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data.length !== 0 ? (
                                    data.slice(
                                        (currentPage - 1) * Number(itemsPerPage),
                                        currentPage * Number(itemsPerPage)
                                    ).map((item, idx) => (
                                        <tr
                                            key={item.id}
                                            className="h-[73px] text-base border-b border-light-gray text-center hover:bg-light-gray/30 cursor-pointer"
                                            onClick={() =>
                                                router.push(`/learning/progress/${item.id}`)
                                            }
                                        >
                                            <td className="px-4 py-3">{(currentPage - 1) * Number(itemsPerPage) + idx + 1}</td>
                                            <td className="px-4 py-3 whitespace-pre-line">
                                                {item.server_type}
                                            </td>
                                            <td className="px-4 py-3 whitespace-pre-line">
                                                {item.dataset_count.toLocaleString()}
                                            </td>
                                            <td className={
                                                `px-4 py-3 font-bold
                                                ${item.status === "ready"
                                                    ? "text-point-green"
                                                    : item.status === "progress"
                                                        ? "text-point-blue"
                                                        : "text-medium-gray"}
                                            `}>
                                                {
                                                    item.status === "ready"
                                                        ? "준비 완료"
                                                        : item.status === "progress"
                                                            ? "진행 중"
                                                            : "완료"
                                                }
                                            </td>
                                            <td>
                                                {item.status === "ready" ? "ㅡ" : item.start_at}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="h-[710px]">
                                        <td
                                            colSpan={8}
                                            className="text-center font-bold text-lg text-medium-gray"
                                        >
                                            조회되는 생산 데이터가 없습니다.
                                        </td>
                                    </tr>
                                )
                            }

                            {
                                LIST_MOCK_DATA.length > 0
                                && Array.from({
                                    length: Math.max(
                                        0,
                                        Number(itemsPerPage) -
                                        data.slice(
                                            (currentPage - 1) * Number(itemsPerPage),
                                            currentPage * Number(itemsPerPage)
                                        ).length
                                    ),
                                }).map((_, i) => (
                                    <tr
                                        key={`empty-${i}`}
                                        className="h-[73px] border-b border-light-gray"
                                    >
                                        <td colSpan={8}></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    data.length !== 0 && (
                        <Pagination
                            total={data.length}
                            page={currentPage}
                            limit={Number(itemsPerPage)}
                            tab={tab}
                            setPage={setCurrentPage}
                            setTab={setTab}
                        />
                    )
                }
            </div>
        </Layout >
    );
}