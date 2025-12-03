'use client';

import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { analysisApi } from "@/apis/analysis";
import { ViewDailyAbnormalRollData } from "@/types/analysis/types";
import { formatDate } from "@/utils/formatDate";

export default function DailyErrorTable() {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
  const [data, setData] = useState<ViewDailyAbnormalRollData>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const handleData = async () => {
    try {
      const response = await analysisApi.checkAiModelList(currentPage, itemsPerPage);

      if (response !== null && response.status === "SUCCESS") {
        setData(response.data);
      }
    } catch (error) {
      console.error('handleData error', error);
    }
  };

  useEffect(() => {
    handleData();
  }, [currentPage, currentTab]);

  return (
    <div className="border-4 border-light-gray p-6 bg-white">
      <h3 className="items-start text-xl text-black font-bold mb-6">
        일일 불량 ROLL 알림
      </h3>
      <div className="flex flex-col items-center justify-between">
        <div className="bg-white items-center border-y-2 border-light-gray overflow-hidden w-full h-full">
          <table className="w-full">
            <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
              <tr>
                <th className="w-[150px] py-2 font-bold">생산일자</th>
                <th className="w-40 py-2 font-bold">생산라인</th>
                <th className="w-40 py-2 font-bold">생산 항목</th>
                <th className="w-40 py-2 font-bold">불량률</th>
              </tr>
            </thead>

            <tbody>
              {
                data.count > 0 ? (
                  data.results.map((item) => (
                    <tr
                      key={item.id}
                      className="h-[73px] text-base border-b border-light-gray text-center"
                    >
                      <td className="py-3 whitespace-pre-line">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="py-3 whitespace-pre-line">
                        {item.production_line}
                      </td>
                      <td className="py-3">{item.mold_no}</td>
                      <td className="py-3">
                        {item.defect_rate.toFixed(0)}%<br />(
                        {item.defective_count}/{item.defective_count + item.normal_count})
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-[100px] text-center font-bold text-lg text-medium-gray"
                    >
                      조회되는 생산 데이터가 없습니다.
                    </td>
                  </tr>
                )
              }

              {
                data && data.count > 0 &&
                Array.from({
                  length: Math.max(
                    0,
                    Number(itemsPerPage) - data.results.length
                  )
                }).map((_, i) => (
                  <tr key={`empty-${i}`} className="h-[73px] border-b border-light-gray">
                    <td colSpan={8}></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {
          data && data.count > 0
          && <Pagination
            total={data.count}
            page={currentPage}
            limit={Number(itemsPerPage)}
            tab={currentTab}
            setPage={setCurrentPage}
            setTab={setCurrentTab}
          />
        }
      </div>
    </div>
  );
}