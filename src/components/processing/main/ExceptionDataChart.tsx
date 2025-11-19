import type { ExceptionDataPoint } from "@/types/processing/types";
import { motion } from "framer-motion";

export function ExceptionDataChart({ data }: { data: ExceptionDataPoint[] }) {
  const maxValue = Math.max(...data.map((d) => d.count));
  const chartHeight = 260;

  return (
    <div className="border-[4px] border-light-gray p-4 bg-white">
      <h3 className="text-xl text-black font-black mb-6">
        생산라인 별 일일 컨택트 핀 예외 데이터 현황
      </h3>
      <div className="relative" style={{ height: chartHeight }}>
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-medium-gray font-bold">
          <span>{(maxValue * 2).toLocaleString()}</span>
          <span>{maxValue.toLocaleString()}</span>
          <span>0</span>
        </div>

        <div className="ml-18 mr-6 h-full flex items-end justify-around border-b border-l border-light-gray">
          {
            data.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 mb-2">
                <div className="flex items-end h-[250px]">
                  <motion.div
                    className="w-16 bg-medium-gray/80"
                    style={{ height: `${(item.count / 150) * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.count / 150) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
                  />
                </div>
                <span className="text-sm text-medium-gray font-bold">
                  {item.productionLine}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
