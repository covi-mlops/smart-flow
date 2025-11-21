export interface ProcessDataItem {
    id: number;
    production_name: string;
    productionDate: string;
    product: string;
    defectRate: {
        percentage: string;
        defectCount: number;
        totalCount: number;
    };
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
