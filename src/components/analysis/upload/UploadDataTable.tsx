import { useState, useEffect, useCallback } from "react";

import Pagination from "@/components/common/Pagination";
import { BsFillFolderFill, BsImages } from "react-icons/bs";
import { analysisApi } from "@/apis/analysis";
import { formatDate } from "@/utils/formatDate";
import { useUploadedDataStore } from "@/store/store";

export default function UploadDataTable() {
    const [page, setPage] = useState(1);
    const [tab, setTab] = useState(1);
    const limit = 10;

    const { uploadedData, setUploadedData, setUploadedDataLength } = useUploadedDataStore();

    const handleUploadedData = useCallback(async () => {
        try {
            const response = await analysisApi.viewUploadHistories(page, limit);

            if (response && response.status === "SUCCESS") {
                setUploadedData(response.data);
                setUploadedDataLength(response.data.count);
            }
        } catch (error) {
            console.error('handleUploadedData error', error);
        }
    }, [page, limit]);

    useEffect(() => {
        handleUploadedData();
    }, [page, tab]);

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
                            !uploadedData || uploadedData.count === 0 ? (
                                <tr className="border-b border-light-gray">
                                    <td colSpan={4} className="py-[205px] text-center text-medium-gray text-lg">
                                        업로드된 데이터가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                uploadedData.results.map((item, idx) => (
                                    <tr key={idx} className="h-[82px] border-b border-light-gray text-center text-medium-gray">
                                        <td className="py-4 px-4">
                                            {(tab - 1) + (page - 1) * limit + idx + 1}
                                        </td>
                                        <td className="py-4 px-4">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="py-4 px-4">
                                            {item.production_name}
                                        </td>
                                        <td className="flex flex-col items-center py-4 px-4 whitespace-pre-line">
                                            <p>{item.file_count}건</p>
                                            <div className="flex flex-row gap-2 items-center">
                                                {
                                                    item.is_uploaded.endsWith('.png') || item.is_uploaded.endsWith('.bmp') ? <BsImages /> : <BsFillFolderFill />
                                                }
                                                <p>{item.is_uploaded}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            )
                        }

                        {
                            uploadedData && uploadedData.results.length > 0
                            && Array.from({
                                length: Math.max(
                                    0,
                                    Number(limit) - uploadedData.results.length
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
                uploadedData && uploadedData.results.length > 0 && (
                    <Pagination
                        total={uploadedData.count}
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
