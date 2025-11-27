import { ProductionHistoryEachItem_P } from "@/types/processing/process-data";
// 목데이터
// TODO: API 연동 시 변경 
export const MOCK_DATA: ProductionHistoryEachItem_P[] = [
    {
        id: 1,
        production_name: "APB2909B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "사용자\n업로드",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n20:40:11",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.13\n14:40:25",
        is_abnormal: true,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-26T06:50:42.102000",
                created_at: "2025-11-26T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "불량",
                refined_at: null,
                created_at: "2025-11-26T06:50:41.983000",
                mask_poly: 297
            },
            {
                id: "6926a342fa879c75etwer4rg",
                classification_result: "불량",
                refined_at: "2025-11-26T06:50:42.102000",
                created_at: "2025-11-26T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba2627553ghr232",
                classification_result: "불량",
                refined_at: null,
                created_at: "2025-11-26T06:50:41.983000",
                mask_poly: 297
            },
            {
                id: "6926a342fa879c75sfgry3ad",
                classification_result: "불량",
                refined_at: "2025-11-26T06:50:42.102000",
                created_at: "2025-11-26T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba26275gfhg41df",
                classification_result: "불량",
                refined_at: null,
                created_at: "2025-11-26T06:50:41.983000",
                mask_poly: 297
            },
        ]
    },
    {
        id: 2,
        production_name: "APB1111B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "사용자\n업로드",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n14:40:25",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.12\n14:40:25",
        is_abnormal: true,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-26T06:50:42.102000",
                created_at: "2025-11-26T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "정상",
                refined_at: null,
                created_at: "2025-11-26T06:50:41.983000",
                mask_poly: 297
            },
        ]
    },
    {
        id: 3,
        production_name: "APB2222B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "사용자\n업로드",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n14:40:25",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.11\n14:40:25",
        is_abnormal: false,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-26T06:50:42.102000",
                created_at: "2025-11-26T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "불량",
                refined_at: null,
                created_at: "2025-11-26T06:50:41.983000",
                mask_poly: 297
            }
        ]
    },
    {
        id: 4,
        production_name: "APB3333B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "생산라인1",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n14:40:25",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.10\n14:40:25",
        is_abnormal: true,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-26T06:50:42.102000",
                created_at: "2025-11-26T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "불량",
                refined_at: null,
                created_at: "2025-11-26T06:50:41.983000",
                mask_poly: 297
            }
        ]
    },
    {
        id: 5,
        production_name: "APB4444B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "생산라인1",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n14:40:25",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.09\n14:40:25",
        is_abnormal: true,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-21T06:50:42.102000",
                created_at: "2025-11-21T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "정상",
                refined_at: null,
                created_at: "2025-11-21T06:50:41.983000",
                mask_poly: 297
            }
        ]
    },
    {
        id: 6,
        production_name: "APB4444B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "생산라인1",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n14:40:25",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.09\n14:40:25",
        is_abnormal: true,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-21T06:50:42.102000",
                created_at: "2025-11-21T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "정상",
                refined_at: null,
                created_at: "2025-11-21T06:50:41.983000",
                mask_poly: 297
            }
        ]
    },
    {
        id: 7,
        production_name: "APB4444B-KAG-R2-S",
        mold_no: "contactpin_1",
        production_line: {
            id: 1,
            name: "생산라인1",
        },
        applied_model: null,
        first_image_created_at: "2025.11.13\n14:40:25",
        total_count: 124,
        normal_count: 0,
        defective_count: 124,
        exception_count: 0,
        defect_rate: 100,
        created_at: "2025.11.09\n14:40:25",
        is_abnormal: false,
        datasets: [
            {
                id: "6926a342fa879c75cf4f16c4",
                classification_result: "불량",
                refined_at: "2025-11-21T06:50:42.102000",
                created_at: "2025-11-21T06:50:42.102000",
                mask_poly: 290
            },
            {
                id: "6926a3413ba262755fa7ca7d",
                classification_result: "정상",
                refined_at: null,
                created_at: "2025-11-21T06:50:41.983000",
                mask_poly: 297
            }
        ]
    },
];