import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import Image from "next/image";

function CardComponent({ type, title }: { type: string, title: string }) {
    return (
        <div className="w-[600px] border-[4px] border-light-gray p-6 bg-white">
            <div className="flex flex-row items-center justify-center gap-3 mb-4">
                <h3 className="text-xl text-black font-semibold">{title}</h3>
                <div
                    className={`w-4 h-4 rounded-full`}
                />
            </div>
            {
                type === "accuracy"
                    ? <Image
                        src="/assets/accuracy.png"
                        alt="accuracy image"
                        width={451}
                        height={189}
                        priority
                        fetchPriority="high"
                    />
                    : <Image
                        src="/assets/loss.png"
                        alt="nexten logo"
                        width={430}
                        height={189}
                        priority
                        fetchPriority="high"
                    />
            }
        </div>
    );
}

export default function ModelDataDetailPage() {
    return (
        <Layout headerTitle="인공지능 모델">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="인공지능 학습 결과" />

                <div className="flex flex-col p-6 pb-0">
                    <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">모델 이름</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                            <p>covi_seg_00001</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">적용 여부</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                            <p>O</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">학습 시작 시간</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                            <p>2025.05.20 15:03:24</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">학습 진행 시간</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                            <p>4시간 53분 12초</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">ACCURACY</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                            <p>98.06</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">LOSS</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-center w-full gap-3 px-4 py-4 font-bold">
                            <p>0.125</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">생산 품목</h2>
                        </div>
                        <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                            <p>contactpin_1, contactpin_2</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-6 items-center justify-center p-6">
                    <CardComponent type="accuracy" title="모델 Accuracy" />
                    <CardComponent type="loss" title="모델 Loss" />
                </div>

                <div className="p-6">
                    <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">데이터 수</h2>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                            {/* TODO: 값 넣기 */}
                            <p>109,995</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">정상 데이터 수</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            {/* TODO: 값 넣기 */}
                            <p>108,535</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">불량 데이터 수</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            {/* TODO: 값 넣기 */}
                            <p>1,442</p>
                        </div>
                        <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                            <h2 className="text-lg text-black">AI 예외 데이터 수</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                            {/* TODO: 값 넣기 */}
                            <p>18</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-light-gray overflow-hidden px-6">
                    <table className="w-full">
                        <thead className="border-b border-light-gray bg-soft-white">
                            <tr className="h-[56px] text-center text-base font-bold text-black">
                                <th>No</th>
                                <th className="w-[340px]">생산 일자</th>
                                <th>생산라인</th>
                                <th>생산 품목</th>
                                <th>AI 불량률</th>
                                <th>AI 검사 결과</th>
                                <th>데이터 종류</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* TODO: 추후 재수정 */}
                            <tr
                                key={1}
                                className="h-[60px] text-center border-b border-light-gray"
                            >
                                <td className="text-base">{1}</td>
                                <td className="text-base">2025.11.13 14:40:25</td>
                                <td className="text-base">생산라인1</td>
                                <td className="text-base">contactpin_1</td>
                                <td className="text-base">
                                    2%<br />
                                    <span className="text-sm text-medium-gray">
                                        (54,950/55,000)
                                    </span>
                                </td>
                                <td className={`text-base font-bold text-point-red`}>
                                    불량
                                </td>
                                <td className="flex flex-col gap-1 items-center justify-center">
                                    <span>정상 데이터: 54,950</span>
                                    <span>불량 데이터: 50</span>
                                    <span>AI 예외 데이터: 0</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout >
    );
}