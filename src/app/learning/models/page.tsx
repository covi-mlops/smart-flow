'use client';

import { Fragment, useEffect, useState } from "react";

import MultipleButton from "@/components/common/MultipleButton";
import { Picker } from "@/components/common/Picker";
import Layout from "@/components/layout/Layout";
import { LIST_MOCK_DATA } from "@/mock/learning/mock";
import { ResultsItem } from "@/types/learning/types";
import { GiCheckMark } from "react-icons/gi";
import Pagination from "@/components/common/Pagination";

interface FilterOptions {
    production_name: string;
    start_learning_at: string;
}

export default function ModelsPage() {
    const [data, setData] = useState<ResultsItem[]>(LIST_MOCK_DATA);
    const [itemsPerPage, setItemsPerPage] = useState<string>('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const currentData = data.slice(
        (currentPage - 1) * Number(itemsPerPage),
        currentPage * Number(itemsPerPage)
    );

    const [filters, setFilters] = useState<FilterOptions>({
        production_name: "전체",
        start_learning_at: new Date().toISOString().split('T')[0],
    });

    const productOptions = [
        { label: "전체", value: "전체" },
        { label: "contactpin_1", value: "contactpin_1" },
        { label: "contactpin_2", value: "contactpin_2" },
    ];

    const itemsPerPageOptions = [
        { label: "10개", value: "10" },
        { label: "20개", value: "20" },
        { label: "50개", value: "50" }
    ];

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSelectAll = () => {
        const allIds = data
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

    const handleDeleteSelected = () => {
        setData(prev => prev.filter((data) => !selectedItems.includes(data.id)));
        setSelectedItems([]);
        // TODO: 페이지네이션 로직 서버 쪽과 맞추기
    };

    useEffect(() => {
        setSelectedItems([]);
    }, [currentPage]);

    return (
        <Layout headerTitle="인공지능 모델">
            <div className="flex flex-col gap-6 w-full h-full p-6">
                <h2 className="text-3xl text-black font-bold">인공지능 모델 목록</h2>
                <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                    <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[88px]">
                        <h2 className="text-lg font-bold text-black">검사 항목</h2>
                    </div>

                    <div className="flex flex-row items-center justify-start w-full gap-3 px-4 py-4">
                        <Picker
                            type="select"
                            title="생산품목"
                            value={filters.production_name}
                            onChange={(value) =>
                                handleFilterChange("production_name", value)
                            }
                            options={productOptions}
                        />

                        <Picker
                            type="date"
                            title="생산 시작 일자"
                            value={filters.start_learning_at}
                            onChange={(value) =>
                                handleFilterChange("start_learning_at", value)
                            }
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="flex items-center gap-3">
                        <Picker
                            type="select"
                            title=""
                            value={itemsPerPage}
                            onChange={setItemsPerPage}
                            options={itemsPerPageOptions}
                        />

                        <MultipleButton
                            type="selectAll"
                            title="모두 선택"
                            disabled={selectedItems.length === 10}
                            onClick={handleSelectAll}
                            className="w-[95px]"
                        />

                        <MultipleButton
                            type="default"
                            title="모두 해제"
                            disabled={selectedItems.length === 0}
                            onClick={handleDeselectAll}
                            className="w-[95px]"
                        />
                    </div>

                    <MultipleButton
                        type="default"
                        title="삭제"
                        disabled={selectedItems.length === 0}
                        onClick={handleDeleteSelected}
                        className="w-[95px]"
                    />
                </div>

                <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-light-gray bg-soft-white">
                            <tr className="flex flex-row items-center h-[56px] text-center text-base font-bold text-black">
                                <th className="w-[80px]">선택</th>
                                <th className="w-[360px]">검사 항목</th>
                                <th className="w-[360px]">모델 이름</th>
                                <th className="w-[160px]">모델 적용 여부</th>
                                <th className="w-[200px]">데이터 수</th>
                                <th className="w-[200px]">ACCURACY LOSS</th>
                                <th className="w-[280px]">학습 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ? (
                                    currentData.map((item) => (
                                        <Fragment key={item.id}>
                                            <tr
                                                className="h-[70px] text-medium-gray flex flex-row items-center text-center border-b border-light-gray bg-white hover:bg-light-gray/30"
                                            >
                                                <td className="w-[80px] flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => handleToggleItem(item.id)}
                                                        className="w-8 h-8 cursor-pointer accent-point-blue"
                                                    />
                                                </td>
                                                <td className="w-[360px] text-base">
                                                    {item.trained_with.length > 0 ? `${item.trained_with[0]} 외 ${item.trained_with.length - 1}종` : 'ㅡ'}
                                                </td>
                                                <td className="w-[360px] text-base">
                                                    {item.server_type}
                                                </td>
                                                <td className="w-[160px] text-base flex justify-center">
                                                    {
                                                        item.is_applied
                                                            ? <GiCheckMark size={30} className="text-point-blue" />
                                                            : null
                                                    }
                                                </td>
                                                <td className="w-[200px] text-base">
                                                    데이터 수
                                                </td>
                                                <td className="w-[200px] text-base flex flex-col gap-1">
                                                    <p>{item.accuracy}</p>
                                                    <p className="h-[1px] bg-light-gray" />
                                                    <p>{item.loss}</p>
                                                </td>
                                                <td className="w-[280px]">
                                                    {item.process_done_at}
                                                </td>
                                            </tr>
                                        </Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-[340px] text-center text-lg text-medium-gray">
                                            현재 존재하는 인공지능 모델이 없습니다.
                                        </td>
                                    </tr>
                                )
                            }

                            {
                                currentData.length > 0 && currentData.length < Number(itemsPerPage)
                                && Array.from({
                                    length: Math.max(
                                        0,
                                        Number(itemsPerPage) -
                                        currentData.length
                                    ),
                                }).map((_, i) => (
                                    <tr
                                        key={`empty-${i}`}
                                        className="h-[70px] border-b border-light-gray"
                                    >
                                        <td colSpan={7}></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    currentData.length !== 0
                        ? <Pagination
                            total={LIST_MOCK_DATA.length}
                            page={currentPage}
                            limit={Number(itemsPerPage)}
                            tab={currentTab}
                            setPage={setCurrentPage}
                            setTab={setCurrentTab}
                        />
                        : (
                            <div className="w-full h-[64px]" />
                        )
                }
            </div>
        </Layout>
    );
}