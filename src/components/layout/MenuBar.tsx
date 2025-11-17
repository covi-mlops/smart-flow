'use client';

import Button from "./Button";
import { useRouter, usePathname } from "next/navigation";

export default function MenuBar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const isSelectedPlatform = (platformName: string) => pathname.includes(platformName);

    return (
        <div className="flex flex-col items-center justify-between bg-white border-r-[4px] border-point-red w-[242px] min-h-screen py-[44px]">
            <div>
                {
                    // 분석 플랫폼
                    isSelectedPlatform('/analysis') && (
                        <div className="flex flex-col gap-[18px]">
                            <Button
                                title="메인"
                                isActive={isActive('/analysis/main')}
                                disabled={isActive('/analysis/main')}
                                onClick={() => router.push('/analysis/main')}
                            />
                            <Button
                                title="데이터 업로드"
                                isActive={isActive('/analysis/upload')}
                                disabled={isActive('/analysis/upload')}
                                onClick={() => router.push('/analysis/upload')}
                            />
                            <Button
                                title="인공지능 분석"
                                isActive={isActive('/analysis/result')}
                                disabled={isActive('/analysis/result')}
                                onClick={() => router.push('/analysis/result')}
                            />
                        </div>
                    )
                }
                {
                    // 가공 플랫폼
                    isSelectedPlatform('/processing') && (
                        <div className="flex flex-col gap-[18px]">
                            <Button
                                title="메인"
                                isActive={isActive('/processing/main')}
                                disabled={isActive('/processing/main')}
                                onClick={() => router.push('/processing/main')}
                            />
                            <Button
                                title="데이터 가공"
                                isActive={isActive('/processing/process-data')}
                                disabled={isActive('/processing/process-data')}
                                onClick={() => router.push('/processing/process-data')}
                            />
                        </div>
                    )
                }
                {
                    // 학습 플랫폼
                    isSelectedPlatform('/learning') && (
                        <div className="flex flex-col gap-[18px]">
                            <Button
                                title="인공지능 학습"
                                isActive={isActive('/learning/progress')}
                                disabled={isActive('/learning/progress')}
                                onClick={() => router.push('/learning/progress')}
                            />
                            <Button
                                title="인공지능 모델"
                                isActive={isActive('/learning/models')}
                                disabled={isActive('/learning/models')}
                                onClick={() => router.push('/learning/models')}
                            />
                            <Button
                                title="인공지능 모델"
                                isActive={isActive('/learning/management')}
                                disabled={isActive('/learning/management')}
                                onClick={() => router.push('/learning/management')}
                            />
                        </div>
                    )
                }
            </div>

            <div className="flex flex-col gap-[18px]">
                <Button
                    title="분석 플랫폼"
                    isActive={isSelectedPlatform('/analysis')}
                    disabled={isSelectedPlatform('/analysis')}
                    onClick={() => router.push('/analysis/main')}
                />
                <Button
                    title="가공 플랫폼"
                    isActive={isSelectedPlatform('/processing')}
                    disabled={isSelectedPlatform('/processing')}
                    onClick={() => router.push('/processing/main')}
                />
                <Button
                    title="학습 플랫폼"
                    isActive={isSelectedPlatform('/learning')}
                    disabled={isSelectedPlatform('/learning')}
                    onClick={() => router.push('/learning/progress')}
                />
            </div>
        </div>
    );
}