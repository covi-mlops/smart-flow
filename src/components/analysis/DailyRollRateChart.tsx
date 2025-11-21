'use client';

import { DailyRollCostPoint } from "@/types/analysis/types";
import { motion } from "framer-motion";

export function DailyRollRateChart({ data }: { data: DailyRollCostPoint[] }) {
    const maxValue = Math.max(...data.map((d) => d.normalCount + d.defectCount));

    const chartHeight = 260;

    return (
        <div className="border-[4px] border-light-gray p-6 bg-white">
            <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl text-black font-bold">생산라인 별 일일 ROLL 양불 비율</h3>
            </div>
            {/* TODO: 실제 데이터 들어오면 비율로 변경하기 */}
            <div className="relative mb-3" style={{ height: chartHeight }}>
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-around text-sm text-medium-gray">
                    {data.map((d, idx) => <span key={idx}>{d.productionLine}</span>)}
                </div>
                <div className="w-[544px] z-30 ml-16 h-full flex flex-col justify-around border-l border-light-gray gap-4 py-2">
                    {
                        data.map((item, idx) => (
                            <div key={idx} className="flex flex-row ml-2 items-center">
                                <motion.div
                                    className="h-8 bg-point-blue/80"
                                    style={{ width: `${(item.normalCount / maxValue) * 50}%` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.normalCount / maxValue) * 50}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                                />
                                <motion.div
                                    className="h-8 bg-point-orange/70"
                                    style={{ width: `${(item.defectCount / maxValue) * 50}%` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.defectCount / maxValue) * 50}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="absolute left-33 top-0 h-full ml-18 flex flex-row gap-33">
                    <div className="w-[0.1px] bg-light-gray/50 h-full" />
                    <div className="w-[0.1px] bg-light-gray/50 h-full" />
                    <div className="w-[0.1px] bg-light-gray/50 h-full" />
                    <div className="w-[0.1px] bg-light-gray/50 h-full" />
                </div>
            </div>

            <div className="ml-18 flex flex-row justify-between text-sm text-medium-gray">
                <span>0</span>
                <span>{(maxValue / 2).toLocaleString()}</span>
                <span>{maxValue.toLocaleString()}</span>
                <span>{(maxValue / 2 * 3).toLocaleString()}</span>
                <span>{(maxValue * 2).toLocaleString()}</span>
            </div>

            <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-point-blue/80" />
                    <span>양품</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-point-orange/70" />
                    <span>불량</span>
                </div>
            </div>
        </div>
    );
}
