'use client';

import { ProductionLineChartData } from "@/types/analysis/types";
import { motion } from "framer-motion";

interface ProductionLineChartProps {
    title: string;
    data: ProductionLineChartData[];
    maxValue?: number;
}

const COLORS = ["#22c55e", "#3b82f6"];

export default function ProductionLineChart({ title, data, maxValue }: ProductionLineChartProps) {
    const chartHeight = 300;
    const chartWidth = 650;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;

    const innerWidth = chartWidth - paddingLeft - paddingRight;
    const innerHeight = chartHeight - paddingTop - paddingBottom;

    const allDataPoints = data.flatMap(d => d.data);
    const calculatedMaxValue = maxValue || Math.max(...allDataPoints.map(d => d.value), 10);
    const dates = data[0]?.data.map(d => d.date) || [];

    const getX = (index: number) => {
        return paddingLeft + (index / Math.max(dates.length - 1, 1)) * innerWidth;
    };

    const getY = (value: number) => {
        return paddingTop + innerHeight - (value / calculatedMaxValue) * innerHeight;
    };

    const createPath = (dataPoints: { date: string; value: number }[]) => {
        if (dataPoints.length === 0) return "";

        return dataPoints
            .map((point, index) => {
                const x = getX(index);
                const y = getY(point.value);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    };

    const yAxisLabels = [0, calculatedMaxValue / 2, calculatedMaxValue];

    return (
        <div className="w-full border-[2px] border-light-gray p-6 bg-white">
            <h3 className="text-lg text-black font-bold mb-4">{title}</h3>

            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
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
                                {label}
                            </text>
                        </g>
                    ))
                }

                {
                    data.map((line, lineIndex) => (
                        <g key={lineIndex}>
                            <motion.path
                                d={createPath(line.data)}
                                fill="none"
                                stroke={COLORS[lineIndex % COLORS.length]}
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeOut", delay: lineIndex * 0.2 }}
                            />
                            {
                                line.data.map((point, pointIndex) => (
                                    <motion.circle
                                        key={pointIndex}
                                        cx={getX(pointIndex)}
                                        cy={getY(point.value)}
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
                    dates.map((date, idx) => (
                        <text
                            key={idx}
                            x={getX(idx)}
                            y={chartHeight - paddingBottom + 20}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#9ca3af"
                        >
                            {date.length > 10 ? date.slice(5) : date}
                        </text>
                    ))
                }
            </svg>

            <div className="flex justify-center gap-4 mt-4 text-sm max-w-[730px]">
                {
                    data.map((line, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3"
                                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                            />
                            <span>{line.productName}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
