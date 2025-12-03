export interface LearningDataItem {
    id: number;
    server_type: string;
    dataset_count: number;
    status: "ready" | "processing" | "done";
    start_at: string | null; // 학습 시작일
}
// ----------
// API: AI 모델 목록 조회
interface ResultsItem {
    id: number;
    server_type: string;
    status: "ready" | "processing" | "done";
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
// ---------
// API: 검사 기준 변경 로그 조회
export interface ViewTestStandardResults {
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
    results: ViewTestStandardResults[];
}

export interface ViewTestStandardLogResponse {
    status: "SUCCESS" | "FAIL";
    data: ViewTestStandardData;
}