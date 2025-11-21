'use client';

import { useState } from "react";

import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import UploadModal from "@/components/analysis/upload/UploadModal";
import UploadDropZone from "@/components/analysis/upload/UploadDropZone";
import UploadDataTable from "@/components/analysis/upload/UploadDataTable";
import { ModalType, UploadData } from "@/types/analysis/upload";

export default function UploadPage() {
    const [selectedItem, setSelectedItem] = useState('선택해주세요');
    const [isUploading, setIsUploading] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [uploadData, setUploadData] = useState<UploadData[]>([
        // 목데이터
        // TODO: API 연결 시 변경
        {
            uploadDate: '2025.11.13 14:40:25',
            inspectionItem: 'contactpin_1',
            inspectionData: '1건\n20251113_001_001_01250.png'
        },
        {
            uploadDate: '2025.11.13 14:40:25',
            inspectionItem: 'contactpin_1',
            inspectionData: '2,104건\n20251113_001_001_022.png'
        },
        {
            uploadDate: '2025.11.13 14:40:25',
            inspectionItem: 'contactpin_1',
            inspectionData: '356건\ntest_data'
        },
        {
            uploadDate: '2025.11.12 14:40:25',
            inspectionItem: 'contactpin_2',
            inspectionData: '1건\n20251112_001_001_225.png'
        },
        {
            uploadDate: '2025.11.11 14:40:25',
            inspectionItem: 'contactpin_2',
            inspectionData: '1건\n20251111_001_002_49802.png'
        }
    ]);
    // 업로드할 이미지의 검사 항목
    const inspectionOptions = [
        { label: '선택해주세요', value: '선택해주세요' },
        { label: 'contactpin_1', value: 'contactpin_1' },
        { label: 'contactpin_2', value: 'contactpin_2' }
    ];

    const handleUpload = async (files: File[]) => {
        if (selectedItem === '선택해주세요') {
            setModalType('error-format');
            return;
        }
        console.log(files);
        setIsUploading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const now = new Date();
        const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newData: UploadData = {
            uploadDate: dateString,
            inspectionItem: selectedItem,
            inspectionData: files.length > 1
                ? `${files.length}건\n${files[0].name}`
                : `1건\n${files[0].name}`
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
                />

                <UploadDataTable data={uploadData} />
            </div>
        </Layout>
    );
}
