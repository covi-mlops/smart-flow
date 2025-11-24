export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'annually';

export interface DailyRollCostPoint {
    productionLine: string;
    normalCount: number;
    defectCount: number;
}

export interface RollCountCardStatus {
    id: string;
    productName: string; // 생산품목 이름
    rollsProduced: number; // 생산 개수
    normalCount: number; // 정상 개수
    defectCount: number; // 불량 개수
}


export interface ProductionTrendDataPoint {
    date: string;
    value: number;
}

export interface ProductionLineChartData {
    productName: string;
    data: ProductionTrendDataPoint[];
}
// 시작/종료 날짜
export interface DateRange {
    start: string;
    end: string;
}
// 라인별 통계
interface LineStatisticsItem {
    production_line: {
        id: number;
        name: string;
        status: "activated" | "maintenance" | "stop"; // 확인 필요
    };
    statistics: {
        label: string; // 형태 확인 필요
        total: number;
        normal: number;
        defective: number;
        defect_rate: number;
    }[];
}
// 품목별 통계
interface ProductionNameStatistics {
    production_name: string;
    total: number;
    normal: number;
    defective: number;
    defect_rate: number;
}

interface LineList {
    id: number;
    name: string;
}

interface Items {
    production_name: string;
    total: number;
}
// API: 라인 생산 통계 
export interface LineProductionStatisticsData {
    branch: {
        id: number;
        name: string;
    }
    period: "daily" | "weekly" | "monthly" | "annually";
    range: DateRange;
    line_statistics: LineStatisticsItem[]; // 라인별 통계
    production_name_statistics: ProductionNameStatistics[]; // 품목별 통계
    line_list: LineList[];
    items: Items[];
    total: number;

    rollCounts: RollCountCardStatus[];
    productionTrend: ProductionLineChartData[];
    defectTrend: ProductionLineChartData[];
}