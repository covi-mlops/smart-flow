"use client";

import { useState, FormEvent, lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Input from "@/components/common/Input";
import BasicButton from "@/components/common/BasicButton";
import { SignupFormData } from "@/types/signup/types";
import { isValidBranchName, isValidHeadqurter, isValidPw, isValidPwConfirm, isValidUsername } from "@/utils/regEx";

const BiInfo = lazy(() => import('react-icons/bi').then(module => ({
  default: module.BiInfoCircle
})));

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    password: "",
    passwordConfirm: "",
    headquarter: "",
    branch_name: ""
  });
  const [isPassUsername, setIsPassUsername] = useState(false);
  const [isPassPw, setIsPassPw] = useState(false);
  const [isPassPwConfirm, setIsPassPwConfirm] = useState(false);
  const [isPassHeadquarter, setIsPassHeadquarter] = useState(false);
  const [isPassBranchName, setIsPassBranchName] = useState(false);
  const [isSignupButtonClick, setIsSignupButtonClick] = useState(false);

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: API call
    console.log("Signup attempt:", formData);
  };

  useEffect(() => {
    if (formData.username !== "" && isValidUsername(formData.username)) setIsPassUsername(true);
    if (formData.password !== "" && isValidPw(formData.password)) setIsPassPw(true);
    if (formData.passwordConfirm !== "" && isValidPwConfirm(formData.password, formData.passwordConfirm)) setIsPassPwConfirm(true);
    if (formData.headquarter !== "" && isValidHeadqurter(formData.headquarter)) setIsPassHeadquarter(true);
    if (formData.branch_name !== "" && isValidBranchName(formData.branch_name)) setIsPassBranchName(true);
  }, [formData]);

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
          회원가입
        </h1>

        <div className="w-full border-t border-light-gray" />

        <form
          onSubmit={handleSignupSubmit}
          className="w-full flex flex-col gap-12"
        >
          <div className="flex flex-col w-[588px] gap-3">
            <Input
              label="아이디"
              type="text"
              placeholder="4~30자의 영문 대소문자만 사용 가능"
              value={formData.username}
              isCorrect={!isSignupButtonClick || isSignupButtonClick && isPassUsername}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setIsSignupButtonClick(false);
              }}
            />

            {
              formData.username !== "" && isSignupButtonClick
                ? !isPassUsername
                && (
                  <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                    <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                      <BiInfo size={30} />
                    </Suspense>
                    <p>4~30자의 영문 대소문자만 입력해주세요.</p>
                  </div>
                )
                : (
                  <div className="flex flex-row text-xl gap-3 h-[30px]" />
                )
            }
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
                  setIsSignupButtonClick(false);
                }}
              />

              {
                formData.password !== "" && isSignupButtonClick
                  ? !isPassPw
                  && (
                    <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                      <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                        <BiInfo size={30} />
                      </Suspense>
                      <p>4자 숫자만 입력해주세요.</p>
                    </div>
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
                  setIsSignupButtonClick(false);
                }}
              />

              {
                formData.passwordConfirm !== "" && isSignupButtonClick
                  ? !isPassPwConfirm
                  && (
                    <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                      <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                        <BiInfo size={30} />
                      </Suspense>
                      <p>비밀번호와 동일하게 입력해주세요.</p>
                    </div>
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
                  setIsSignupButtonClick(false);
                }}
              />

              {
                formData.headquarter !== "" && isSignupButtonClick
                  ? !isPassHeadquarter
                  && (
                    <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                      <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                        <BiInfo size={30} />
                      </Suspense>
                      <p>국영문, 숫자, 공백, 특수 기호(-), (_)만 입력해주세요.</p>
                    </div>
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
                value={formData.branch_name}
                isCorrect={!isSignupButtonClick || isSignupButtonClick && isPassBranchName}
                onChange={(e) => {
                  setFormData({ ...formData, branch_name: e.target.value });
                  setIsSignupButtonClick(false);
                }}
              />

              {
                formData.branch_name !== "" && isSignupButtonClick
                  ? !isPassBranchName
                  && (
                    <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                      <Suspense fallback={<div className="w-[30px] h-[30px]" />}>
                        <BiInfo size={30} />
                      </Suspense>
                      <p>국영문, 숫자, 공백, 특수 기호(-), (_)만 입력해주세요.</p>
                    </div>
                  )
                  : (
                    <div className="flex flex-rowtext-xl gap-3 h-[30px]" />
                  )
              }
            </div>
          </div>
        </form>

        <div className="flex flex-row w-full gap-6">
          <BasicButton
            type="submit"
            variant="default"
            onClick={() => router.back()}
          >
            뒤로 가기
          </BasicButton>
          <BasicButton
            type="submit"
            variant="primary"
            disabled={!isPassUsername || !isPassPw || !isPassPwConfirm || !isPassHeadquarter || !isPassBranchName}
            onClick={() => setIsSignupButtonClick(true)}
          >
            계정 생성
          </BasicButton>
        </div>
      </div>
    </div>
  );
}
