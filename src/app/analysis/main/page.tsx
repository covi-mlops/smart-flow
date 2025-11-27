import DailyErrorTable from "@/components/analysis/DailyErrorTable";
import { DailyRollRateChart } from "@/components/analysis/DailyRollRateChart";
import ProductionHistory from "@/components/analysis/ProductionHistory";
import Layout from "@/components/layout/Layout";
import { ProductionLines } from "@/components/processing/main/ProductionLines";
import { DailyRollCostPoint } from "@/types/analysis/types";

export default function MainPage() {
    // 목데이터
    // TODO: API 연동
    const dailyData: DailyRollCostPoint[] = [
        { productionLine: "생산라인1", normalCount: 30, defectCount: 8 },
        { productionLine: "생산라인2", normalCount: 15, defectCount: 2 },
    ];

    return (
        <Layout headerTitle="AI 컨택트 핀 분석 플랫폼">
            <div className="flex flex-1 fixed top-[140px] left-[242px] w-[calc(100%-242px)] z-40">
                <ProductionLines />
            </div>
            <div className="flex flex-col flex-1 pt-[310px]">
                <div className="grid grid-cols-2 p-6 gap-6">
                    <DailyRollRateChart data={dailyData} />
                    <DailyErrorTable />
                </div>

                <div className="border-t-[4px] border-light-gray">
                    <ProductionHistory />
                </div>
            </div>
        </Layout>
    );
}