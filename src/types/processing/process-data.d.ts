// API: 비정상 생산 이력 조회 - 개별 아이템
export interface ProcessDataItem {
    id: number;
    production_line: string;
    mold_no: string;
    defective_count: number;
    normal_count: number;
    defect_rate: number;
    created_at: string;
}
// API: 비정상 생산 이력 조회
export interface DailyAbnormalRollResponse {
    status: "SUCCESS" | "FAIL";
    data: {
        count: number;
        next: string | null; // "/api/productions/..."
        previous: string | null; // "/api/productions/..."
        result: ProcessDataItem[];
    }
}
// 데이터 필터링 옵션
// API 명세와 일치 (진행 중)
export interface FilterOptions {
    production_name: string;
    production_line: string;
    start_created_at: string;
    end_created_at: string;
    is_abnormal: string;
    applied_model: string;
}
