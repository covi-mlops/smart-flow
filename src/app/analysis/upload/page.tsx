'use client';

import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import { OptionType, Picker } from "@/components/common/Picker";
import UploadModal from "@/components/analysis/upload/UploadModal";
import UploadDropZone from "@/components/analysis/upload/UploadDropZone";
import UploadDataTable from "@/components/analysis/upload/UploadDataTable";
import { ModalType } from "@/types/analysis/upload";
import { analysisApi } from "@/apis/analysis";
import { UploadDataRequest } from "@/types/analysis/types";

export default function UploadPage() {
    const [selectedItem, setSelectedItem] = useState('선택해주세요');
    const [isUploading, setIsUploading] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [isNotify, setIsNotify] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState(0); // 테이블 새로고침용 키

    const [options, setOptions] = useState<OptionType[]>();

    const handleProductionNames = async () => {
        try {
            const response = await analysisApi.checkProductionHistoryNames();
            if (response && response.status === "SUCCESS") {
                setOptions(response.data.items.map((item) => ({ label: item, value: item })));
            }
        } catch (error) {
            console.error('handleProductionNames api error', error);
        }
    };

    const handleUpload = async (files: File[], folderName: string) => {
        if (selectedItem === '선택해주세요') {
            setModalType('not-selected');
            setIsNotify(true);
            return;
        }

        if (!files || files.length === 0) {
            setModalType('error-format');
            return;
        }

        setIsUploading(true);

        try {
            const newData: UploadDataRequest = {
                production_name: selectedItem,
                files: files,
                is_folder_upload: folderName !== '',
                ...(folderName && { folder_name: folderName })
            };

            const response = await analysisApi.uploadData(newData);

            if (response && response.status === "SUCCESS") {
                setModalType('success');
                setRefreshKey(prev => prev + 1);
            } else {
                setModalType('error-format');
            }
        } catch (error) {
            console.error('handleUpload error', error);
            setModalType('error-format');
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (selectedItem && selectedItem !== '선택해주세요') {
            setIsNotify(false);
        }
    }, [selectedItem]);

    useEffect(() => {
        handleProductionNames();
    }, []);

    return (
        <Layout headerTitle="데이터 업로드">
            <div className="flex-1 flex flex-col p-6 gap-6">
                <UploadModal
                    type={modalType}
                    onClose={() => setModalType(null)}
                />

                <div className="flex flex-col gap-4">
                    <Picker
                        value={selectedItem}
                        title=""
                        type="select"
                        onChange={setSelectedItem}
                        options={options}
                        borderColor={`${isNotify ? "point-red" : ""}`}
                        className="w-[240px]"
                    />

                    <p className="text-point-red font-bold text-sm">
                        ※ 사용자가 업로드한 데이터는 생산 수량 계산에 영향을 미치지 않습니다.
                    </p>
                </div>

                <UploadDropZone
                    selectedItem={selectedItem}
                    isUploading={isUploading}
                    onUpload={handleUpload}
                    onShowModal={setModalType}
                    onWarning={setIsNotify}
                />

                <UploadDataTable key={refreshKey} />
            </div>
        </Layout>
    );
}