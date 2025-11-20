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