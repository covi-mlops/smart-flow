// API: 일일 불량 ROLL 알림 - 개별 아이템
export interface ProcessDataItem {
    id: number;
    production_line: string;
    mold_no: string;
    defective_count: number;
    normal_count: number;
    defect_rate: number;
    created_at: string;
}
// API: 일일 불량 ROLL 알림
export interface DailyAbnormalRollResponse {
    status: "SUCCESS" | "FAIL";
    data: {
        count: number;
        next: string | null; // TODO:string 형태 확인해야 함
        previous: string | null; // TODO: string 형태 확인해야 함
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
