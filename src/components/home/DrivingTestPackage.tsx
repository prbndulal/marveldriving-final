"use client";
import { motion } from "framer-motion";
import { ChevronRight, Cone, Octagon, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DrivingTestPackage() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container px-4 md:px-8">
                <div className="bg-[#1B7640] rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-start gap-6 mb-2">
                                <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                                    <span className="text-[#dc2626] text-6xl font-bold leading-none select-none">P</span>
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Driving Test Package</h2>
                                    <div className="text-5xl font-extrabold text-[#fbbf24]">$220</div>
                                </div>
                            </div>

                            {/* Spacing */}
                            <div className="h-8"></div>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Pick-up 1hr prior to test start time",
                                    "45 min pre-test warm up",
                                    "Use of instructor's vehicle to sit the test",
                                    "Drop-off after the test result is received"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/90 text-lg font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                className="bg-transparent border-2 border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-[#1B7640] font-bold text-lg h-14 px-8 rounded-xl transition-all w-full sm:w-auto"
                                asChild
                            >
                                <Link href="/book">
                                    Book Test Package Now
                                    <ChevronRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                            <p className="mt-6 text-white/50 text-sm">Test package not available in ACT, SA and TAS.</p>
                        </motion.div>

                        {/* Right Graphics */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[400px] hidden lg:block"
                        >
                            {/* Floating Elements Recreation */}

                            {/* P Plate */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 left-10 bg-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl rotate-[-12deg] z-20"
                            >
                                <span className="text-[#dc2626] text-7xl font-bold leading-none select-none">P</span>
                            </motion.div>

                            {/* Stop Sign */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-0 right-20"
                            >
                                <div className="w-28 h-28 bg-[#dc2626] rounded-full border-4 border-white flex items-center justify-center shadow-xl rotate-[12deg]">
                                    <span className="text-white font-bold text-lg tracking-widest">STOP</span>
                                </div>
                            </motion.div>

                            {/* L Plate */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute top-40 right-10 bg-[#fbbf24] w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl rotate-[6deg] z-10"
                            >
                                <span className="text-black text-7xl font-bold leading-none select-none">L</span>
                            </motion.div>

                            {/* Traffic Cone */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute bottom-10 left-20 z-0"
                            >
                                {/* CSS Triangle for cone */}
                                <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-[#fbbf24] mx-auto relative">
                                    <div className="absolute top-[15px] -left-[18px] w-[36px] h-[10px] bg-white/40 transform -skew-y-6"></div>
                                </div>
                                <div className="w-[80px] h-[10px] bg-[#fbbf24] rounded-sm -mt-1 mx-auto"></div>
                            </motion.div>

                            {/* Road Block / Barrier */}
                            <motion.div
                                className="absolute bottom-20 right-0 rotate-[-5deg] opacity-90"
                                animate={{ x: [0, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex">
                                    <div className="h-12 w-8 bg-[#fbbf24] rounded-l-md"></div>
                                    <div className="h-12 w-8 bg-[#dc2626]"></div>
                                    <div className="h-12 w-8 bg-[#fbbf24]"></div>
                                    <div className="h-12 w-8 bg-[#dc2626]"></div>
                                    <div className="h-12 w-8 bg-[#fbbf24] rounded-r-md"></div>
                                </div>
                                <div className="flex justify-between px-2">
                                    <div className="w-2 h-6 bg-gray-400"></div>
                                    <div className="w-2 h-6 bg-gray-400"></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
