import { ContactpinImageResonse, DataInspectionResponse, MaskPolyResponse, ProductionHistoryItemResponse, UpdatedPolygonResponse } from "@/types/processing/types"
import axiosInstance from "./axiosInstance"
import { FailResponse } from "@/types/common/types"

export const processingApi = {
    // 생산 이력 상세 조회 + 폴리곤
    viewProductionHistoryItem: async (
        classification_result: string | null = null,
        page: number = 1,
        page_size: number = 10,
        refined: string | null = null,
        id: number,
    ): Promise<ProductionHistoryItemResponse | null> => {
        const params: Record<string, any> = {
            page,
            page_size,
        };
        if (refined !== "전체") params.refined = refined === "true";
        if (classification_result !== "전체") params.classification_result = classification_result;

        const { data } = await axiosInstance.get<ProductionHistoryItemResponse | FailResponse>(
            `/api/productions/production-histories/${id}/poly/`,
            { params }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewProductionHistoryItem api fail', data.data.message);
            return null;
        }
    },
    // 컨택트핀 폴리곤 조회
    viewMaskPolyData: async (
        id: number,
        dataset_id: string
    ): Promise<MaskPolyResponse | null> => {
        const { data } = await axiosInstance.get<MaskPolyResponse | FailResponse>(
            `/api/productions/production-histories/${id}/${dataset_id}/poly/`
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewMaskPolyData api fail', data.data.message);
            return null;
        }
    },
    // 컨택트핀 폴리곤 업데이트
    updatePolygonData: async (
        dataset_id: string,
        id: number,
    ): Promise<UpdatedPolygonResponse | null> => {
        const { data } = await axiosInstance.patch<UpdatedPolygonResponse | FailResponse>(
            `/api/productions/production-histories/${id}/${dataset_id}/poly-update/`
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewMaskPolyData api fail', data.data.message);
            return null;
        }
    },
    // 생산일자 별 데이터 검수 현황
    viewDataInspection: async (
        start_date: string,
        end_date: string,
    ): Promise<DataInspectionResponse | null> => {
        const { data } = await axiosInstance.get<DataInspectionResponse | FailResponse>(
            `/api/productions/production-histories/daily-exception-refined-stats/`,
            {
                params: { start_date, end_date }
            }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewDataInspection api fail', data.data.message);
            return null;
        }
    },
    // 컨택트핀 이미지 조회
    viewContactpinImage: async (
        id: number,
        page: number = 1,
        page_size: number = 1,
        classification_result: string | null = null,
        refined: string | null = null,
    ): Promise<ContactpinImageResonse | null> => {
        const params: Record<string, any> = {
            page,
            page_size,
        };
        if (classification_result !== "전체") params.classification_result = classification_result;
        if (refined !== "전체") params.refined = refined === "true";


        const { data } = await axiosInstance.get<ContactpinImageResonse | FailResponse>(
            `/api/productions/production-histories/${id}/datasets/`,
            { params }
        );

        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('viewContactpinImage api fail', data.data.message);
            return null;
        }
    },
};