"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Mail, Phone, Users, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mapped assets
const heroImage = "/instructor.jpg";

const positions = [
    {
        title: "Driving Instructor (Automatic)",
        type: "Contract / Casual",
        location: "Sydney (St George & Sutherland Shire)",
        description: "We are looking for patient, professional driving instructors to join our growing team. You must hold a valid driving instructor licence and have a passion for road safety.",
        requirements: [
            "Current NSW Driving Instructor Licence",
            "Working with Children Check",
            "Late model automatic vehicle (dual controls)",
            "Excellent communication skills",
            "Patience and professional demeanour"
        ]
    }
];

export default function Careers() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        licenceNumber: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
            title: "Application Received",
            description: "Thank you for your interest. We will be in touch shortly.",
        });
        setIsSubmitting(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            licenceNumber: "",
            message: ""
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 md:py-48 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/instructor.jpg" alt="Careers at Marvel Driving" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0d4a28]/85" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-2 bg-[#fbbf24] text-[#0d4a28] rounded-full text-xs font-extrabold mb-8 tracking-wider uppercase">
                            Join Our Team
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-white tracking-tight">
                            Careers at Marvel Driving
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
                            Are you a passionate driving instructor? Join a team that values safety,
                            professionalism, and inclusive education.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button className="bg-white text-[#0d4a28] hover:bg-gray-100 font-extrabold text-lg h-16 px-12 rounded-full shadow-2xl transition-all hover:scale-105" asChild>
                                <a href="#positions">
                                    <Briefcase className="h-5 w-5 mr-3" />
                                    View Open Positions
                                </a>
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-extrabold text-lg h-16 px-12 rounded-full backdrop-blur-sm shadow-xl transition-all hover:scale-105" asChild>
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            Why Work With Us?
                        </h2>
                        <p className="text-lg text-gray-600 mb-12">
                            At Marvel Driving, we're more than just a driving school. We're a community-focused
                            provider committed to road safety and empowering learners of all abilities.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Users, title: "Supportive Team", desc: "Work with a friendly, professional team that supports your growth." },
                            { icon: Calendar, title: "Flexible Hours", desc: "Manage your own schedule and work hours that suit your lifestyle." },
                            { icon: Award, title: "Quality Focused", desc: "We pride ourselves on high standards of instruction and customer service." }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 bg-gray-50 rounded-xl"
                            >
                                <div className="w-12 h-12 bg-[#1B7640] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="positions" className="py-20 bg-[#f8fafc]">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Open Positions</h2>

                        {positions.map((job) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-8"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#1B7640]">{job.title}</h3>
                                        <p className="text-gray-500 font-medium">{job.location} • {job.type}</p>
                                    </div>
                                    <Button asChild>
                                        <a href="#apply">Apply Now</a>
                                    </Button>
                                </div>

                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {job.description}
                                </p>

                                <h4 className="font-bold mb-3 text-gray-900">Requirements:</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                                    {job.requirements.map((req) => (
                                        <li key={req} className="flex items-center gap-2 text-sm text-gray-700">
                                            <CheckCircle className="h-4 w-4 text-[#fbbf24] flex-shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Apply Now</h2>
                    <p className="text-gray-600 mb-8">
                        Interested in joining our team? Send us your details and we'll be in touch.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 text-left bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Jane Smith"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    placeholder="0400 000 000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="licence">Instructor Licence Number</Label>
                                <Input
                                    id="licence"
                                    value={formData.licenceNumber}
                                    onChange={(e) => setFormData({ ...formData, licenceNumber: e.target.value })}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Cover Letter / Message</Label>
                            <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell us briefly about your experience and why you'd like to join us."
                                rows={4}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-[#1B7640] hover:bg-[#153e1e]" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Submit Application"}
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}
