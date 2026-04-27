"use client";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Star, Users } from "lucide-react";

const achievements = [
    {
        icon: Shield,
        title: "NDIS Registered",
        description: "Fully registered and compliant NDIS provider delivering quality support services.",
        stat: "Registered",
    },
    {
        icon: CheckCircle,
        title: "RMS Approved",
        description: "Approved by Roads and Maritime Services for professional driving instruction.",
        stat: "Approved",
    },
    {
        icon: Star,
        title: "Fully Insured",
        description: "Comprehensive insurance coverage for participants and instructors at all times.",
        stat: "Insured",
    },
    {
        icon: Users,
        title: "500+ Students",
        description: "Helped over 500 participants gain independence through driving and transport support.",
        stat: "500+",
    },
];

export function AchievementsSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Our Certifications & Achievements</h2>
                    <p className="text-lg text-gray-500">
                        Recognised for excellence in NDIS support, driving education and community services.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="inline-flex p-4 bg-[#1B7640]/10 rounded-full mb-4">
                                <item.icon className="h-8 w-8 text-[#1B7640]" />
                            </div>
                            <div className="text-3xl font-extrabold text-[#fbbf24] mb-2">{item.stat}</div>
                            <h3 className="font-bold text-lg text-[#0d4a28] mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
