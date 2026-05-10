"use client";
import { FileText, Check, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    compact?: boolean;
}

export function P1LicenceGuide({ compact }: Props) {
    return (
        <div className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-lg h-full flex flex-col relative overflow-hidden group hover:shadow-xl transition-shadow duration-300`}>
            <div className="absolute top-0 right-0 p-6 opacity-5 transform translate-x-1/4 -translate-y-1/4">
                <BookOpen className="w-32 h-32 text-[#dc2626]" />
            </div>

            <div className="relative z-10 flex-1">
                <div className="inline-flex items-center gap-2 mb-6">
                    <div className="p-2 bg-[#dc2626]/10 rounded-lg text-[#dc2626]">
                        <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-[#dc2626] font-bold text-sm tracking-wide uppercase">Free Resource</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#dc2626] transition-colors">
                    The Ultimate P1 Licence Guide
                </h3>

                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                    Everything you need to know about getting your NSW P1 licence.
                </p>

                <ul className="space-y-3 mb-8">
                    {[
                        "Eligibility requirements & age rules",
                        "Driving test tips & what to expect",
                        "Log book hours & supervised driving",
                        "P1 licence conditions & restrictions"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="mt-1">
                                <div className="h-4 w-4 rounded-md border border-[#dc2626] flex items-center justify-center">
                                    <Check className="h-3 w-3 text-[#dc2626]" />
                                </div>
                            </div>
                            <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto relative z-10">
                <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 shadow-md hover:shadow-lg transition-all" asChild>
                    <Link href="/dkt">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read the Guide
                    </Link>
                </Button>
            </div>
        </div>
    );
}
