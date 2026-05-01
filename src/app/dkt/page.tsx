"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, Award, FileText, Monitor, Car, Download, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

const dktTopics = [
    "Road rules and regulations",
    "Traffic signs and signals",
    "Safe driving practices",
    "Sharing the road",
    "Alcohol and drugs",
    "Speed limits and zones",
    "Parking rules",
    "Intersections and roundabouts",
];

const preparationSteps = [
    { icon: BookOpen, title: "Study the Road Users Handbook", description: "Download and study the official NSW Road Users Handbook to learn all the road rules." },
    { icon: Monitor, title: "Practice with Online Tests", description: "Use practice tests to familiarize yourself with the question format and test your knowledge." },
    { icon: FileText, title: "Review Key Topics", description: "Focus on high-priority areas like road signs, speed limits, and safe driving practices." },
    { icon: Award, title: "Book Your Test", description: "Once you're confident, book your DKT at a Service NSW location or approved provider." },
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function DKT() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="Get Your Learner's Licence"
                titleStart="Driver Knowledge"
                titleAccent="Test (DKT)"
                description="The Driver Knowledge Test is your first step towards getting your NSW driver's licence. We help you prepare and pass with confidence."
                bannerImage="/study.jpg"
                imageAlt="DKT preparation"
            />

            {/* CTA strip */}
            <section className="py-8 bg-[#f8fafc] border-b border-gray-100">
                <div className="container px-4 md:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-6" asChild>
                        <Link href="/book"><Car className="h-5 w-5 mr-2" />Book Driving Lessons</Link>
                    </Button>
                    <Button variant="outline" className="border-[#1B7640] text-[#1B7640] hover:bg-[#1B7640] hover:text-white h-12 px-6" asChild>
                        <Link href="/contact">Get Help</Link>
                    </Button>
                </div>
            </section>

            {/* What is DKT */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0d4a28]">What is the Driver Knowledge Test?</h2>
                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">The Driver Knowledge Test (DKT) is a computer-based test that assesses your knowledge of NSW road rules. You must pass the DKT before you can get your learner licence.</p>
                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">The test consists of 45 multiple-choice questions, and you need to get at least 41 correct answers to pass. You'll have plenty of time to complete the test.</p>
                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="p-6 bg-[#f8fafc] rounded-xl">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#0d4a28]">
                                    <Clock className="h-5 w-5 text-[#1B7640]" />Test Details
                                </h4>
                                <ul className="space-y-2 text-gray-500">
                                    <li>• 45 multiple-choice questions</li>
                                    <li>• Pass mark: 41 correct answers (91%)</li>
                                    <li>• Computer-based test</li>
                                    <li>• Available in multiple languages</li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-6 text-[#0d4a28]">Topics Covered</h3>
                                <motion.div className="grid grid-cols-1 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                                    {dktTopics.map(topic => (
                                        <motion.div key={topic} variants={staggerItem} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0" />
                                            <span className="text-gray-700">{topic}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* L & P Plate Speed Limits */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
                        <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="order-2 lg:order-1">
                            <span className="inline-block px-4 py-1.5 bg-[#fbbf24] text-[#1B7640] rounded-full text-xs font-bold tracking-widest uppercase mb-5">Know Your Limits</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight text-[#0d4a28]">L & P Plate Speed Limits in NSW</h2>
                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">As a Learner, P1 or P2 driver, you must always stay under your maximum speed — even where the posted speed limit is higher. Knowing these limits is essential for passing your DKT and driving safely on NSW roads.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc]">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fbbf24] text-[#1B7640] font-extrabold text-lg flex-shrink-0">L</div>
                                    <span className="font-semibold text-gray-800">Learners — maximum 90 km/h</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc]">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dc2626] text-white font-extrabold text-lg flex-shrink-0">P</div>
                                    <span className="font-semibold text-gray-800">P1 drivers — maximum 90 km/h</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc]">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1B7640] text-white font-extrabold text-lg flex-shrink-0">P</div>
                                    <span className="font-semibold text-gray-800">P2 drivers — maximum 100 km/h</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="order-1 lg:order-2">
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-[#f8fafc] p-8">
                                <div className="text-center space-y-4">
                                    <p className="text-6xl font-extrabold text-[#fbbf24]">L</p>
                                    <p className="text-xl font-bold text-gray-700">Learner = 90 km/h max</p>
                                    <div className="h-px bg-gray-200" />
                                    <p className="text-6xl font-extrabold text-[#dc2626]">P1</p>
                                    <p className="text-xl font-bold text-gray-700">P1 = 90 km/h max</p>
                                    <div className="h-px bg-gray-200" />
                                    <p className="text-6xl font-extrabold text-[#1B7640]">P2</p>
                                    <p className="text-xl font-bold text-gray-700">P2 = 100 km/h max</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Road User Handbook */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-12">
                        <motion.h2 variants={slideUp} className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Road User Handbook</motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-gray-500 mb-8">Download the official NSW Road User Handbook to study for your DKT. This comprehensive guide covers all the road rules you need to know.</motion.p>
                        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-6" asChild>
                                <a href="/documents/Road-User-Handbook-English.pdf" download>
                                    <Download className="h-5 w-5 mr-2" />Download Handbook (PDF)
                                </a>
                            </Button>
                            <Button variant="outline" className="border-[#1B7640] text-[#1B7640] hover:bg-[#1B7640] hover:text-white h-12 px-6" asChild>
                                <a href="/documents/Road-User-Handbook-English.pdf" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-5 w-5 mr-2" />View Online
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Preparation Steps */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2 variants={slideUp} className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">How to Prepare for Your DKT</motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-gray-500">Follow these steps to ensure you're ready to pass your Driver Knowledge Test.</motion.p>
                    </motion.div>
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        {preparationSteps.map((step, index) => (
                            <motion.div key={step.title} variants={staggerItem} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-shadow hover:shadow-lg">
                                <div className="flex items-start gap-4">
                                    <motion.div initial={{ opacity: 0, rotate: -15 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.1 }} className="w-12 h-12 bg-[#1B7640] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <step.icon className="h-6 w-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-bold mb-2 text-[#0d4a28]">{step.title}</h3>
                                        <p className="text-sm text-gray-500">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* After DKT */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto text-center">
                        <motion.div variants={scaleIn} whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.3 }}>
                            <Award className="h-16 w-16 text-[#1B7640] mx-auto mb-6" />
                        </motion.div>
                        <motion.h2 variants={slideUp} className="text-3xl md:text-4xl font-bold mb-6 text-[#0d4a28]">After You Pass Your DKT</motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-gray-500 mb-8">Once you've passed your DKT and received your learner's licence, you'll need to complete 120 hours of supervised driving (including 20 hours at night) before you can take your driving test. Marvel Driving is here to help you every step of the way!</motion.p>
                        <motion.div variants={staggerItem}>
                            <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-8" asChild>
                                <Link href="/automatic-lessons">Start Your Driving Lessons <ChevronRight className="h-5 w-5 ml-1" /></Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#1B7640]">
                <div className="container px-4 md:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center max-w-3xl mx-auto text-white">
                        <motion.h2 variants={slideUp} className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-white/90 mb-8">Pass your DKT and start learning to drive with Marvel Driving. Our experienced instructors will help you become a confident, safe driver.</motion.p>
                        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold h-14 px-8 text-lg" asChild>
                                <Link href="/book">Book a Lesson</Link>
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold h-14 px-8 text-lg" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
