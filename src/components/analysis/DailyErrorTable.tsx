'use client';

import { useState } from "react";
import Pagination from "../common/Pagination";
import { MOCK_DATA } from "@/app/processing/process-data/page";

export default function DailyErrorTable() {
    const [itemsPerPage, setItemsPerPage] = useState<string>('3');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);

    return (
        <div className="border-[4px] border-light-gray p-6 bg-white">
            <h3 className="items-start text-xl text-black font-bold mb-6">일일 불량 ROLL 알림</h3>
            <div className="flex flex-col items-center justify-between">
                <div className="bg-white items-center border-y-2 border-light-gray overflow-hidden w-full h-full">
                    <table className="w-full">
                        <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                            <tr>
                                <th className="w-[150px] py-2 font-bold">생산일자</th>
                                <th className="w-[160px] py-2 font-bold">생산라인</th>
                                <th className="w-[160px] py-2 font-bold">생산 항목</th>
                                <th className="w-[160px] py-2 font-bold">불량률</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                MOCK_DATA.length !== 0 ?
                                    MOCK_DATA.slice((currentPage - 1) * Number(itemsPerPage), currentPage * Number(itemsPerPage)).map((item) => (
                                        <tr
                                            key={item.id}
                                            className="text-base border-b border-light-gray text-center"
                                        >
                                            <td className="py-3 whitespace-pre-line">
                                                {item.productionDate}
                                            </td>
                                            <td className="py-3 whitespace-pre-line">
                                                {item.productionLine}
                                            </td>
                                            <td className="py-3">{item.product}</td>
                                            <td className="py-3">
                                                {item.defectRate.percentage}%<br />
                                                ({item.defectRate.defectCount}/{item.defectRate.totalCount})
                                            </td>
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
                </div>

                <Pagination
                    total={MOCK_DATA.length}
                    page={currentPage}
                    limit={Number(itemsPerPage)}
                    tab={currentTab}
                    setPage={setCurrentPage}
                    setTab={setCurrentTab}
                />
            </div>
        </div>
    );
}