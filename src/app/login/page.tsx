"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { LoginFormData } from "@/types/login/types";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    password: ""
  });

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, userId: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement login API call
    console.log("Login attempt:", formData);
  };

  const handleSignupButtonClick = () => {
    router.push("/signup");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-[600px] flex flex-col items-center gap-12">
        <Image
          src="/assets/nexten_logo_b.png"
          alt="nexten logo"
          width={323}
          height={159}
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
          {/* TODO: 아이디, 비밀번호 오류 시 border 변경 */}
          <Input
            label="아이디"
            type="text"
            value={formData.userId}
            onChange={handleUserIdChange}
          />

          <Input
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />

          <div className="h-8" />

          <Button
            type="submit"
            variant="primary"
          >
            로그인
          </Button>
        </form>

        <div className="w-full border-t border-light-gray" />

        <Button
          variant="secondary"
          className="rounded-none"
          onClick={handleSignupButtonClick}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
