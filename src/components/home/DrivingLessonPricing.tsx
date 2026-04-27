"use client";
import { Check, Car, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    compact?: boolean;
}

export function DrivingLessonPricing({ compact }: Props) {
    return (
        <div className={`bg-[#1B7640] rounded-2xl shadow-xl overflow-hidden text-white flex flex-col h-full relative group`}>
            <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                <Car className="w-32 h-32" />
            </div>

            <div className="p-8 pb-0 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fbbf24] text-[#1B7640] rounded-md text-xs font-bold mb-4 uppercase tracking-wider">
                    <Car className="h-3 w-3" />
                    Automatic Lessons
                </div>
                <h3 className="text-3xl font-bold mb-2">1 Hour Driving Lesson</h3>
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-extrabold text-[#fbbf24]">$65</span>
                    <span className="text-lg opacity-80">/hour</span>
                </div>
            </div>

            <div className="px-8 pb-8 flex-1 flex flex-col relative z-10">
                <ul className="space-y-4 mb-8 flex-1">
                    {[
                        "Patient, experienced instructors",
                        "Modern dual-controlled automatic vehicles",
                        "Pick-up and drop-off available",
                        "Flexible scheduling — 7 days a week"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 rounded-full border border-[#fbbf24] p-0.5">
                                <Check className="h-3 w-3 text-[#fbbf24]" />
                            </div>
                            <span className="text-white/90 text-sm font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto space-y-4">
                    <Button className="w-full bg-transparent hover:bg-[#fbbf24] text-[#fbbf24] hover:text-[#1B7640] border-2 border-[#fbbf24] font-bold h-12 transition-all duration-300 group-hover:bg-[#fbbf24] group-hover:text-[#1B7640]" asChild>
                        <Link href="/book">
                            Book Now <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                    <div className="text-center">
                        <Link href="/pricing" className="text-sm text-white/70 hover:text-white underline decoration-dotted underline-offset-4">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
