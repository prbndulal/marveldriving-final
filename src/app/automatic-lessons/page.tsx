"use client";

import { motion } from "framer-motion";
import { Car, CheckCircle, AlertCircle, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DrivingTestPackage } from "@/components/home/DrivingTestPackage";

const marvelDrivingSuccess = "/marvel-driving-success.png"; // Replace with your actual image path

const benefits = [
    "Learn in modern automatic vehicles",
    "Patient, experienced instructors",
    "Dual-controlled vehicles for safety",
    "Flexible scheduling options",
    "Progress tracking and feedback",
    "Pick-up and drop-off available",
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
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

export default function AutomaticLessons() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="Automatic Transmission Only"
                titleStart="Automatic"
                titleAccent="Driving Lessons"
                description="Learn to drive stress-free in our modern automatic vehicles. Professional instruction tailored to beginners."
                bannerImage="/slider-1.jpg"
                imageAlt="Automatic driving lessons"
            />

            {/* CTA Strip below hero */}
            <section className="py-8 bg-[#f8fafc] border-b border-gray-100">
                <div className="container px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-3 max-w-2xl">
                            <AlertCircle className="h-6 w-6 text-[#1B7640] flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700">
                                <strong>Please Note:</strong> We exclusively offer automatic transmission lessons.
                                Manual transmission lessons are not available.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-6" asChild>
                                <Link href="/book">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Book Online Now
                                </Link>
                            </Button>
                            <Button variant="outline" className="border-[#1B7640] text-[#1B7640] hover:bg-[#1B7640] hover:text-white h-12 px-6" asChild>
                                <Link href="/contact">Enquire First</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Area Banner */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-3 bg-[#f8fafc] border-b border-gray-100"
            >
                <div className="container px-4 md:px-8">
                    <div className="flex items-center justify-center gap-2 text-sm text-[#1B7640]">
                        <MapPin className="h-4 w-4" />
                        <span>Available in <strong>Penshurst, Hurstville & Bexley</strong>, Sydney NSW</span>
                    </div>
                </div>
            </motion.section>

            {/* Pricing Section */}
            <section className="py-16 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-[#1B7640] p-8 text-center">
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                                >
                                    Driving Lessons & Support
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.35 }}
                                    className="text-white/90"
                                >
                                    For Beginner Learners
                                </motion.p>
                            </div>
                            <div className="p-8 text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="mb-6"
                                >
                                    <span className="text-6xl md:text-7xl font-extrabold text-[#1B7640]">$65</span>
                                    <span className="text-2xl text-gray-500">/hour</span>
                                </motion.div>
                                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                    Tailored one on one driving lessons.<br />
                                    Patient, experienced and supportive instructors.<br />
                                    Assistance for learners with physical, intellectual, psychosocial and developmental disabilities.<br />
                                    Confidence building and safe driving skills.
                                </p>
                                <Button className="w-full max-w-md bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-14 text-lg" asChild>
                                    <Link href="/book">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Book Your Lesson Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Automatic? */}
            <section className="py-16">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.h2 variants={slideUp} className="text-2xl md:text-3xl font-bold mb-4 text-[#0d4a28]">Why Learn in an Automatic?</motion.h2>
                        <motion.p variants={slideUp} className="text-gray-500 mb-8">
                            Automatic vehicles are the future of driving. They're easier to learn, safer to operate,
                            and increasingly the standard choice for Australian drivers.
                        </motion.p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Easier to Learn", desc: "Focus on the road, not the clutch. Master driving faster." },
                                { title: "Less Stressful", desc: "No stalling at traffic lights. Smooth, confident driving." },
                                { title: "Future-Proof", desc: "Electric vehicles are automatic. Learn the skill of the future." },
                            ].map(item => (
                                <motion.div
                                    key={item.title}
                                    variants={staggerItem}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-lg"
                                >
                                    <h3 className="font-bold mb-2 text-[#1B7640]">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <motion.div
                            variants={slideLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                initial={{ opacity: 0, rotate: -10 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex p-4 bg-[#1B7640] rounded-xl mb-6"
                            >
                                <Car className="h-8 w-8 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold mb-4 text-[#0d4a28]">Driving Lessons & Support</h2>
                            <p className="text-lg text-gray-500 mb-6">
                                Start your driving journey with confidence in our modern automatic vehicles.
                                Perfect for first-time drivers who want a stress-free learning experience.
                            </p>

                            <div className="mb-6">
                                <h4 className="font-semibold mb-3 text-[#0d4a28]">What's included:</h4>
                                <motion.ul
                                    className="space-y-2"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                                >
                                    {benefits.map(benefit => (
                                        <motion.li key={benefit} variants={staggerItem} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="p-4 bg-white rounded-lg mb-6 border border-gray-100"
                            >
                                <h4 className="font-semibold mb-2 text-[#1B7640]">Who is this for?</h4>
                                <p className="text-gray-500 text-sm">
                                    First-time drivers, nervous learners, and anyone new to Australian roads.
                                </p>
                            </motion.div>

                            <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-14 px-8 text-lg" asChild>
                                <Link href="/book">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Book Your Lesson - $65/hour
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={slideRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl overflow-hidden shadow-xl bg-white"
                            >
                                <img
                                    src={marvelDrivingSuccess}
                                    alt="Marvel Driving student success"
                                    loading="lazy"
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                className="absolute -bottom-6 -left-6 bg-[#fbbf24] p-6 rounded-xl shadow-lg"
                            >
                                <p className="font-bold text-3xl text-[#1B7640]">$65</p>
                                <p className="text-sm text-[#1B7640]/80">per hour</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Driving Test Package */}
            <DrivingTestPackage />

            {/* Important Notice */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-12 bg-red-50"
            >
                <div className="container px-4 md:px-8">
                    <div className="flex items-center justify-center gap-4 text-center">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
                        </motion.div>
                        <p className="text-lg text-red-900">
                            <strong>Important:</strong> Marvel Driving School exclusively offers automatic transmission lessons.
                            We do not provide manual transmission driving instruction.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1B7640]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center max-w-3xl mx-auto text-white"
                    >
                        <motion.h2 variants={slideUp} className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your Driving Journey?
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-white/90 mb-8">
                            Book your automatic driving lesson online today at just $65 per hour.
                        </motion.p>
                        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold h-14 px-8 text-lg" asChild>
                                <Link href="/book">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Book Online Now
                                </Link>
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
