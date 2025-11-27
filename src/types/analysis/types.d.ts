/* 상태 관리 */
export interface SortConfigStore {
    isDesc: boolean;
    setDesc: () => void;
    setAsc: () => void;
}

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
// 생산 현황 히스토리 기간 조건
export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'annually';

export interface DailyRollCostPoint {
    productionLine: string;
    normalCount: number;
    defectCount: number;
}

export interface ProductionTrendDataPoint {
    date: string;
    value: number;
}

export interface ProductionLineChartData {
    productName: string;
    data: ProductionTrendDataPoint[];
}
// ----------
// 시작/종료 날짜
export interface DateRange {
    start: string;
    end: string;
}
// 개별 통계 데이터
interface StatisticsItem {
    // label: "2025-11-11 10:00" | "2025-11-15" | "2025-11-15" | "2024-11"
    label: string;
    total: number;
    normal: number;
    defective: number;
    defect_rate: number;
}
// 라인별 통계
export interface LineStatisticsItem {
    production_line: {
        id: number;
        name: string;
        status: "activated" | "maintenance" | "stop";
    };
    statistics: StatisticsItem[];
}
// 품목별 통계
interface ProductionNameItem {
    production_name: string;
    statistics: StatisticsItem[];
}
// 생산 품목 별 ROLL 양불 수량
interface LineList {
    id: number;
    name: string;
    total_count: number;
    normal_count: number;
    defective_count: number;
}

interface Items {
    production_name: string;
    total: number;
}
// API: 라인 생산 통계 - 개별 데이터
export interface LineProductionStatisticsData {
    branch: {
        id: number;
        name: string;
    }
    period: "daily" | "weekly" | "monthly" | "annually";
    range: DateRange;
    line_statistics: LineStatisticsItem[]; // 라인별 통계
    production_name_statistics: ProductionNameItem[]; // 품목별 통계
    line_list: LineList[];
    items: Items[];
    total: number;
}
// API: 라인 생산 통계
export interface LineProductionStatisticsRequest {
    date: string; // 2025-11-24
    period: string; // daily, weekly, monthly, annually
}

export interface LineProductionStatisticsResponse {
    status: "SUCCESS" | "FAIL";
    data: LineProductionStatisticsData;
}
// ----------
// API: 생산 라인 이름 조회
export interface ProductionLineNameResponse {
    status: "SUCCESS" | "FAIL";
    data: {
        items: string[];
        total: number;
    }
}
// ----------
// API: 생산 품목 리스트 조회
export interface ProductionItemNameResponse {
    status: "SUCCESS" | "FAIL";
    data: {
        items: string[];
        total: number;
    }
}
// ----------
// API: 생산 이력 상세 조회
// 생산 이력 단건
interface DatasetItem {
    id: string;
    dataset_id: string;
    classification_result: string; // AI 결과
    refined_at: string | null; // 가공 여부
    created_at: string;
    attributes: {
        head: number;
        neck: number;
        angl: number;
        angr: number;
    }
}

export interface ProductionHistoryEachItem_A {
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
    defect_rate: number;
    created_at: string; // 생산 일자
    inspection_parameters: {
        head: {
            min: number;
            max: number;
        };
        neck: {
            min: number;
            max: number;
        };
        angl: {
            min: number;
            max: number;
        };
        angr: {
            min: number;
            max: number;
        };
    };
    is_abnormal: boolean; // 불량 여부
    datasets: DatasetItem[];
}

export interface ProductionHistoryEachItemRequest_A {
    id: number;
}

export interface ProductionHistoryEachItemData_A {
    count: number;
    next: string | null;
    previous: string | null;
    results: ProductionHistoryEachItem_A;
}

export interface ProductionHistoryEachItemResponse_A {
    status: "SUCCESS" | "FAIL";
    data: ProductionHistoryEachItemData_A;
}