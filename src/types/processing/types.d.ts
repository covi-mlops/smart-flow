// 생산라인 카드
// API: 생산 라인 목록 조회 - 개별 생산라인
export interface ProductionLineItem {
  id: number;
  branch: number; // 사업소 id
  name: string; // 생산라인 이름
  status: "activated" | "maintenance" | "stop"; // 가동 여부 
  latest_history: {
    id: number;
    status: "collecting" | "classifying" | "completed" | "error"; // 사용X 
    production_name: string; // 생산품명
    created_at: string; // 생산 날짜
    total_count: number;
    normal_count: number;
    defective_count: number;
  } | null;
}
// API: 생산 라인 목록 조회
export interface ProductionLineResponse {
  status: "SUCCESS" | "FAIL";
  data: {
    items: ProductionLineItem[];
    total: number;
  }
}

// 생산라인 별 일일 컨택트 핀 정상/불량 데이터 현황 그래프
export interface DailyDataPoint {
  productionLine: string;
  normalCount: number;
  defectCount: number;
}
// 생산라인 별 일일 컨택트 핀 예외 데이터 현황 그래프
export interface ExceptionDataPoint {
  productionLine: string;
  count: number;
}
// 생산일자 별 데이터 검수 현황 그래프
export interface InspectionDataPoint {
  date: string;
  inspected: number; // 검수 완료
  uninspected: number; // 검수 미완료
}
