// 생산라인 카드
// 사업소 소속 생산라인 조회 API와 맞췄으나 확인 필요
export interface ProductionLineItem {
  id: number;
  branch?: number; // 넌 뭐니 (?)
  name: string; // 생산라인 이름
  status: string; // 가동 여부 
  thumnail_url?: string; // 썸네일 이미지 (?)
  created_at?: string; // 생산 시작 일자 (?)
  updated_at?: string; // 업데이트 날짜 (?)

  productName: string; // 생산 품목
  rollsProduced: number; // 생산 개수
  normalCount: number; // 정상 개수
  defectCount: number; // 불량 개수
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
