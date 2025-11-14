import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-medium-gray text-white py-6 px-8">
            <div className="flex items-center gap-4">
                <Image
                    src="/assets/nexten_logo_w.png"
                    alt="nexten logo"
                    width={156}
                    height={76}
                    priority
                    fetchPriority="high"
                />

                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">NEXTEN ELECTRONICS CONTACT PIN INSPECTION PLATFORM</p>
                    <p className="text-sm">© 2025 Codevision Inc. All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
}