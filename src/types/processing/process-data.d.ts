export interface ProcessDataItem {
    id: number;
    productionDate: string;
    productionLine: string;
    product: string;
    defectRate: {
        percentage: string;
        defectCount: number;
        totalCount: number;
    };
    inspectionResult: "정상" | "불량";
    aiModel: string;
}
// 데이터 가공 페이지 표
export interface FilterOptions {
    product: string;
    startDate: string;
    endDate: string;
    productionLine: string;
    inspectionResult: string;
    aiModel: string;
}
