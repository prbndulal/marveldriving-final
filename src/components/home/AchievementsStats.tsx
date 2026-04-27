"use client";
import { motion } from "framer-motion";
import { Ribbon, Trophy, CheckCircle, Shield } from "lucide-react";

const stats = [
    { value: "500+", label: "Happy Students" },
    { value: "95%", label: "Pass Rate" },
    { value: "5+", label: "Years Experience" },
    { value: "24/7", label: "Support" },
];

const certifications = [
    "NDIS Registered",
    "RMS Approved",
    "Fully Insured"
];

export function AchievementsStats() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#1B7640] rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
                >
                    {/* Top Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full border-2 border-[#fbbf24] flex items-center justify-center text-[#fbbf24]">
                            <Ribbon className="h-8 w-8" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        Our <span className="text-[#fbbf24]">Achievements</span>
                    </h2>
                    <p className="text-white/70 italic mb-12 text-base">Building success stories every day</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-5xl md:text-6xl font-extrabold text-[#fbbf24] mb-2">{stat.value}</div>
                                <div className="text-base font-medium text-white/90 mb-3">{stat.label}</div>
                                <div className="w-12 h-1 bg-[#fbbf24] rounded-full" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="w-full h-px bg-white/10 max-w-4xl mx-auto mb-8" />

                    {/* Certifications */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-base font-bold mb-6 text-white/80">Certified & Accredited</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {certifications.map((cert) => (
                                <div key={cert} className="bg-white/10 border border-white/20 px-5 py-1.5 rounded-full text-sm font-semibold">
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
