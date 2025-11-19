'use client';

import { useState } from "react";
import Button from "@/components/common/Button";
import SemiHeader from "@/components/common/SemiHeader";
import Layout from "@/components/layout/Layout";
import EditImage from "@/components/processing/process-data/EditImage";
import { useRouter } from "next/navigation";

export default function ProcessDataDetailPage() {
    const router = useRouter();
    const [editedData, setEditedData] = useState<number[][][]>([]);

    const handleDataChange = (data: number[][][]) => {
        setEditedData(data);
    };

    const handleSave = () => {
        console.log("Saving edited data:", editedData);
        router.back();
    };

    return (
        <Layout headerTitle="데이터 가공">
            <div className="w-full flex flex-col">
                <SemiHeader headerTitle="이미지 편집" />
                <div className="flex flex-col p-6 gap-12">
                    <EditImage onDataChange={handleDataChange} />
                    <div className="flex flex-row w-full gap-6">
                        <Button
                            type="submit"
                            variant="default"
                            onClick={() => router.back()}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSave}
                        >
                            저장
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}