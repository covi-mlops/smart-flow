import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";

export default function ReadyAILearningPage() {
    return (
        <Layout headerTitle="AI 모델 학습 플랫폼">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="인공지능 학습 준비" />

                <div className="flex flex-col p-6 gap-6">
                    <h2 className="text-2xl text-black font-bold">학습 대상 데이터</h2>

                    <div>
                        <div className="flex flex-row items-center bg-white border-t-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">데이터 수</h2>
                            </div>
                            <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                {/* TODO: 값 넣기 */}
                                <p></p>
                            </div>
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">정상 데이터 수</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                                {/* TODO: 값 넣기 */}
                                <p></p>
                            </div>
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">불량 데이터 수</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                                {/* TODO: 값 넣기 */}
                                <p></p>
                            </div>
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">AI 예외 데이터 수</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full px-4 py-[11px] font-bold">
                                {/* TODO: 값 넣기 */}
                                <p></p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
                            <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[70px] font-bold">
                                <h2 className="text-lg text-black">생산 품목</h2>
                            </div>
                            <div className="flex flex-row items-center justify-center w-full px-4 py-4 font-bold">
                                {/* TODO: 값 넣기 */}
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-y-2 border-light-gray overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-light-gray bg-soft-white">
                            <tr className="h-[56px] text-center text-base font-bold text-black">
                                <th>No</th>
                                <th className="w-[340px]">생산 일자</th>
                                <th>생산라인</th>
                                <th>생산 품목</th>
                                <th>AI 불량률</th>
                                <th>AI 검사 결과</th>
                                <th>선택 해제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                learningData.length > 0 ? (
                                    learningData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="h-[60px] text-center border-b border-light-gray"
                                        >
                                            <td className="text-base">{item.id}</td>
                                            <td className="text-base">{item.created_at}</td>
                                            <td className="text-base">{item.production_line_name}</td>
                                            <td className="text-base">{item.mold_no}</td>
                                            <td className="text-base">
                                                {item.defect_rate}%<br />
                                                <span className="text-sm text-medium-gray">
                                                    ({item.defective_count.toLocaleString()}/{(item.normal_count + item.defective_count + item.ai_exception_count).toLocaleString()})
                                                </span>
                                            </td>
                                            <td className={`text-base font-bold ${item.ai_result === "불량" ? "text-point-red" : "text-medium-gray"}`}>
                                                {item.ai_result}
                                            </td>
                                            <td className="flex items-center justify-center">
                                                <MultipleButton
                                                    title="해제"
                                                    type="default"
                                                    onClick={() => handleRemoveFromLearningData(item.id)}
                                                    className="p-2 border border-medium-gray rounded hover:bg-light-gray/30"
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-15 text-center text-lg text-medium-gray">
                                            선택된 학습 데이터가 없습니다.
                                        </td>
                                    </tr>
                                )
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}