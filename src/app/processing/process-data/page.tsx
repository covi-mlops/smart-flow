"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import { ProcessDataItem, FilterOptions } from "@/types/processing/process-data";
import Button from "@/components/processing/process-data/Button";
import Pagination from "@/components/common/Pagination";

const HiArrowUp = lazy(() => import('react-icons/hi').then(module => ({
    default: module.HiArrowUp
})));

const HiArrowDown = lazy(() => import('react-icons/hi').then(module => ({
    default: module.HiArrowDown
})));

const BiDown = lazy(() => import('react-icons/bi').then(module => ({
    default: module.BiChevronDown
})));
// 목데이터
// TODO: API 연동 시 변경 
export const MOCK_DATA: ProcessDataItem[] = [
    {
        id: 1,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "100", defectCount: 124, totalCount: 124 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 2,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "0", defectCount: 0, totalCount: 55 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 3,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_1",
        defectRate: { percentage: "0.11", defectCount: 57, totalCount: 52124 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 4,
        productionDate: "2025.11.12\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_2",
        defectRate: { percentage: "0.15", defectCount: 82, totalCount: 55000 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 5,
        productionDate: "2025.11.11\n14:40:25",
        productionLine: "생산라인2",
        product: "contactpin_2",
        defectRate: { percentage: "2.50", defectCount: 1375, totalCount: 55000 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 6,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "100", defectCount: 124, totalCount: 124 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 7,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "0", defectCount: 0, totalCount: 55 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 8,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_1",
        defectRate: { percentage: "0.11", defectCount: 57, totalCount: 52124 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 9,
        productionDate: "2025.11.12\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_2",
        defectRate: { percentage: "0.15", defectCount: 82, totalCount: 55000 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 10,
        productionDate: "2025.11.11\n14:40:25",
        productionLine: "생산라인2",
        product: "contactpin_2",
        defectRate: { percentage: "2.50", defectCount: 1375, totalCount: 55000 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 11,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "100", defectCount: 124, totalCount: 124 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 12,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "0", defectCount: 0, totalCount: 55 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 13,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_1",
        defectRate: { percentage: "0.11", defectCount: 57, totalCount: 52124 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 14,
        productionDate: "2025.11.12\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_2",
        defectRate: { percentage: "0.15", defectCount: 82, totalCount: 55000 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 15,
        productionDate: "2025.11.11\n14:40:25",
        productionLine: "생산라인2",
        product: "contactpin_2",
        defectRate: { percentage: "2.50", defectCount: 1375, totalCount: 55000 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 16,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "100", defectCount: 124, totalCount: 124 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 17,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "0", defectCount: 0, totalCount: 55 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 18,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_1",
        defectRate: { percentage: "0.11", defectCount: 57, totalCount: 52124 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 19,
        productionDate: "2025.11.12\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_2",
        defectRate: { percentage: "0.15", defectCount: 82, totalCount: 55000 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 20,
        productionDate: "2025.11.11\n14:40:25",
        productionLine: "생산라인2",
        product: "contactpin_2",
        defectRate: { percentage: "2.50", defectCount: 1375, totalCount: 55000 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 21,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "100", defectCount: 124, totalCount: 124 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 22,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "0", defectCount: 0, totalCount: 55 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 23,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_1",
        defectRate: { percentage: "0.11", defectCount: 57, totalCount: 52124 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 24,
        productionDate: "2025.11.12\n14:40:25",
        productionLine: "생산라인1",
        product: "contactpin_2",
        defectRate: { percentage: "0.15", defectCount: 82, totalCount: 55000 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
    {
        id: 25,
        productionDate: "2025.11.11\n14:40:25",
        productionLine: "생산라인2",
        product: "contactpin_2",
        defectRate: { percentage: "2.50", defectCount: 1375, totalCount: 55000 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 26,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "100", defectCount: 124, totalCount: 124 },
        inspectionResult: "불량",
        aiModel: "covi_seq_00001"
    },
    {
        id: 27,
        productionDate: "2025.11.13\n14:40:25",
        productionLine: "사용자\n업로드",
        product: "contactpin_1",
        defectRate: { percentage: "0", defectCount: 0, totalCount: 55 },
        inspectionResult: "정상",
        aiModel: "covi_seq_00001"
    },
];

export default function ProcessDataPage() {
    const router = useRouter();

    const [filters, setFilters] = useState<FilterOptions>({
        product: "전체",
        startDate: "2025-05-21",
        endDate: "2025-05-21",
        productionLine: "전체",
        inspectionResult: "전체",
        aiModel: "전체"
    });
    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
    const [itemsPerPage, setItemsPerPage] = useState<string>('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);
    const [sortConfig, setSortConfig] = useState<string>('desc');

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSelectAll = () => {
        const allIds = MOCK_DATA
            .slice((currentPage - 1) * Number(itemsPerPage), currentPage * Number(itemsPerPage))
            .map(item => item.id);
        setSelectedItems(allIds);
    };

    const handleDeselectAll = () => {
        setSelectedItems([]);
    };

    const handleToggleItem = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const handleSort = (value: string) => {
        setSortConfig(value);
        setIsOpenTab(false);
        // TODO: API 연동 - 데이터 정렬 순서 변경
    };

    const handleDeleteSelected = () => {
        // TODO: API 연동 - 선택한 항목이 목록에서 삭제되도록 적용
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpenTab(false);
            }
        };

        if (isOpenTab) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenTab]);

    useEffect(() => {
        setSelectedItems([]);
    }, [currentPage]);

    const productOptions = [
        { label: "전체", value: "전체" },
        { label: "contactpin_1", value: "contactpin_1" },
        { label: "contactpin_2", value: "contactpin_2" }
    ];

    const lineOptions = [
        { label: "전체", value: "전체" },
        { label: "생산라인1", value: "생산라인1" },
        { label: "생산라인2", value: "생산라인2" }
    ];

    const resultOptions = [
        { label: "전체", value: "전체" },
        { label: "정상", value: "정상" },
        { label: "불량", value: "불량" }
    ];

    const modelOptions = [
        { label: "전체", value: "전체" },
        { label: "covi_seq_00001", value: "covi_seq_00001" }
    ];

    const itemsPerPageOptions = [
        { label: "10개", value: "10" },
        { label: "20개", value: "20" },
        { label: "50개", value: "50" }
    ];

    return (
        <Layout headerTitle="데이터 가공">
            <div className="flex flex-col gap-6 w-full h-full p-6">
                <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                    <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[92px]">
                        <h2 className="text-lg font-bold text-black">검사 항목</h2>
                    </div>

                    <div className="flex flex-row items-center justify-start w-full gap-3 px-4 py-4">
                        <Picker
                            type="select"
                            title="생산품목"
                            value={filters.product}
                            onChange={(value) => handleFilterChange("product", value)}
                            options={productOptions}
                        />

                        <Picker
                            type="date"
                            title="생산 시작 일자"
                            value={filters.startDate}
                            onChange={(value) => handleFilterChange("startDate", value)}
                        />

                        <Picker
                            type="date"
                            title="생산 종료 일자"
                            value={filters.endDate}
                            onChange={(value) => handleFilterChange("endDate", value)}
                        />

                        <Picker
                            type="select"
                            title="생산라인"
                            value={filters.productionLine}
                            onChange={(value) => handleFilterChange("productionLine", value)}
                            options={lineOptions}
                        />

                        <Picker
                            type="select"
                            title="AI 검사 결과"
                            value={filters.inspectionResult}
                            onChange={(value) => handleFilterChange("inspectionResult", value)}
                            options={resultOptions}
                        />

                        <Picker
                            type="select"
                            title="AI 모델"
                            value={filters.aiModel}
                            onChange={(value) => handleFilterChange("aiModel", value)}
                            options={modelOptions}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Picker
                            type="select"
                            title=""
                            value={itemsPerPage}
                            onChange={setItemsPerPage}
                            options={itemsPerPageOptions}
                        />

                        <Button
                            type="selectAll"
                            title="모두 선택"
                            disabled={selectedItems.length === 10}
                            onClick={handleSelectAll}
                        />

                        <Button
                            type="default"
                            title="모두 해제"
                            disabled={selectedItems.length === 0}
                            onClick={handleDeselectAll}
                        />
                    </div>

                    <Button
                        type="default"
                        title="선택한 항목 삭제"
                        onClick={handleDeleteSelected}
                        disabled={selectedItems.length === 0}
                    />
                </div>
                {/* TODO: 표 컴포넌트화 고려해보기 */}
                <div className="bg-white border-y-2 border-light-gray overflow-hidden h-[784px]">
                    <table className="w-full">
                        <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                            <tr>
                                <th className="py-3 w-16">선택</th>
                                <th className="py-3 w-16">No</th>
                                <th
                                    className="py-3 cursor-pointer"
                                    onClick={() => setIsOpenTab(!isOpenTab)}
                                >
                                    <div
                                        ref={modalRef}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        {
                                            sortConfig === "desc"
                                                ? <HiArrowDown size={20} className="text-point-blue" />
                                                : <HiArrowUp size={20} className="text-point-blue" />
                                        }
                                        <span className="font-bold">생산 일자</span>
                                        <BiDown size={26} />
                                    </div>
                                </th>
                                <th className="py-3 font-bold">생산라인</th>
                                <th className="py-3 font-bold">생산 품목</th>
                                <th className="py-3 font-bold">AI 불량률</th>
                                <th className="py-3 font-bold">AI 검사 결과</th>
                                <th className="py-3 font-bold">AI 모델</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                MOCK_DATA.length !== 0 ?
                                    MOCK_DATA.slice((currentPage - 1) * Number(itemsPerPage), currentPage * Number(itemsPerPage)).map((item) => (
                                        <tr
                                            key={item.id}
                                            className="text-base border-b border-light-gray text-center hover:bg-light-gray/30 cursor-pointer"
                                            onClick={() => router.push(`/processing/process-data/${item.id}`)}
                                        >
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleToggleItem(item.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-8 h-8 cursor-pointer accent-point-blue"
                                                />
                                            </td>
                                            <td className="px-4 py-3">{item.id}</td>
                                            <td className="px-4 py-3 whitespace-pre-line">
                                                {item.productionDate}
                                            </td>
                                            <td className="px-4 py-3 whitespace-pre-line">
                                                {item.productionLine}
                                            </td>
                                            <td className="px-4 py-3">{item.product}</td>
                                            <td className="px-4 py-3">
                                                {item.defectRate.percentage}%<br />
                                                ({item.defectRate.defectCount}/{item.defectRate.totalCount})
                                            </td>
                                            <td className={`px-4 py-3 font-bold ${item.inspectionResult === "불량" ? "text-point-red" : ""}`}>
                                                {item.inspectionResult}
                                            </td>
                                            <td className="px-4 py-3">{item.aiModel}</td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="py-40 text-center font-bold text-lg text-medium-gray"
                                            >
                                                조회되는 생산 데이터가 없습니다.
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>

                    {
                        isOpenTab && (
                            <div
                                ref={modalRef}
                                className="absolute w-[140px] top-[410px] left-[420px] right-0 mt-1 bg-white border border-light-gray rounded shadow-lg z-50 max-h-60 overflow-y-auto"
                            >
                                <div
                                    className="flex flex-row gap-6 px-4 py-2 border border-light-gray hover:bg-light-gray/20 cursor-pointer text-sm"
                                    onClick={() => handleSort("desc")}
                                >
                                    <Suspense>
                                        <HiArrowDown size={18} />
                                    </Suspense>
                                    <p>최신 순</p>
                                </div>
                                <div
                                    className="flex flex-row gap-6 px-4 py-2 border border-light-gray hover:bg-light-gray/20 cursor-pointer text-sm"
                                    onClick={() => handleSort("asc")}
                                >
                                    <Suspense>
                                        <HiArrowUp size={18} />
                                    </Suspense>
                                    <p>오래된 순</p>
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    MOCK_DATA.length !== 0
                    && <Pagination
                        total={MOCK_DATA.length}
                        page={currentPage}
                        limit={Number(itemsPerPage)}
                        tab={currentTab}
                        setPage={setCurrentPage}
                    />
                }
            </div>
        </Layout>
    );
}