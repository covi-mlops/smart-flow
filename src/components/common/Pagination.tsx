import { Dispatch } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface PaginationProps {
    total: number;
    page: number;
    limit: number;
    setPage: Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
    total,
    page,
    limit,
    setPage,
}: PaginationProps) {
    const pageNum = Math.ceil(total / limit);

    return (
        <section className="mt-3">
            <div className="flex justify-center gap-x-4">
                <button
                    name="before page"
                    onClick={() => {
                        setPage(page - 1);
                    }}
                    disabled={page === 1}
                    className='flex items-center justify-center w-10 h-10 border-2 border-light-gray cursor-pointer'
                >
                    <SlArrowLeft size={24} className='text-point-blue' />
                </button>

                {
                    Array(pageNum)
                        .fill(0)
                        .map((_, i) => (
                            <button
                                name={`${i + 1} page button`}
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 && 'page'}
                                className={
                                    `${page === i + 1
                                        ? "text-white bg-point-blue font-bold border-none"
                                        : "text-point-blue bg-white font-medium border-2 border-light-gray hover:bg-point-blue hover:text-white hover:border-none"}
                                    w-10 h-10 flex items-center justify-center cursor-pointer`

                                }
                            >
                                {i + 1}
                            </button>
                        ))
                }

                <button
                    name="next page"
                    onClick={() => {
                        setPage(page + 1);
                    }}
                    disabled={page === pageNum}
                    className='flex items-center justify-center w-10 h-10 border-2 border-light-gray cursor-pointer'
                >
                    <SlArrowRight />
                </button>
            </div>
        </section>
    );
};