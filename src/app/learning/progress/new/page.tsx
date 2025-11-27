'use client';

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import MultipleButton from "@/components/common/MultipleButton";
import { MOCK_DATA } from "@/mock/processing/mock";
import Pagination from "@/components/common/Pagination";
import { ProductionHistoryEachItem_P } from "@/types/processing/process-data";

export default function NewAILearningPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);
    const [itemsPerPage] = useState(5);

    const [filters, setFilters] = useState({
        productionLineName: "전체",
        startDate: "2025-05-21",
        endDate: "2025-05-21",
        productionLine: "전체",
        aiResult: "전체",
        aiModel: "전체"
    });

    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [learningData, setLearningData] = useState<ProductionHistoryEachItem_P[]>([]);

    const productionLineNameOptions = [
        { label: "전체", value: "전체" }
    ];

    const productionLineOptions = [
        { label: "전체", value: "전체" }
    ];

    const aiResultOptions = [
        { label: "전체", value: "전체" },
        { label: "정상", value: "정상" },
        { label: "불량", value: "불량" }
    ];

    const aiModelOptions = [
        { label: "전체", value: "전체" }
    ];

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleRowSelect = (id: number) => {
        setSelectedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleRowExpand = (id: number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleAddToLearningData = () => {
        const selectedItems = MOCK_DATA.filter(item => selectedRows.has(item.id));

        setLearningData(prev => {
            const existingIds = new Set(prev.map(item => item.id));
            const filteredNew = selectedItems.filter(item => !existingIds.has(item.id));
            return [...prev, ...filteredNew];
        });

        setSelectedRows(new Set());
        setExpandedRows(new Set());
    };

    const handleRemoveFromLearningData = (id: number) => {
        setLearningData(prev => prev.filter(item => item.id !== id));
    };

    const handlePrepareTraining = () => {
        router.push('/learning/progress/ready');
    };

    const totalDataCount = learningData.reduce((sum, item) =>
        sum + item.normal_count + item.defective_count + item.exception_count, 0
    );
    const totalNormalCount = learningData.reduce((sum, item) => sum + item.normal_count, 0);
    const totalDefectiveCount = learningData.reduce((sum, item) => sum + item.defective_count, 0);
    const totalAiExceptionCount = learningData.reduce((sum, item) => sum + item.exception_count, 0);

    const currentData = MOCK_DATA.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);

    return (
        <Layout headerTitle="AI 모델 학습 플랫폼">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="인공지능 학습" />

                <div className="flex flex-col p-6 gap-6">
                    <h2 className="text-2xl text-black font-bold">학습 데이터 선택</h2>

                    <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[88px]">
                            <h2 className="text-lg font-bold text-black">검사 항목</h2>
                        </div>

                        <div className="flex flex-row items-center justify-start w-full gap-3 px-4 py-4">
                            <Picker
                                type="select"
                                title="생산품목"
                                value={filters.productionLineName}
                                onChange={(value) =>
                                    handleFilterChange("productionLineName", value)
                                }
                                options={productionLineNameOptions}
                            />

                            <Picker
                                type="date"
                                title="생산 시작 일자"
                                value={filters.startDate}
                                onChange={(value) =>
                                    handleFilterChange("startDate", value)
                                }
                            />

                            <Picker
                                type="date"
                                title="생산 종료 일자"
                                value={filters.endDate}
                                onChange={(value) =>
                                    handleFilterChange("endDate", value)
                                }
                            />

                            <Picker
                                type="select"
                                title="생산라인"
                                value={filters.productionLine}
                                onChange={(value) =>
                                    handleFilterChange("productionLine", value)
                                }
                                options={productionLineOptions}
                            />

                            <Picker
                                type="select"
                                title="AI 검사 결과"
                                value={filters.aiResult}
                                onChange={(value) => handleFilterChange("aiResult", value)}
                                options={aiResultOptions}
                            />

                            <Picker
                                type="select"
                                title="AI 모델"
                                value={filters.aiModel}
                                onChange={(value) => handleFilterChange("aiModel", value)}
                                options={aiModelOptions}
                            />
                        </div>
                    </div>

                    <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                        <table className="w-full">
                            <thead className="border-b border-light-gray bg-soft-white">
                                <tr className="h-[56px] text-center text-base font-bold text-black">
                                    <th className="w-[80px]">선택</th>
                                    <th className="w-[80px]">No</th>
                                    <th className="w-[340px]">생산 일자</th>
                                    <th className="w-[160px]">생산라인</th>
                                    <th>생산 품목</th>
                                    <th>AI 불량률</th>
                                    <th>AI 검사 결과</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentData.length > 0 ? (
                                        currentData.map((item) => (
                                            <Fragment key={item.id}>
                                                <tr
                                                    className="h-[56px] text-center border-b border-light-gray bg-white hover:bg-light-gray/30"
                                                >
                                                    <td className="h-[54px] flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedRows.has(item.id)}
                                                            onChange={() => handleRowSelect(item.id)}
                                                            className="w-8 h-8 cursor-pointer accent-point-blue"
                                                        />
                                                    </td>
                                                    <td className="text-base">{item.id}</td>
                                                    <td className="text-base">{item.created_at}</td>
                                                    <td className="text-base">{item.production_line.name}</td>
                                                    <td className="text-base">{item.mold_no}</td>
                                                    <td className="text-base">
                                                        {item.defect_rate}%<br />
                                                        <span className="text-sm text-medium-gray">
                                                            ({item.defective_count.toLocaleString()}/{item.total_count.toLocaleString()})
                                                        </span>
                                                    </td>
                                                    <td className={`text-base font-bold ${item.is_abnormal ? "text-point-red" : "text-medium-gray"}`}>
                                                        {item.is_abnormal ? "불량" : "정상"}
                                                    </td>
                                                </tr>
                                                {
                                                    expandedRows.has(item.id) && (
                                                        <tr className="bg-light-gray/20">
                                                            <td colSpan={7} className="py-4">
                                                                <div className="flex justify-center gap-8 text-sm">
                                                                    <div className="flex items-center gap-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedRows.has(item.id)}
                                                                            onChange={() => handleRowSelect(item.id)}
                                                                            className="w-4 h-4 cursor-pointer accent-point-blue"
                                                                        />
                                                                        <span>정상 데이터 ({item.normal_count.toLocaleString()})</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedRows.has(item.id)}
                                                                            onChange={() => handleRowSelect(item.id)}
                                                                            className="w-4 h-4 cursor-pointer accent-point-blue"
                                                                        />
                                                                        <span>불량 데이터 ({item.defective_count.toLocaleString()})</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedRows.has(item.id)}
                                                                            onChange={() => handleRowSelect(item.id)}
                                                                            className="w-4 h-4 cursor-pointer accent-point-blue"
                                                                        />
                                                                        <span>AI 예외 데이터 ({Math.floor(item.total_count * 0.001)})</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-20 text-center text-lg text-medium-gray">
                                                선택된 학습 데이터가 없습니다.
                                            </td>
                                        </tr>
                                    )
                                }

                                {
                                    Array.from({
                                        length: Math.max(
                                            0,
                                            Number(itemsPerPage) -
                                            currentData.length
                                        ),
                                    }).map((_, i) => (
                                        <tr
                                            key={`empty-${i}`}
                                            className="h-[56px] border-b border-light-gray"
                                        >
                                            <td colSpan={7}></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        total={MOCK_DATA.length}
                        page={currentPage}
                        limit={itemsPerPage}
                        tab={currentTab}
                        setPage={setCurrentPage}
                        setTab={setCurrentTab}
                    />

                    <MultipleButton
                        type="simple"
                        title="선택한 데이터 담기"
                        disabled={selectedRows.size === 0}
                        onClick={handleAddToLearningData}
                        className="w-full py-4 text-lg"
                    />

                    <div className="border-t-[4px] border-light-gray" />

                    <div>
                        <h2 className="text-2xl text-black font-bold mb-6">학습 대상 데이터</h2>

                        <div className="bg-white border-y-2 border-light-gray p-6 mb-6">
                            <div className="flex justify-around text-center">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base text-medium-gray">데이터 수</span>
                                    <span className="text-2xl font-bold text-black">
                                        {learningData.length > 0 ? totalDataCount.toLocaleString() : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-base text-medium-gray">정상 데이터 수</span>
                                    <span className="text-2xl font-bold text-black">
                                        {learningData.length > 0 ? totalNormalCount.toLocaleString() : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-base text-medium-gray">불량 데이터 수</span>
                                    <span className="text-2xl font-bold text-black">
                                        {learningData.length > 0 ? totalDefectiveCount.toLocaleString() : "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-base text-medium-gray">AI 예외 데이터 수</span>
                                    <span className="text-2xl font-bold text-black">
                                        {learningData.length > 0 ? totalAiExceptionCount.toLocaleString() : "—"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                            <table className="w-full">
                                <thead className="border-b border-light-gray bg-soft-white">
                                    <tr className="h-[56px] text-center text-base font-bold text-black">
                                        <th>No</th>
                                        <th className="w-[340px]">생산 일자</th>
                                        <th>생산라인</th>
                                        <th>생산 품목</th>
                                        <th>AI 불량률</th>
                                        <th>AI 검사 결과</th>
                                        <th>선택 해제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        learningData.length > 0 ? (
                                            learningData.map((item, idx) => (
                                                <tr
                                                    key={item.id}
                                                    className="h-[60px] text-center border-b border-light-gray"
                                                >
                                                    <td className="text-base">{idx + 1}</td>
                                                    <td className="text-base">{item.created_at}</td>
                                                    <td className="text-base">{item.production_line.name}</td>
                                                    <td className="text-base">{item.mold_no}</td>
                                                    <td className="text-base">
                                                        {item.defect_rate}%<br />
                                                        <span className="text-sm text-medium-gray">
                                                            ({item.defective_count.toLocaleString()}/{(item.normal_count + item.defective_count + item.exception_count).toLocaleString()})
                                                        </span>
                                                    </td>
                                                    <td className={`text-base font-bold ${item.is_abnormal ? "text-point-red" : "text-medium-gray"}`}>
                                                        {item.is_abnormal ? "불량" : "정상"}
                                                    </td>
                                                    <td className="flex items-center justify-center">
                                                        <MultipleButton
                                                            title="해제"
                                                            type="default"
                                                            onClick={() => handleRemoveFromLearningData(item.id)}
                                                            className="p-2 border border-medium-gray rounded hover:bg-light-gray/30"
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="py-15 text-center text-lg text-medium-gray">
                                                    선택된 학습 데이터가 없습니다.
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <MultipleButton
                        type="simple"
                        title="학습 준비"
                        disabled={learningData.length === 0}
                        onClick={handlePrepareTraining}
                        className="w-full py-4 text-lg mt-6"
                    />
                </div>
            </div>
        </Layout>
    );
}
