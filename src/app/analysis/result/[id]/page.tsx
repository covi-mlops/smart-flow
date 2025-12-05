'use client';

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import Pagination from "@/components/common/Pagination";
import { ProductionHistoryEachItemData_A } from "@/types/analysis/types";
import { useSelectedImageStore } from "@/store/store";
import { analysisApi } from "@/apis/analysis";
import { formatDate } from "@/utils/formatDate";
import { commonApi } from "@/apis/common";

export default function AnalysisDataDetailPage() {
    const params = useParams();
    const id = Number(params.id);
    const canvasRef = useRef<HTMLCanvasElement>(null); // 비트맵 이미지용 ref 객체

    const [data, setData] = useState<ProductionHistoryEachItemData_A>();
    const itemsPerPage = '10';
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState(1);

    const {
        selectedImageId,
        setSelectedImageId,
        selectedImageUrl,
        setSelectedImageUrl,
    } = useSelectedImageStore();

    const [filters, setFilters] = useState<{
        classification_result: string,
        refined: string,
        label: string
    }>({
        classification_result: "전체",
        refined: "전체",
        label: "Contact Pin",
    });

    const classificationResultOptions = [
        { label: "전체", value: "전체" },
        { label: "정상", value: "정상" },
        { label: "불량", value: "불량" },
        { label: "예외", value: "예외" },
    ];

    const refinedOptions = [
        { label: "전체", value: "전체" },
        { label: "O", value: "true" },
        { label: "X", value: "false" },
    ];

    const handleFilterChange = (key: keyof { classification_result: string, refined: string, label: string }, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleBitmapImage = (polygonData: number[][][]) => {
        if (!canvasRef.current || !selectedImageUrl) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const image = new window.Image();
        image.crossOrigin = "anonymous"; // CORS 설정
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            if (polygonData && polygonData.length > 0) {
                polygonData.forEach((polygon) => {
                    if (polygon.length > 0) {
                        ctx.beginPath();
                        ctx.moveTo(polygon[0][0], polygon[0][1]);

                        for (let i = 1; i < polygon.length; i++) {
                            ctx.lineTo(polygon[i][0], polygon[i][1]);
                        }

                        ctx.closePath();

                        ctx.lineJoin = 'round';
                        ctx.lineCap = 'round';
                        ctx.fillStyle = "rgba(0, 255, 0, 0.15)";
                        ctx.strokeStyle = "#00B71B60";
                        ctx.lineWidth = 8;
                        ctx.stroke();
                        ctx.fill();
                    }
                });
            }
        };

        image.onerror = (error) => {
            console.error('이미지 로드 실패', error);
        };

        image.src = selectedImageUrl;
    };

    const handleData = async () => {
        try {
            const data = await analysisApi.viewProductionHistoryItem(
                id, filters.classification_result, currentPage, Number(itemsPerPage), filters.refined
            );

            if (data && data.status === "SUCCESS") {
                setData(data.data);
            }
        } catch (error) {
            console.log('handleData error', error);
        }
    };

    const handlePolygonData = async () => {
        try {
            const data = await commonApi.viewPolygonData(selectedImageId);

            if (data && data.status === "SUCCESS") {
                handleBitmapImage(data.data.mask_poly);
            }
        } catch (error) {
            console.log('handlePolygonData error', error);
        }
    };

    useEffect(() => {
        handleData();
    }, [currentPage, tab, filters]);

    useEffect(() => {
        setSelectedImageId('');
        setSelectedImageUrl('');
    }, [filters, currentPage]);

    useEffect(() => {
        if (selectedImageId) {
            handlePolygonData();
        }
    }, [selectedImageId]);

    useEffect(() => {
        return () => {
            setSelectedImageId('');
            setSelectedImageUrl('');
        }
    }, [setSelectedImageId, setSelectedImageUrl]);

    return (
        <Layout headerTitle="인공지능 분석">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="결과 상세 조회" />

                <div className="flex flex-col p-6 pb-0">
                    <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산 품목</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold">
                            <p>{data?.results.production_name}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">ROLL 번호</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold">
                            <p>{data?.results.mold_no}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산일자</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold">
                            <p>{data?.results.created_at && formatDate(data?.results.created_at)}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산라인</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold">
                            <p>{data?.results.production_line.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 검사일자</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold">
                            <p>{data?.results.first_image_created_at ? formatDate(data.results.first_image_created_at) : 'ㅡ'}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 검사 결과</h2>
                        </div>
                        <div className={`flex flex-row items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold ${data?.results.is_abnormal ? "text-point-red" : "text-medium-gray"}`}>
                            <p>
                                {data?.results.is_abnormal ? "불량" : "정상"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 모델</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full min-w-[300px] gap-3 px-4 py-4 font-bold">
                            <p>{data?.results.applied_model}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 불량률</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full min-w-[300px] px-4 py-[11px] font-bold">
                            <p>{data?.results.defect_rate.toFixed(2)}%</p>
                            <p>({data?.results.defective_count}/{data?.results.total_count})</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 헤드</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full min-w-[110px] px-4 font-bold">
                            <p>{data?.results.inspection_parameters.head.min} 이상</p>
                            <p>{data?.results.inspection_parameters.head.max} 이하</p>
                        </div>
                        <div className="flex items-center text-medium-gray justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 Y부</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full min-w-[110px] px-4 font-bold">
                            <p>{data?.results.inspection_parameters.neck.min} 이상</p>
                            <p>{data?.results.inspection_parameters.neck.max} 이하</p>
                        </div>
                        <div className="flex items-center text-medium-gray justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 빗각L</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full min-w-[110px] px-4 font-bold">
                            <p>{data?.results.inspection_parameters.angl.min} 이상</p>
                            <p>{data?.results.inspection_parameters.angl.max} 이하</p>
                        </div>
                        <div className="flex items-center text-medium-gray justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 빗각R</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full min-w-[110px] px-4 font-bold">
                            <p>{data?.results.inspection_parameters.angr.min} 이상</p>
                            <p>{data?.results.inspection_parameters.angr.max} 이하</p>
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
                                    value={filters.classification_result}
                                    onChange={(value) =>
                                        handleFilterChange("classification_result", value)
                                    }
                                    options={classificationResultOptions}
                                />
                                <Picker
                                    type="select"
                                    title="가공 여부"
                                    value={filters.refined === null ? "전체" : String(filters.refined)}
                                    onChange={(value) => handleFilterChange("refined", value)}
                                    options={refinedOptions}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-end font-bold text-black">
                            <p>전체: {data ? data.count.toLocaleString() : 0}건</p>
                        </div>

                        <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                            <table className="w-full min-w-[720px] h-[550px]">
                                <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                                    <tr>
                                        <th className="py-3 w-[80px]">No</th>
                                        <th className="py-3 w-[400px]">컨택트 핀 이미지</th>
                                        <th className="py-3">AI 결과</th>
                                        <th className="py-3">가공 여부</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data?.count !== 0 ? (
                                            data?.results.datasets
                                                .map((item, idx) => (
                                                    <tr
                                                        key={String((currentPage - 1) * Number(itemsPerPage) + idx) + '_' + item.id}
                                                        className={`h-[55px] text-base border-b border-light-gray cursor-pointer ${selectedImageId === item.id ? "bg-point-blue/50 text-white" : "bg-white hover:bg-light-gray/30"}`}
                                                        onClick={() => {
                                                            setSelectedImageId(item.id);
                                                            setSelectedImageUrl(item.image_url);
                                                        }}
                                                    >
                                                        <td className="px-6 py-3 text-center">{(currentPage - 1) * Number(itemsPerPage) + idx + 1}</td>
                                                        <td className="px-4 py-3">{item.dataset_id}</td>
                                                        <td className={`px-4 py-3 font-bold text-center ${item.classification_result === "불량" ? "text-point-red" : selectedImageId === item.id ? "text-white" : "text-medium-gray"} `}>{item.classification_result}</td>
                                                        <td className="px-4 py-3 text-center">{item.refined_at !== null ? "O" : "X"}</td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="py-[260px] text-center font-bold text-lg text-medium-gray"
                                                >
                                                    조회되는 데이터가 없습니다.
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {
                                        data && data.results.datasets.length > 0
                                        && Array.from({
                                            length: Math.max(
                                                0,
                                                Number(itemsPerPage) -
                                                data.results.datasets.length
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

                        {
                            data && data?.count > 0
                            && <Pagination
                                total={data.count}
                                page={currentPage}
                                limit={Number(itemsPerPage)}
                                tab={tab}
                                setPage={setCurrentPage}
                                setTab={setTab}
                            />
                        }
                    </div>

                    <div className="min-w-[500px] flex flex-col gap-6 pt-[74px]">
                        <div className="h-[510px] border-[4px] border-light-gray bg-soft-white flex items-center justify-center p-6">
                            {
                                selectedImageUrl === '' ? (
                                    <p className="text-medium-gray text-xl">
                                        이미지를 선택해주세요
                                    </p>
                                ) : (
                                    <div className="flex flex-col items-center gap-12">
                                        <p className="text-xl text-black font-bold">이미지 View</p>
                                        <div className="w-[440px] h-[330px] relative">
                                            <canvas
                                                ref={canvasRef}
                                                className="max-w-full max-h-[330px] object-contain"
                                            />
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
                                <div
                                    className={`flex flex-row items-center justify-center w-full px-4 py-4 font-bold 
                                        ${data?.results.datasets.map((d) =>
                                        d.id === selectedImageId
                                            && d.attributes.head >= data.results.inspection_parameters.head.min
                                            && d.attributes.head <= data.results.inspection_parameters.head.max
                                            ? "text-medium-gray"
                                            : "text-point-red"
                                    )}`}
                                >
                                    <p>{data?.results.datasets.map((d) => d.id === selectedImageId && d.attributes.head)}</p>
                                </div>
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">Y부</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    <p>{data?.results.datasets.map((d) => d.id === selectedImageId && d.attributes.neck)}</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">빗각L</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    <p>{data?.results.datasets.map((d) => d.id === selectedImageId && d.attributes.angl)}</p>
                                </div>
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">빗각R</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    <p>{data?.results.datasets.map((d) => d.id === selectedImageId && d.attributes.angr)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}