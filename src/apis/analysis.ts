import { ViewDailyAbnormalRollSuccessResponse, ViewProductionHistoryNamesSuccessResponse, UploadDataRequest, UploadDataSuccessResponse, ProductionHistoryEachItem_A } from "@/types/analysis/types";
import axiosInstance from "./axiosInstance";
import { FailResponse } from "@/types/common/types";

export const analysisApi = {
    // 일일 불량 ROLL 알림 -> 메인 page
    checkAiModelList: async (
        page: number = 1,
        page_size: number = 10,
    ): Promise<ViewDailyAbnormalRollSuccessResponse | null> => {
        const { data } =
            await axiosInstance.get<ViewDailyAbnormalRollSuccessResponse | FailResponse>
                (`/api/productions/production-histories/abnormal/?page=${page}&page_size=${page_size}`);

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('checkAiModelList api fail', data.data.message);
            return null;
        }
    },
    // 생산 품목 이름 리스트 조회 -> 데이터 업로드 page
    checkProductionHistoryNames: async (): Promise<ViewProductionHistoryNamesSuccessResponse | null> => {
        const { data } = await axiosInstance.get<ViewProductionHistoryNamesSuccessResponse | FailResponse>
            ('/api/productions/production-histories/production-names/');

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('checkProductionHistoryNames api fail', data.data.message);
            return null;
        }
    },
    // 데이터 업로드
    uploadData: async (files: UploadDataRequest): Promise<UploadDataSuccessResponse | null> => {
        const { data } = await axiosInstance.post<UploadDataSuccessResponse | FailResponse>
            ('/api/productions/production-histories/upload/', files);

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('checkProductionHistoryNames api fail', data.data.message);
            return null;
        }
    },
    // 생산 이력 상세 조회
    // 여기부터 다시 하세요 !!!!!!!!!!!!!!!!!!!!!!
    viewProductionHistoryItem: async (
        id: number,
        classification_result?: string,
        page?: number,
        page_size?: number,
        refined?: string,
    ) => {
        const { data } = await axiosInstance.get<ProductionHistoryEachItem_A | null>
            (`/api/productions/production-histories/${id}/?page=${page}&page_size=${page_size}&refined=${refined}&`)
    },
    // 생산 라인 목록 조회
    viewProductionLineList: async () => { },
    // 생산 라인 이름 조회
    viewProductionLineName: async () => { },
    // 생산 이력 조회
    viewProductionHistories: async () => { },
    // 업로드 이력 조회
    viewUploadHistories: async () => { },
    // 생산 라인별 통계
    viewProductionLineSummary: async () => { },
    // 생산 이력 삭제
    deleteProductionHistories: async () => { },
}