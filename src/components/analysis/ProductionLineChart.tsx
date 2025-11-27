'use client';

import { LineStatisticsItem } from "@/types/analysis/types";
import { motion } from "framer-motion";

interface ProductionLineChartProps {
    title: string;
    data: LineStatisticsItem[];
    dataType?: 'total' | 'normal' | 'defective';
}

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function ProductionLineChart({
    title,
    data,
    dataType = 'total',
}: ProductionLineChartProps) {
    const chartHeight = 300;
    const chartWidth = 800;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;

    const innerWidth = chartWidth - paddingLeft - paddingRight;
    const innerHeight = chartHeight - paddingTop - paddingBottom;

    const allDataPoints = data.flatMap(line =>
        line.statistics.map(stat => stat[dataType])
    );
    const calculatedMaxValue = Math.max(...allDataPoints, 10);
    const labels = data[0]?.statistics.map(stat => stat.label) || [];

    const getX = (index: number) => {
        return paddingLeft + (index / Math.max(labels.length - 1, 1)) * innerWidth;
    };

    const getY = (value: number) => {
        return paddingTop + innerHeight - (value / calculatedMaxValue) * innerHeight;
    };

    const createPath = (statistics: { label: string; total: number; normal: number; defective: number; defect_rate: number }[]) => {
        if (statistics.length === 0) return "";

        return statistics
            .map((stat, index) => {
                const x = getX(index);
                const y = getY(stat[dataType]);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    };

    const yAxisLabels = [0, calculatedMaxValue / 2, calculatedMaxValue];

    return (
        <div className="w-full border-[2px] border-light-gray p-6 bg-white">
            <h3 className="text-lg text-black font-bold mb-4">{title}</h3>

            <svg width={chartWidth} height={chartHeight} className="overflow-hidden">
                <line
                    x1={paddingLeft}
                    y1={paddingTop}
                    x2={paddingLeft}
                    y2={chartHeight - paddingBottom}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                />
                <line
                    x1={paddingLeft}
                    y1={chartHeight - paddingBottom}
                    x2={chartWidth - paddingRight}
                    y2={chartHeight - paddingBottom}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                />

                {
                    yAxisLabels.map((label, idx) => (
                        <g key={idx}>
                            <line
                                x1={paddingLeft}
                                y1={getY(label)}
                                x2={chartWidth - paddingRight}
                                y2={getY(label)}
                                stroke="#f3f4f6"
                                strokeWidth="1"
                            />
                            <text
                                x={paddingLeft - 10}
                                y={getY(label) + 4}
                                textAnchor="end"
                                fontSize="12"
                                fill="#9ca3af"
                            >
                                {Math.round(label)}
                            </text>
                        </g>
                    ))
                }

                {
                    data.map((line, lineIndex) => (
                        <g key={lineIndex}>
                            <motion.path
                                d={createPath(line.statistics)}
                                fill="none"
                                stroke={COLORS[lineIndex % COLORS.length]}
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeOut", delay: lineIndex * 0.2 }}
                            />
                            {
                                line.statistics.map((stat, pointIndex) => (
                                    <motion.circle
                                        key={pointIndex}
                                        cx={getX(pointIndex)}
                                        cy={getY(stat[dataType])}
                                        r="4"
                                        fill={COLORS[lineIndex % COLORS.length]}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: lineIndex * 0.2 + pointIndex * 0.05 }}
                                    />
                                ))
                            }
                        </g>
                    ))
                }

                {
                    labels.map((label, idx) => (
                        <text
                            key={idx}
                            x={getX(idx)}
                            y={chartHeight - paddingBottom + 20}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#9ca3af"
                        >
                            {label.length > 10 ? label.slice(5) : label}
                        </text>
                    ))
                }
            </svg>

            <div className="flex justify-center gap-4 mt-4 text-sm max-w-[800px]">
                {
                    data.map((line, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3"
                                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                            />
                            <span>{line.production_line.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
