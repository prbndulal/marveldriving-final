"use client";

import { motion } from "framer-motion";
import {
    Accessibility,
    MapPin,
    Users,
    Heart,
    ChevronRight,
    CheckCircle,
    Car,
    AlertCircle,
    Shield,
    Phone,
    Mail,
    FileText,
    GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NDISEnquiryForm } from "@/components/ndis/NDISEnquiryForm";
import Link from "next/link";

// Mapped assets
const ndisHeroBanner = "/slider-2.jpg";

const ndisRegistrationGroups = [
    { code: "0107", name: "Assist Personal Activities" },
    { code: "0108", name: "Assist Travel/Transport" },
    { code: "0115", name: "Daily Tasks/Shared Living" },
    { code: "0116", name: "Innovative Community Participation" },
    { code: "0117", name: "Development Life Skills" },
    { code: "0120", name: "Household Tasks" },
    { code: "0125", name: "Participate Community" },
    { code: "0136", name: "Group/Centre Activities" },
];

const serviceCategories = [
    {
        icon: GraduationCap,
        title: "Capacity Building — Improved Daily Living",
        description:
            "Tailored driving lessons under NDIS Capacity Building to help participants develop independence and life skills",
        features: [
            "One-on-one driving lessons for learners with disabilities",
            "Support for physical, intellectual, psychosocial and developmental disabilities",
            "Automatic transmission vehicles exclusively — safer and easier to learn",
            "Patient, qualified instructors trained in disability support",
            "Goal-oriented lessons aligned with your NDIS plan objectives",
            "Progress reports available for plan reviews and support coordinators",
        ],
    },
    {
        icon: Car,
        title: "Transport Services",
        description:
            "Safe, reliable and punctual transport supporting your independence across Sydney's south",
        features: [
            "Transport to medical appointments, therapies and allied health",
            "Travel to school, TAFE, university and work",
            "Community and social activity transport",
            "Supportive staff assistance throughout the journey",
            "Comfortable, well-maintained vehicles",
        ],
    },
    {
        icon: MapPin,
        title: "Daily Living Support",
        description:
            "Assistance with everyday tasks to encourage independence and confidence",
        features: [
            "Assistance with personal activities and routines",
            "Support with daily task management",
            "Building independence and self-confidence",
        ],
    },
    {
        icon: Users,
        title: "Community and Social Participation",
        description:
            "Supporting meaningful engagement in social, recreational and community life",
        features: [
            "Support to attend social, recreational and community events",
            "Building confidence, social skills and independence",
            "Group and centre-based activities",
            "Cultural and community engagement opportunities",
        ],
    },
];

const whyChooseUs = [
    { text: "NDIS registered provider (#4050085206)", icon: Shield },
    { text: "Professional, caring and experienced team", icon: Heart },
    { text: "Safe, reliable and high-quality service", icon: CheckCircle },
    { text: "Tailored, person-centred approach", icon: Accessibility },
    { text: "Respectful, inclusive and culturally diverse care", icon: Users },
    { text: "Automatic transmission vehicles only", icon: Car },
];

const eligibilityPoints = [
    "You are an NDIS participant with an approved plan",
    "Your plan includes relevant funding (e.g., Capacity Building — Improved Daily Living, Transport, Community Participation)",
    "We work with all plan types: Self-Managed, Plan-Managed, and NDIA-Managed",
    "No minimum age requirement — we support participants of all age groups",
    "Services available in Penshurst, Hurstville and Bexley (Sydney, NSW)",
];

const faqs = [
    {
        q: "What NDIS funding categories cover driving lessons?",
        a: "Driving lessons typically fall under Capacity Building — Improved Daily Living (CB Daily Activity). Your plan must include funding for this category. Speak with your support coordinator or plan manager to confirm.",
    },
    {
        q: "Do I need a referral to access your services?",
        a: "No formal referral is required. Simply contact us with your NDIS details and we'll work with you, your support coordinator, or plan manager to set up a service agreement.",
    },
    {
        q: "What type of vehicles do you use for lessons?",
        a: "All our driving lessons are conducted exclusively in modern automatic transmission vehicles. We do not offer manual transmission lessons.",
    },
    {
        q: "Can you provide progress reports for my plan review?",
        a: "Yes. We provide detailed progress reports that can be shared with your support coordinator, plan manager, or the NDIA for plan reviews.",
    },
    {
        q: "What areas do you service?",
        a: "We currently provide services in Penshurst, Hurstville, and Bexley in Sydney's south (NSW). Contact us to confirm availability in your area.",
    },
    {
        q: "How do I get started?",
        a: "Simply fill out the enquiry form on this page or call us. We'll discuss your needs, review your NDIS plan, and create a tailored service agreement.",
    },
];

export default function NDISServices() {
    return (
        <>
            <div className="bg-white">
                {/* Hero Section */}
                <section className="relative py-24 md:py-36 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/hero-van.jpg"
                            alt="NDIS disability support services in Sydney NSW"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0d4a28]/85" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-3xl text-white"
                        >
                            <span className="inline-block px-4 py-2 bg-[#fbbf24] text-[#0d4a28] rounded-full text-xs font-extrabold mb-6 tracking-wider uppercase">
                                NDIS Registered Provider — #4050085206
                            </span>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                NDIS Disability Support Services in Sydney
                            </h1>
                            <p className="text-xl text-white/90 mb-6 leading-relaxed">
                                Marvel Driving and Transport Pty Ltd (ABN: 65 661 258 591) is an
                                Australian-owned, NDIS registered provider supporting people of all
                                abilities to travel safely, build independence and participate in
                                community life.
                            </p>
                            <p className="text-white/70 mb-10 text-sm font-bold tracking-wide uppercase">
                                Serving Penshurst, Hurstville &amp; Bexley — Sydney, NSW
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <Button className="bg-white text-[#0d4a28] hover:bg-white/95 font-extrabold text-lg h-16 px-10 rounded-full shadow-xl hover:scale-105 transition-all" asChild>
                                    <a href="#ndis-enquiry">
                                        <FileText className="h-5 w-5 mr-3" />
                                        Make an NDIS Enquiry
                                    </a>
                                </Button>
                                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 font-extrabold text-lg h-16 px-10 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 transition-all" asChild>
                                    <a href="tel:0431306570">
                                        <Phone className="h-5 w-5 mr-3" />
                                        Call Us
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Service Area Banner */}
                <section className="py-4 bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-3 text-sm font-bold text-[#0d4a28]/70 uppercase tracking-widest">
                            <MapPin className="h-4 w-4 text-[#fbbf24]" />
                            <span>
                                NDIS services available in{" "}
                                <span className="text-[#0d4a28]">Penshurst, Hurstville &amp; Bexley</span>, Sydney NSW
                            </span>
                        </div>
                    </div>
                </section>

                {/* Capacity Building Highlight */}
                <section className="py-16 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <div className="inline-flex p-4 bg-[#1B7640] rounded-xl mb-6">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Capacity Building — Improved Daily Living
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                                Our driving lessons for NDIS participants are designed as a
                                Capacity Building support under Improved Daily Living. We help
                                participants develop the skills and confidence to drive
                                independently, enhancing their quality of life and community
                                access.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                {[
                                    {
                                        title: "Qualified Instructors",
                                        desc: "Our instructors are professionally trained and experienced in supporting learners with diverse disabilities and needs.",
                                    },
                                    {
                                        title: "Automatic Vehicles",
                                        desc: "All lessons use modern automatic transmission vehicles — easier, safer, and less stressful to learn.",
                                    },
                                    {
                                        title: "Goal-Oriented",
                                        desc: "Lessons aligned with your NDIS plan goals, with progress tracking and reports for plan reviews.",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
                                    >
                                        <h3 className="font-bold mb-2 text-[#1B7640]">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* NDIS Registration Groups */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Our NDIS Registration Groups
                            </h2>
                            <p className="text-lg text-gray-600">
                                Marvel Driving and Transport is registered under the following NDIS
                                support categories, enabling us to provide comprehensive,
                                professionally delivered supports.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {ndisRegistrationGroups.map((group, index) => (
                                <motion.div
                                    key={group.code}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.08,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                    }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full" />
                                    <div className="relative z-10 text-center">
                                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#1B7640] to-[#1B7640]/80 rounded-xl shadow-md mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-white font-bold text-lg">
                                                {group.code}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-800 group-hover:text-[#1B7640] transition-colors duration-300">
                                            {group.name}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services List */}
                <section className="py-20 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Our NDIS Services
                            </h2>
                            <p className="text-lg text-gray-600">
                                Whether you're learning to drive, travelling to appointments,
                                attending community activities, or building daily living skills —
                                we are here to support you.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {serviceCategories.map((category, index) => (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <div className="lg:w-1/3">
                                            <div className="inline-flex p-4 bg-[#1B7640] rounded-xl mb-4 shadow-lg">
                                                <category.icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900">{category.title}</h3>
                                            <p className="text-gray-600">
                                                {category.description}
                                            </p>
                                        </div>
                                        <div className="lg:w-2/3">
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {category.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                                                    >
                                                        <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Automatic Only Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-8 flex items-start gap-3 p-6 bg-[#fbbf24]/10 rounded-xl max-w-3xl mx-auto border border-[#fbbf24]/20"
                        >
                            <AlertCircle className="h-6 w-6 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                            <p className="text-gray-800">
                                <strong>Please Note:</strong> All driving lessons are conducted in
                                automatic transmission vehicles only. We do not offer manual
                                transmission lessons.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Why Choose Marvel Driving and Transport?
                            </h2>
                            <p className="text-lg text-gray-600">
                                Our team is highly experienced, compassionate and professionally
                                trained to support participants with diverse needs, backgrounds
                                and abilities.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {whyChooseUs.map((item) => (
                                    <div
                                        key={item.text}
                                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                    >
                                        <item.icon className="h-6 w-6 text-[#1B7640] flex-shrink-0" />
                                        <span className="font-medium text-gray-800">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Eligibility */}
                <section className="py-20 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="inline-block px-4 py-2 bg-[#1B7640]/10 text-[#1B7640] rounded-full text-sm font-bold mb-4">
                                    Eligibility &amp; Getting Started
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                    Am I Eligible for NDIS-Funded Services?
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    You may be eligible for our services if you meet the following
                                    criteria. We work closely with participants, support
                                    coordinators, families and allied health professionals to create
                                    tailored support solutions.
                                </p>

                                <ul className="space-y-3 mb-6">
                                    {eligibilityPoints.map((point) => (
                                        <li key={point} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                                    <h4 className="font-bold mb-2 text-[#1B7640]">
                                        Not Sure About Your Eligibility?
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-3">
                                        Contact us and we'll help you understand your options. We can
                                        liaise with your support coordinator or plan manager on your
                                        behalf.
                                    </p>
                                    <Button variant="default" className="bg-[#1B7640] hover:bg-[#153e1e] text-white" asChild>
                                        <a href="#ndis-enquiry">
                                            Submit an Enquiry
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        {
                                            step: "1",
                                            title: "Contact Us",
                                            desc: "Submit an enquiry or call us to discuss your needs and goals",
                                        },
                                        {
                                            step: "2",
                                            title: "Service Agreement",
                                            desc: "We'll create a tailored support plan aligned with your NDIS goals",
                                        },
                                        {
                                            step: "3",
                                            title: "Book Your Service",
                                            desc: "Schedule support at times and locations that suit you",
                                        },
                                        {
                                            step: "4",
                                            title: "Enjoy Support",
                                            desc: "Experience professional, person-centred care that builds your independence",
                                        },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.step}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                                        >
                                            <div className="w-12 h-12 bg-[#1B7640] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-1 text-gray-900">{item.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600">
                                Common questions about our NDIS services
                            </p>
                        </motion.div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.details
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-gray-50 rounded-xl border border-gray-100 shadow-sm"
                                >
                                    <summary className="p-5 cursor-pointer font-semibold flex items-center justify-between list-none text-gray-900">
                                        {faq.q}
                                        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
                                    </summary>
                                    <div className="px-5 pb-5 text-gray-600">
                                        {faq.a}
                                    </div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* NDIS Enquiry Form */}
                <section id="ndis-enquiry" className="py-20 scroll-mt-20 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-8"
                            >
                                <div className="inline-flex p-3 bg-[#1B7640]/10 rounded-xl mb-4">
                                    <Mail className="h-7 w-7 text-[#1B7640]" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
                                    NDIS Service Enquiry
                                </h2>
                                <p className="text-gray-600">
                                    Ready to get started? Fill in the form below and our team will
                                    contact you within 1-2 business days to discuss your support
                                    needs.
                                </p>
                            </motion.div>

                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                                <NDISEnquiryForm />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Provider Details */}
                <section className="py-12 bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="font-bold text-lg mb-4 text-[#1B7640]">Provider Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="font-medium text-gray-900">Business Name</p>
                                    <p>Marvel Driving and Transport Pty Ltd</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="font-medium text-gray-900">ABN</p>
                                    <p>65 661 258 591</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="font-medium text-gray-900">
                                        NDIS Registration
                                    </p>
                                    <p>#4050085206</p>
                                </div>
                            </div>
                        </div>
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
                                Ready to Start Your Journey to Independence?
                            </h2>
                            <p className="text-lg text-white/90 mb-8">
                                We are here to support you or your loved ones to travel
                                confidently, build independence and enjoy life to the fullest.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button className="bg-[#fbbf24] hover:bg-[#d97706] text-black font-bold text-lg h-14 px-8" asChild>
                                    <a href="#ndis-enquiry">
                                        <FileText className="h-5 w-5 mr-2" />
                                        Make an NDIS Enquiry
                                    </a>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
