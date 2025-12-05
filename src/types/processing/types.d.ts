// 데이터 필터링 옵션
export interface FilterOptions {
  production_name: string;
  production_line: string;
  start_created_at: string;
  end_created_at: string;
  is_abnormal: string;
  applied_model: string;
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

/* API */
// API: 생산 이력 상세 조회 + 폴리곤
interface DatasetItem {
  mask_poly: number;
  classification_result: string; // AI 결과 (정상, 불량, 예외)
}

export interface ProductionHistoryItem {
  id: number;
  production_name: string;
  mold_no: string;
  production_line: {
    id: number;
    name: string;
  };
  first_image_created_at: string; // AI 검사 일자
  total_count: number;
  normal_count: number;
  defective_count: number;
  defect_rate: number;
  is_abnormal: boolean; // 불량 여부
  created_at: string; // 생산 일자
  datasets: DatasetItem[];
}

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
// API: 컨택트핀 이미지 조회
export interface ContactpinImageResults {
  id: string;
  dataset_id: string;
  image_url: string;
  classification_result: string;
  refined_at: string | null;
  created_at: string;
  attributes: {
    head: number;
    neck: number;
    angl: number;
    angr: number;
  }
}

export interface ContactpinImageData {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    datasets: ContactpinImageResults[];
  }
}

export interface ContactpinImageResonse {
  status: "SUCCESS";
  data: ContactpinImageData;
}