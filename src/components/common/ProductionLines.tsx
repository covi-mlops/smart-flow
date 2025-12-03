'use client';

import { ProductionLineListItem } from "@/types/analysis/types";
import MultipleButton from "./MultipleButton";
import { useEffect, useState } from "react";
import { analysisApi } from "@/apis/analysis";
import { useProductionLineStore } from "@/store/store";

// 하나의 생산라인 정보
function ProductionLineCard({ line }: { line: ProductionLineListItem }) {
  return (
    <div className="w-[600px] border-[4px] border-light-gray p-6 bg-white">
      <div className="flex flex-row items-center justify-center gap-3 mb-4">
        <h3 className="text-xl text-black font-semibold">{line.name}</h3>
        <div
          className={`w-4 h-4 rounded-full ${line.status === "activated" ? "bg-point-green" : "bg-point-red"
            }`}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-medium-gray">
        <p className="text-lg font-bold">{line.latest_history?.production_name}</p>
        <p>ROLL {line.latest_history?.total_count}개 생산</p>
        <p>
          양품 {line.latest_history?.normal_count}개 | 불량 {line.latest_history?.defective_count}개
        </p>
      </div>
    </div>
  );
}
// 생산라인 가동 현황 컴포넌트
export function ProductionLines() {
  const { lineList, setLineList } = useProductionLineStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleProductionLinelist = async () => {
    try {
      const response = await analysisApi.viewProductionLineList();

      if (response !== null && response.status === "SUCCESS") {
        setLineList(response.data.items);
        setTotalPage(Math.max(1, Math.ceil(response.data.total / 2)));
      }
    } catch (error) {
      console.error('handleProductionLinelist error', error);
    }
  };

  useEffect(() => {
    if (lineList.length === 0) {
      handleProductionLinelist();
    }
  }, []);

  return (
    <section className="bg-soft-white border-b-[4px] border-light-gray w-full h-[310px] p-6">
      <h2 className="text-3xl text-black font-bold mb-6">생산라인 가동 현황</h2>
      <div className="flex flex-row gap-4 justify-between items-end">
        <MultipleButton
          type="simple"
          title="<"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="h-[192px] w-[60px] text-2xl"
        />
        <div className="flex flex-row gap-6">
          {
            lineList.slice((currentPage - 1) * 2, currentPage * 2).map((line) => (
              <ProductionLineCard key={line.id} line={line} />
            ))
          }
        </div>
        <MultipleButton
          type="simple"
          title=">"
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="h-[192px] w-[60px] text-2xl"
        />
      </div>
    </section>
  );
}