// ----------
// API: 생산 이력 조회 (분석/가공)
export interface ProductionHistoryRequest {
    production_name?: string;
    production_line?: string;
    applied_model: string;
    is_abnormal?: boolean;
    start_created_at?: string; // 2025-11-24
    end_created_at?: string; // 2025-11-24
    page?: number;
    page_size: number;
}

export interface ProductionHistoryItem {
    id: number;
    production_name: string;
    mold_no: string;
    production_line: {
        id: number;
        name: string;
    }
    applied_model: string | null;
    total_count: number;
    normal_count: number;
    defective_count: number;
    defect_rate: number;
    is_abnormal: boolean;
    status: "collecting" | "classifying" | "completed" | "error"; // 사용X 
    created_at: string;
}

export interface ProductionHistoryResponse {
    status: "SUCCESS" | "FAIL";
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: ProductionHistoryItem[];
    }
}
// ----------
// API 공통 실패 응답
export interface FailResponse {
    status: "FAIL";
    data: {
        message: string;
    };
}
// ----------
// API: 일일 양불 비율 조회
export interface ViewDailyNormalDefectRatioLines {
    line_id: number;
    line_name: string;
    normal_count: number;
    defective_count: number;
    exception_count: number;
    total_count: number;
    defect_rate: number;
}

export interface ViewDailyNormalDefectRatioResponse {
    status: "SUCCESS";
    data: {
        lines: ViewDailyNormalDefectRatioLines[];
    };
}
// ----------
// API: 생산 이력 조회
export interface ProductionHistoryResult {
    id: number;
    production_name: string;
    mold_no: string;
    production_line: {
        id: number;
        name: string;
    };
    applied_model: string | null;
    total_count: number;
    normal_count: number;
    defective_count: number;
    defect_rate: number;
    is_abnormal: boolean;
    status: "collecting" | "classifying" | "completed" | "error";
    created_at: string;
}

export interface ProductionHistoryData {
    count: number;
    next: string | null;
    previous: string | null;
    results: ProductionHistoryResult[];
}

export interface ProductionHistoryResponse {
    status: "SUCCESS";
    data: ProductionHistoryData;
}