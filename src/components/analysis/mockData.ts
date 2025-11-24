import { LineProductionStatisticsData, PeriodType } from "@/types/analysis/types";

export const PERIOD_MOCK_DATA: LineProductionStatisticsData[] = [
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "daily",
        range: {
            start: "2025.11.20",
            end: "2025.11.20",
        },
        line_statistics: [
            {
                production_line: {
                    id: 1,
                    name: "1호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.11.20",
                        total: 32,
                        normal: 31,
                        defective: 1,
                        defect_rate: 3.1,
                    },
                ],
            },
            {
                production_line: {
                    id: 2,
                    name: "2호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.11.20",
                        total: 0,
                        normal: 0,
                        defective: 0,
                        defect_rate: 0,
                    },
                ],
            },
        ],
        production_name_statistics: [
            {
                production_name: "contactpin_1",
                total: 32,
                normal: 31,
                defective: 1,
                defect_rate: 3.1,
            },
            {
                production_name: "contactpin_2",
                total: 0,
                normal: 0,
                defective: 0,
                defect_rate: 0,
            },
        ],
        line_list: [
            { id: 1, name: "1호기" },
            { id: 2, name: "2호기" },
        ],
        items: [
            { production_name: "contactpin_1", total: 32 },
            { production_name: "contactpin_2", total: 0 },
        ],
        total: 32,
        rollCounts: [
            {
                id: "1",
                productName: "contactpin_1",
                rollsProduced: 32,
                normalCount: 31,
                defectCount: 1,
            },
            {
                id: "2",
                productName: "contactpin_2",
                rollsProduced: 0,
                normalCount: 0,
                defectCount: 0,
            },
        ],
        productionTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "0", value: 0 },
                    { date: "1", value: 2 },
                    { date: "2", value: 2 },
                    { date: "3", value: 3 },
                    { date: "4", value: 4 },
                    { date: "5", value: 4 },
                    { date: "6", value: 6 },
                    { date: "7", value: 7 },
                    { date: "8", value: 8 },
                    { date: "9", value: 9 },
                    { date: "10", value: 10 },
                    { date: "11", value: 11 },
                    { date: "12", value: 15 },
                    { date: "13", value: 17 },
                    { date: "14", value: 19 },
                    { date: "15", value: 20 },
                    { date: "16", value: 25 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "0", value: 0 },
                    { date: "1", value: 1 },
                    { date: "2", value: 2 },
                    { date: "3", value: 4 },
                    { date: "4", value: 4 },
                    { date: "5", value: 5 },
                    { date: "6", value: 6 },
                    { date: "7", value: 7 },
                    { date: "8", value: 8 },
                    { date: "9", value: 9 },
                    { date: "10", value: 11 },
                    { date: "11", value: 11 },
                    { date: "12", value: 12 },
                    { date: "13", value: 13 },
                    { date: "14", value: 14 },
                    { date: "15", value: 15 },
                    { date: "16", value: 16 },
                ],
            },
        ],
        defectTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "0", value: 0 },
                    { date: "1", value: 0 },
                    { date: "2", value: 0 },
                    { date: "3", value: 1 },
                    { date: "4", value: 0 },
                    { date: "5", value: 0 },
                    { date: "6", value: 0 },
                    { date: "7", value: 0 },
                    { date: "8", value: 0 },
                    { date: "9", value: 0 },
                    { date: "10", value: 1 },
                    { date: "11", value: 0 },
                    { date: "12", value: 0 },
                    { date: "13", value: 0 },
                    { date: "14", value: 0 },
                    { date: "15", value: 0 },
                    { date: "16", value: 0 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "0", value: 0 },
                    { date: "1", value: 0 },
                    { date: "2", value: 0 },
                    { date: "3", value: 0 },
                    { date: "4", value: 0 },
                    { date: "5", value: 1 },
                    { date: "6", value: 0 },
                    { date: "7", value: 0 },
                    { date: "8", value: 0 },
                    { date: "9", value: 0 },
                    { date: "10", value: 0 },
                    { date: "11", value: 1 },
                    { date: "12", value: 0 },
                    { date: "13", value: 0 },
                    { date: "14", value: 0 },
                    { date: "15", value: 0 },
                    { date: "16", value: 0 },
                ],
            },
        ],
    },
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "weekly",
        range: {
            start: "2025.11.17",
            end: "2025.11.20",
        },
        line_statistics: [
            {
                production_line: {
                    id: 1,
                    name: "1호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.11.17",
                        total: 60,
                        normal: 59,
                        defective: 1,
                        defect_rate: 1.7,
                    },
                    {
                        label: "2025.11.18",
                        total: 55,
                        normal: 55,
                        defective: 0,
                        defect_rate: 0,
                    },
                    {
                        label: "2025.11.19",
                        total: 37,
                        normal: 36,
                        defective: 1,
                        defect_rate: 2.7,
                    },
                ],
            },
            {
                production_line: {
                    id: 2,
                    name: "2호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.11.17",
                        total: 40,
                        normal: 40,
                        defective: 0,
                        defect_rate: 0,
                    },
                    {
                        label: "2025.11.18",
                        total: 60,
                        normal: 59,
                        defective: 1,
                        defect_rate: 1.7,
                    },
                    {
                        label: "2025.11.19",
                        total: 33,
                        normal: 33,
                        defective: 0,
                        defect_rate: 0,
                    },
                ],
            },
        ],
        production_name_statistics: [
            {
                production_name: "contactpin_1",
                total: 152,
                normal: 150,
                defective: 2,
                defect_rate: 1.3,
            },
            {
                production_name: "contactpin_2",
                total: 100,
                normal: 99,
                defective: 1,
                defect_rate: 1.0,
            },
        ],
        line_list: [
            { id: 1, name: "1호기" },
            { id: 2, name: "2호기" },
        ],
        items: [
            { production_name: "contactpin_1", total: 152 },
            { production_name: "contactpin_2", total: 100 },
        ],
        total: 252,
        rollCounts: [
            {
                id: "1",
                productName: "contactpin_1",
                rollsProduced: 152,
                normalCount: 150,
                defectCount: 2,
            },
            {
                id: "2",
                productName: "contactpin_2",
                rollsProduced: 100,
                normalCount: 99,
                defectCount: 1,
            },
        ],
        productionTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "2025.05.19", value: 60 },
                    { date: "2025.05.20", value: 55 },
                    { date: "2025.05.21", value: 37 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "2025.05.19", value: 40 },
                    { date: "2025.05.20", value: 60 },
                    { date: "2025.05.21", value: 33 },
                ],
            },
        ],
        defectTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "2025.05.19", value: 1 },
                    { date: "2025.05.20", value: 0 },
                    { date: "2025.05.21", value: 1 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "2025.05.19", value: 0 },
                    { date: "2025.05.20", value: 1 },
                    { date: "2025.05.21", value: 0 },
                ],
            },
        ],
    },
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "monthly",
        range: {
            start: "2025.11.01",
            end: "2025.11.20",
        },
        line_statistics: [
            {
                production_line: {
                    id: 1,
                    name: "1호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.11.01",
                        total: 95,
                        normal: 95,
                        defective: 0,
                        defect_rate: 0,
                    },
                    {
                        label: "2025.11.06",
                        total: 80,
                        normal: 79,
                        defective: 1,
                        defect_rate: 1.3,
                    },
                    {
                        label: "2025.11.11",
                        total: 75,
                        normal: 73,
                        defective: 2,
                        defect_rate: 2.7,
                    },
                    {
                        label: "2025.11.16",
                        total: 85,
                        normal: 80,
                        defective: 5,
                        defect_rate: 5.9,
                    },
                    {
                        label: "2025.11.21",
                        total: 50,
                        normal: 49,
                        defective: 1,
                        defect_rate: 2.0,
                    },
                ],
            },
            {
                production_line: {
                    id: 2,
                    name: "2호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.11.01",
                        total: 95,
                        normal: 95,
                        defective: 0,
                        defect_rate: 0,
                    },
                    {
                        label: "2025.11.06",
                        total: 10,
                        normal: 8,
                        defective: 2,
                        defect_rate: 20.0,
                    },
                    {
                        label: "2025.11.11",
                        total: 75,
                        normal: 71,
                        defective: 4,
                        defect_rate: 5.3,
                    },
                    {
                        label: "2025.11.16",
                        total: 85,
                        normal: 79,
                        defective: 6,
                        defect_rate: 7.1,
                    },
                    {
                        label: "2025.11.21",
                        total: 30,
                        normal: 28,
                        defective: 2,
                        defect_rate: 6.7,
                    },
                ],
            },
        ],
        production_name_statistics: [
            {
                production_name: "contactpin_1",
                total: 924,
                normal: 920,
                defective: 4,
                defect_rate: 0.4,
            },
            {
                production_name: "contactpin_2",
                total: 1011,
                normal: 1000,
                defective: 11,
                defect_rate: 1.1,
            },
        ],
        line_list: [
            { id: 1, name: "1호기" },
            { id: 2, name: "2호기" },
        ],
        items: [
            { production_name: "contactpin_1", total: 924 },
            { production_name: "contactpin_2", total: 1011 },
        ],
        total: 1935,
        rollCounts: [
            {
                id: "1",
                productName: "contactpin_1",
                rollsProduced: 924,
                normalCount: 920,
                defectCount: 4,
            },
            {
                id: "2",
                productName: "contactpin_2",
                rollsProduced: 1011,
                normalCount: 1000,
                defectCount: 11,
            },
        ],
        productionTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "2025.05.01", value: 95 },
                    { date: "2025.05.06", value: 80 },
                    { date: "2025.05.11", value: 75 },
                    { date: "2025.05.16", value: 85 },
                    { date: "2025.05.21", value: 50 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "2025.05.01", value: 95 },
                    { date: "2025.05.06", value: 10 },
                    { date: "2025.05.11", value: 75 },
                    { date: "2025.05.16", value: 85 },
                    { date: "2025.05.21", value: 30 },
                ],
            },
        ],
        defectTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "2025.05.01", value: 0 },
                    { date: "2025.05.06", value: 1 },
                    { date: "2025.05.11", value: 2 },
                    { date: "2025.05.16", value: 5 },
                    { date: "2025.05.21", value: 1 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "2025.05.01", value: 0 },
                    { date: "2025.05.06", value: 2 },
                    { date: "2025.05.11", value: 4 },
                    { date: "2025.05.16", value: 6 },
                    { date: "2025.05.21", value: 2 },
                ],
            },
        ],
    },
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "annually",
        range: {
            start: "2025.01.01",
            end: "2025.11.20",
        },
        line_statistics: [
            {
                production_line: {
                    id: 1,
                    name: "1호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.01",
                        total: 450,
                        normal: 448,
                        defective: 2,
                        defect_rate: 0.4,
                    },
                    {
                        label: "2025.02",
                        total: 420,
                        normal: 418,
                        defective: 2,
                        defect_rate: 0.5,
                    },
                    {
                        label: "2025.03",
                        total: 480,
                        normal: 479,
                        defective: 1,
                        defect_rate: 0.2,
                    },
                    {
                        label: "2025.04",
                        total: 440,
                        normal: 440,
                        defective: 0,
                        defect_rate: 0,
                    },
                    {
                        label: "2025.05",
                        total: 460,
                        normal: 459,
                        defective: 1,
                        defect_rate: 0.2,
                    },
                ],
            },
            {
                production_line: {
                    id: 2,
                    name: "2호기",
                    status: "activated",
                },
                statistics: [
                    {
                        label: "2025.01",
                        total: 520,
                        normal: 517,
                        defective: 3,
                        defect_rate: 0.6,
                    },
                    {
                        label: "2025.02",
                        total: 490,
                        normal: 486,
                        defective: 4,
                        defect_rate: 0.8,
                    },
                    {
                        label: "2025.03",
                        total: 510,
                        normal: 507,
                        defective: 3,
                        defect_rate: 0.6,
                    },
                    {
                        label: "2025.04",
                        total: 500,
                        normal: 497,
                        defective: 3,
                        defect_rate: 0.6,
                    },
                    {
                        label: "2025.05",
                        total: 530,
                        normal: 527,
                        defective: 3,
                        defect_rate: 0.6,
                    },
                ],
            },
        ],
        production_name_statistics: [
            {
                production_name: "contactpin_1",
                total: 4928,
                normal: 4921,
                defective: 7,
                defect_rate: 0.1,
            },
            {
                production_name: "contactpin_2",
                total: 5726,
                normal: 5710,
                defective: 16,
                defect_rate: 0.3,
            },
        ],
        line_list: [
            { id: 1, name: "1호기" },
            { id: 2, name: "2호기" },
        ],
        items: [
            { production_name: "contactpin_1", total: 4928 },
            { production_name: "contactpin_2", total: 5726 },
        ],
        total: 10654,
        rollCounts: [
            {
                id: "1",
                productName: "contactpin_1",
                rollsProduced: 4928,
                normalCount: 4921,
                defectCount: 7,
            },
            {
                id: "2",
                productName: "contactpin_2",
                rollsProduced: 5726,
                normalCount: 5260,
                defectCount: 16,
            },
        ],
        productionTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "2025.05.01", value: 95 },
                    { date: "2025.05.06", value: 80 },
                    { date: "2025.05.11", value: 75 },
                    { date: "2025.05.16", value: 85 },
                    { date: "2025.05.21", value: 50 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "2025.05.01", value: 95 },
                    { date: "2025.05.06", value: 10 },
                    { date: "2025.05.11", value: 75 },
                    { date: "2025.05.16", value: 85 },
                    { date: "2025.05.21", value: 30 },
                ],
            },
        ],
        defectTrend: [
            {
                productName: "contactpin_1",
                data: [
                    { date: "2025.05.01", value: 0 },
                    { date: "2025.05.06", value: 1 },
                    { date: "2025.05.11", value: 2 },
                    { date: "2025.05.16", value: 5 },
                    { date: "2025.05.21", value: 1 },
                ],
            },
            {
                productName: "contactpin_2",
                data: [
                    { date: "2025.05.01", value: 0 },
                    { date: "2025.05.06", value: 2 },
                    { date: "2025.05.11", value: 4 },
                    { date: "2025.05.16", value: 6 },
                    { date: "2025.05.21", value: 2 },
                ],
            },
        ],
    },
];
