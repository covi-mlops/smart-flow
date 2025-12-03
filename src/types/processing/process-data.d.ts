// API: 생산 이력 상세 조회(+ 데이터 분포)
interface DatasetItem {
    id: string;
    classification_result: string; // AI 결과 (정상, 불량, 예외)
    refined_at: string | null; // 가공 여부 - 가공한 시간 or null
    created_at: string;
    mask_poly: number;
    image_url: string;
}

export interface ProductionHistoryEachItem_P {
    id: number;
    production_name: string;
    mold_no: string;
    production_line: {
        id: number;
        name: string;
    };
    first_image_created_at: string; // AI 검사 일자
    total_count: number;
    normal_count: number;
    defective_count: number;
    defect_rate: number;
    is_abnormal: boolean; // 불량 여부
    created_at: string; // 생산 일자
    datasets: DatasetItem[];
}

export interface ProductionHistoryEachItemResponse_P {
    status: "SUCCESS";
    data: ProductionHistoryEachItem_P;
}
// 데이터 필터링 옵션
export interface FilterOptions {
    production_name: string;
    production_line: string;
    start_created_at: string;
    end_created_at: string;
    is_abnormal: string;
    applied_model: string;
}
