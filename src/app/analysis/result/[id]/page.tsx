'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import HistogramChart from "@/components/processing/process-data/HistogramChart";
import { Picker } from "@/components/common/Picker";
import Pagination from "@/components/common/Pagination";
import MultipleButton from "@/components/common/MultipleButton";
import { MOCK_DATA } from "@/mock/processing/mock";
import { ProductionHistoryItem } from "@/types/common/types";

export default function AnalysisDataDetailPage() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [data, setData] = useState<ProductionHistoryItem>();
    const [bitmapOn, setBitmapOn] = useState<boolean>(false);
    const [selectedImageNumber, setSelectedImageNumber] = useState<number>();
    const [itemsPerPage, setItemsPerPage] = useState<string>('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState(1);

    const [filters, setFilters] = useState<{
        inspectionResult: string,
        isProcess: string,
        label: string
    }>({
        inspectionResult: "전체",
        isProcess: "전체",
        label: "Contact Pin",
    });

    const inspectionResultOptions = [
        { label: "전체", value: "전체" },
        { label: "정상 데이터", value: "정상 데이터" },
        { label: "분류 데이터", value: "분류 데이터" },
        { label: "AI 예외 데이터", value: "AI 예외 데이터" },
    ];

    const isProcessOptions = [
        { label: "전체", value: "전체" },
        { label: "O", value: "O" },
        { label: "X", value: "X" },
    ];

    const labelOptions = [
        { label: "Contact Pin", value: "Contact Pin" }
    ];

    // 목데이터
    interface tableDataItem {
        id: number;
        image_name: string;
        ai_result: string;
        is_process: string;
    };

    const tableData: tableDataItem[] = [
        {
            id: 1,
            image_name: "20250502_001_001_00001.png",
            ai_result: "정상",
            is_process: "O",
        },
        {
            id: 2,
            image_name: "20250502_001_001_00002.png",
            ai_result: "정상",
            is_process: "O",
        },
        {
            id: 3,
            image_name: "20250502_001_001_00003.png",
            ai_result: "정상",
            is_process: "X",
        },
        {
            id: 4,
            image_name: "20250502_001_001_00004.png",
            ai_result: "불량",
            is_process: "O",
        },
        {
            id: 5,
            image_name: "20250502_001_001_00005.png",
            ai_result: "정상",
            is_process: "X",
        },
        {
            id: 6,
            image_name: "20250502_001_001_00001.png",
            ai_result: "정상",
            is_process: "O",
        },
        {
            id: 7,
            image_name: "20250502_001_001_00002.png",
            ai_result: "정상",
            is_process: "O",
        },
        {
            id: 8,
            image_name: "20250502_001_001_00003.png",
            ai_result: "정상",
            is_process: "X",
        },
        {
            id: 9,
            image_name: "20250502_001_001_00004.png",
            ai_result: "불량",
            is_process: "O",
        },
        {
            id: 10,
            image_name: "20250502_001_001_00005.png",
            ai_result: "정상",
            is_process: "X",
        },
        {
            id: 11,
            image_name: "20250502_001_001_00001.png",
            ai_result: "정상",
            is_process: "O",
        },
        {
            id: 12,
            image_name: "20250502_001_001_00002.png",
            ai_result: "정상",
            is_process: "O",
        },
        {
            id: 13,
            image_name: "20250502_001_001_00003.png",
            ai_result: "정상",
            is_process: "X",
        },
        {
            id: 14,
            image_name: "20250502_001_001_00004.png",
            ai_result: "불량",
            is_process: "O",
        },
        {
            id: 15,
            image_name: "20250502_001_001_00005.png",
            ai_result: "정상",
            is_process: "X",
        },
    ];

    const handleFilterChange = (key: keyof { inspectionResult: string, isProcess: string, label: string }, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const selected_data = MOCK_DATA.filter((item) => item.id === Number(id) && item)
        setData(selected_data[0]);
        console.log(selected_data[0]);
    }, []);

    return (
        <Layout headerTitle="인공지능 분석">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="결과 상세 조회" />

                <div className="flex flex-col p-6 pb-0">
                    <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산 품목</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.mold_no}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">ROLL 번호</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            {/* TODO: 명세 확인 후 수정 */}
                            <p>20250502_001_001</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산일자</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.created_at}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산라인</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.production_line.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 검사일자</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.created_at}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 검사 결과</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p
                                className={`${data?.is_abnormal
                                    ? "text-point-red"
                                    : "text-medium-gray"
                                    }`}
                            >
                                {data?.is_abnormal ? "불량" : "정상"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 모델</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.created_at}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 불량률</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            <p>{data?.defect_rate}%</p>
                            <p>({data?.defective_count}/{data?.total_count})</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 헤드</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                            {/* TODO: 값 넣기 */}
                            <p></p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 Y부</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            {/* TODO: 값 넣기 */}
                            <p></p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 빗각L</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            {/* TODO: 값 넣기 */}
                            <p></p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 빗각R</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            {/* TODO: 값 넣기 */}
                            <p></p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 p-6">
                    <div className="flex flex-col min-w-[500px] gap-6">
                        <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px]">
                                <h2 className="text-lg font-bold text-black">검사 항목</h2>
                            </div>
                            <div className="flex flex-row items-center justify-start w-full gap-3 px-4">
                                <Picker
                                    type="select"
                                    title="AI 결과"
                                    value={filters.inspectionResult}
                                    onChange={(value) =>
                                        handleFilterChange("inspectionResult", value)
                                    }
                                    options={inspectionResultOptions}
                                />
                                <Picker
                                    type="select"
                                    title="가공 여부"
                                    value={filters.isProcess}
                                    onChange={(value) => handleFilterChange("isProcess", value)}
                                    options={isProcessOptions}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-end font-bold text-black">
                            <p>전체: {data?.total_count ? data?.total_count : 0}건</p>
                        </div>

                        <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                            <table className="w-full h-[550px]">
                                <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                                    <tr>
                                        <th className="py-3">No</th>
                                        <th className="py-3">컨택트 핀 이미지</th>
                                        <th className="py-3">AI 결과</th>
                                        <th className="py-3">가공 여부</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        tableData.length !== 0 ? (
                                            tableData
                                                .slice(
                                                    (currentPage - 1) * Number(itemsPerPage),
                                                    currentPage * Number(itemsPerPage)
                                                )
                                                .map((item) => (
                                                    <tr
                                                        key={item.id}
                                                        className={`h-[55px] text-base border-b border-light-gray text-center cursor-pointer ${selectedImageNumber === item.id ? "bg-point-blue/50 text-white" : "bg-white hover:bg-light-gray/30"}`}
                                                        onClick={() => setSelectedImageNumber(item.id)}
                                                    >
                                                        <td className="px-4 py-3">{item.id}</td>
                                                        <td className="px-4 py-3">{item.image_name}</td>
                                                        <td className={`px-4 py-3 font-bold ${item.ai_result === "불량" ? "text-point-red" : selectedImageNumber === item.id ? "text-white" : "text-medium-gray"} `}>{item.ai_result}</td>
                                                        <td className="px-4 py-3">{item.is_process}</td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="py-40 text-center font-bold text-lg text-medium-gray"
                                                >
                                                    조회되는 데이터가 없습니다.
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {
                                        Array.from({
                                            length: Math.max(
                                                0,
                                                Number(itemsPerPage) -
                                                tableData.slice(
                                                    (currentPage - 1) * Number(itemsPerPage),
                                                    currentPage * Number(itemsPerPage)
                                                ).length
                                            ),
                                        }).map((_, i) => (
                                            <tr
                                                key={`empty-${i}`}
                                                className="h-[55px] border-b border-light-gray"
                                            >
                                                <td colSpan={8}></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            total={tableData.length}
                            page={currentPage}
                            limit={Number(itemsPerPage)}
                            tab={tab}
                            setPage={setCurrentPage}
                            setTab={setTab}
                        />
                    </div>

                    <div className="min-w-[500px] flex flex-col gap-6 pt-[74px]">
                        <div className="h-[510px] border-[4px] border-light-gray bg-soft-white flex items-center justify-center p-6">
                            {
                                selectedImageNumber === undefined ? (
                                    <p className="text-medium-gray text-xl">
                                        이미지를 선택해주세요
                                    </p>
                                ) : (
                                    // TODO: API 연동 시 실제 이미지 id, 이미지 객체랑 연결
                                    <div className="flex flex-col items-center gap-12">
                                        <p className="text-xl text-black font-bold">이미지 View</p>
                                        <div className="w-[440px] h-[330px] relative">
                                            <Image
                                                src="/assets/contactpin_ex_image.png"
                                                alt="nexten logo"
                                                width={440}
                                                height={330}
                                                priority
                                                fetchPriority="high"
                                            />
                                            {/* TODO: 수치 프레임 진행 중 */}
                                            <div
                                                className="w-[440px] h-[330px] absolute top-0 left-0"
                                            >
                                                <div className="absolute top-[145px] left-[180px] bg-point-green w-1 h-13" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div>
                            <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">헤드</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* TODO: 값 넣기 */}
                                    <p></p>
                                </div>
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">Y부</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* TODO: 값 넣기 */}
                                    <p></p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">빗각L</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* TODO: 값 넣기 */}
                                    <p></p>
                                </div>
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">빗각R</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* TODO: 값 넣기 */}
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}