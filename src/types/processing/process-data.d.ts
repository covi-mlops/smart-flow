// API: 생산 이력 상세 조회(+ 데이터 분포)
interface DatasetItem {
    id: string;
    classification_result: string; // AI 결과 (정상, 불량, 예외)
    refined_at: string | null; // 가공 여부 - 가공한 시간 or null
    created_at: string;
    mask_poly: number;
}

export interface ProductionHistoryEachItem_P {
    id: number;
    production_name: string;
    mold_no: string;
    production_line: {
        id: number;
        name: string;
    };
    applied_model: string | null;
    first_image_created_at: string; // AI 검사 일자
    total_count: number;
    normal_count: number;
    defective_count: number;
    exception_count: number; // TODO: 추후 명세 확인 후 수정
    defect_rate: number;
    created_at: string; // 생산 일자
    is_abnormal: boolean; // 불량 여부
    datasets: DatasetItem[];
}

export interface ProductionHistoryEachItemRequest_P {
    id: number;
}

export interface ProductionHistoryEachItemResponse_P {
    status: "SUCCESS" | "FAIL";
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
