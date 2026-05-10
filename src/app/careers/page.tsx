"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/PageHero";
import { useToast } from "@/hooks/use-toast";

interface Vacancy {
    id: string;
    title: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
    active: boolean;
}

const benefits = [
    "Competitive pay rates",
    "Flexible scheduling",
    "Ongoing training and development",
    "Supportive team environment",
    "Make a meaningful difference",
    "Modern, well-maintained vehicles",
];

export default function Careers() {
    const { toast } = useToast();
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
    });

    useEffect(() => {
        fetch("/api/vacancies").then(r => r.json()).then(setVacancies);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
            title: "Application Submitted!",
            description: "Thank you for your interest. We'll be in touch soon.",
        });
        setFormData({ name: "", email: "", phone: "", position: "", message: "" });
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="Careers"
                titleStart="Join The"
                titleAccent="Marvel Team"
                description="Join our team and help people achieve independence and confidence on the road. We're always looking for passionate individuals."
                bannerImage="/instructor.jpg"
                imageAlt="Careers at Marvel Driving"
            />

            {/* Why Work With Us */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">
                            Why Work With Us?
                        </h2>
                        <p className="text-lg text-gray-500">
                            At Marvel Driving, we believe in creating an inclusive, supportive
                            workplace where everyone can thrive.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-lg"
                            >
                                <CheckCircle className="h-5 w-5 text-[#1B7640] flex-shrink-0" />
                                <span className="text-gray-700">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">
                            Open Positions
                        </h2>
                        <p className="text-lg text-gray-500">
                            Explore our current opportunities and find your next career move.
                        </p>
                    </motion.div>

                    <div className="space-y-8 max-w-4xl mx-auto">
                        {vacancies.length === 0 && (
                            <p className="text-center text-gray-400 py-8">No open positions at this time. Check back soon!</p>
                        )}
                        {vacancies.map((position, index) => (
                            <motion.div
                                key={position.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-[#0d4a28]">{position.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {position.type}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="px-4 py-2 bg-[#1B7640]/10 text-[#1B7640] rounded-full text-sm font-medium">
                                        Now Hiring
                                    </span>
                                </div>

                                <p className="text-gray-500 mb-6">{position.description}</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3 text-[#0d4a28]">Requirements:</h4>
                                    <ul className="space-y-2">
                                        {position.requirements.map(req => (
                                            <li key={req} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-[#1B7640] flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    className="bg-[#1B7640] hover:bg-[#0d4a28] text-white font-semibold"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, position: position.title }));
                                        document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    Apply Now
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply-form" className="py-20">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Apply Now</h2>
                            <p className="text-lg text-gray-500">
                                Submit your application and we'll be in touch soon.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        placeholder="04XX XXX XXX"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position *</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                                        required
                                        placeholder="Position you're applying for"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Cover Letter / Message</Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about yourself and why you'd be a great fit..."
                                    rows={5}
                                />
                            </div>

                            <p className="text-sm text-gray-500">
                                Note: For full applications, please email your resume to{" "}
                                <a href="mailto:info@marveldriving.com.au" className="text-[#1B7640] hover:underline">
                                    info@marveldriving.com.au
                                </a>
                            </p>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-14 text-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-8">
                            Marvel Driving is an Equal Opportunity Employer. We celebrate diversity
                            and are committed to creating an inclusive environment for all employees.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
