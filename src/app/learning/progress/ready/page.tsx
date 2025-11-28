'use client';

import MultipleButton from "@/components/common/MultipleButton";
import Pagination from "@/components/common/Pagination";
import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
// import { LIST_MOCK_DATA } from "@/mock/learning/mock";
// import { ResultsItem } from "@/types/learning/types";
import { useRouter } from "next/navigation";
// import { useState } from "react";

export default function ReadyAILearningPage() {
    const router = useRouter();
    // const [data, setData] = useState<ResultsItem[]>(LIST_MOCK_DATA);

    return (
        <Layout headerTitle="AI 모델 학습 플랫폼">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="인공지능 학습" />

                <div className="flex flex-col p-6 gap-6">
                    <h2 className="text-2xl text-black font-bold">학습 대상 데이터</h2>

                    <div>
                        <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">데이터 수</h2>
                            </div>
                            <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                {/* TODO: 값 넣기 */}
                                <p>109,995</p>
                            </div>
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">정상 데이터 수</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                                {/* TODO: 값 넣기 */}
                                <p>108,535</p>
                            </div>
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">불량 데이터 수</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                                {/* TODO: 값 넣기 */}
                                <p>1,442</p>
                            </div>
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">AI 예외 데이터 수</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                                {/* TODO: 값 넣기 */}
                                <p>18</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">생산 품목</h2>
                            </div>
                            <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                {/* TODO: 값 넣기 */}
                                <p>contactpin_1, contactpin_2</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-t-2 border-light-gray overflow-hidden p-6">
                    <table className="w-full">
                        <thead className="border-b border-light-gray bg-soft-white">
                            <tr className="h-[56px] text-center text-base font-bold text-black">
                                <th>No</th>
                                <th className="w-[340px]">생산 일자</th>
                                <th>생산라인</th>
                                <th>생산 품목</th>
                                <th>AI 불량률</th>
                                <th>AI 검사 결과</th>
                                <th>데이터 종류</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* TODO: 추후 재수정 */}
                            <tr
                                key={1}
                                className="h-[60px] text-center border-b border-light-gray"
                            >
                                <td className="text-base">{1}</td>
                                <td className="text-base">2025.11.13 14:40:25</td>
                                <td className="text-base">생산라인1</td>
                                <td className="text-base">contactpin_1</td>
                                <td className="text-base">
                                    2%<br />
                                    <span className="text-sm text-medium-gray">
                                        (54,950/55,000)
                                    </span>
                                </td>
                                <td className={`text-base font-bold text-point-red`}>
                                    불량
                                </td>
                                <td className="flex flex-col gap-1 items-center justify-center">
                                    <span>정상 데이터: 54,950</span>
                                    <span>불량 데이터: 50</span>
                                    <span>AI 예외 데이터: 0</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Pagination
                        total={1}
                        page={1}
                        limit={5}
                        tab={1}
                        setPage={() => { }}
                        setTab={() => { }}
                    />
                </div>

                <div className="flex flex-row gap-6 items-center justify-center">
                    <MultipleButton
                        type="default"
                        title="데이터 수정"
                        className="w-[400px] text-xl"
                        onClick={() => router.back()}
                    />
                    <MultipleButton
                        type="default"
                        title="학습 시작"
                        className="w-[400px] text-xl"
                        onClick={() => router.push('/learning/progress')}
                    />
                </div>
            </div>
        </Layout>
    );
}