import { MapPin } from "lucide-react";

export function ServiceAreaBanner() {
    return (
        <section className="py-3 bg-[#e8e9eb] border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-2 text-sm text-[#1B7640]">
                    <MapPin className="h-4 w-4" />
                    <span>
                        Available in{" "}
                        <strong>Penshurst, Hurstville &amp; Bexley</strong>, Sydney NSW
                    </span>
                </div>
            </div>
        </section>
    );
}
