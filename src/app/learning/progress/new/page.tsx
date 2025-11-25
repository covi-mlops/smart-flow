import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";

export default function NewAILearningPage() {
    return (
        <Layout headerTitle="AI 모델 학습 플랫폼">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="결과 상세 조회" />

                <div className="flex flex-col p-6">
                    <h2 className="text-2xl text-black font-bold mb-6">학습 데이터 선택</h2>
                </div>
            </div>
        </Layout>
    );
}