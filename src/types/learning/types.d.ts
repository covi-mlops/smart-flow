export interface LearningDataItem {
    id: number;
    detect_item_name: string;
    count: number;
    status: "completed" | "progress" | "ready"
    start_at: string | null; // 학습 시작일
}