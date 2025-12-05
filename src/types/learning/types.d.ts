export interface LearningDataItem {
    id: number;
    server_type: string;
    dataset_count: number;
    status: "ready" | "processing" | "done";
    start_at: string | null; // 학습 시작일
}
// API: 인공지능 학습 목록 조회
export interface LearningListResults {
    id: number;
    trained_with: string[]; // 검사 항목
    training_data_count: number;
    // 학습 준비 완료 / 학습 대기중 / 학습 중 / 학습 완료 / 배포 완료 / 학습 실패
    status: "ready" | "pending" | "processing" | "done" | "deployed" | "fail";
    training_started_at: string | null;
}

export interface LearningListData {
    count: number;
    next: string | null;
    previous: string | null;
    results: LearningListResults;
}

export interface LearningListResponse {
    status: "SUCCESS";
    data: LearningListData;
}
// API: AI 모델 목록 조회
interface ResultsItem {
    id: number;
    server_type: string; // 모델 이름
    process_done_at: string | null; // 학습 완료 시각
    accuracy: number | null;
    loss: number | null;
    is_applied: boolean;
    dataset_count: number; // 데이터 수
    trained_with: string[]; // 생산 이력 배열
}

export interface AIModelListItem {
    count: number;
    next: string | null;
    previous: string | null;
    results: ResultsItem[];
}

export interface AIModelListResponse {
    status: "SUCCESS";
    data: AIModelListItem;
}
// API: 인공지능 학습 > 인공지능 학습 모델 데이터셋 목록 조회
export interface LearningModelDatasetListResults {
    product_history: number;
    production_date: string; // 생산 일자
    production_line_name: string;
    production_name: string;
    normal_count: number;
    defective_count: number;
    exception_count: number;
    ai_defect_rate: number;
    inspect_result: string;
    classify_folder: string[];
}

export interface LearningModelDatasetListData {
    count: number;
    next: string | null;
    previous: string | null;
    results: LearningModelDatasetListResults[];
}

export interface LearningModelDatasetListResponse {
    status: "SUCCESS";
    data: LearningModelDatasetListData;
}
// API: 인공지능 학습 > 인공지능 학습 모델 정보 상세 조회
export interface LearningModelDataDetailData {
    model_name: string;
    data_count: number;
    normal_count: number;
    defective_count: number;
    exception_count: number;
    production_names: string[];
}

export interface LearningModelDataDetailResponse {
    status: "SUCCESS";
    data: LearningModelDataDetailData;
}
// API: AI 모델 상세 조회
export interface AIModelDetailData {
    id: number;
    server_type: string; // 모델 이름
    created_at: string; // 학습 시작 시간
    process_done_at: string | null; // 학습 완료 시간
    accuracy: number;
    loss: number;
    is_applied: boolean; // 적용 여부
    production_name_list: string[]; // [] -> 기존 모델임을 적용해야 함
    dataset_stats: {
        total: number;
        normal: number;
        defective: number;
        exception: number;
    };
    confusion_matrix_graph: string | null; // null -> 학습 시킨 모델이 아닌 경우
    loss_graph: string | null; // null -> 학습 시킨 모델이 아닌 경우
}

export interface AIModelDetailResponse {
    status: "SUCCESS";
    data: AIModelDetailData;
}
// API: AI 모델 기준, 생산 이력 조회
export interface ModelProductionHistoriesResults {
    production_date: string;
    production_line_name: string;
    production_name: string;
    defect_rate: number;
    is_abnormal: boolean;
    dataset: {
        normal_count: number;
        defective_count: number;
        exceptive_count: number;
    };
}

export interface ModelProductionHistoriesData {
    count: number;
    next: string | null;
    previous: string | null;
    results: ModelProductionHistoriesResults[];
}

export interface ModelProductionHistoriesResponse {
    status: "SUCCESS";
    data: ModelProductionHistoriesData;
}
// API: 인공지능 학습 > 데이터셋 포함 생산 이력 조회
export interface ModelDataProductionHistoriesItem {
    batch_id: string;
    created_at: string;
    production_line_name: string;
    production_item: string;
    normal_count: number;
    defective_count: number;
    exception_count: number;
    defective_rate: number;
    is_abnormal: boolean;
}

export interface ModelDataProductionHistoriesData {
    count: number;
    next: string | null;
    previous: string | null;
    results: ModelDataProductionHistoriesItem[];
}

export interface ModelDataProductionHistoriesResponse {
    status: "SUCCESS";
    data: ModelDataProductionHistoriesData;
}
// API: 사업소 소속 생산라인 조회 (썸네일)
export interface ProductionLinesItem {
    id: number;
    branch: number;
    name: string;
    status: "activated" | "maintenance" | "stop";
    thumbnail_url: string;
    latest_production_attributes: {
        head: string;
        neck: string;
        angl: string;
        angr: string;
    }
}

export interface ProductionLinesData {
    items: ProductionLinesItem[];
    total: number;
}

export interface ProductionLinesResponse {
    status: "SUCCESS";
    data: ProductionLinesData;
}
// API: 검사 기준 변경 로그 조회
export interface TestStandard {
    parameters: {
        angl: {
            max: number;
            min: number;
        },
        angr: {
            max: number;
            min: number;
        },
        head: {
            max: number;
            min: number;
        },
        neck: {
            max: number;
            min: number;
        },
        defect_rate_baseline: string;
    },
    created_at: string;
}

export interface ViewTestStandardData {
    count: number;
    next: string | null;
    previous: string | null;
    results: TestStandard[];
}

export interface ViewTestStandardLogResponse {
    status: "SUCCESS";
    data: ViewTestStandardData;
}
// API: 생산라인을 상세 조회 (썸네일)
export interface ProductionLineDetailDatasets {
    dataset_id: string;
    classification_result: string;
    refined_at: string | null;
    created_at: string;
    attributes: {
        head: string;
        neck: string;
        angl: string;
        angr: string;
    }
}

export interface ProductionLineDetailData {
    headquarter: string;
    branch: {
        id: number;
        name: string;
    };
    batch_count: number; // 누적 데이터 (ROLL)
    total_count_sum: number; // 누적 데이터 (건)
    name: string; // 생산라인 이름
    production_name: string; // 생산 항목
    inspection_parameters: TestStandard;
    datasets: ProductionLineDetailDatasets[];
    total: number;
}

export interface ProductionLineDetailResponse {
    status: "SUCCESS";
    data: ProductionLineDetailData;
}
// API: 인공지능 학습 > 검수 AI 모델 학습 준비
export interface ReadyLearningRequest {
    model_name: string;
    selected_data: {
        product_history: number;
        classify_folder: string[];
    }[];
}

export interface ReadyLearningResponse {
    status: "SUCCESS";
    data: string; // "" 예정
}
// API: 인공지능 학습 데이터 수정
export interface ModifyLearningRequest {
    selected_data: {
        product_history: number;
        classify_folder: string[];
    }[];
}

export interface ModifyLearningResponse {
    status: "SUCCESS";
    data: string; // "" 예정
}
// AI 모델 적용
export interface ApplyModelResponse {
    status: "SUCCESS";
    data: string; // "" 예정
}