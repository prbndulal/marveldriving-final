import { MapPin, Car, Shield, Sparkles } from "lucide-react";

export function ServiceAreaMarquee() {
    const items = [
        { icon: MapPin, text: "SYDNEY CBD" },
        { icon: Sparkles, text: "" },
        { icon: MapPin, text: "PENSHURST" },
        { icon: Sparkles, text: "" },
        { icon: MapPin, text: "HURSTVILLE" },
        { icon: Sparkles, text: "" },
        { icon: MapPin, text: "BEXLEY" },
        { icon: Sparkles, text: "" },
        { icon: Car, text: "DRIVING LESSONS FROM $65/HR" },
        { icon: Sparkles, text: "" },
        { icon: Shield, text: "NDIS REGISTERED PROVIDER" },
        { icon: Sparkles, text: "" },
        { icon: Car, text: "NEW REGISTRATIONS WELCOME" },
        { icon: Sparkles, text: "" },
    ];

    return (
        <div className="bg-[#1B7640] text-white py-3 overflow-hidden whitespace-nowrap relative z-20 border-b border-white/10">
            <div className="flex animate-marquee items-center">
                {[...items, ...items, ...items, ...items].map((item, index) => (
                    <div key={index} className="flex items-center mx-10 opacity-90 transition-opacity">
                        <item.icon className={`h-4 w-4 mr-3 ${item.text === "" ? "text-white/40" : "text-white"}`} />
                        {item.text && (
                            <span className="text-xs font-bold tracking-widest uppercase">
                                {item.text}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
