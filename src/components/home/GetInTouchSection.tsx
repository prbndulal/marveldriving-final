"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Replaces QuickContactForm
export function GetInTouchSection() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to send message.");

            alert("Message sent! We'll get back to you soon.");
            setFormData({ fullName: '', phoneNumber: '', email: '', message: '' });
        } catch (error: any) {
            alert("Error sending message. Please try again.");
            console.error(error);
        }
    };

    // Placeholder for TikTok icon as it's not in standard lucide set used
    const TikTokIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
    );

    return (
        <section className="py-20 bg-[#f8fafc] relative">
            {/* Decorative gradient background similar to screenshot bottom part */}

            <div className="container px-4 md:px-8">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Panel - Green */}
                    <div className="bg-[#1B7640] p-10 lg:p-12 lg:w-[40%] text-white flex flex-col justify-between relative overflow-hidden">

                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbbf24]/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

                        <div>
                            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
                            <p className="text-white/90 mb-10 leading-relaxed text-lg">
                                Ready to start your journey towards independence? Contact us today for a free consultation.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                        <Phone className="h-5 w-5 text-[#fbbf24]" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider opacity-70 mb-1">PHONE</p>
                                        <p className="font-bold text-xl">0431 306 570</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                        <Mail className="h-5 w-5 text-[#fbbf24]" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider opacity-70 mb-1">EMAIL</p>
                                        <p className="font-bold text-lg break-all">info@marveldriving.com.au</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-xs opacity-50">
                            ABN: 65 661 258 591
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="p-10 lg:p-12 lg:w-[60%] bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                    <Input
                                        id="fullName"
                                        placeholder="John Smith"
                                        className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-[#1B7640] focus:border-[#1B7640]"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                    <Input
                                        id="phone"
                                        placeholder="0400 000 000"
                                        className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-[#1B7640] focus:border-[#1B7640]"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-[#1B7640] focus:border-[#1B7640]"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your needs..."
                                    className="bg-gray-50 border-gray-200 min-h-[150px] rounded-xl focus:ring-[#1B7640] focus:border-[#1B7640] resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <Button type="submit" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
                                Send Message <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
