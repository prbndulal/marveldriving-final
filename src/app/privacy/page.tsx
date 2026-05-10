"use client";

import { motion } from "framer-motion";
import { Shield, Mail, Phone } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="relative py-20 md:py-28 bg-[#1B7640]">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto text-white"
                    >
                        <div className="inline-flex p-4 bg-[#FBBF24]/20 rounded-full mb-6">
                            <Shield className="h-12 w-12 text-[#FBBF24]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
                        <p className="text-lg text-white/90">
                            Your privacy is important to us. This policy explains how we collect, use and protect your information.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 flex-1">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto prose prose-lg">
                        <p className="text-gray-500 text-sm mb-8">
                            <strong>Last Updated:</strong>{" "}
                            {new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">1. About This Policy</h2>
                        <p className="text-gray-500">
                            Marvel Driving and Transport Pty Ltd (ABN: 65 661 258 591) ("we", "us", "our") is committed to
                            protecting the privacy of our clients and website visitors. This Privacy Policy describes how we
                            collect, use, disclose and protect personal information in accordance with the Australian Privacy
                            Principles (APPs) under the Privacy Act 1988 (Cth).
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Information We Collect</h2>
                        <p className="text-gray-500">We may collect the following personal information:</p>
                        <ul className="text-gray-500 space-y-2">
                            <li>Full name, email address, phone number and suburb</li>
                            <li>NDIS participant number (for NDIS-funded services)</li>
                            <li>Booking details including dates, times and service preferences</li>
                            <li>Payment information (processed securely via Stripe — we do not store card details)</li>
                            <li>Website usage data including cookies and analytics</li>
                            <li>Communication records (emails, enquiries, feedback)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">3. How We Use Your Information</h2>
                        <p className="text-gray-500">We use your personal information to:</p>
                        <ul className="text-gray-500 space-y-2">
                            <li>Process and manage bookings for driving lessons and NDIS services</li>
                            <li>Communicate with you about your bookings, services and enquiries</li>
                            <li>Process payments and issue invoices</li>
                            <li>Comply with NDIS reporting and regulatory requirements</li>
                            <li>Send newsletters and promotional updates (with your consent)</li>
                            <li>Improve our services and website experience</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">4. Sharing Your Information</h2>
                        <p className="text-gray-500">
                            We do not sell or rent your personal information. We may share your information with:
                        </p>
                        <ul className="text-gray-500 space-y-2">
                            <li>Payment processors (Stripe) for secure transaction processing</li>
                            <li>NDIS and plan managers as required for NDIS-funded services</li>
                            <li>Government or regulatory bodies when required by law</li>
                            <li>Our instructors to facilitate your booked services</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">5. Data Security</h2>
                        <p className="text-gray-500">
                            We take reasonable steps to protect your personal information from misuse, interference, loss,
                            unauthorised access, modification or disclosure. Our website uses SSL encryption, and payment
                            data is handled by PCI-compliant payment processors.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">6. Cookies &amp; Analytics</h2>
                        <p className="text-gray-500">
                            Our website may use cookies and analytics tools to improve user experience and track website
                            performance. You can disable cookies through your browser settings, though some features may
                            be affected.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">7. Your Rights</h2>
                        <p className="text-gray-500">You have the right to:</p>
                        <ul className="text-gray-500 space-y-2">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information (subject to legal obligations)</li>
                            <li>Opt out of marketing communications at any time</li>
                            <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">8. Contact Us</h2>
                        <p className="text-gray-500">
                            If you have any questions about this Privacy Policy or wish to make a request regarding your
                            personal information, please contact us:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6 mt-4 space-y-3 not-prose">
                            <div className="flex items-center gap-3 text-gray-500">
                                <Mail className="h-5 w-5 text-[#1B7640]" />
                                <a href="mailto:info@marveldriving.com.au" className="hover:text-[#1B7640] transition-colors">
                                    info@marveldriving.com.au
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <Phone className="h-5 w-5 text-[#1B7640]" />
                                <a href="tel:0431306570" className="hover:text-[#1B7640] transition-colors">
                                    0431 306 570
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
