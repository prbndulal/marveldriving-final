"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, ExternalLink, Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/PageHero";
import { ServiceAreaBanner } from "@/components/ServiceAreaBanner";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        value: "0431 306 570",
        href: "tel:0431306570",
        description: "Available Mon - Sat",
    },
    {
        icon: Mail,
        title: "Email",
        value: "info@marveldriving.com.au",
        href: "mailto:info@marveldriving.com.au",
        description: "We'll respond within 24 hours",
    },
    {
        icon: MapPin,
        title: "Head Office",
        value: "Penshurst, NSW 2222",
        href: undefined,
        description: "Services available in Penshurst, Hurstville & Bexley",
    },
    {
        icon: Clock,
        title: "Business Hours",
        value: "Mon - Sat: 7am - 7pm",
        href: undefined,
        description: "Sunday by appointment",
    },
];

export default function Contact() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.enquiryType || "General Enquiry",
                    message: formData.message,
                    type: formData.enquiryType || "general",
                }),
            });
            if (!res.ok) throw new Error();
            toast({ title: "Message Sent!", description: "Thank you for your enquiry. We'll get back to you soon." });
            setFormData({ name: "", email: "", phone: "", enquiryType: "", message: "" });
        } catch {
            toast({ title: "Submission failed", description: "Please try again or call us directly.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ServiceAreaBanner />

            <PageHero
                badge="Contact Us"
                titleStart="Get In"
                titleAccent="Touch With Us"
                description="Have a question or ready to book? Get in touch with our friendly team today. We're here to help!"
                bannerImage="/contact-hero.jpg"
            />

            {/* Contact Info & Form */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-[#0d4a28]">Get in Touch</h2>
                            <p className="text-lg text-gray-500 mb-8">
                                Whether you're enquiring about driving lessons or NDIS transport,
                                we'd love to hear from you. Choose your preferred contact method below.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                {contactInfo.map((item) => (
                                    <div key={item.title} className="p-6 bg-[#f8fafc] rounded-xl">
                                        <item.icon className="h-8 w-8 text-[#1B7640] mb-4" />
                                        <h3 className="font-bold mb-1 text-[#0d4a28]">{item.title}</h3>
                                        {item.href ? (
                                            <a href={item.href} className="text-[#1B7640] font-semibold hover:underline">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="font-semibold text-[#0d4a28]">{item.value}</p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Map */}
                            <div className="space-y-6">
                                <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26546.02766!2d151.0873!3d-33.9643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b972f8b8c8c7%3A0x5017d681632c760!2sPenshurst%20NSW%202222!5e0!3m2!1sen!2sau!4v1704067200000!5m2!1sen!2sau"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Marvel Driving Service Area"
                                    />
                                    <a
                                        href="https://www.google.com/maps/place/Penshurst+NSW+2222/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1B7640] font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm"
                                    >
                                        Open in Maps <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>

                                {/* Visit Us Card */}
                                <div className="bg-[#1B7640] text-white rounded-2xl p-6 md:p-8 shadow-lg">
                                    <div className="flex items-start gap-5">
                                        <div className="shrink-0 p-4 bg-white/10 rounded-2xl">
                                            <MapPin className="h-7 w-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#fbbf24] font-bold text-sm tracking-widest mb-2">VISIT US</p>
                                            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
                                                Marvel Driving & Transport
                                            </h3>
                                            <p className="text-white/85 text-base md:text-lg mb-6 leading-relaxed">
                                                Head Office — Penshurst, NSW 2222, Australia
                                            </p>
                                            <a
                                                href="https://www.google.com/maps/dir/?api=1&destination=Penshurst+NSW+2222"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
                                            >
                                                <Navigation className="h-4 w-4" />
                                                Get Directions
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold mb-2 text-[#0d4a28]">Send Us a Message</h2>
                                <p className="text-gray-500 mb-8">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Enquiry Type *</Label>
                                        <Select value={formData.enquiryType} onValueChange={v => setFormData({ ...formData, enquiryType: v })}>
                                            <SelectTrigger><SelectValue placeholder="Select enquiry type" /></SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="driving-lessons">Driving Lessons</SelectItem>
                                                <SelectItem value="ndis-transport">NDIS Transport</SelectItem>
                                                <SelectItem value="careers">Careers</SelectItem>
                                                <SelectItem value="general">General Enquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            placeholder="Tell us how we can help you..."
                                            rows={5}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <><Loader2 className="h-5 w-5 animate-spin mr-2" />Sending...</>
                                        ) : (
                                            <>Send Message <Send className="h-5 w-5 ml-2" /></>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sydney Service Areas */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-12"
                    >
                        <p className="text-[#dc2626] font-bold text-sm tracking-widest uppercase mb-4">
                            Where We Operate
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1B7640] mb-6">
                            Sydney Service Areas
                        </h2>
                        <p className="text-lg text-gray-500 leading-relaxed">
                            We currently provide driving lessons and NDIS transport across these Sydney suburbs.
                            Expanding soon — get in touch to register your interest.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-16"
                    >
                        {["Hurstville, NSW", "Penshurst, NSW", "Bexley, NSW"].map((suburb) => (
                            <div
                                key={suburb}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-[#1B7640]/20 text-[#1B7640] font-semibold shadow-sm hover:shadow-md hover:border-[#1B7640]/40 transition-all"
                            >
                                <MapPin className="h-5 w-5" />
                                {suburb}
                            </div>
                        ))}
                    </motion.div>

                    {/* Prefer to Talk Now */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto bg-[#1B7640] text-white rounded-3xl p-10 md:p-14 shadow-xl text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Prefer to Talk Now?
                        </h3>
                        <p className="text-lg text-white/85 mb-8 max-w-md mx-auto leading-relaxed">
                            Our friendly team is just a phone call away. Available Mon – Sat, 7am – 7pm.
                        </p>
                        <Button size="lg" className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold h-12 px-8" asChild>
                            <a href="tel:0431306570">
                                <Phone className="h-5 w-5 mr-2" />
                                Call 0431 306 570
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
