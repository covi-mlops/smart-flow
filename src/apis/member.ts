import { FailResponse } from "@/types/common/types";
import axiosInstance from "./axiosInstance";

import { ActivateAccountData, ActivateAccountSuccessResponse, DeactivateInfoResponse, IssueTokenRequest, IssueTokenSuccessResponse, RegisterRequest, RegisterResponse, UpdateInfoRequest, UpdateInfoSuccessResponse, ViewMemberInfoSuccessResponse } from "@/types/member/types";

export const memberApi = {
    // 정보 조회
    getInfo: async (): Promise<ViewMemberInfoSuccessResponse | FailResponse> => {
        const { data } =
            await axiosInstance.get<ViewMemberInfoSuccessResponse | FailResponse>('/api/accounts/me/');
        return data;
    },
    // 토큰 발급 (로그인)
    login: async (memberInfo: IssueTokenRequest)
        : Promise<IssueTokenSuccessResponse | null> => {
        const { data } =
            await axiosInstance.post<IssueTokenSuccessResponse | FailResponse>('/api/accounts/issue-token/',
                memberInfo
            );

        console.log("로그인 api", data);
        if (data.status === "SUCCESS") {
            localStorage.setItem('accessToken', data.data.token); // localStorage에 token 저장
            return data;
        } else {
            console.log('login api fail', data.data.message);
            return null;
        }
    },
    // 계정 생성 (회원가입)
    signup: async (memberInfo: RegisterRequest)
        : Promise<RegisterResponse | null> => {
        const { data } =
            await axiosInstance.post<RegisterResponse>('/api/accounts/register/',
                memberInfo
            );

        console.log("회원가입 api", data);
        if (data.status === "SUCCESS") {
            return data;
        } else {
            console.log('signup api fail', data.data);
            return null;
        }
    },
    activateAccount: async (id: number): Promise<ActivateAccountData | null> => {
        const { data } =
            await axiosInstance.patch<ActivateAccountSuccessResponse | FailResponse>
                (`/api/accounts/${id}/activate_account/`);

        if (data.status === "SUCCESS") {
            return data.data;
        } else {
            console.log('activateAccount api fail', data.data.message);
            return null;
        }
    },
    // 내 정보 변경
    updateInfo: async (updateInfo: UpdateInfoRequest): Promise<UpdateInfoSuccessResponse | FailResponse> => {
        const { data } =
            await axiosInstance.patch<UpdateInfoSuccessResponse | FailResponse>('/api/accounts/me/update/',
                updateInfo
            );
        return data;
    },
    // 내 계정 삭제
    deleteAccount: async (): Promise<string | null> => {
        const { data } = await axiosInstance.delete<DeactivateInfoResponse>('/api/accounts/me/deactivate/');

        if (data.status === "SUCCESS") {
            return data.data; // "" 예정
        } else {
            return null;
        }
    },
};