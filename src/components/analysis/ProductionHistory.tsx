'use client';

import { useEffect, useState } from "react";
import Button from "./Button";
import { PeriodType, LineList, ProductionNameItem, LineStatisticsItem } from "@/types/analysis/types";
import ProductionLineChart from "./ProductionLineChart";
import ProductionItemChart from "./ProductionItemChart";
import { analysisApi } from "@/apis/analysis";

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
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const [itemStatisticsData, setItemStatisticsData] = useState<ProductionNameItem[]>([{
        production_name: '',
        statistics: [],
    }]);
    const [lineStatisticsData, setLineStatisticsData] = useState<LineStatisticsItem[]>([{
        production_line: {
            id: 0,
            name: '',
            status: "activated",
        },
        statistics: [],
    }]);
    const [lineListData, setLineListData] = useState<LineList[]>([{
        id: 0,
        name: '',
        total_count: 0,
        normal_count: 0,
        defective_count: 0,
    }]);

    const handlePeriodChange = (newPeriod: PeriodType) => {
        setPeriod(newPeriod);
        setCurrentPage(1);
    };

    const handleData = async () => {
        try {
            const response = await analysisApi.viewProductionLineSummary(
                new Date().toISOString().split('T')[0],
                period
            );

            if (response && response.status === "SUCCESS") {
                setStartDate(response.data.range.start.split('T')[0]);
                setEndDate(response.data.range.end.split('T')[0]);
                setItemStatisticsData(response.data.production_name_statistics);
                setLineStatisticsData(response.data.line_statistics);
                setLineListData(response.data.line_list);
            }
        } catch (error) {
            console.error('handleData error', error);
        }
    };

    useEffect(() => {
        handleData();
    }, [period]);

    return (
        <div className="flex flex-col p-6 gap-6">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-3xl text-black font-bold">생산 현황 히스토리</h2>
                <div className="flex flex-row gap-4 items-center">
                    <div className="px-6 py-3 bg-white border-2 border-light-gray rounded-full text-black font-semibold">
                        {startDate}
                    </div>
                    <span className="text-2xl text-medium-gray">—</span>
                    <div className="px-6 py-3 bg-white border-2 border-light-gray rounded-full text-black font-semibold">
                        {endDate}
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
                        lineListData
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
                        data={itemStatisticsData}
                        dataType="total"
                    />
                    <ProductionLineChart
                        title="생산라인 별 ROLL 총 생산 현황"
                        data={lineStatisticsData}
                        dataType="total"
                    />
                    <ProductionItemChart
                        title="생산 품목 별 ROLL 불량품 생산 현황"
                        data={itemStatisticsData}
                        dataType="defective"
                    />
                    <ProductionLineChart
                        title="생산라인 별 ROLL 불량품 생산 현황"
                        data={lineStatisticsData}
                        dataType="defective"
                    />
                </div>
            </div>
        </div>
    );
}