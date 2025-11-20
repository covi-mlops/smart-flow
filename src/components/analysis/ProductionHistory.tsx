'use client';

import { useState } from "react";
import Button from "./Button";
import { RollCountCardStatus } from "@/types/analysis/types";

// 목데이터
// TODO: API 연동 작업 시 수정
const productionLines: RollCountCardStatus[] = [
    {
        id: "1",
        productName: "contactpin_1",
        rollsProduced: 32,
        normalCount: 31,
        defectCount: 1,
    },
    {
        id: "2",
        productName: "contactpin_2",
        rollsProduced: 15,
        normalCount: 14,
        defectCount: 1,
    },
];

function RollCountCard({ line }: { line: RollCountCardStatus }) {
    return (
        <div className="w-[600px] border-[4px] border-light-gray p-6 bg-white">
            <div className="flex flex-row items-center justify-center gap-3 mb-4">
                <h3 className="text-xl text-black font-bold">{line.productName}</h3>
            </div>
            <div className="flex flex-col items-center gap-2 text-medium-gray">
                <p>ROLL {line.rollsProduced}개 생산</p>
                <p>
                    양품 {line.normalCount}개 | 불량 {line.defectCount}개
                </p>
            </div>
        </div>
    );
}

export default function ProductionHistory() {
    const [period, setPeriod] = useState('Daily');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(Math.ceil(productionLines.length / 2));

    return (
        <div className="flex flex-col p-6 gap-6">
            <h2 className="text-3xl text-black font-bold">생산 현황 히스토리</h2>

            <div className="flex flex-row justify-between">
                <Button title="Daily" isActive={period === "Daily"} onClick={() => { setPeriod("Daily") }} />
                <Button title="Weekly" isActive={period === "Weekly"} onClick={() => { setPeriod("Weekly") }} />
                <Button title="Monthly" isActive={period === "Monthly"} onClick={() => { setPeriod("Monthly") }} />
                <Button title="Annual" isActive={period === "Annual"} onClick={() => { setPeriod("Annual") }} />
            </div>

            <div className="flex flex-col p-6 border-[4px] border-light-gray">
                <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl text-black font-bold">생산 품목 별 ROLL 양불 수량</h3>
                </div>
                <div className="flex flex-row gap-6 items-center  justify-between">
                    {
                        productionLines.slice((currentPage - 1) * 2, currentPage * 2).map((line) => (
                            <RollCountCard key={line.id} line={line} />
                        ))
                    }
                </div>
            </div>

            <div className="p-6 border-[4px] border-light-gray">
                <div className="grid grid-cols-2">

                </div>
            </div>
        </div>
    );
}