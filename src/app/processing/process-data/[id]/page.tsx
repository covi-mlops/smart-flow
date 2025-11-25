'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import HistogramChart from "@/components/processing/process-data/HistogramChart";
import { Picker } from "@/components/common/Picker";
import Pagination from "@/components/common/Pagination";
import MultipleButton from "@/components/common/MultipleButton";
import { MOCK_DATA } from "@/mock/processing/mock";
import { ProductionHistoryItem } from "@/types/common/types";
import { INITIAL_MASK_POLY } from "@/components/processing/process-data/EditImage";

export default function ProcessDataDetailPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null); // 비트맵 이미지용 ref 객체
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

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      // TODO: INITIAL_MASK_POLY -> 라벨 데이터로 변경
      INITIAL_MASK_POLY.forEach((polygon) => {
        if (polygon.length > 0) {
          ctx.beginPath();
          ctx.moveTo(polygon[0][0], polygon[0][1]);

          for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i][0], polygon[i][1]);
          }

          ctx.closePath();

          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.strokeStyle = "#00B71B60";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = "#00B71B60";
          ctx.fill();
        }
      });
    };

    image.src = "/assets/contactpin_ex_image.png";
  };

  useEffect(() => {
    const selected_data = MOCK_DATA.filter((item) => item.id === Number(id) && item)
    setData(selected_data[0]);
  }, []);

  useEffect(() => {
    if (bitmapOn) {
      handleBitmapImage();
    }
  }, [bitmapOn, selectedImageNumber]);

  return (
    <Layout headerTitle="데이터 가공">
      <div className="w-full flex flex-col">
        <SemiHeader headerTitle="결과 상세 조회" />

        <div className="flex flex-col p-6">
          <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
              <h2 className="text-lg text-black">검사 항목</h2>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
              <p>{data?.mold_no}</p>
            </div>
            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
              <h2 className="text-lg text-black">ROLL 번호</h2>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
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
              {/* TODO: API 명세 나오면 수정 */}
              <p>2025.05.20 15:03:30</p>
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
        </div>

        <div className="px-6">
          <HistogramChart />
        </div>

        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="flex flex-col min-w-[500px] gap-6">
            <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
              <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px]">
                <h2 className="text-lg font-bold text-black">분류</h2>
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
              <p>전체: {data ? data?.defective_count + data?.normal_count : 0}건</p>
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
                            <td className={`px-4 py-3 font-bold ${item.ai_result === "불량" ? "text-point-red" : selectedImageNumber === item.id ? "text-white" : "text-medium-gray"} `}>
                              {item.ai_result}
                            </td>
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

          <div className="min-w-[500px] flex flex-col gap-6">
            <div>
              <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px]">
                  <h2 className="text-lg font-bold text-black">가공 타입</h2>
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-3 px-4">
                  <p>Polygon</p>
                </div>
              </div>

              <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px]">
                  <h2 className="text-lg font-bold text-black">라벨</h2>
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-3 px-4">
                  <Picker
                    type="select"
                    title=""
                    value={filters.label}
                    onChange={(value) => handleFilterChange("label", value)}
                    options={labelOptions}
                    className="w-[140px]"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center bg-white border-b-2 border-light-gray">
                <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px]">
                  <h2 className="text-lg font-bold text-black">비트맵</h2>
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-3 px-4">
                  <input
                    type="checkbox"
                    disabled={selectedImageNumber === undefined}
                    checked={bitmapOn}
                    onChange={() => setBitmapOn(!bitmapOn)}
                    className="w-8 h-8 cursor-pointer accent-point-blue"
                  />
                </div>
              </div>
            </div>

            <div className="h-[510px] border-[4px] border-light-gray bg-soft-white flex items-center justify-center p-6">
              {
                selectedImageNumber === undefined ? (
                  <p className="text-medium-gray text-xl">
                    이미지를 선택해주세요
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-12">
                    <p className="text-xl text-black font-bold">이미지 View</p>
                    {
                      bitmapOn ? (
                        <canvas
                          ref={canvasRef}
                          className="max-w-full max-h-[330px] object-contain"
                        />
                      )
                        : <NextImage
                          src="/assets/contactpin_ex_image.png"
                          alt="contact pin image"
                          width={440}
                          height={330}
                          priority
                          fetchPriority="high"
                        />
                    }
                  </div>
                )
              }
            </div>

            <MultipleButton
              type="default"
              title="이미지 편집하기"
              disabled={selectedImageNumber === undefined}
              className="text-lg"
              onClick={() =>
                router.push(`/processing/process-data/${id}/edit`)
              }
            />
          </div>
        </div>
      </div >
    </Layout >
  );
}
