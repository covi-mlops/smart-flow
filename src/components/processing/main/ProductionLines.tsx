'use client';

import type { ProductionLineItem } from "@/types/processing/types";
import MultipleButton from "../../common/MultipleButton";
import { useState } from "react";
// 목데이터
// TODO: API 연동 작업 시 수정
const productionLines: ProductionLineItem[] = [
  {
    id: 1,
    branch: 1,
    name: "생산라인1",
    status: "activated",
    latest_history: {
      id: 1,
      status: "collecting",
      production_name: "contactpin_1",
      created_at: "2025-11-21T14:01:02.690613Z",
      total_count: 32,
      normal_count: 31,
      defective_count: 1,
    }
  },
  {
    id: 2,
    branch: 1,
    name: "생산라인2",
    status: "activated",
    latest_history: {
      id: 1,
      status: "collecting",
      production_name: "contactpin_2",
      created_at: "2025-11-21T14:01:02.690613Z",
      total_count: 100,
      normal_count: 89,
      defective_count: 11,
    }
  },
  {
    id: 3,
    branch: 1,
    name: "생산라인3",
    status: "activated",
    latest_history: {
      id: 1,
      status: "collecting",
      production_name: "contactpin_3",
      created_at: "2025-11-21T14:01:02.690613Z",
      total_count: 50,
      normal_count: 44,
      defective_count: 6,
    }
  },
  {
    id: 4,
    branch: 1,
    name: "생산라인4",
    status: "stop",
    latest_history: {
      id: 1,
      status: "collecting",
      production_name: "contactpin_4",
      created_at: "2025-11-21T14:01:02.690613Z",
      total_count: 0,
      normal_count: 0,
      defective_count: 0,
    }
  },
];
// 하나의 생산라인 정보
function ProductionLineCard({ line }: { line: ProductionLineItem }) {
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
        <p className="text-lg font-bold">{line.name}</p>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Math.ceil(productionLines.length / 2));

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
            productionLines.slice((currentPage - 1) * 2, currentPage * 2).map((line) => (
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