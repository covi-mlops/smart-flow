"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { SignupFormData } from "@/types/signup/types";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    userId: "",
    password: "",
    passwordConfirm: "",
    department: "",
    businessOffice: ""
  });

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, userId: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, passwordConfirm: e.target.value });
  };

  const handleDepartmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, department: e.target.value });
  };

  const handleBusinessOfficeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, businessOffice: e.target.value });
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement signup API call
    console.log("Signup attempt:", formData);
  };

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
          <div className="w-[550px] flex gap-6">
            <Input
              label="아이디"
              type="text"
              placeholder="4~30자의 영문 대소문자만 사용 가능"
              value={formData.userId}
              width="350"
              onChange={handleUserIdChange}
            />
          </div>

          <div className="w-full flex gap-6">
            <Input
              label="비밀번호"
              type="password"
              placeholder="4자 숫자만 사용 가능"
              value={formData.password}
              onChange={handlePasswordChange}
            />

            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="4자 숫자만 사용 가능"
              value={formData.passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </div>

          <div className="w-full flex gap-6">
            <Input
              label="본부"
              type="text"
              placeholder="국영문, 숫자, 공백, 특수 기호(-), (_)만 사용 가능"
              value={formData.department}
              onChange={handleDepartmentChange}
            />

            <Input
              label="사업소"
              type="text"
              placeholder="국영문, 숫자, 공백, 특수 기호(-), (_)만 사용 가능"
              value={formData.businessOffice}
              onChange={handleBusinessOfficeChange}
            />
          </div>
        </form>

        <Button
          type="submit"
          variant="primary"
          className="mt-10"
        >
          계정 생성
        </Button>
      </div>
    </div>
  );
}
