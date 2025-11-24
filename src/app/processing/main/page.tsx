"use client";

import { useState } from "react";

import Layout from "@/components/layout/Layout";
import { DailyDataChart } from "@/components/processing/main/DailyDataChart";
import { ExceptionDataChart } from "@/components/processing/main/ExceptionDataChart";
import { InspectionChart } from "@/components/processing/main/InspectionChart";
import type {
    DailyDataPoint,
    ExceptionDataPoint,
    InspectionDataPoint,
} from "@/types/processing/types";
import { ProductionLines } from "@/components/processing/main/ProductionLines";

export default function MainPage() {
    // TODO: 생산일자 별 데이터 검수 현황 그래프 시작/종료일자 연동
    const [startDate, setStartDate] = useState("2025-11-01");
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜
    // 목데이터
    // TODO: API 연동
    const dailyData: DailyDataPoint[] = [
        { productionLine: "생산라인1", normalCount: 1500000, defectCount: 55500 },
        { productionLine: "생산라인2", normalCount: 1400000, defectCount: 11700 },
    ];
    // 목데이터
    // TODO: API 연동
    const exceptionData: ExceptionDataPoint[] = [
        { productionLine: "생산라인1", count: 120 },
        { productionLine: "생산라인2", count: 20 },
    ];
    // 목데이터
    // TODO: API 연동
    const inspectionData: InspectionDataPoint[] = [
        { date: "2025.11.01", inspected: 90, uninspected: 10 },
        { date: "2025.11.02", inspected: 85, uninspected: 15 },
        { date: "2025.11.06", inspected: 75, uninspected: 20 },
        { date: "2025.11.07", inspected: 65, uninspected: 25 },
        { date: "2025.11.08", inspected: 70, uninspected: 30 },
        { date: "2025.11.09", inspected: 60, uninspected: 35 },
        { date: "2025.11.11", inspected: 80, uninspected: 20 },
        { date: "2025.11.12", inspected: 65, uninspected: 30 },
        { date: "2025.11.13", inspected: 60, uninspected: 35 },
        { date: "2025.11.14", inspected: 55, uninspected: 40 },
        { date: "2025.11.15", inspected: 50, uninspected: 45 },
        { date: "2025.11.16", inspected: 70, uninspected: 25 },
        { date: "2025.11.17", inspected: 85, uninspected: 15 },
        { date: "2025.11.18", inspected: 55, uninspected: 40 },
        { date: "2025.11.19", inspected: 70, uninspected: 30 },
    ];

    return (
        <Layout headerTitle="AI 컨택트 핀 가공 플랫폼">
            <div className="flex flex-1 fixed top-[140px] left-[242px] w-[calc(100%-242px)] z-50">
                <ProductionLines />
            </div>
            <div className="flex flex-col flex-1 pt-[310px]">
                <div className="grid grid-cols-2 gap-6 p-6">
                    <DailyDataChart data={dailyData} />
                    <ExceptionDataChart data={exceptionData} />
                </div>

                <InspectionChart
                    data={inspectionData}
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                />
            </div>
        </Layout>
    );
}