'use client';

import type { ProductionLineItem } from "@/types/processing/types";
import MultipleButton from "../../common/MultipleButton";
import { useState } from "react";
// 목데이터
// TODO: API 연동 작업 시 수정
const productionLines: ProductionLineItem[] = [
  {
    id: 1,
    name: "생산라인1",
    status: "activated",
    productName: "contactpin_1",
    rollsProduced: 32,
    normalCount: 31,
    defectCount: 1,
  },
  {
    id: 2,
    name: "생산라인2",
    status: "activated",
    productName: "contactpin_2",
    rollsProduced: 0,
    normalCount: 0,
    defectCount: 0,
  },
  {
    id: 3,
    name: "생산라인3",
    status: "activated",
    productName: "contactpin_1",
    rollsProduced: 32,
    normalCount: 31,
    defectCount: 1,
  },
  {
    id: 4,
    name: "생산라인4",
    status: "unactivated",
    productName: "contactpin_2",
    rollsProduced: 0,
    normalCount: 0,
    defectCount: 0,
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
        <p className="text-lg font-bold">{line.productName}</p>
        <p>ROLL {line.rollsProduced}개 생산</p>
        <p>
          양품 {line.normalCount}개 | 불량 {line.defectCount}개
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