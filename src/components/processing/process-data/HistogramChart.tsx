'use client';

import { DatasetItem } from "@/types/processing/types";
import { useState, useMemo } from "react";

interface HistogramChartProps {
  datasets?: DatasetItem[];
  totalCount?: number;
}

interface HistogramDataItem {
  maskPoly: number;
  count: number;
  normal: number;
  defect: number;
  exception: number;
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
    // X축 값 정의 - classification_result별로 카운트
    const countMap = new Map<number, { normal: number; defect: number; exception: number }>();

    datasets.forEach(item => {
      const maskPolyValue = item.mask_poly;
      const current = countMap.get(maskPolyValue) || { normal: 0, defect: 0, exception: 0 };

      if (item.classification_result === "정상") {
        current.normal += 1;
      } else if (item.classification_result === "불량") {
        current.defect += 1;
      } else if (item.classification_result === "예외") {
        current.exception += 1;
      }

      countMap.set(maskPolyValue, current);
    });

    const minMaskPolyValue = Math.min(...datasets.map((d) => d.mask_poly));
    const maxMaskPolyValue = Math.max(...datasets.map((d) => d.mask_poly));

    Array.from(
      { length: maxMaskPolyValue - minMaskPolyValue + 1 },
      (_, i) => i + minMaskPolyValue
    ).forEach((number) => {
      if (!countMap.has(number)) {
        countMap.set(number, { normal: 0, defect: 0, exception: 0 });
      }
    });

    // 정렬
    const data = Array.from(countMap.entries())
      .map(([maskPoly, counts]): HistogramDataItem => ({
        maskPoly,
        count: counts.normal + counts.defect + counts.exception,
        normal: counts.normal,
        defect: counts.defect,
        exception: counts.exception
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
        <p className="text-medium-gray text-lg font-bold">데이터가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-[1000px] border-[4px] border-light-gray bg-white p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black">데이터 분포</h3>
          <p className="text-lg font-bold text-black">
            {totalCount.toLocaleString()}건
          </p>
        </div>

        <div className="relative w-full h-[300px] flex flex-col">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90">
            <p className="text-md font-medium text-medium-gray whitespace-nowrap font-semibold">
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
                        <div className="absolute -top-50 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-3 rounded-lg text-sm whitespace-nowrap z-10 shadow-lg">
                          <p className="font-bold mb-2 border-b border-white/20 pb-2">점 개수: {item.maskPoly}</p>
                          <div className="space-y-1 text-center">
                            <p className="text-green-400">정상: {item.normal.toLocaleString()}건</p>
                            <p className="text-red-400">불량: {item.defect.toLocaleString()}건</p>
                            <p className="text-yellow-400">예외: {item.exception.toLocaleString()}건</p>
                          </div>
                        </div>
                      )
                    }

                    <div
                      className="w-full transition-all duration-300 cursor-pointer relative"
                      style={{
                        height: `${barHeight}px`,
                        backgroundColor: (Math.max(item.normal, item.defect, item.exception) === item.normal && Math.max(item.normal, item.defect, item.exception) === item.defect)
                          ? (hoveredBar === index ? "#ea580c" : "#fb923c")
                          : Math.max(item.normal, item.defect, item.exception) === item.normal
                            ? (hoveredBar === index ? "#16a34a" : "#4ade80")
                            : Math.max(item.normal, item.defect, item.exception) === item.defect
                              ? (hoveredBar === index ? "#dc2626" : "#f87171")
                              : (hoveredBar === index ? "#ca8a04" : "#facc15"),
                        minHeight: item.count > 0 ? '4px' : '0px'
                      }}
                    >
                      {
                        item.count > 0 && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-black">
                            {item.count.toLocaleString()}
                          </div>
                        )
                      }

                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-black">
                        {item.maskPoly.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            }

            <div className="absolute right-4 -bottom-3 -translate-y-1/2">
              <p className="text-md font-medium text-medium-gray whitespace-nowrap font-semibold">
                점 개수 (개)
              </p>
            </div>
          </div>

          <div className="flex justify-between pl-8 pr-4 pt-2">
            <p className="text-md font-medium text-medium-gray">
              정상/불량 데이터: {normalDefectCount.toLocaleString()}건
            </p>
            <p className="text-md font-medium text-medium-gray">
              AI 예외 데이터 (검수 대상) {exceptionCount.toLocaleString()}건
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}