/* 상태 관리 */
export interface MemberStore {
    username: string;
    setUsername: (newState: string) => void;
    role: 'user' | 'admin' | 'super';
    isLogin: boolean;
    setIsLogin: (state: boolean) => void;
}

export interface SignupFormData {
    username: string;
    password: string;
    passwordConfirm: string;
    headquarter: string;
    branch: string;
}

/* API */
// API: Account - 정보 조회
export interface MemberData {
    id: number;
    username: string;
    role: 'super' | 'admin' | 'user';
    branch: string;
    headquarter: string;
    created_at: string;
    updated_at: string;
}

export interface ViewMemberInfoSuccessResponse {
    status: "SUCCESS";
    data: MemberData;
}
// API: Account - 토큰 발급
export interface IssueTokenRequest {
    username: string;
    password: string;
}

export interface IssueTokenSuccessResponse {
    status: "SUCCESS";
    data: {
        username: string;
        token: string;
    };
}
// API: Account - 계정 생성(회원가입)
export interface RegisterRequest {
    username: string;
    password: string;
    role: 'super' | 'admin' | 'user';
    headquarter: string;
    branch_name: string;
}

export interface RegisterResponse {
    status: "SUCCESS" | "FAIL";
    data: string;
}
// API: Account - 계정 활성화(SUPER 유저 전용)
export interface ActivateAccountData {
    id: number;
    username: string;
    status: string;
    updated_at: string;
}

export interface ActivateAccountSuccessResponse {
    status: "SUCCESS";
    data: ActivateAccountData
}
// API: Account - 내 정보 변경
export interface UpdateInfoRequest {
    password?: string;
    headquarter?: string;
    branch_name?: string;
}

// export interface UpdateInfoData {
//     id: number;
//     username: string;
//     role: string;
//     branch: string;
//     headquarter: string;
//     created_at: string;
//     updated_at: string;
// }

export interface UpdateInfoSuccessResponse {
    status: "SUCCESS";
    data: string;
}
// API: Account - 내 계정 삭제
export interface DeactivateInfoResponse {
    status: "SUCCESS" | "FAIL";
    data: string;
}