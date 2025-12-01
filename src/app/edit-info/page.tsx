"use client";

import { useState, FormEvent, lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Input from "@/components/common/Input";
import BasicButton from "@/components/common/BasicButton";
import { isValidBranchName, isValidHeadqurter, isValidPw, isValidPwConfirm, isValidUsername } from "@/utils/regEx";
import { SignupFormData, UpdateInfoRequest } from "@/types/member/types";
import { memberApi } from "@/apis/member";
import { useEditInfoSuccessStore } from "@/store/store";
import Modal from "@/components/modal/Modal";

const BiInfo = lazy(() => import('react-icons/bi').then(module => ({
    default: module.BiInfoCircle
})));

export default function EditInfoPage() {
    const router = useRouter();

    const { isModalOpen, setIsModalOpen, setIsModalClose } = useEditInfoSuccessStore();

    const [formData, setFormData] = useState<SignupFormData>({
        username: "",
        password: "",
        passwordConfirm: "",
        headquarter: "",
        branch: "",
    });
    const [isPassPw, setIsPassPw] = useState(false);
    const [isPassPwConfirm, setIsPassPwConfirm] = useState(false);
    const [isPassHeadquarter, setIsPassHeadquarter] = useState(false);
    const [isPassBranchName, setIsPassBranchName] = useState(false);
    const [isSignupButtonClick, setIsSignupButtonClick] = useState(false);
    // 정보 조회
    const viewMyInfo = async () => {
        try {
            const response = await memberApi.getInfo();
            if (response && response.status === "SUCCESS") {
                setFormData((prev) => ({
                    ...prev,
                    username: response.data.username,
                    headquarter: response.data.headquarter,
                    branch: response.data.branch,
                }));
            }
        } catch (error) {
            console.error('viewMyInfo error', error);
        }
    };
    // 내 정보 변경
    const handleEditInfo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSignupButtonClick(true);

        try {
            const updatedData: UpdateInfoRequest = {
                password: formData.password,
                headquarter: formData.headquarter,
                branch_name: formData.branch,
            }
            const response = await memberApi.updateInfo(updatedData);
            console.log('in page', response);
            if (response && response.status === "SUCCESS") {
                setIsModalOpen();
            } else {
                console.log('fail', response.data.message);
            }
        } catch (error) {
            console.error('handleEditInfo error', error);
        } finally {
            setIsSignupButtonClick(false);
        }
    };

    useEffect(() => {
        setIsPassPw(formData.password !== "" && isValidPw(formData.password));
        setIsPassPwConfirm(formData.passwordConfirm !== "" && isValidPwConfirm(formData.password, formData.passwordConfirm));
        setIsPassHeadquarter(formData.headquarter !== "" && isValidHeadqurter(formData.headquarter));
        setIsPassBranchName(formData.branch !== "" && isValidBranchName(formData.branch));
    }, [formData]);

    useEffect(() => {
        viewMyInfo();
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="w-full max-w-[1200px] flex flex-col items-start gap-12">
                <Image
                    src="/assets/nexten_logo_b.png"
                    alt="nexten logo"
                    width={186}
                    height={93}
                    priority
                    fetchPriority="high"
                />

                <h1 className="text-[36px] font-black text-black">
                    내 정보 변경
                </h1>

                <div className="w-full border-t border-light-gray" />

                <form
                    onSubmit={handleEditInfo}
                    className="w-full flex flex-col gap-12"
                >
                    <div className="flex flex-col w-[588px] gap-3">
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-[130px]">
                                <label className="text-black text-2xl font-normal whitespace-nowrap min-w-20">
                                    아이디
                                </label>
                            </div>
                            <p className="text-light-gray text-2xl font-bold">{formData.username}</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-6">
                        <div className="flex flex-col gap-3">
                            <Input
                                label="비밀번호"
                                type="password"
                                placeholder="4자 숫자만 사용 가능"
                                maxLength={4}
                                value={formData.password}
                                isCorrect={!isSignupButtonClick || isSignupButtonClick && isPassPw}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                }}
                            />

                            {
                                formData.password !== "" && isSignupButtonClick
                                    ? !isPassPw
                                        ? (
                                            <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                                                <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                                                    <BiInfo size={30} />
                                                </Suspense>
                                                <p>4자 숫자만 입력해주세요.</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row text-xl gap-3 h-[30px]" />
                                        )
                                    : (
                                        <div className="flex flex-row text-xl gap-3 h-[30px]" />
                                    )
                            }
                        </div>

                        <div className="flex flex-col gap-3">
                            <Input
                                label="비밀번호 확인"
                                type="password"
                                placeholder="4자 숫자만 사용 가능"
                                maxLength={4}
                                value={formData.passwordConfirm}
                                isCorrect={!isSignupButtonClick || isSignupButtonClick && isPassPwConfirm}
                                onChange={(e) => {
                                    setFormData({ ...formData, passwordConfirm: e.target.value });
                                }}
                            />

                            {
                                formData.passwordConfirm !== "" && isSignupButtonClick
                                    ? !isPassPwConfirm
                                        ? (
                                            <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                                                <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                                                    <BiInfo size={30} />
                                                </Suspense>
                                                <p>비밀번호와 동일하게 입력해주세요.</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row text-xl gap-3 h-[30px]" />
                                        )
                                    : (
                                        <div className="flex flex-row text-xl gap-3 h-[30px]" />
                                    )
                            }
                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-6">
                        <div className="flex flex-col gap-3">
                            <Input
                                label="본부"
                                type="text"
                                placeholder="국영문, 숫자, 공백, 특수 기호(-), (_)만 사용 가능"
                                value={formData.headquarter}
                                isCorrect={!isSignupButtonClick || isSignupButtonClick && isPassHeadquarter}
                                onChange={(e) => {
                                    setFormData({ ...formData, headquarter: e.target.value });
                                }}
                            />

                            {
                                formData.headquarter !== "" && isSignupButtonClick
                                    ? !isPassHeadquarter
                                        ? (
                                            <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                                                <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                                                    <BiInfo size={30} />
                                                </Suspense>
                                                <p>국영문, 숫자, 공백, 특수 기호(-), (_)만 입력해주세요.</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row text-xl gap-3 h-[30px]" />
                                        )
                                    : (
                                        <div className="flex flex-row text-xl gap-3 h-[30px]" />
                                    )
                            }
                        </div>

                        <div className="flex flex-col gap-3">
                            <Input
                                label="사업소"
                                type="text"
                                placeholder="국영문, 숫자, 공백, 특수 기호(-), (_)만 사용 가능"
                                value={formData.branch}
                                isCorrect={!isSignupButtonClick || isSignupButtonClick && isPassBranchName}
                                onChange={(e) => {
                                    setFormData({ ...formData, branch: e.target.value });
                                }}
                            />

                            {
                                formData.branch !== "" && isSignupButtonClick
                                    ? !isPassBranchName
                                        ? (
                                            <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                                                <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                                                    <BiInfo size={30} />
                                                </Suspense>
                                                <p>국영문, 숫자, 공백, 특수 기호(-), (_)만 입력해주세요.</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-rowtext-xl gap-3 h-[30px]" />
                                        )
                                    : (
                                        <div className="flex flex-rowtext-xl gap-3 h-[30px]" />
                                    )
                            }
                        </div>
                    </div>

                    <div className="flex flex-row w-full gap-6">
                        <BasicButton
                            type="submit"
                            variant="primary"
                            disabled={!isPassPw || !isPassPwConfirm || !isPassHeadquarter || !isPassBranchName}
                            className="cursor-pointer hover:bg-medium-gray/80"
                        >
                            변경
                        </BasicButton>
                        <BasicButton
                            type="submit"
                            variant="default"
                            onClick={() => router.back()}
                        >
                            취소
                        </BasicButton>
                    </div>
                </form>

            </div>

            {
                isModalOpen
                    ? <Modal
                        text="회원 정보 변경에 성공했습니다."
                        onClick={() => {
                            setIsModalClose();
                            router.back();
                        }}
                        onClose={setIsModalClose}
                    />
                    : null
            }
        </div>
    );
}
