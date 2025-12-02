import { Dispatch } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from "react-icons/tfi";

interface PaginationProps {
    total: number;
    page: number;
    limit: number;
    tab: number;
    setPage: Dispatch<React.SetStateAction<number>>;
    setTab: Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
    total,
    page,
    limit,
    tab,
    setPage,
    setTab,
}: PaginationProps) {
    const pageNum = Math.ceil(total / limit);
    const tabNum = Math.ceil(total / (limit * 10));

    return (
        <section className="mt-3">
            <div className="flex justify-center gap-x-2">
                <button
                    name="before tab"
                    onClick={() => {
                        setTab(tab - 1);
                        setPage((tab - 2) * 10 + 1);
                    }}
                    disabled={tab === 1}
                    className={`flex items-center justify-center w-10 h-10 border-2 border-light-gray cursor-pointer 
                        ${tab === 1 && "bg-light-gray"}`}
                >
                    <TfiAngleDoubleLeft size={20} className={`${tab === 1 ? "text-white cursor-auto" : "text-point-blue"}`} />
                </button>
                <button
                    name="before page"
                    onClick={() => {
                        if (page - 1 > 10 * (tab - 1)) {
                            setPage(page - 1);
                        } else {
                            setTab(tab - 1);
                            setPage(page - 1);
                        }
                    }}
                    disabled={page === 1}
                    className={`flex items-center justify-center w-10 h-10 border-2 border-light-gray cursor-pointer ${page === 1 && "bg-light-gray"}`}
                >
                    <SlArrowLeft size={20} className={`${page === 1 ? "text-white cursor-auto" : "text-point-blue"}`} />
                </button>

                {
                    Array(pageNum).splice((tab - 1) * limit, 10)
                        .fill(0)
                        .map((_, i) => (
                            <button
                                name={`${(tab - 1) * 10 + i + 1} page button`}
                                key={(tab - 1) * 10 + i + 1}
                                onClick={() => setPage((tab - 1) * 10 + i + 1)}
                                disabled={(tab - 1) * 10 + i + 1 > pageNum}
                                aria-current={page === (tab - 1) * 10 + i + 1 && 'page'}
                                className={
                                    `${page === (tab - 1) * 10 + i + 1
                                        ? "text-white bg-point-blue font-bold border-none"
                                        : (tab - 1) * 10 + i + 1 <= pageNum
                                            ? "text-point-blue bg-white font-medium border-2 border-light-gray hover:bg-point-blue hover:text-white hover:border-none"
                                            : "bg-light-gray text-white cursor-auto"}
                                    w-10 h-10 flex items-center justify-center cursor-pointer`

                                }
                            >
                                {(tab - 1) * 10 + i + 1}
                            </button>
                        ))
                }

                <button
                    name="next page"
                    onClick={() => {
                        if (page + 1 <= 10 * tab) {
                            setPage(page + 1);
                        } else {
                            setTab(tab + 1);
                            setPage(page + 1);
                        }
                    }}
                    disabled={page === pageNum}
                    className={`flex items-center justify-center w-10 h-10 border-2 border-light-gray cursor-pointer ${page === pageNum && "bg-light-gray"}`}
                >
                    <SlArrowRight size={20} className={`${page === pageNum ? "text-white cursor-auto" : "text-point-blue"}`} />
                </button>
                <button
                    name="next tab"
                    onClick={() => {
                        setTab(tab + 1);
                        setPage(tab * 10 + 1);
                    }}
                    disabled={tab === tabNum}
                    className={`flex items-center justify-center w-10 h-10 border-2 border-light-gray cursor-pointer ${tab === tabNum && "bg-light-gray"}`}
                >
                    <TfiAngleDoubleRight size={20} className={`${tab === tabNum ? "text-white cursor-auto" : "text-point-blue"}`} />
                </button>
            </div>
        </section>
    );
};