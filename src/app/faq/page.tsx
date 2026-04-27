"use client";

import { motion } from "framer-motion";
import { HelpCircle, Car, Accessibility, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
    {
        title: "Driving Lessons",
        icon: Car,
        questions: [
            {
                question: "What types of driving lessons do you offer?",
                answer: "We offer automatic transmission driving lessons only. Our lessons are tailored for beginners and learners of all abilities, including those with physical, intellectual, psychosocial and developmental disabilities."
            },
            {
                question: "How much do driving lessons cost?",
                answer: "Our beginner automatic driving lessons are priced at $65 per hour. We believe in transparent, affordable pricing with no hidden fees."
            },
            {
                question: "Do you offer manual transmission lessons?",
                answer: "No, we exclusively offer automatic transmission lessons. This allows us to focus on providing the best learning experience for automatic vehicle drivers."
            },
            {
                question: "How do I book a driving lesson?",
                answer: "You can book a driving lesson through our online booking system, by calling us, or by filling out the contact form on our website. We'll get back to you promptly to confirm your booking."
            },
            {
                question: "What areas do you service for driving lessons?",
                answer: "We provide driving lessons in Penshurst, Hurstville, Bexley and surrounding areas in Sydney NSW."
            }
        ]
    },
    {
        title: "NDIS Services",
        icon: Accessibility,
        questions: [
            {
                question: "What NDIS services do you provide?",
                answer: "We provide a range of NDIS services including driving lessons and support, transport services, daily living support, and community and social participation support. We are registered under multiple NDIS support categories."
            },
            {
                question: "What NDIS registration groups are you registered under?",
                answer: "We are registered under: 0107 (Assist Personal Activities), 0108 (Assist Travel/Transport), 0115 (Daily Tasks/Shared Living), 0116 (Innovative Community Participation), 0117 (Development Life Skills), 0120 (Household Tasks), 0125 (Participate Community), and 0136 (Group/Centre Activities)."
            },
            {
                question: "Can I use my NDIS funding for your services?",
                answer: "Yes! If you're an NDIS participant with relevant funding in your plan, you're eligible for our services. We work with all plan types: self-managed, plan-managed, and NDIA-managed."
            },
            {
                question: "How do I access your NDIS services?",
                answer: "Simply contact us to discuss your needs and goals. We'll work with you, your support coordinator, and family to create a tailored service agreement. Then you can book your services at times that suit you."
            },
            {
                question: "Do you provide transport to medical appointments?",
                answer: "Yes, we provide safe and reliable transport to medical appointments, therapies, school, work, community activities and social events. Our supportive staff assist throughout the journey."
            }
        ]
    },
    {
        title: "Booking & Scheduling",
        icon: Calendar,
        questions: [
            {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 48 hours in advance to ensure availability, especially for preferred time slots. However, we try to accommodate last-minute requests when possible."
            },
            {
                question: "Can I reschedule or cancel my booking?",
                answer: "Yes, you can reschedule or cancel your booking. We ask for at least 24 hours notice for cancellations. Please contact us as soon as possible if you need to make changes."
            },
            {
                question: "What are your operating hours?",
                answer: "We operate Monday to Saturday. Specific hours may vary, so please contact us for current availability or check our booking system."
            },
            {
                question: "Do you offer weekend lessons?",
                answer: "Yes, we offer Saturday lessons to accommodate busy schedules. These slots are popular, so we recommend booking early."
            }
        ]
    },
    {
        title: "Payment & Pricing",
        icon: CreditCard,
        questions: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods including bank transfer, credit/debit cards, and NDIS invoicing for eligible participants. Payment details will be confirmed at the time of booking."
            },
            {
                question: "Do you offer package deals?",
                answer: "Currently, we offer lessons at our standard rate of $65 per hour for automatic driving lessons. Contact us to discuss your needs and we can work out the best arrangement for you."
            },
            {
                question: "How does NDIS billing work?",
                answer: "For NDIS participants, we invoice according to your plan management type. For plan-managed participants, we invoice your plan manager directly. For self-managed participants, we provide invoices for you to claim. For NDIA-managed participants, we claim directly through the NDIS portal."
            }
        ]
    }
];

export default function FAQ() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="FAQ"
                titleStart="Frequently Asked"
                titleAccent="Questions"
                description="Find answers to common questions about our driving lessons, NDIS services, booking process and more. Can't find what you're looking for? Contact us!"
                bannerImage="/faq.jpg"
            />

            {/* FAQ Categories */}
            <section className="py-20">
                <div className="container px-4 md:px-8">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {faqCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-[#1B7640] rounded-xl shadow-lg">
                                        <category.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#0d4a28]">{category.title}</h2>
                                </div>

                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.questions.map((faq, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`${category.title}-${index}`}
                                                className="border-b border-gray-100 last:border-b-0"
                                            >
                                                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-[#f8fafc] transition-colors">
                                                    <span className="font-semibold pr-4 text-[#0d4a28]">{faq.question}</span>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-4 text-gray-500 leading-relaxed">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions CTA */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto p-12 bg-white rounded-2xl shadow-xl border border-gray-100"
                    >
                        <HelpCircle className="h-12 w-12 text-[#1B7640] mx-auto mb-4" />
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0d4a28]">
                            Still Have Questions?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Can't find the answer you're looking for? Our friendly team is here to help.
                            Get in touch and we'll get back to you as soon as possible.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-8" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="border-[#1B7640] text-[#1B7640] hover:bg-[#1B7640] hover:text-white font-bold h-12 px-8" asChild>
                                <Link href="/book">Book a Service</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
