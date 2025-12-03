'use client';

import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

import Pagination from "@/components/common/Pagination";
import { OptionType, Picker } from "@/components/common/Picker";
import Layout from "@/components/layout/Layout";
import MultipleButton from "@/components/common/MultipleButton";
import { FilterOptions } from "@/types/processing/process-data";
import { useSortConfigStore } from "@/store/store";
import { ProductionHistoryResult } from "@/types/analysis/types";
import { analysisApi } from "@/apis/analysis";
import { learningApi } from "@/apis/learning";

const HiArrowUp = lazy(() => import('react-icons/hi').then(module => ({
  default: module.HiArrowUp
})));

const HiArrowDown = lazy(() => import('react-icons/hi').then(module => ({
  default: module.HiArrowDown
})));

const BiDown = lazy(() => import('react-icons/bi').then(module => ({
  default: module.BiChevronDown
})));

export default function ResultPage() {
  const router = useRouter();
  const isInitialRenderRef = useRef(true); // 페이지 렌더링 여부 감지

  const { isDesc, setDesc, setAsc } = useSortConfigStore();

  const [filters, setFilters] = useState<FilterOptions>({
    production_name: "전체",
    start_created_at: "2025-05-21",
    end_created_at: "2025-05-21",
    production_line: "전체",
    is_abnormal: null,
    applied_model: "전체"
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentData, setCurrentData] = useState<ProductionHistoryResult[]>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState(1);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectAll = () => {
    // const allIds = currentData
    //   .slice((currentPage - 1) * Number(itemsPerPage), currentPage * Number(itemsPerPage))
    //   .map(item => item.id);
    // setSelectedItems(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleToggleItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSort = (value: string) => {
    if (value === "desc") {
      setDesc();
    } else {
      setAsc();
    }
    setIsOpenTab(false);
  };

  const handleDeleteSelected = () => {
    // setCurrentData(prev => prev.filter((data) => !selectedItems.includes(data.id)));
    setSelectedItems([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpenTab(false);
      }
    };

    if (isOpenTab) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

    // setCurrentData((prev) => {
    //   const sortedData = [...prev].sort((a, b) => {
    //     const aDate = new Date(a.created_at).getTime();
    //     const bDate = new Date(b.created_at).getTime();

    //     return isDesc ? bDate - aDate : aDate - bDate;
    //   });

    //   return sortedData;
    // });
  }, [isDesc]);

  const [productOptions, setProductOptions] = useState<OptionType[]>([
    { label: "전체", value: null },
    { label: "contactpin_1", value: "contactpin_1" },
    { label: "contactpin_2", value: "contactpin_2" }
  ]);
  const [lineOptions, setLineOptions] = useState<OptionType[]>([
    { label: "전체", value: null },
    { label: "생산라인1", value: "생산라인1" },
    { label: "생산라인2", value: "생산라인2" }
  ]);
  const resultOptions = [
    { label: "전체", value: null },
    { label: "정상", value: "true" },
    { label: "불량", value: "false" }
  ];
  const [modelOptions, setModelOptions] = useState<OptionType[]>([
    { label: "전체", value: null },
  ]);
  const itemsPerPageOptions = [
    { label: "10개", value: "10" },
    { label: "20개", value: "20" },
    { label: "50개", value: "50" }
  ];

  const handleOptions = async () => {
    try {
      const [pOptions, lOptions, mOptions] = await Promise.all([
        analysisApi.checkProductionHistoryNames(),
        analysisApi.viewProductionLineList(),
        learningApi.viewAIModelList(currentPage, Number(itemsPerPage))
      ]);

      if (pOptions && pOptions.status === "SUCCESS") {
        setProductOptions([...pOptions.data.items.map((item) => ({ label: item, value: item }))]);
      }
      if (lOptions && lOptions.status === "SUCCESS") {
        setLineOptions([...lOptions.data.items.map((item) => ({ label: item.name, value: item.name }))]);
      }
      if (mOptions && mOptions.status === "SUCCESS") {
        setModelOptions([...mOptions.data.results.map((item) => ({ label: item.server_type, value: item.server_type }))]);
      }
    } catch (error) {
      console.log('handleOptions api error', error);
    }
  };

  const handleProductionHistories = async () => {
    try {
      const response = await analysisApi.viewProductionHistories(
        filters.applied_model,
        filters.start_created_at,
        filters.end_created_at,
        filters.is_abnormal,
        filters.production_line,
        filters.production_name,
        currentPage,
        Number(itemsPerPage)
      );

      if (response && response.status === "SUCCESS") {
        setCurrentData(response.data.results);
      }
    } catch (error) {
      console.error('handleProductionHistories error', error);
    }
  };

  useEffect(() => {
    handleOptions();
    handleProductionHistories();
  }, []);

  return (
    <Layout headerTitle="인공지능 분석">
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
              onChange={(value) =>
                handleFilterChange("production_name", value)
              }
              options={productOptions}
            />

            <Picker
              type="date"
              title="생산 시작 일자"
              value={filters.start_created_at}
              onChange={(value) =>
                handleFilterChange("start_created_at", value)
              }
            />

            <Picker
              type="date"
              title="생산 종료 일자"
              value={filters.end_created_at}
              onChange={(value) =>
                handleFilterChange("end_created_at", value)
              }
            />

            <Picker
              type="select"
              title="생산라인"
              value={filters.production_line}
              onChange={(value) =>
                handleFilterChange("production_line", value)
              }
              options={lineOptions}
            />

            <Picker
              type="select"
              title="AI 검사 결과"
              value={filters.is_abnormal === null ? "전체" : String(filters.is_abnormal)}
              onChange={(value) => handleFilterChange("is_abnormal", value)}
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

        <div className="bg-white border-y-2 border-light-gray overflow-hidden">
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
                      isDesc ? (
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
                currentData && currentData.length !== 0 ? (
                  currentData.slice(
                    (currentPage - 1) * Number(itemsPerPage),
                    currentPage * Number(itemsPerPage)
                  ).map((item, idx) => (
                    <tr
                      key={item.id}
                      className="h-[73px] text-base border-b border-light-gray text-center hover:bg-light-gray/30 cursor-pointer"
                      onClick={() =>
                        router.push(`/analysis/result/${item.id}`)
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
                        {item.defective_count}/
                        {item.total_count})
                      </td>
                      <td
                        className={`px-4 py-3 font-bold ${item.is_abnormal
                          ? "text-point-red"
                          : ""
                          }`}
                      >
                        {item.is_abnormal ? "불량" : "정상"}
                      </td>
                      <td className="px-4 py-3">
                        {item.applied_model}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-[345px] text-center font-bold text-lg text-medium-gray"
                    >
                      조회되는 생산 데이터가 없습니다.
                    </td>
                  </tr>
                )
              }

              {
                currentData
                  && currentData.length !== 0
                  ? Array.from({
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
                  : null
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
          currentData
            && currentData.length !== 0
            ? (
              <Pagination
                total={currentData.length}
                page={currentPage}
                limit={Number(itemsPerPage)}
                tab={tab}
                setPage={setCurrentPage}
                setTab={setTab}
              />
            )
            : (
              <div className="w-full h-[64px]" />
            )
        }
      </div>
    </Layout>
  );
}