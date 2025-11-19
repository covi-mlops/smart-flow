import type { InspectionDataPoint } from "@/types/processing/types";
import { Picker } from "@/components/common/Picker";
import { motion } from "framer-motion";

export function InspectionChart({
  data,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  data: InspectionDataPoint[];
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}) {
  const maxValue = Math.max(...data.map((d) => d.inspected + d.uninspected));
  const chartHeight = 300;

  return (
    <div className="border-[4px] border-light-gray p-6 bg-white mx-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xl text-black font-bold">생산일자 별 데이터 검수 현황</h3>
        <div className="flex gap-4">
          <Picker
            type="date"
            value={startDate}
            title="생산 시작 일자"
            onChange={onStartDateChange}
          />
          <Picker
            type="date"
            value={endDate}
            title="생산 종료 일자"
            onChange={onEndDateChange}
          />
        </div>
      </div>

      <div className="relative" style={{ height: chartHeight }}>
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-600">
          <span>{(maxValue * 2).toLocaleString()}</span>
          <span>{maxValue.toLocaleString()}</span>
          <span>0</span>
        </div>

        <div className="ml-16 h-full flex items-end justify-between border-b border-l border-gray-300 gap-1">
          {
            data.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="flex flex-col ml-2 items-center h-[250px] justify-end">
                  <motion.div
                    className="w-8 bg-point-green/80"
                    style={{ height: `${(item.inspected / maxValue) * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.inspected / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                  />
                  <motion.div
                    className="w-8 bg-point-blue/70"
                    style={{ height: `${(item.uninspected / maxValue) * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.uninspected / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                  />
                </div>
                <span className="text-xs text-medium-gray whitespace-nowrap">
                  {item.date.slice(5)}
                </span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-point-green/80" />
          <span>검수완료</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-point-blue/70" />
          <span>검수미완료</span>
        </div>
      </div>
    </div>
  );
}
