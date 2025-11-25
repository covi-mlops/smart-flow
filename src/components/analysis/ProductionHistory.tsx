'use client';

import { useEffect, useState } from "react";
import Button from "./Button";
import { PeriodType, LineList } from "@/types/analysis/types";
import { PERIOD_MOCK_DATA } from "./mockData";
import ProductionLineChart from "./ProductionLineChart";
import ProductionItemChart from "./ProductionItemChart";

function RollCountCard({ line }: { line: LineList }) {
    return (
        <div className="w-full border-[4px] border-light-gray p-6 bg-white">
            <div className="flex flex-row items-center justify-center gap-3 mb-4">
                <h3 className="text-xl text-black font-bold">{line.name}</h3>
            </div>
            <div className="flex flex-col items-center gap-2 text-medium-gray">
                <p>ROLL {line.total_count}개 생산</p>
                <p>
                    양품 {line.normal_count}개 | 불량 {line.defective_count}개
                </p>
            </div>
        </div>
    );
}

export default function ProductionHistory() {
    const [period, setPeriod] = useState<PeriodType>('daily');
    const [currentPage, setCurrentPage] = useState(1);

    const [currentData, setCurrentData] = useState(PERIOD_MOCK_DATA.filter((mock) => mock.period === period));

    const handlePeriodChange = (newPeriod: PeriodType) => {
        setPeriod(newPeriod);
        setCurrentPage(1);
    };

    useEffect(() => {
        setCurrentData(PERIOD_MOCK_DATA.filter((mock) => mock.period === period));
    }, [period]);

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-3xl text-black font-bold">생산 현황 히스토리</h2>
                <div className="flex flex-row gap-4 items-center">
                    <div className="px-6 py-3 bg-white border-2 border-light-gray rounded-full text-black font-semibold">
                        {currentData[0].range.start}
                    </div>
                    <span className="text-2xl text-medium-gray">—</span>
                    <div className="px-6 py-3 bg-white border-2 border-light-gray rounded-full text-black font-semibold">
                        {currentData[0].range.end}
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between">
                <Button title="Daily" isActive={period === "daily"} onClick={() => handlePeriodChange("daily")} />
                <Button title="Weekly" isActive={period === "weekly"} onClick={() => handlePeriodChange("weekly")} />
                <Button title="Monthly" isActive={period === "monthly"} onClick={() => handlePeriodChange("monthly")} />
                <Button title="Annually" isActive={period === "annually"} onClick={() => handlePeriodChange("annually")} />
            </div>

            <div className="flex flex-col p-6 border-[4px] border-light-gray">
                <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl text-black font-bold">생산 품목 별 ROLL 양불 수량</h3>
                </div>
                <div className="flex flex-row gap-6 items-center justify-between">
                    {
                        currentData[0].line_list
                            .slice((currentPage - 1) * 2, currentPage * 2)
                            .map((line) => (
                                <RollCountCard key={line.id} line={line} />
                            ))
                    }
                </div>
            </div>

            <div className="min-w-[628px] border-[2px] border-light-gray">
                <div className="grid grid-cols-2">
                    <ProductionItemChart
                        title="생산 품목 별 ROLL 총 생산 현황"
                        data={currentData[0].production_name_statistics}
                        dataType="total"
                    />
                    <ProductionLineChart
                        title="생산라인 별 ROLL 총 생산 현황"
                        data={currentData[0].line_statistics}
                        dataType="total"
                    />
                    <ProductionItemChart
                        title="생산 품목 별 ROLL 불량품 생산 현황"
                        data={currentData[0].production_name_statistics}
                        dataType="defective"
                    />
                    <ProductionLineChart
                        title="생산라인 별 ROLL 불량품 생산 현황"
                        data={currentData[0].line_statistics}
                        dataType="defective"
                    />
                </div>
            </div>
        </div>
    );
}