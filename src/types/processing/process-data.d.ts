// 분석 플랫폼 - 일일 불량 ROLL 알림 API와 변수명 일치 -> 엔터 전까지
export interface ProcessDataItem {
    id: number;
    production_line: string;
    mold_no: string;
    defective_count: number;
    normal_count: number;
    defect_rate: number;
    created_at: string;

    inspectionResult: "정상" | "불량";
    aiModel: string;
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
