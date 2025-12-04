'use client';

import { useState, useMemo } from "react";

interface DatasetItem {
  id: string;
  classification_result: string;
  refined_at: string | null;
  created_at: string;
  mask_poly: number;
  image_url: string;
}

interface HistogramChartProps {
  datasets?: DatasetItem[];
  totalCount?: number;
}

export default function HistogramChart({
  datasets = [],
  totalCount = 0
}: HistogramChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const histogramData = useMemo(() => {
    if (!datasets || datasets.length === 0) {
      return [];
    }

    const countMap = new Map<number, number>();

    datasets.forEach(item => {
      const maskPolyValue = item.mask_poly;
      countMap.set(maskPolyValue, (countMap.get(maskPolyValue) || 0) + 1);
    });

    const data = Array.from(countMap.entries())
      .map(([maskPoly, count]) => ({
        maskPoly,
        count
      }))
      .sort((a, b) => a.maskPoly - b.maskPoly);

    return data;
  }, [datasets]);

  const maxCount = useMemo(() => {
    return histogramData.length > 0
      ? Math.max(...histogramData.map(d => d.count))
      : 0;
  }, [histogramData]);

  const normalDefectCount = useMemo(() => {
    return datasets.filter(item =>
      item.classification_result === "정상" || item.classification_result === "불량"
    ).length;
  }, [datasets]);

  const exceptionCount = useMemo(() => {
    return datasets.filter(item =>
      item.classification_result === "예외"
    ).length;
  }, [datasets]);

  if (!datasets || datasets.length === 0) {
    return (
      <div className="w-full h-[400px] border-[4px] border-light-gray bg-white flex items-center justify-center">
        <p className="text-medium-gray text-lg">데이터가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="w-full border-[4px] border-light-gray bg-white p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black">데이터 분포</h3>
          <p className="text-lg font-bold text-black">
            {totalCount.toLocaleString()}건
          </p>
        </div>

        <div className="relative w-full h-[300px] flex flex-col">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90">
            <p className="text-sm font-medium text-medium-gray whitespace-nowrap">
              수량 (건)
            </p>
          </div>

          <div className="flex-1 flex items-end gap-[2px] pl-8 pr-4 pb-12 relative">
            <div className="absolute inset-0 flex flex-col justify-between pl-8 pr-4 pb-12">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full border-t border-light-gray/40" />
              ))}
            </div>

            {
              histogramData.map((item, index) => {
                const maxBarHeight = 240;
                const barHeight = (item.count / maxCount) * maxBarHeight;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center relative group"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {
                      hoveredBar === index
                      && (
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-10">
                          <p className="font-bold">점 개수: {item.maskPoly}</p>
                          <p>수량: {item.count.toLocaleString()}건</p>
                        </div>
                      )
                    }

                    <div
                      className="w-full transition-all duration-300 cursor-pointer relative"
                      style={{
                        height: `${barHeight}px`,
                        backgroundColor: hoveredBar === index ? '#0066FF' : '#4A90E2',
                        minHeight: item.count > 0 ? '4px' : '0px'
                      }}
                    >
                      {
                        barHeight > 30 && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-black">
                            {item.count.toLocaleString()}
                          </div>
                        )
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div className="flex justify-between pl-8 pr-4 pt-2">
            <p className="text-sm font-medium text-medium-gray">
              정상/불량 데이터: {normalDefectCount.toLocaleString()}건
            </p>
            <p className="text-sm font-medium text-medium-gray">
              AI 예외 데이터 (검수 대상) {exceptionCount.toLocaleString()}건
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
