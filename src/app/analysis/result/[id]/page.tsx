'use client';

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextImage from "next/image";

import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import Pagination from "@/components/common/Pagination";
import { DETAIL_MOCK_DATA } from "@/mock/analysis/mock";
import { ProductionHistoryEachItem_A } from "@/types/analysis/types";
import { useSelectedImageStore } from "@/store/store";
import { MOCK_POLYGONS } from "@/mock/mock_polygons";

export default function AnalysisDataDetailPage() {
    const params = useParams();
    const id = params.id;
    const canvasRef = useRef<HTMLCanvasElement>(null); // 비트맵 이미지용 ref 객체

    const [data, setData] = useState<ProductionHistoryEachItem_A>();
    const [itemsPerPage, setItemsPerPage] = useState<string>('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState(1);

    const { selectedImageId, setSelectedImageId } = useSelectedImageStore();

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

    const handleFilterChange = (key: keyof { inspectionResult: string, isProcess: string, label: string }, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };
    // TODO: API 연동 시 수정
    const handleBitmapImage = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const image = new window.Image();
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            // TODO: INITIAL_MASK_POLY -> 라벨 데이터로 변경
            if (selectedImageId !== '') {
                MOCK_POLYGONS[selectedImageId].forEach((polygon) => {
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

        image.src = `/assets/mock_data_images/${selectedImageId}.bmp`;
    };

    useEffect(() => {
        const selected_data = DETAIL_MOCK_DATA.filter((item) => item.id === Number(id) && item)
        setData(selected_data[0]);
    }, []);

    useEffect(() => {
        handleBitmapImage();
    }, [selectedImageId]);

    useEffect(() => {
        return () => {
            setSelectedImageId('');
        }
    }, [setSelectedImageId]);

    return (
        <Layout headerTitle="인공지능 분석">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="결과 상세 조회" />

                <div className="flex flex-col p-6 pb-0">
                    <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산 품목</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.production_name}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">ROLL 번호</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.mold_no}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산일자</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.created_at}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산라인</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.production_line.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 검사일자</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.first_image_created_at}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 검사 결과</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>
                                {data?.is_abnormal ? "불량" : "정상"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 모델</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>{data?.applied_model}</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 불량률</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full px-4 py-[11px] font-bold">
                            <p>{data?.defect_rate}%</p>
                            <p>({data?.defective_count}/{data?.total_count})</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 헤드</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full px-4 font-bold">
                            <p>{data?.inspection_parameters.head.min} 이상</p>
                            <p>{data?.inspection_parameters.head.max} 이하</p>
                        </div>
                        <div className="flex items-center text-medium-gray justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 Y부</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full px-4 font-bold">
                            <p>{data?.inspection_parameters.neck.min} 이상</p>
                            <p>{data?.inspection_parameters.neck.max} 이하</p>
                        </div>
                        <div className="flex items-center text-medium-gray justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 빗각L</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full px-4 font-bold">
                            <p>{data?.inspection_parameters.angl.min} 이상</p>
                            <p>{data?.inspection_parameters.angl.max} 이하</p>
                        </div>
                        <div className="flex items-center text-medium-gray justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 빗각R</h2>
                        </div>
                        <div className="flex flex-col text-medium-gray items-center justify-center w-full px-4 font-bold">
                            <p>{data?.inspection_parameters.angr.min} 이상</p>
                            <p>{data?.inspection_parameters.angr.max} 이하</p>
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
                            <p>전체: {data ? data.datasets.length.toLocaleString() : 0}건</p>
                        </div>

                        <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                            <table className="w-full h-[550px]">
                                <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                                    <tr>
                                        <th className="py-3 w-[80px]">No</th>
                                        <th className="py-3 w-[500px]">컨택트 핀 이미지</th>
                                        <th className="py-3">AI 결과</th>
                                        <th className="py-3">가공 여부</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data?.datasets.length !== 0 ? (
                                            data?.datasets
                                                .slice(
                                                    (currentPage - 1) * Number(itemsPerPage),
                                                    currentPage * Number(itemsPerPage)
                                                )
                                                .map((item, idx) => (
                                                    <tr
                                                        key={String((currentPage - 1) * Number(itemsPerPage) + idx) + '_' + item.id}
                                                        className={`h-[55px] text-base border-b border-light-gray text-center cursor-pointer ${selectedImageId === item.id ? "bg-point-blue/50 text-white" : "bg-white hover:bg-light-gray/30"}`}
                                                        onClick={() => setSelectedImageId(item.id)}
                                                    >
                                                        <td className="px-4 py-3">{(currentPage - 1) * Number(itemsPerPage) + idx + 1}</td>
                                                        {/* TODO: 이미지 이름 다시 확인해서 넣기 */}
                                                        <td className="px-4 py-3">{item.id}</td>
                                                        <td className={`px-4 py-3 font-bold ${item.classification_result === "불량" ? "text-point-red" : selectedImageId === item.id ? "text-white" : "text-medium-gray"} `}>{item.classification_result}</td>
                                                        <td className="px-4 py-3">{item.refined_at !== null ? "O" : "X"}</td>
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
                                        data && Array.from({
                                            length: Math.max(
                                                0,
                                                Number(itemsPerPage) -
                                                data.datasets.slice(
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

                        {
                            data
                            && <Pagination
                                total={data?.datasets.length}
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
                                selectedImageId === '' ? (
                                    <p className="text-medium-gray text-xl">
                                        이미지를 선택해주세요
                                    </p>
                                ) : (
                                    // TODO: API 연동 시 실제 이미지 id, 이미지 객체랑 연결
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
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* <p>{data?.datasets.map((d) => d.id === selectedImageId && d.attributes.head)}</p> */}
                                    <p>0.7581</p>
                                </div>
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">Y부</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* <p>{data?.datasets.map((d) => d.id === selectedImageId && d.attributes.neck)}</p> */}
                                    <p>0.2819</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">빗각L</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* <p>{data?.datasets.map((d) => d.id === selectedImageId && d.attributes.angl)}</p> */}
                                    <p>0.3529</p>
                                </div>
                                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                    <h2 className="text-lg text-black">빗각R</h2>
                                </div>
                                <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                    {/* <p>{data?.datasets.map((d) => d.id === selectedImageId && d.attributes.angr)}</p> */}
                                    <p>0.3123</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}