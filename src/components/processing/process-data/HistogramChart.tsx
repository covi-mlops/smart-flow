import NextImage from "next/image";

export default function HistogramChart() {
    return (
        <div
            className="w-full h-[400px] border-[4px] border-light-gray flex items-center justify-center"
        >
            {/* 목데이터 */}
            <NextImage
                src={'/assets/Histogram_image.png'}
                alt="histogram image"
                width={900}
                height={400}
                priority
            />
            {/* TODO: API 작업 시 구현 진행 */}
        </div>
    );
}