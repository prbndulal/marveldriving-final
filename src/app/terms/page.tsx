"use client";

import { motion } from "framer-motion";
import { FileText, AlertTriangle, Mail, Phone } from "lucide-react";

export default function TermsConditions() {
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
                            <FileText className="h-12 w-12 text-[#FBBF24]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms &amp; Conditions</h1>
                        <p className="text-lg text-white/90">
                            Please read these terms carefully before booking any services with Marvel Driving and Transport.
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

                        <h2 className="text-2xl font-bold text-gray-900">1. General</h2>
                        <p className="text-gray-500">
                            These Terms and Conditions ("Terms") govern the use of services provided by Marvel Driving
                            and Transport Pty Ltd (ABN: 65 661 258 591), NDIS Registration #4050085206 ("we", "us", "our").
                            By booking any service, you agree to be bound by these Terms.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Services</h2>
                        <p className="text-gray-500">We provide the following services:</p>
                        <ul className="text-gray-500 space-y-2">
                            <li>Automatic transmission driving lessons at $65 per hour</li>
                            <li>Driving Test Package at $220 (includes pick-up, warm-up, instructor vehicle for test, and drop-off)</li>
                            <li>NDIS Transport Services</li>
                            <li>NDIS Daily Living Support</li>
                            <li>NDIS Community and Social Participation</li>
                        </ul>
                        <p className="text-gray-500">
                            We exclusively offer automatic transmission vehicles. Manual transmission lessons are not available.
                        </p>

                        {/* NO REFUND / NO CANCELLATION — highlighted */}
                        <div className="not-prose bg-red-50 border-2 border-red-200 rounded-2xl p-6 mt-10 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                                <h2 className="text-2xl font-bold text-red-600 m-0">3. No Refund &amp; No Cancellation Policy</h2>
                            </div>
                            <div className="space-y-4 text-gray-800">
                                <p className="font-semibold text-lg">
                                    All bookings are final. Once a booking is confirmed, it cannot be cancelled, rescheduled
                                    or refunded under any circumstances.
                                </p>
                                <p>
                                    By completing a booking and making payment, you acknowledge and agree to the following:
                                </p>
                                <ul className="space-y-3 font-medium list-disc pl-5">
                                    <li>
                                        <strong>No Refunds:</strong> All payments are non-refundable. No refunds will be issued
                                        for any reason, including but not limited to: change of mind, scheduling conflicts,
                                        illness, inability to attend, or dissatisfaction.
                                    </li>
                                    <li>
                                        <strong>No Cancellations:</strong> Once a booking is confirmed and payment is processed,
                                        the booking cannot be cancelled. You are committed to attending the booked service at
                                        the selected date and time.
                                    </li>
                                    <li>
                                        <strong>No Rescheduling:</strong> Bookings cannot be rescheduled or transferred to
                                        another date, time or person.
                                    </li>
                                    <li>
                                        <strong>No-Show Policy:</strong> If you fail to attend your booked service without prior
                                        notice, the full fee is forfeited and no credit or make-up session will be offered.
                                    </li>
                                    <li>
                                        <strong>Late Arrivals:</strong> If you arrive late, the session will still end at the
                                        originally scheduled time. No extension or refund will be provided for lost time.
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-4">
                                    We strongly encourage you to confirm your availability before completing your booking.
                                    Please ensure the selected date and time are suitable before proceeding with payment.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">4. Booking &amp; Payment</h2>
                        <ul className="text-gray-500 space-y-2">
                            <li>Bookings must be made at least 24 hours in advance</li>
                            <li>Payment is required at the time of booking to confirm your reservation</li>
                            <li>We accept credit/debit card payments via our secure online payment system</li>
                            <li>For NDIS participants, invoicing arrangements will be made according to your plan management type</li>
                            <li>Prices are subject to change without notice; however, confirmed bookings will be honoured at the price paid</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">5. Driving Lessons</h2>
                        <ul className="text-gray-500 space-y-2">
                            <li>Learner drivers must hold a valid NSW Learner's Permit at the time of the lesson</li>
                            <li>Learner drivers under 25 must have completed the required log book hours as per NSW regulations</li>
                            <li>Students must bring their learner's permit to every lesson</li>
                            <li>Our instructor reserves the right to terminate a lesson if the student is deemed unfit to drive (e.g., under the influence of drugs or alcohol)</li>
                            <li>Lessons are conducted in our dual-control automatic transmission vehicles</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">6. Driving Test Package</h2>
                        <ul className="text-gray-500 space-y-2">
                            <li>The $220 Driving Test Package includes pick-up from your location, a pre-test warm-up session, use of the instructor's vehicle for the driving test, and drop-off after results</li>
                            <li>The test booking with Service NSW must be arranged by the student independently</li>
                            <li>The no-refund and no-cancellation policy applies in full to test packages</li>
                            <li>If the test is cancelled by Service NSW, a rescheduled session may be arranged at our discretion</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">7. NDIS Services</h2>
                        <ul className="text-gray-500 space-y-2">
                            <li>NDIS services are provided in accordance with your NDIS plan and service agreement</li>
                            <li>Participants must provide their NDIS participant number at the time of booking</li>
                            <li>Service delivery is subject to NDIS Practice Standards and Quality Indicators</li>
                            <li>Cancellation of NDIS services follows NDIS Price Guide terms, which may differ from our standard policy</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">8. Liability</h2>
                        <ul className="text-gray-500 space-y-2">
                            <li>Marvel Driving and Transport carries appropriate insurance for driving instruction and transport services</li>
                            <li>We are not liable for any traffic infringements incurred by the learner during lessons</li>
                            <li>We are not responsible for the outcome of any driving test</li>
                            <li>Our liability is limited to the maximum extent permitted by Australian Consumer Law</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">9. Intellectual Property</h2>
                        <p className="text-gray-500">
                            All content on our website, including text, images, logos and design, is the property of
                            Marvel Driving and Transport Pty Ltd and is protected by Australian copyright law.
                            Reproduction without written permission is prohibited.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">10. Changes to Terms</h2>
                        <p className="text-gray-500">
                            We reserve the right to update these Terms at any time. Changes will be posted on this page
                            with an updated "Last Updated" date. Continued use of our services constitutes acceptance
                            of updated Terms.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">11. Governing Law</h2>
                        <p className="text-gray-500">
                            These Terms are governed by the laws of New South Wales, Australia. Any disputes will be
                            subject to the jurisdiction of NSW courts.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-10">12. Contact Us</h2>
                        <p className="text-gray-500">
                            If you have any questions about these Terms, please contact us:
                        </p>
                        <div className="not-prose bg-gray-50 rounded-xl p-6 mt-4 space-y-3">
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
