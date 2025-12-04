import { ProductionHistoryItem } from "../common/types";

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

/* API */
// API: 생산 이력 상세 조회 + 폴리곤
export interface ProductionHistoryItemResponse {
  status: "SUCCESS";
  data: ProductionHistoryItem;
}
// API: 컨택트핀 폴리곤 조회
export interface MaskPolyData {
  id: string;
  refined_by: number | null;
  refined_at: string | null;
  created_at: string;
  mask_poly: number[][][];
}

export interface MaskPolyResponse {
  status: "SUCCESS";
  data: MaskPolyData;
}
// API: 컨택트핀 폴리곤 업데이트
export interface UpdatedPolygonRequest {
  mask_poly: number[][][];
}

export interface UpdatedPolygonResponse {
  status: "SUCCESS";
  data: string; // "" 예정
}
// API: 생산일자 별 데이터 검수 현황
export interface DataInspectionData {
  date: string;
  exception_count: number; // 검수 미완료
  refined_count: number; // 검수 완료
}

export interface DataInspectionResponse {
  status: "SUCCESS";
  data: DataInspectionData[];
}