"use client";

import { useState, FormEvent, lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Input from "@/components/common/Input";
import BasicButton from "@/components/common/BasicButton";
import { LoginFormData } from "@/types/login/types";
import { useLoginSuccessStore } from "@/store/store";
import Modal from "@/components/modal/Modal";

const BiInfo = lazy(() => import('react-icons/bi').then(module => ({
  default: module.BiInfoCircle
})));

export default function LoginPage() {
  const router = useRouter();
  const [isClickButton, setIsClickButton] = useState(false);
  const [isSuccessLogin, setIsSuccessLogin] = useState(true); // TODO: API 연동하면서 변경

  const { isModalOpen, setIsModalOpen, setIsModalClose } = useLoginSuccessStore();

  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    password: ""
  });

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: API call
    // 성공하면 setIsSuccessLogin 값 true로 변경
  };

  const handleSignupButtonClick = () => {
    router.push("/signup");
  };

  useEffect(() => {
    if (isClickButton) {
      setIsModalOpen();
    }
  }, [isClickButton]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white">
      <div className="w-[600px] flex flex-col items-center gap-12">
        <Image
          src="/assets/nexten_logo_b.png"
          alt="nexten logo"
          width={255}
          height={128}
          priority
          fetchPriority="high"
        />

        <h1 className="text-[36px] font-black text-black">
          로그인
        </h1>

        <form
          onSubmit={handleLoginSubmit}
          className="w-full flex flex-col gap-6"
        >
          {/* TODO: API 연결하면서 유효성 검사 적용 & isCorrect 값 변경 */}
          <Input
            label="아이디"
            type="text"
            value={formData.userId}
            isCorrect={!isClickButton || isClickButton && isSuccessLogin ? true : false}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          />

          <Input
            label="비밀번호"
            type="password"
            value={formData.password}
            isCorrect={!isClickButton || isClickButton && isSuccessLogin ? true : false}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {
            isClickButton && !isSuccessLogin
              ? (
                <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]">
                  <Suspense fallback={<div></div>}>
                    <BiInfo size={30} />
                  </Suspense>
                  <p>아이디 또는 비밀번호를 다시 확인해주세요.</p>
                </div>
              )
              : (
                <div className="flex flex-row items-center text-point-red text-xl gap-3 h-[30px]" />
              )
          }

          <BasicButton
            type="submit"
            variant="primary"
            disabled={formData.userId === "" || formData.password === ""}
            className={formData.userId !== "" && formData.password !== "" ? "hover:bg-light-gray/80 cursor-pointer" : ""}
            onClick={() => setIsClickButton(true)}
          >
            로그인
          </BasicButton>
        </form>

        <div className="w-full border-t border-light-gray" />

        <BasicButton
          variant="secondary"
          className="rounded-none"
          onClick={handleSignupButtonClick}
        >
          회원가입
        </BasicButton>
      </div>

      {
        isModalOpen
          ? <Modal
            text="로그인에 성공했습니다."
            onClick={() => router.push('/analysis/main')}
            onClose={setIsModalClose}
          />
          : null
      }
    </div>
  );
}
