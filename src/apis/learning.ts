import axiosInstance from "./axiosInstance";
import { AIModelDetailResponse, AIModelListResponse, ApplyModelResponse, LearningListResponse, LearningModelDataDetailResponse, LearningModelDatasetListResponse, ModelProductionHistoriesResponse, ModifyLearningRequest, ModifyLearningResponse, ProductionLineDetailResponse, ProductionLinesResponse, ReadyLearningRequest, ReadyLearningResponse, TestStandard, ViewTestStandardLogResponse } from "@/types/learning/types";
import { DeleteRequest, DeleteResponse, FailResponse } from "@/types/common/types";

export const learningApi = {
    // 인공지능 학습 > 인공지능 학습 목록 조회
    viewLearningList: async (
        page: number = 1,
        page_size: number = 1,
    ): Promise<LearningListResponse | null> => {
        const { data } = await axiosInstance.get<LearningListResponse | FailResponse>(
            '/api/model_managements/inspection-ai-models/list-training-inspection-ai-models/',
            {
                params: { page, page_size }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewLearningList api fail', data.data.message);
            return null;
        }
    },
    // AI 모델 목록 조회 
    viewAIModelList: async (
        page: number = 1,
        page_size: number = 10,
    ): Promise<AIModelListResponse | null> => {
        const { data } = await axiosInstance.get<AIModelListResponse | FailResponse>(
            `/api/model_managements/inspection-ai-models/list/`,
            {
                params: { page, page_size }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewAIModelList api fail', data.data.message);
            return null;
        }
    },
    // 인공지능 학습 > 인공지능 학습 모델 데이터셋 목록 조회
    viewLearningModelDatasetList: async (
        id: number,
        page: number = 1,
        page_size: number = 10,
    ): Promise<LearningModelDatasetListResponse | null> => {
        const { data } = await axiosInstance.get<LearningModelDatasetListResponse | FailResponse>(
            `/api/model_managements/inspection-ai-models/training-inspection-ai-models/${id}/datasets/`,
            {
                params: { page, page_size }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewLearningModelDatasetList api fail', data.data.message);
            return null;
        }
    },
    // 인공지능 학습 > 인공지능 학습 모델 정보 상세 조회
    viewLearningModelDataDetail: async (
        id: number,
        page: number = 1,
        page_size: number = 10,
    ): Promise<LearningModelDataDetailResponse | null> => {
        const { data } = await axiosInstance.get<LearningModelDataDetailResponse | FailResponse>(
            `/api/model-managements/inspection-ai-models/training-inspection-ai-models/${id}/info/`,
            {
                params: { page, page_size }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewLearningModelDataDetail api fail', data.data.message);
            return null;
        }
    },
    // AI 모델 상세 조회
    viewAIModelDetail: async (
        id: number,
    ): Promise<AIModelDetailResponse | null> => {
        const { data } = await axiosInstance.get<AIModelDetailResponse | FailResponse>(
            `/api/model_managements/inspection-ai-models/${id}/detail/`
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewAIModelDetail api fail', data.data.message);
            return null;
        }
    },
    // AI 모델 기준, 생산 이력 조회
    viewModelProductionHistories: async (
        id: number,
        page: number = 1,
        page_size: number = 10,
    ): Promise<ModelProductionHistoriesResponse | null> => {
        const { data } = await axiosInstance.get<ModelProductionHistoriesResponse | FailResponse>(
            `/api/model_managements/inspection-ai-models/${id}/production-histories/`,
            {
                params: { page, page_size }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewModelProductionHistories api fail', data.data.message);
            return null;
        }
    },
    // 인공지능 학습 > 데이터셋 포함 생산 이력 조회 (노션 - 학습 데이터 조회)
    viewModelDataProductionHistories: async (
        first_image_created_at: string | null = null, // 생산 시작일
        inspection_ai_model: string | null = null,
        is_abnormal: boolean | null = null,
        last_image_created_at: string | null = null, // 생산 종료일
        page: number = 1,
        page_size: number = 1,
        production_line: string | null = null,
        production_name: string | null = null,
    ) => {
        const params: Record<string, any> = {
            page,
            page_size,
        };
        // TODO: 직접 함수 연결할 때 수정할 것
        if (first_image_created_at !== null) params.first_image_created_at = first_image_created_at;
        if (inspection_ai_model !== null) params.inspection_ai_model = inspection_ai_model;
        if (is_abnormal !== null) params.is_abnormal = is_abnormal;
        if (last_image_created_at !== null) params.last_image_created_at = last_image_created_at;
        if (production_line !== null) params.production_line = production_line;
        if (production_name !== null) params.production_name = production_name;

        const { data } = await axiosInstance.get<ModelProductionHistoriesResponse | FailResponse>(
            `/api/productions/production-histories/list-with-dataset`,
            { params }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewModelDataProductionHistories api fail', data.data.message);
            return null;
        }
    },
    // 사업소 소속 생산라인 조회 (썸네일)
    viewProductionLines: async (): Promise<ProductionLinesResponse | null> => {
        const { data } = await axiosInstance.get<ProductionLinesResponse | FailResponse>(
            '/api/productions/production-lines/list-with-thumbnail/'
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionLines api fail', data.data.message);
            return null;
        }
    },
    // 검사 기준 변경 로그 조회
    viewInspectionParameterHistories: async (
        id: number,
        page: number = 1,
        page_size: number = 10,
    ): Promise<ViewTestStandardLogResponse | null> => {
        const { data } = await axiosInstance.get<ViewTestStandardLogResponse | FailResponse>(
            `/api/productions/production-lines/${id}/inspection-parameter-histories/`,
            {
                params: { page, page_size }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewInspectionParameterHistories api fail', data.data.message);
            return null;
        }
    },
    // 생산라인을 상세 조회 (썸네일)
    viewProductionLineDetail: async (
        id: number,
    ): Promise<ProductionLineDetailResponse | null> => {
        const { data } = await axiosInstance.get<ProductionLineDetailResponse | FailResponse>(
            `/api/productions/production-lines/${id}/with-thumbnail/`
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionLineDetail api fail', data.data.message);
            return null;
        }
    },
    // 인공지능 학습 > 검수 AI 모델 학습 준비
    readyAIModelLearning: async (
        request: ReadyLearningRequest
    ): Promise<ReadyLearningResponse | null> => {
        const { data } = await axiosInstance.post<ReadyLearningResponse | FailResponse>(
            '/api/model_managements/inspection-ai-models/prepare-training/',
            request
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('readyAIModelLearning api fail', data.data.message);
            return null;
        }
    },
    // 검사 기준 변경
    changeInspectionParameters: async (
        id: number,
        request: TestStandard,
    ): Promise<string | null> => {
        const { data } = await axiosInstance.post<string | FailResponse>(
            `/api/productions/production-lines/${id}/inspection-parameters/`,
            request
        );

        if (data === "") {
            return data; // ""
        } else {
            console.log('changeInspectionParameters api fail');
            return null;
        }
    },
    // 인공지능 학습 데이터 수정
    modifyLearningData: async (
        id: number,
        request: ModifyLearningRequest,
    ): Promise<ModifyLearningResponse | null> => {
        const { data } = await axiosInstance.patch<ModifyLearningResponse | FailResponse>(
            `/api/model_managements/inspection-ai-models/training-inspection-ai-models/${id}/modify/`,
            request
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('modifyLearningData api fail', data.data.message);
            return null;
        }
    },
    // 인공지능 모델 삭제
    deleteModelManagements: async (
        ids: DeleteRequest
    ): Promise<string | null> => {
        const { data } = await axiosInstance.delete<DeleteResponse | FailResponse>(
            '/api/model_managements/inspection-ai-models/delete/',
            {
                data: ids
            }
        );

        if (data.status === "SUCCESS") {
            return data.data; // "" 예정
        } else {
            console.log('deleteModelManagements api fail', data.data.message);
            return null;
        }
    },
    // AI 모델 적용
    applyModel: async (
        id: number,
    ): Promise<string | null> => {
        const { data } = await axiosInstance.patch<ApplyModelResponse | FailResponse>(
            `/api/model-managements/inspection-ai-models/${id}/apply/`
        );

        if (data.status === "SUCCESS") {
            return data.data; // "" 예정
        } else {
            console.log('applyModel api fail', data.data.message);
            return null;
        }
    },
};