import { UploadData } from "@/types/analysis/upload";
import Pagination from "@/components/common/Pagination";
import { useState, useMemo } from "react";

interface UploadDataTableProps {
    data: UploadData[];
}

export default function UploadDataTable({ data }: UploadDataTableProps) {
    const [page, setPage] = useState(1);
    const [tab, setTab] = useState(1);
    const limit = 5;

    const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return data.slice(startIndex, endIndex);
    }, [data, page, limit]);

    return (
        <div>
            <div className="overflow-hidden overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-soft-white border-y-[2px] border-light-gray text-center text-lg text-black font-bold text-medium-gray">
                            <th className="w-[110px] py-4 px-4">
                                No
                            </th>
                            <th className="w-[330px] py-4 px-4">
                                업로드 날짜
                            </th>
                            <th className="w-[250px] py-4 px-4">
                                검사 항목
                            </th>
                            <th className="py-4 px-4">
                                검사 데이터
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            paginatedData.length === 0 ? (
                                <tr className="border-b border-light-gray">
                                    <td colSpan={4} className="py-[205px] text-center text-medium-gray text-lg">
                                        업로드된 데이터가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, idx) => (
                                    <tr key={idx} className="h-[82px] border-b border-light-gray text-center text-medium-gray">
                                        <td className="py-4 px-4">
                                            {(tab - 1) + (page - 1) * limit + idx + 1}
                                        </td>
                                        <td className="py-4 px-4">
                                            {item.uploadDate}
                                        </td>
                                        <td className="py-4 px-4">
                                            {item.inspectionItem}
                                        </td>
                                        <td className="py-4 px-4 whitespace-pre-line">
                                            {item.inspectionData}
                                        </td>
                                    </tr>
                                ))

                            )
                        }

                        {
                            Array.from({
                                length: Math.max(
                                    0,
                                    Number(limit) - data.slice((page - 1) * Number(limit), page * Number(limit)).length
                                )
                            }).map((_, i) => (
                                <tr key={`empty-${i}`} className="h-[82px] border-b border-light-gray">
                                    <td colSpan={8}></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                data.length > 0 && (
                    <Pagination
                        total={data.length}
                        page={page}
                        limit={limit}
                        tab={tab}
                        setPage={setPage}
                        setTab={setTab}
                    />
                )
            }
        </div>
    );
}
