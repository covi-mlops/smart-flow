export default function DetailTableSkeleton() {
    return (
        <>
            <div className="bg-white border-y-2 border-gray-200 overflow-hidden">
                <table className="w-full min-w-[720px] h-[550px]">
                    <thead className="border-b border-light-gray bg-soft-white py-3 text-center text-lg font-bold text-black">
                        <tr>
                            <th className="py-3 w-[80px]">No</th>
                            <th className="py-3 w-[400px]">컨택트 핀 이미지</th>
                            <th className="py-3 w-[140px]">AI 결과</th>
                            <th className="py-3">가공 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from({ length: 10 }).map((_, idx) => (
                                <tr key={idx} className="h-[55px] border-b border-gray-200">
                                    <td className="px-6 py-3">
                                        <div className="h-4 w-6 bg-gray-300 rounded mx-auto" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-full bg-gray-300 rounded" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-12 bg-gray-300 rounded mx-auto" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="h-4 w-4 bg-gray-300 rounded mx-auto" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <div className="h-10 w-64 bg-gray-300 rounded" />
            </div>
        </>
    );
}