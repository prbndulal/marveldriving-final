"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, Award, FileText, Monitor, Car, Download, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mapped assets
// Use study.jpg or placeholder
const heroImage = "/study.jpg";

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
    {
        icon: BookOpen,
        title: "Study the Road Users Handbook",
        description: "Download and study the official NSW Road Users Handbook to learn all the road rules.",
    },
    {
        icon: Monitor,
        title: "Practice with Online Tests",
        description: "Use practice tests to familiarize yourself with the question format and test your knowledge.",
    },
    {
        icon: FileText,
        title: "Review Key Topics",
        description: "Focus on high-priority areas like road signs, speed limits, and safe driving practices.",
    },
    {
        icon: Award,
        title: "Book Your Test",
        description: "Once you're confident, book your DKT at a Service NSW location or approved provider.",
    },
];

export default function DKT() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 md:py-48 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/hero-dashboard.jpg" alt="DKT Study" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0d4a28]/85" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-2 bg-[#fbbf24] text-[#0d4a28] rounded-full text-xs font-extrabold mb-8 tracking-wider uppercase">
                            Get Your Learner's Licence
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-white tracking-tight">
                            Driver Knowledge Test (DKT)
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
                            The Driver Knowledge Test is your first step towards getting your NSW driver's licence.
                            We help you prepare and pass with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button className="bg-white text-[#0d4a28] hover:bg-gray-100 font-extrabold text-lg h-16 px-12 rounded-full shadow-2xl transition-all hover:scale-105" asChild>
                                <Link href="/book">
                                    <Car className="h-5 w-5 mr-3" />
                                    Book Driving Lessons
                                </Link>
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-extrabold text-lg h-16 px-12 rounded-full backdrop-blur-sm shadow-xl transition-all hover:scale-105" asChild>
                                <Link href="/contact">Get Help</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What is DKT */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                What is the Driver Knowledge Test?
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                The Driver Knowledge Test (DKT) is a computer-based test that assesses your knowledge
                                of NSW road rules. You must pass the DKT before you can get your learner licence.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                The test consists of 45 multiple-choice questions, and you need to get at least
                                41 correct answers to pass. You'll have plenty of time to complete the test.
                            </p>
                            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#1B7640]">
                                    <Clock className="h-5 w-5" />
                                    Test Details
                                </h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• 45 multiple-choice questions</li>
                                    <li>• Pass mark: 41 correct answers (91%)</li>
                                    <li>• Computer-based test</li>
                                    <li>• Available in multiple languages</li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-6 text-gray-900">Topics Covered</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {dktTopics.map((topic) => (
                                        <div key={topic} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0" />
                                            <span className="text-gray-700">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Road User Handbook Section */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            Road User Handbook
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Download the official NSW Road User Handbook to study for your DKT.
                            This comprehensive guide covers all the road rules you need to know.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="bg-[#1B7640] hover:bg-[#153e1e] text-white h-14 px-8 text-lg font-bold" asChild>
                                <a href="https://www.nsw.gov.au/driving-boating-and-transport/roads-safety-and-rules/road-user-handbook" target="_blank" rel="noopener noreferrer">
                                    <Download className="h-5 w-5 mr-2" />
                                    View Handbook
                                </a>
                            </Button>
                            <Button variant="outline" className="border-[#1B7640] text-[#1B7640] hover:bg-green-50 h-14 px-8 text-lg font-bold" asChild>
                                <a href="https://www.service.nsw.gov.au/transaction/driver-knowledge-test-dkt" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-5 w-5 mr-2" />
                                    Book Test Online
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Preparation Steps */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            How to Prepare for Your DKT
                        </h2>
                        <p className="text-lg text-gray-600">
                            Follow these steps to ensure you're ready to pass your Driver Knowledge Test.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {preparationSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white rounded-xl shadow-md border border-gray-100 group hover:border-[#1B7640]/50 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#1B7640] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <step.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2 text-gray-900">{step.title}</h3>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* After DKT */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <Award className="h-16 w-16 text-[#fbbf24] mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            After You Pass Your DKT
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Once you've passed your DKT and received your learner's licence, you'll need to
                            complete 120 hours of supervised driving (including 20 hours at night) before
                            you can take your driving test. Marvel Driving is here to help you every step of the way!
                        </p>
                        <Button className="bg-[#1B7640] hover:bg-[#153e1e] text-white font-bold h-14 px-8 text-lg" asChild>
                            <Link href="/book">
                                Start Your Driving Lessons
                                <ChevronRight className="h-5 w-5 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1B7640]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Pass your DKT and start learning to drive with Marvel Driving.
                            Our experienced instructors will help you become a confident, safe driver.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="bg-[#fbbf24] hover:bg-[#d97706] text-black font-bold h-14 px-8 text-lg" asChild>
                                <Link href="/book">Book a Lesson</Link>
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold h-14 px-8 text-lg" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
