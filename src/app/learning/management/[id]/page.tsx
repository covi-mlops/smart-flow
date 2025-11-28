'use client';

import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ManagementDetailPage() {
    const params = useParams();
    const id = params.id;

    return (
        <Layout headerTitle="생산라인 관리">
            <div className="w-full flex flex-col gap-6">
                <SemiHeader headerTitle={id === '1' ? "생산라인1" : "생산라인2"} />

                <div className="flex flex-row gap-6 px-6 ">
                    <Image
                        src="/assets/mock_data_images/Image19700101_1002160146631.bmp"
                        alt="contactpin_image"
                        width={600}
                        height={378}
                        priority
                        fetchPriority="high"
                    />
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">생산 항목</h2>
                            </div>
                            <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                                <p>contactpin_1</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">가동 여부</h2>
                            </div>
                            <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                                <p>가동 중</p>
                                <div className={`w-5 h-5 rounded-full bg-point-green`} />
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">본부</h2>
                            </div>
                            <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                                <p>양산</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">사업소</h2>
                            </div>
                            <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                                <p>연구소</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">누적 데이터</h2>
                            </div>
                            <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                                <p>4,928 ROLL (200,125건)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-y-2 border-light-gray overflow-hidden mx-6">
                    <div className="w-full h-full">
                        <div className="w-full h-15 grid grid-cols-4 flex flex-col border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                            <div className="col-span-2">컨택트 핀 검사 기준</div>
                            <div className="col-span-2">기준치</div>
                        </div>
                        <div className="w-full h-15 grid grid-cols-8 flex flex-col border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                            <div className="col-span-2" />
                            <div className="col-span-2" />
                            <div className="col-span-2">최솟값</div>
                            <div className="col-span-2">최댓값</div>
                        </div>

                        {
                            ['헤드', 'Y부', '빗각L', '빗각R'].map((item, idx) =>
                                <div
                                    key={idx}
                                    className={`flex flex-row grid grid-cols-8 h-[150px] text-base border-b border-light-gray text-center`}
                                >
                                    <div className="bg-soft-white font-bold col-span-1 h-[150px] flex flex-col items-center justify-center">
                                        {item}
                                    </div>
                                    {/* TODO: 이미지 이름 다시 확인해서 넣기 */}
                                    <div className="px-4 py-3 col-span-3">
                                        <Image
                                            src={`/assets/${['pl_graph1.png', 'pl_graph2.png', 'pl_graph3.png', 'pl_graph4.png'][idx]}`}
                                            alt="graph"
                                            width={600}
                                            height={378}
                                            priority
                                            fetchPriority="high"
                                        />
                                    </div>
                                    <div className="px-4 py-3 flex flex-col items-center justify-center font-bold text-lg gap-6 col-span-2">
                                        <p>0.6</p>
                                        <input
                                            value={0.6}
                                            onChange={() => { }}
                                            className="w-[150px] h-10 border-2 border-medium-gray rounded-xl text-center"
                                        />
                                    </div>
                                    <div className="px-4 py-3 flex flex-col items-center justify-center font-bold text-lg gap-6 col-span-2">
                                        <p>0.72</p>
                                        <input
                                            value={0.6}
                                            onChange={() => { }}
                                            className="w-[150px] h-10 border-2 border-medium-gray rounded-xl text-center"
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-row items-center bg-white border-y-2 border-light-gray mx-6">
                    <div className="flex items-center justify-center bg-soft-white min-w-[183px] h-[70px] font-bold">
                        <h2 className="text-lg text-black">ROLL 불량률 기준</h2>
                    </div>
                    <div className="flex flex-row text-medium-gray items-center justify-start w-full gap-3 px-4 py-4 font-bold">
                        <p className="w-[150px] text-center">0.72</p>
                        <input
                            value={0.31}
                            onChange={() => { }}
                            className="w-[150px] h-10 border-2 border-medium-gray rounded-xl text-center"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}