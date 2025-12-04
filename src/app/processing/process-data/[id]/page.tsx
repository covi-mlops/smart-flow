'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import HistogramChart from "@/components/processing/process-data/HistogramChart";
import { Picker } from "@/components/common/Picker";
import Pagination from "@/components/common/Pagination";
import MultipleButton from "@/components/common/MultipleButton";
import { ProductionHistoryEachItem_P } from "@/types/processing/process-data";
import { useSelectedImageStore } from "@/store/store";
import { processingApi } from "@/apis/processing";
import { commonApi } from "@/apis/common";
import { formatDate } from "@/utils/formatDate";

export default function ProcessDataDetailPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null); // 비트맵 이미지용 ref 객체

  const [data, setData] = useState<ProductionHistoryEachItem_P>();
  const [bitmapOn, setBitmapOn] = useState<boolean>(false);
  const itemsPerPage = '10';
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);

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

  const labelOptions = [
    { label: "Contact Pin", value: "Contact Pin" }
  ];

  const handleFilterChange = (key: keyof { inspectionResult: string, isProcess: string, label: string }, value: string) => {
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
      const data = await processingApi.viewProductionHistoryItem(
        filters.classification_result, currentPage, Number(itemsPerPage), filters.refined, Number(id)
      );

      if (data && data.status === "SUCCESS") {
        setData(data.data);
        console.log(data.data) // debug
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
  }, [currentPage, currentTab, filters]);

  useEffect(() => {
    if (selectedImageId) {
      handlePolygonData();
    }
  }, [selectedImageId, bitmapOn]);

  useEffect(() => {
    return () => {
      setSelectedImageId('');
      setSelectedImageUrl('');
    }
  }, [setSelectedImageId, setSelectedImageUrl]);

  useEffect(() => {
    return () => {
      setSelectedImageId('');
    }
  }, [setSelectedImageId]);

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
              <p>{data?.production_name}</p>
            </div>
            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
              <h2 className="text-lg text-black">ROLL 번호</h2>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
              <p>{data?.mold_no}</p>
            </div>
          </div>

          <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
              <h2 className="text-lg text-black">생산일자</h2>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-3 px-4 py-4 font-bold">
              <p>{data?.created_at ? formatDate(data?.created_at) : "ㅡ"}</p>
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
              <p>{data?.first_image_created_at ? formatDate(data?.first_image_created_at) : "ㅡ"}</p>
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
          <HistogramChart
            datasets={data?.datasets}
            totalCount={data?.datasets.length || 0}
          />
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
                  value={filters.classification_result}
                  onChange={(value) =>
                    handleFilterChange("inspectionResult", value)
                  }
                  options={classificationResultOptions}
                />
                <Picker
                  type="select"
                  title="가공 여부"
                  value={filters.refined}
                  onChange={(value) => handleFilterChange("isProcess", value)}
                  options={refinedOptions}
                />
              </div>
            </div>

            <div className="flex flex-row justify-end font-bold text-black">
              <p>전체: {data ? data.datasets.length : 0}건</p>
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
                            onClick={() => {
                              setSelectedImageId(item.id);
                              setSelectedImageUrl(item.image_url);
                            }}
                          >
                            <td className="px-4 py-3">{(currentPage - 1) * Number(itemsPerPage) + idx + 1}</td>
                            <td className="px-4 py-3">{item.id}</td>
                            <td className={`px-4 py-3 font-bold ${item.classification_result === "불량" ? "text-point-red" : selectedImageId === item.id ? "text-white" : "text-medium-gray"} `}>
                              {item.classification_result}
                            </td>
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
                    data?.datasets && Array.from({
                      length: Math.max(
                        0,
                        Number(itemsPerPage) -
                        data.datasets.length
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
              data && data.datasets.length > 0
              && <Pagination
                total={data?.datasets.length}
                page={currentPage}
                limit={Number(itemsPerPage)}
                tab={currentTab}
                setPage={setCurrentPage}
                setTab={setCurrentTab}
              />
            }
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
                    disabled={selectedImageId === ''}
                    checked={bitmapOn}
                    onChange={() => setBitmapOn(!bitmapOn)}
                    className="w-8 h-8 cursor-pointer accent-point-blue"
                  />
                </div>
              </div>
            </div>

            <div className="h-[510px] border-[4px] border-light-gray bg-soft-white flex items-center justify-center p-6">
              {
                selectedImageId === '' ? (
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
                        : <Image
                          src={selectedImageUrl}
                          alt="contact pin image"
                          width={440}
                          height={330}
                          priority
                          fetchPriority="high"
                          unoptimized
                        />
                    }
                  </div>
                )
              }
            </div>

            <MultipleButton
              type="default"
              title="이미지 편집하기"
              disabled={selectedImageId === undefined}
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
