import { AIModelListResponse } from "@/types/learning/types";
import axiosInstance from "./axiosInstance";
import { FailResponse } from "@/types/common/types";

export const learningApi = {
    // AI 모델 목록 조회 
    viewAIModelList: async (
        page: number = 1,
        page_size: number = 10,
    ): Promise<AIModelListResponse | null> => {
        const { data } = await axiosInstance.get<AIModelListResponse | FailResponse>(
            `/api/model_managements/inspection-ai-models/list/`,
            {
                params: {
                    page, page_size
                }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewAIModelList api fail', data.data.message);
            return null;
        }
    },
};