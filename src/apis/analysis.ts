import { ViewDailyAbnormalRollSuccessResponse, ViewProductionHistoryNamesSuccessResponse, UploadDataRequest, UploadDataSuccessResponse, ProductionHistoryEachItemResponse_A, ProductionLineListResponse, ProductionLineNameResponse, ProductionHistoryResponse, ViewUploadedHistoriesResponse, ProductionLineStatisticsResponse, PeriodType, DeleteProductionHistoriesRequest, DeleteProductionHistoriesResponse, ViewDailyNormalDefectRatioResponse } from "@/types/analysis/types";
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
    // 일일 양불 비율 조회
    checkDailyNormalDefectRatio: async (
        date: string,
    ) => {
        const { data } = await axiosInstance.get<ViewDailyNormalDefectRatioResponse | FailResponse>
            (`/api/productions/production-histories/daily-normal-defect-ratio-by-branch/?${date}`);

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('checkDailyNormalDefectRatio api fail', data.data.message);
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
    uploadData: async (uploadRequest: UploadDataRequest)
        : Promise<UploadDataSuccessResponse | null> => {
        const formData = new FormData();

        formData.append('production_name', uploadRequest.production_name);
        formData.append('is_folder_upload', String(uploadRequest.is_folder_upload));

        if (uploadRequest.folder_name) {
            formData.append('folder_name', uploadRequest.folder_name);
        }

        uploadRequest.files.forEach((file) => {
            formData.append('files', file);
        });

        const { data } = await axiosInstance.post<UploadDataSuccessResponse | FailResponse>(
            '/api/productions/production-histories/upload/',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('uploadData api fail', data.data.message);
            return null;
        }
    },
    // 생산 이력 상세 조회
    viewProductionHistoryItem: async (
        id: number,
        classification_result: string | null = null,
        page: number = 1,
        page_size: number = 10,
        refined: boolean | null = null,
    ): Promise<ProductionHistoryEachItemResponse_A | null> => {
        const { data } = await axiosInstance.get<ProductionHistoryEachItemResponse_A | FailResponse>
            (`/api/productions/production-histories/${id}/?classification_result=${classification_result}&page=${page}&page_size=${page_size}&refined=${refined}`);

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionHistoryItem api fail', data.data.message);
            return null;
        }
    },
    // 생산 라인 목록 조회
    viewProductionLineList: async (): Promise<ProductionLineListResponse | null> => {
        const { data } = await axiosInstance.get<ProductionLineListResponse | FailResponse>
            ('/api/productions/production-lines/');

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionLineList api fail', data.data.message);
            return null;
        }
    },
    // 생산 라인 이름 조회
    viewProductionLineName: async (): Promise<ProductionLineNameResponse | null> => {
        const { data } = await axiosInstance.get<ProductionLineNameResponse | FailResponse>
            ('/api/productions/production-lines/names/');

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionLineName api fail', data.data.message);
            return null;
        }
    },
    // 생산 이력 조회 (가공/분석)
    viewProductionHistories: async (
        applied_model: string | null = null,
        start_created_at: string | null = null,
        end_created_at: string | null = null,
        is_abnormal: string | null = null,
        is_descending: boolean = true,
        production_line: string | null = null,
        production_name: string | null = null,
        page: number = 1,
        page_size: number = 10,
    ): Promise<ProductionHistoryResponse | null> => {
        const params: Record<string, any> = {
            is_descending,
            page,
            page_size,
        };
        if (applied_model !== "전체") params.applied_model = applied_model;
        if (start_created_at !== null) params.start_created_at = start_created_at;
        if (end_created_at !== null) params.end_created_at = end_created_at;
        if (is_abnormal !== "전체") {
            params.is_abnormal = is_abnormal !== "true";
        }
        if (production_line !== "전체") params.production_line = production_line;
        if (production_name !== "전체") params.production_name = production_name;

        const { data } = await axiosInstance.get<ProductionHistoryResponse | FailResponse>(
            `/api/productions/production-lines/production-histories/`,
            { params }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionHistories api fail', data.data.message);
            return null;
        }
    },
    // 업로드 이력 조회
    viewUploadHistories: async (
        page: number = 1,
        page_size: number = 10,
    ): Promise<ViewUploadedHistoriesResponse | null> => {
        const { data } = await axiosInstance.get<ViewUploadedHistoriesResponse | FailResponse>
            (`/api/productions/production-lines/production-histories/uploaded/?page=${page}&page_size=${page_size}`);

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewUploadHistories api fail', data.data.message);
            return null;
        }
    },
    // 생산 라인별 통계
    viewProductionLineSummary: async (
        date: string,
        period: PeriodType,
    ): Promise<ProductionLineStatisticsResponse | null> => {
        const { data } = await axiosInstance.get<ProductionLineStatisticsResponse | FailResponse>
            (`/api/productions/production-lines/summary/?date=${date}&period=${period}`);

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionLineSummary api fail', data.data.message);
            return null;
        }
    },
    // 생산 이력 삭제
    deleteProductionHistories: async (
        ids: DeleteProductionHistoriesRequest
    ): Promise<string | null> => {
        const { data } = await axiosInstance.delete<DeleteProductionHistoriesResponse | FailResponse>(
            '/api/productions/production-histories/delete/',
            {
                data: ids
            }
        );

        if (data.status === "SUCCESS") {
            return data.data; // "" 예정
        } else {
            console.log('deleteProductionHistories api fail', data.data.message);
            return null;
        }
    },
}