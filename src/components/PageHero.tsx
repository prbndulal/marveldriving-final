"use client";
import { motion } from "framer-motion";

interface PageHeroProps {
    badge: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    bannerImage: string;
    imageAlt?: string;
}

export function PageHero({ badge, titleStart, titleAccent, description, bannerImage, imageAlt }: PageHeroProps) {
    return (
        <section className="relative py-24 md:py-36 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={bannerImage}
                    alt={imageAlt || ""}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1B7640]/85" />
            </div>
            <div className="container px-4 md:px-8 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block px-4 py-2 bg-[#fbbf24] text-[#1B7640] rounded-full text-sm font-semibold mb-6">
                        {badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        {titleStart}{" "}
                        <span className="text-[#fbbf24]">{titleAccent}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
