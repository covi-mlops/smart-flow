"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Layout from "@/components/layout/Layout";
import { Picker } from "@/components/common/Picker";
import { FilterOptions } from "@/types/processing/process-data";
import MultipleButton from "@/components/common/MultipleButton";
import Pagination from "@/components/common/Pagination";
import { MOCK_DATA } from "@/mock/processing/mock";
import { ProductionHistoryItem } from "@/types/common/types";

const HiArrowUp = lazy(() => import('react-icons/hi').then(module => ({
  default: module.HiArrowUp
})));

const HiArrowDown = lazy(() => import('react-icons/hi').then(module => ({
  default: module.HiArrowDown
})));

const BiDown = lazy(() => import('react-icons/bi').then(module => ({
  default: module.BiChevronDown
})));

export default function ProcessDataPage() {
  const router = useRouter();
  const isInitialRenderRef = useRef(true); // 페이지 렌더링 여부 감지

  const [filters, setFilters] = useState<FilterOptions>({
    production_name: "전체",
    start_created_at: "2025-05-21",
    end_created_at: "2025-05-21",
    production_line: "전체",
    is_abnormal: "전체",
    applied_model: "전체",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentData, setCurrentData] = useState<ProductionHistoryItem[]>(MOCK_DATA);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<string>("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState(1);
  const [sortConfig, setSortConfig] = useState<string>("desc");

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectAll = () => {
    const allIds = MOCK_DATA.slice(
      (currentPage - 1) * Number(itemsPerPage),
      currentPage * Number(itemsPerPage)
    ).map((item) => item.id);
    setSelectedItems(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleToggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSort = (value: string) => {
    setSortConfig(value);
    setIsOpenTab(false);
  };

  const handleDeleteSelected = () => {
    setCurrentData(currentData.filter((data) => !selectedItems.includes(data.id)));
    setSelectedItems([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpenTab(false);
      }
    };

    if (isOpenTab) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenTab]);

  useEffect(() => {
    setSelectedItems([]);
  }, [currentPage]);

  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }

    setCurrentData((prev) => [...prev].reverse());
  }, [sortConfig]);

  const productOptions = [
    { label: "전체", value: "전체" },
    { label: "contactpin_1", value: "contactpin_1" },
    { label: "contactpin_2", value: "contactpin_2" },
  ];

  const lineOptions = [
    { label: "전체", value: "전체" },
    { label: "생산라인1", value: "생산라인1" },
    { label: "생산라인2", value: "생산라인2" },
  ];

  const resultOptions = [
    { label: "전체", value: "전체" },
    { label: "정상", value: "정상" },
    { label: "불량", value: "불량" },
  ];

  const modelOptions = [
    { label: "전체", value: "전체" },
    { label: "covi_seq_00001", value: "covi_seq_00001" },
  ];

  const itemsPerPageOptions = [
    { label: "10개", value: "10" },
    { label: "20개", value: "20" },
    { label: "50개", value: "50" },
  ];

  return (
    <Layout headerTitle="데이터 가공">
      <div className="flex flex-col gap-6 w-full h-full p-6">
        <div className="flex flex-row items-center bg-white border-y-2 border-light-gray">
          <div className="flex items-center justify-center bg-soft-white min-w-[140px] h-[92px]">
            <h2 className="text-lg font-bold text-black">검사 항목</h2>
          </div>

          <div className="flex flex-row items-center justify-start w-full gap-3 px-4 py-4">
            <Picker
              type="select"
              title="생산품목"
              value={filters.production_name}
              onChange={(value) => handleFilterChange("production_name", value)}
              options={productOptions}
            />

            <Picker
              type="date"
              title="생산 시작 일자"
              value={filters.start_created_at}
              onChange={(value) => handleFilterChange("start_created_at", value)}
            />

            <Picker
              type="date"
              title="생산 종료 일자"
              value={filters.end_created_at}
              onChange={(value) => handleFilterChange("end_created_at", value)}
            />

            <Picker
              type="select"
              title="생산라인"
              value={filters.production_line}
              onChange={(value) => handleFilterChange("production_line", value)}
              options={lineOptions}
            />

            <Picker
              type="select"
              title="AI 검사 결과"
              value={filters.is_abnormal}
              onChange={(value) =>
                handleFilterChange("is_abnormal", value)
              }
              options={resultOptions}
            />

            <Picker
              type="select"
              title="AI 모델"
              value={filters.applied_model}
              onChange={(value) => handleFilterChange("applied_model", value)}
              options={modelOptions}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Picker
              type="select"
              title=""
              value={itemsPerPage}
              onChange={setItemsPerPage}
              options={itemsPerPageOptions}
            />

            <MultipleButton
              type="selectAll"
              title="모두 선택"
              disabled={selectedItems.length === 10}
              onClick={handleSelectAll}
            />

            <MultipleButton
              type="default"
              title="모두 해제"
              disabled={selectedItems.length === 0}
              onClick={handleDeselectAll}
            />
          </div>

          <MultipleButton
            type="default"
            title="선택한 항목 삭제"
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          />
        </div>

        <div className="bg-white border-y-2 border-light-gray overflow-hidden h-full">
          <table className="w-full">
            <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-base xl:text-lg font-bold text-black">
              <tr>
                <th className="py-3 w-16">선택</th>
                <th className="py-3 w-16">No</th>
                <th
                  className="py-3 w-[300px] cursor-pointer"
                  onClick={() => setIsOpenTab(!isOpenTab)}
                >
                  <div
                    ref={modalRef}
                    className="flex items-center justify-center gap-3"
                  >
                    {
                      sortConfig === "desc" ? (
                        <HiArrowDown size={20} className="text-point-blue" />
                      ) : (
                        <HiArrowUp size={20} className="text-point-blue" />
                      )
                    }
                    <span className="font-bold">생산 일자</span>
                    <BiDown size={26} />
                  </div>
                </th>
                <th className="py-3 font-bold">생산라인</th>
                <th className="py-3 font-bold">생산 품목</th>
                <th className="py-3 font-bold">AI 불량률</th>
                <th className="py-3 font-bold">AI 검사 결과</th>
                <th className="py-3 font-bold">AI 모델</th>
              </tr>
            </thead>

            <tbody>
              {
                currentData.length !== 0 ? (
                  currentData.slice(
                    (currentPage - 1) * Number(itemsPerPage),
                    currentPage * Number(itemsPerPage)
                  ).map((item, idx) => (
                    <tr
                      key={item.id}
                      className="text-base border-b border-light-gray text-center hover:bg-light-gray/30 cursor-pointer"
                      onClick={() =>
                        router.push(`/processing/process-data/${item.id}`)
                      }
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleToggleItem(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 cursor-pointer accent-point-blue"
                        />
                      </td>
                      <td className="px-4 py-3">{(currentPage - 1) * Number(itemsPerPage) + idx + 1}</td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {item.created_at}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {item.production_line.name}
                      </td>
                      <td className="px-4 py-3">{item.mold_no}</td>
                      <td className="px-4 py-3">
                        {item.defect_rate}%<br />(
                        {item.defective_count}/{item.defective_count + item.normal_count}
                        )
                      </td>
                      {/* TODO: API 명세 보고 해야 함 */}
                      <td
                        className={`px-4 py-3 font-bold ${item.is_abnormal ? "text-point-red" : ""
                          }`}
                      >
                        {item.is_abnormal ? "불량" : "정상"}
                      </td>
                      <td className="px-4 py-3">
                        {/* TODO: 목데이터라서 API 연동 시 수정해야 함 */}
                        {item.applied_model !== null ? item.applied_model : "covi_seg_00001"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-40 text-center font-bold text-lg text-medium-gray"
                    >
                      조회되는 생산 데이터가 없습니다.
                    </td>
                  </tr>
                )
              }

              {
                Array.from({
                  length: Math.max(
                    0,
                    Number(itemsPerPage) -
                    currentData.slice(
                      (currentPage - 1) * Number(itemsPerPage),
                      currentPage * Number(itemsPerPage)
                    ).length
                  ),
                }).map((_, i) => (
                  <tr
                    key={`empty-${i}`}
                    className="h-[73px] border-b border-light-gray"
                  >
                    <td colSpan={8}></td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          {
            isOpenTab && (
              <div
                ref={modalRef}
                className="absolute w-[150px] top-[410px] left-[460px] right-0 mt-1 bg-white border border-light-gray rounded shadow-lg z-50 max-h-60 overflow-y-auto"
              >
                <div
                  className="flex flex-row gap-6 px-4 py-2 border border-light-gray hover:bg-light-gray/20 cursor-pointer text-sm"
                  onClick={() => handleSort("desc")}
                >
                  <Suspense>
                    <HiArrowDown size={18} />
                  </Suspense>
                  <p>최신 순</p>
                </div>
                <div
                  className="flex flex-row gap-6 px-4 py-2 border border-light-gray hover:bg-light-gray/20 cursor-pointer text-sm"
                  onClick={() => handleSort("asc")}
                >
                  <Suspense>
                    <HiArrowUp size={18} />
                  </Suspense>
                  <p>오래된 순</p>
                </div>
              </div>
            )
          }
        </div>

        {
          MOCK_DATA.length !== 0 && (
            <Pagination
              total={MOCK_DATA.length}
              page={currentPage}
              limit={Number(itemsPerPage)}
              tab={tab}
              setPage={setCurrentPage}
              setTab={setTab}
            />
          )
        }
      </div>
    </Layout>
  );
}