'use client';

import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import UploadModal from "@/components/analysis/upload/UploadModal";
import UploadDropZone from "@/components/analysis/upload/UploadDropZone";
import UploadDataTable from "@/components/analysis/upload/UploadDataTable";
import { ModalType, UploadData, UploadedDataItem } from "@/types/analysis/upload";

export default function UploadPage() {
    const [selectedItem, setSelectedItem] = useState('선택해주세요');
    const [isUploading, setIsUploading] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [isNotify, setIsNotify] = useState<boolean>(false); // 경고 여부
    const [uploadData, setUploadData] = useState<UploadedDataItem[]>([
        {
            id: 1,
            created_at: '2025.11.13 14:40:25',
            production_name: 'contactpin_1',
            is_uploaded: '20251113_001_001_01250.png',
            file_count: 1,
        },
        {
            id: 2,
            created_at: '2025.11.13 14:40:25',
            production_name: 'contactpin_1',
            is_uploaded: 'contactpin_folder',
            file_count: 1,
        },
        {
            id: 3,
            created_at: '2025.11.13 14:40:25',
            production_name: 'contactpin_1',
            is_uploaded: 'test',
            file_count: 5,
        },
        {
            id: 4,
            created_at: '2025.11.12 14:40:25',
            production_name: 'contactpin_2',
            is_uploaded: '20251112_001_002_11111.png',
            file_count: 1,
        },
        {
            id: 5,
            created_at: '2025.11.11 14:40:25',
            production_name: 'contactpin_2',
            is_uploaded: '20251111_002_001_fdgds.png',
            file_count: 1,
        },
        {
            id: 6,
            created_at: '2025.11.11 14:40:25',
            production_name: 'contactpin_2',
            is_uploaded: '20251111_002_001_33333.png',
            file_count: 1,
        },
    ]);
    // 업로드할 이미지의 검사 항목
    const inspectionOptions = [
        { label: '선택해주세요', value: '선택해주세요' },
        { label: 'contactpin_1', value: 'contactpin_1' },
        { label: 'contactpin_2', value: 'contactpin_2' }
    ];

    const handleUpload = async (files: File[], folderName: string) => {
        if (selectedItem === '선택해주세요') {
            setModalType('error-format');
            return;
        }
        setIsUploading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));
        const now = new Date();
        const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newData: UploadedDataItem = {
            id: uploadData.length + 1,
            production_name: selectedItem,
            is_uploaded: folderName !== '' ? folderName : files[0].name,
            file_count: files.length,
            created_at: dateString,
        };

        setUploadData(prev => [newData, ...prev]);
        setIsUploading(false);
        setModalType('success');
    };

    const handleShowModal = (type: ModalType) => {
        setModalType(type);
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    useEffect(() => {
        if (selectedItem) {
            setIsNotify(false);
        }
    }, [selectedItem]);

    return (
        <Layout headerTitle="데이터 업로드">
            <div className="flex-1 flex flex-col p-6 gap-6">
                <UploadModal type={modalType} onClose={handleCloseModal} />

                <div className="flex flex-col gap-4">
                    <Picker
                        value={selectedItem}
                        title=""
                        type="select"
                        onChange={setSelectedItem}
                        options={inspectionOptions}
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
                    onShowModal={handleShowModal}
                    onWarning={setIsNotify}
                />

                <UploadDataTable data={uploadData} />
            </div>
        </Layout>
    );
}
