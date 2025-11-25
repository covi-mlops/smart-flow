import { LineProductionStatisticsData, ProcessDataItem } from "@/types/analysis/types";

export const PERIOD_MOCK_DATA: LineProductionStatisticsData[] = [
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "daily",
        range: {
            start: "2025.11.20",
            end: new Date().toISOString().split('T')[0],
        },
        line_statistics: [
            {
                "production_line": {
                    "id": 1,
                    "name": "40T[PM018]",
                    "status": "activated"
                },
                "statistics": [
                    {
                        "label": "01",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "02",
                        "total": 1,
                        "normal": 1,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "03",
                        "total": 3,
                        "normal": 2,
                        "defective": 1,
                        "defect_rate": 0
                    },
                    {
                        "label": "04",
                        "total": 5,
                        "normal": 4,
                        "defective": 1,
                        "defect_rate": 0.1
                    },
                    {
                        "label": "05",
                        "total": 7,
                        "normal": 6,
                        "defective": 1,
                        "defect_rate": 0.1
                    },
                    {
                        "label": "06",
                        "total": 10,
                        "normal": 10,
                        "defective": 1,
                        "defect_rate": 0.1
                    },
                    {
                        "label": "07",
                        "total": 16,
                        "normal": 10,
                        "defective": 6,
                        "defect_rate": 0.1
                    },
                    {
                        "label": "08",
                        "total": 20,
                        "normal": 10,
                        "defective": 10,
                        "defect_rate": 0.5
                    },
                    {
                        "label": "08",
                        "total": 20,
                        "normal": 10,
                        "defective": 10,
                        "defect_rate": 0.5
                    },
                    {
                        "label": "08",
                        "total": 20,
                        "normal": 10,
                        "defective": 10,
                        "defect_rate": 0.5
                    },
                    {
                        "label": "08",
                        "total": 20,
                        "normal": 10,
                        "defective": 10,
                        "defect_rate": 0.5
                    },
                    {
                        "label": "12",
                        "total": 300,
                        "normal": 250,
                        "defective": 50,
                        "defect_rate": 0.1
                    },
                    {
                        "label": "13",
                        "total": 304,
                        "normal": 254,
                        "defective": 50,
                        "defect_rate": 98.36
                    },
                    {
                        "label": "14",
                        "total": 350,
                        "normal": 280,
                        "defective": 70,
                        "defect_rate": 0
                    },
                    {
                        "label": "15",
                        "total": 370,
                        "normal": 300,
                        "defective": 70,
                        "defect_rate": 97.7
                    },
                    {
                        "label": "16",
                        "total": 400,
                        "normal": 300,
                        "defective": 100,
                        "defect_rate": 0
                    },
                ]
            },
            {
                "production_line": {
                    "id": 2,
                    "name": "test",
                    "status": "activated"
                },
                "statistics": [
                    {
                        "label": "01",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "02",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "03",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "04",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "05",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "06",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "07",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "08",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "09",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "10",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "11",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "12",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "13",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "14",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "15",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "16",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },

                ]
            }
        ],
        production_name_statistics: [
            {
                production_name: "contactpin_1",
                statistics: [
                    {
                        "label": "01",
                        "total": 1,
                        "normal": 1,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "02",
                        "total": 5,
                        "normal": 4,
                        "defective": 1,
                        "defect_rate": 0
                    },
                    {
                        "label": "03",
                        "total": 11,
                        "normal": 9,
                        "defective": 2,
                        "defect_rate": 0
                    },
                    {
                        "label": "04",
                        "total": 30,
                        "normal": 25,
                        "defective": 5,
                        "defect_rate": 0
                    },
                ]
            },
            {
                production_name: "contactpin_2",
                statistics: [
                    {
                        "label": "01",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "02",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "03",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "04",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                ]
            },
        ],
        line_list: [
            {
                id: 1,
                name: "40T[PM018]",
                "total_count": 800,
                "normal_count": 12,
                "defective_count": 788
            },
            {
                "id": 2,
                "name": "test",
                "total_count": 0,
                "normal_count": 0,
                "defective_count": 0
            }
        ],
        items: [
            {
                "production_name": "APB2909B-KAG-R2-S",
                "total": 4923
            },
            {
                "production_name": "test_product_name",
                "total": 108
            }
        ],
        total: 32,
        // productionTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "0", value: 0 },
        //             { date: "1", value: 2 },
        //             { date: "2", value: 2 },
        //             { date: "3", value: 3 },
        //             { date: "4", value: 4 },
        //             { date: "5", value: 4 },
        //             { date: "6", value: 6 },
        //             { date: "7", value: 7 },
        //             { date: "8", value: 8 },
        //             { date: "9", value: 9 },
        //             { date: "10", value: 10 },
        //             { date: "11", value: 11 },
        //             { date: "12", value: 15 },
        //             { date: "13", value: 17 },
        //             { date: "14", value: 19 },
        //             { date: "15", value: 20 },
        //             { date: "16", value: 25 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "0", value: 0 },
        //             { date: "1", value: 1 },
        //             { date: "2", value: 2 },
        //             { date: "3", value: 4 },
        //             { date: "4", value: 4 },
        //             { date: "5", value: 5 },
        //             { date: "6", value: 6 },
        //             { date: "7", value: 7 },
        //             { date: "8", value: 8 },
        //             { date: "9", value: 9 },
        //             { date: "10", value: 11 },
        //             { date: "11", value: 11 },
        //             { date: "12", value: 12 },
        //             { date: "13", value: 13 },
        //             { date: "14", value: 14 },
        //             { date: "15", value: 15 },
        //             { date: "16", value: 16 },
        //         ],
        //     },
        // ],
        // defectTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "0", value: 0 },
        //             { date: "1", value: 0 },
        //             { date: "2", value: 0 },
        //             { date: "3", value: 1 },
        //             { date: "4", value: 0 },
        //             { date: "5", value: 0 },
        //             { date: "6", value: 0 },
        //             { date: "7", value: 0 },
        //             { date: "8", value: 0 },
        //             { date: "9", value: 0 },
        //             { date: "10", value: 1 },
        //             { date: "11", value: 0 },
        //             { date: "12", value: 0 },
        //             { date: "13", value: 0 },
        //             { date: "14", value: 0 },
        //             { date: "15", value: 0 },
        //             { date: "16", value: 0 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "0", value: 0 },
        //             { date: "1", value: 0 },
        //             { date: "2", value: 0 },
        //             { date: "3", value: 0 },
        //             { date: "4", value: 0 },
        //             { date: "5", value: 1 },
        //             { date: "6", value: 0 },
        //             { date: "7", value: 0 },
        //             { date: "8", value: 0 },
        //             { date: "9", value: 0 },
        //             { date: "10", value: 0 },
        //             { date: "11", value: 1 },
        //             { date: "12", value: 0 },
        //             { date: "13", value: 0 },
        //             { date: "14", value: 0 },
        //             { date: "15", value: 0 },
        //             { date: "16", value: 0 },
        //         ],
        //     },
        // ],
    },
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "weekly",
        range: {
            start: "2025.11.17",
            end: new Date().toISOString().split('T')[0].split('T')[0],
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
                "production_name": "APB2909B-KAG-R2-S",
                "statistics": [
                    {
                        "label": "2025-11-15",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-16",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-17",
                        "total": 304,
                        "normal": 0,
                        "defective": 304,
                        "defect_rate": 100
                    },
                    {
                        "label": "2025-11-18",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-19",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-20",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-21",
                        "total": 608,
                        "normal": 12,
                        "defective": 596,
                        "defect_rate": 98.03
                    }
                ]
            }
        ],
        line_list: [
            {
                id: 1,
                name: "40T[PM018]",
                "total_count": 912,
                "normal_count": 12,
                "defective_count": 900
            },
            {
                "id": 2,
                "name": "test",
                "total_count": 0,
                "normal_count": 0,
                "defective_count": 0
            }
        ],
        items: [
            {
                "production_name": "APB2909B-KAG-R2-S",
                "total": 305
            },
            {
                "production_name": "test_product_name",
                "total": 102
            }
        ],
        total: 252,
        // productionTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "2025.05.19", value: 60 },
        //             { date: "2025.05.20", value: 55 },
        //             { date: "2025.05.21", value: 37 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "2025.05.19", value: 40 },
        //             { date: "2025.05.20", value: 60 },
        //             { date: "2025.05.21", value: 33 },
        //         ],
        //     },
        // ],
        // defectTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "2025.05.19", value: 1 },
        //             { date: "2025.05.20", value: 0 },
        //             { date: "2025.05.21", value: 1 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "2025.05.19", value: 0 },
        //             { date: "2025.05.20", value: 1 },
        //             { date: "2025.05.21", value: 0 },
        //         ],
        //     },
        // ],
    },
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "monthly",
        range: {
            start: "2025.11.01",
            end: new Date().toISOString().split('T')[0].split('T')[0],
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
                "production_name": "APB2909B-KAG-R2-S",
                "statistics": [
                    {
                        "label": "2025-10-20",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-10-27",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-03",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-10",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11-17",
                        "total": 912,
                        "normal": 12,
                        "defective": 900,
                        "defect_rate": 98.68
                    }
                ]
            }
        ],
        line_list: [
            {
                id: 1,
                name: "40T[PM018]",
                "total_count": 1000,
                "normal_count": 500,
                "defective_count": 500
            },
            {
                "id": 2,
                "name": "test",
                "total_count": 0,
                "normal_count": 0,
                "defective_count": 0
            }
        ],
        items: [
            {
                "production_name": "APB2909B-KAG-R2-S",
                "total": 608
            },
            {
                "production_name": "test_product_name",
                "total": 304
            }
        ],
        total: 1935,
        // productionTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "2025.05.01", value: 95 },
        //             { date: "2025.05.06", value: 80 },
        //             { date: "2025.05.11", value: 75 },
        //             { date: "2025.05.16", value: 85 },
        //             { date: "2025.05.21", value: 50 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "2025.05.01", value: 95 },
        //             { date: "2025.05.06", value: 10 },
        //             { date: "2025.05.11", value: 75 },
        //             { date: "2025.05.16", value: 85 },
        //             { date: "2025.05.21", value: 30 },
        //         ],
        //     },
        // ],
        // defectTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "2025.05.01", value: 0 },
        //             { date: "2025.05.06", value: 1 },
        //             { date: "2025.05.11", value: 2 },
        //             { date: "2025.05.16", value: 5 },
        //             { date: "2025.05.21", value: 1 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "2025.05.01", value: 0 },
        //             { date: "2025.05.06", value: 2 },
        //             { date: "2025.05.11", value: 4 },
        //             { date: "2025.05.16", value: 6 },
        //             { date: "2025.05.21", value: 2 },
        //         ],
        //     },
        // ],
    },
    {
        branch: {
            id: 1,
            name: "본사",
        },
        period: "annually",
        range: {
            start: "2025.01.01",
            end: new Date().toISOString().split('T')[0].split('T')[0],
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
                "production_name": "APB2909B-KAG-R2-S",
                "statistics": [
                    {
                        "label": "2024-11",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2024-12",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-01",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-02",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-03",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-04",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-05",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-06",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-07",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-08",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-09",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-10",
                        "total": 0,
                        "normal": 0,
                        "defective": 0,
                        "defect_rate": 0
                    },
                    {
                        "label": "2025-11",
                        "total": 912,
                        "normal": 12,
                        "defective": 900,
                        "defect_rate": 98.68
                    }
                ]
            }
        ],
        line_list: [
            {
                id: 1,
                name: "40T[PM018]",
                "total_count": 3142,
                "normal_count": 12,
                "defective_count": 3130,
            },
            {
                "id": 2,
                "name": "test",
                "total_count": 0,
                "normal_count": 0,
                "defective_count": 0
            }
        ],
        items: [
            {
                "production_name": "APB2909B-KAG-R2-S",
                "total": 608
            },
            {
                "production_name": "test_product_name",
                "total": 304
            }
        ],
        total: 10654,
        // productionTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "2025.05.01", value: 95 },
        //             { date: "2025.05.06", value: 80 },
        //             { date: "2025.05.11", value: 75 },
        //             { date: "2025.05.16", value: 85 },
        //             { date: "2025.05.21", value: 50 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "2025.05.01", value: 95 },
        //             { date: "2025.05.06", value: 10 },
        //             { date: "2025.05.11", value: 75 },
        //             { date: "2025.05.16", value: 85 },
        //             { date: "2025.05.21", value: 30 },
        //         ],
        //     },
        // ],
        // defectTrend: [
        //     {
        //         productName: "contactpin_1",
        //         data: [
        //             { date: "2025.05.01", value: 0 },
        //             { date: "2025.05.06", value: 1 },
        //             { date: "2025.05.11", value: 2 },
        //             { date: "2025.05.16", value: 5 },
        //             { date: "2025.05.21", value: 1 },
        //         ],
        //     },
        //     {
        //         productName: "contactpin_2",
        //         data: [
        //             { date: "2025.05.01", value: 0 },
        //             { date: "2025.05.06", value: 2 },
        //             { date: "2025.05.11", value: 4 },
        //             { date: "2025.05.16", value: 6 },
        //             { date: "2025.05.21", value: 2 },
        //         ],
        //     },
        // ],
    },
];

export const ABNORMAL_ROLL_MOCK_DATA: ProcessDataItem[] = [
    {
        id: 1,
        production_line: "생산라인1",
        mold_no: "contactpin_1",
        defective_count: 1,
        normal_count: 31,
        defect_rate: 0.1,
        created_at: "2025-11-15"
    },
    {
        id: 2,
        production_line: "생산라인2",
        mold_no: "contactpin_2",
        defective_count: 5,
        normal_count: 40,
        defect_rate: 0.3,
        created_at: "2025-11-16"
    },
    {
        id: 1,
        production_line: "생산라인1",
        mold_no: "contactpin_1",
        defective_count: 1,
        normal_count: 31,
        defect_rate: 0.1,
        created_at: "2025-11-15"
    },
    {
        id: 2,
        production_line: "생산라인2",
        mold_no: "contactpin_2",
        defective_count: 5,
        normal_count: 40,
        defect_rate: 0.3,
        created_at: "2025-11-16"
    },
    {
        id: 1,
        production_line: "생산라인1",
        mold_no: "contactpin_1",
        defective_count: 1,
        normal_count: 31,
        defect_rate: 0.1,
        created_at: "2025-11-15"
    },
    {
        id: 2,
        production_line: "생산라인2",
        mold_no: "contactpin_2",
        defective_count: 5,
        normal_count: 40,
        defect_rate: 0.3,
        created_at: "2025-11-16"
    },
    {
        id: 1,
        production_line: "생산라인1",
        mold_no: "contactpin_1",
        defective_count: 1,
        normal_count: 31,
        defect_rate: 0.1,
        created_at: "2025-11-15"
    },
    {
        id: 2,
        production_line: "생산라인2",
        mold_no: "contactpin_2",
        defective_count: 5,
        normal_count: 40,
        defect_rate: 0.3,
        created_at: "2025-11-16"
    },
    {
        id: 1,
        production_line: "생산라인1",
        mold_no: "contactpin_1",
        defective_count: 1,
        normal_count: 31,
        defect_rate: 0.1,
        created_at: "2025-11-15"
    },
    {
        id: 2,
        production_line: "생산라인2",
        mold_no: "contactpin_2",
        defective_count: 5,
        normal_count: 40,
        defect_rate: 0.3,
        created_at: "2025-11-16"
    },
    {
        id: 1,
        production_line: "생산라인1",
        mold_no: "contactpin_1",
        defective_count: 1,
        normal_count: 31,
        defect_rate: 0.1,
        created_at: "2025-11-15"
    },
    {
        id: 2,
        production_line: "생산라인2",
        mold_no: "contactpin_2",
        defective_count: 5,
        normal_count: 40,
        defect_rate: 0.3,
        created_at: "2025-11-16"
    },
];