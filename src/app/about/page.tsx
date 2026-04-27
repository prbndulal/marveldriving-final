"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Heart, Shield, Users, Award, ThumbsUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { AchievementsSection } from "@/components/about/AchievementsSection";
import { AchievementsStats } from "@/components/home/AchievementsStats";

const values = [
    {
        icon: Shield,
        title: "Safety First",
        description: "Your safety is our top priority. We maintain the highest standards in service delivery, training and protocols."
    },
    {
        icon: Heart,
        title: "Compassionate Care",
        description: "We approach every interaction with patience, understanding and genuine care for your wellbeing."
    },
    {
        icon: Target,
        title: "Person-Centred",
        description: "Our services are tailored to meet individual needs, preferences and abilities. Your goals drive everything we do."
    },
    {
        icon: Users,
        title: "Inclusive Approach",
        description: "We welcome participants of all abilities, backgrounds, and ages. Everyone deserves respectful, culturally diverse care."
    }
];

const whyChooseUs = [
    "NDIS registered and compliant",
    "Professional, caring and experienced team",
    "Safe, reliable and high-quality service",
    "Tailored person-centred approach",
    "Respectful, inclusive and culturally diverse care",
    "Affordable and flexible support options"
];

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="About Us"
                titleStart="About Marvel"
                titleAccent="Driving and Transport"
                description="Empowering Independence through Safe, Professional and Supportive Transport and Driving Services."
                bannerImage="/slider-1.jpg"
                imageAlt="Marvel Driving instructor with successful student"
            />

            {/* Our Story */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0d4a28]">Our Story</h2>
                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                                Marvel Driving and Transport Pty Ltd was established by experienced professionals
                                who understand the importance of independence, mobility and community connection
                                for people living with disability.
                            </p>
                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                                We believe that everyone deserves the opportunity to live life confidently,
                                participate in the community and achieve their personal goals. Our Australian
                                owned company is proud to be a registered NDIS provider supporting people of
                                all abilities.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                We work closely with participants, support coordinators, families and allied
                                health professionals to create tailored support solutions that truly make a
                                difference. Our services are flexible, culturally inclusive and designed to
                                meet individual needs, preferences and abilities.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                                <img
                                    alt="Marvel Driving and Transport Logo"
                                    className="w-full h-auto object-contain"
                                    src="/logo.png"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 bg-[#1B7640] text-white rounded-2xl"
                        >
                            <Target className="h-12 w-12 mb-6 text-[#fbbf24]" />
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-white/90 leading-relaxed">
                                To empower independence through safe, professional and supportive transport
                                and driving services, helping people of all abilities travel safely,
                                confidently and independently.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 bg-white border border-gray-100 rounded-2xl shadow-lg"
                        >
                            <Award className="h-12 w-12 mb-6 text-[#1B7640]" />
                            <h3 className="text-2xl font-bold mb-4 text-[#0d4a28]">Our Vision</h3>
                            <p className="text-gray-500 leading-relaxed">
                                To be Australia's most trusted and inclusive provider of NDIS transport,
                                driving education and support services, known for our commitment to
                                independence, dignity and person-centred care.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Achievements Stats */}
            <AchievementsStats />

            {/* Achievements Section */}
            <AchievementsSection />

            {/* Values */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Our Values</h2>
                        <p className="text-lg text-gray-500">
                            These core values guide everything we do at Marvel Driving and Transport.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center hover:shadow-xl transition-all"
                            >
                                <div className="inline-flex p-4 bg-[#1B7640]/10 rounded-full mb-4">
                                    <value.icon className="h-8 w-8 text-[#1B7640]" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-[#0d4a28]">{value.title}</h3>
                                <p className="text-sm text-gray-500">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 md:p-12 bg-gradient-to-r from-[#1B7640]/5 to-[#1B7640]/10 rounded-2xl border border-[#1B7640]/20">
                            <ThumbsUp className="h-12 w-12 text-[#1B7640] mb-6" />
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0d4a28]">
                                Why Choose Marvel Driving and Transport?
                            </h2>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                Our dedicated team is highly experienced, compassionate and professionally trained
                                to meet the diverse needs of participants, families and support networks. We take
                                pride in delivering reliable, respectful and person-centred services that promote
                                independence, confidence and dignity.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {whyChooseUs.map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#1B7640]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Experience the Difference?
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            We are here to support you or your loved ones to travel confidently,
                            build independence and enjoy life to the fullest.
                        </p>
                        <Button size="lg" className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold h-14 px-10 rounded-lg text-lg" asChild>
                            <Link href="/contact">Contact Us Today</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
