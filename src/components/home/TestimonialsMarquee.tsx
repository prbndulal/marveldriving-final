"use client";
import { Star, CheckCircle } from "lucide-react";

// Real avatars or placeholders
const testimonials = [
    {
        name: "Sarah M.",
        role: "NDIS Participant",
        text: "Marvel Driving helped me gain my independence. The instructor was patient and explained everything clearly.",
        rating: 5,
        initial: "S",
        bg: "bg-green-100 text-green-600"
    },
    {
        name: "James T.",
        role: "NDIS Participant",
        text: "The transport service has given me so much more independence and freedom to attend my community activities.",
        rating: 5,
        initial: "J",
        bg: "bg-blue-100 text-blue-600"
    },
    {
        name: "Michelle K.",
        role: "Support Coordinator",
        text: "Highly recommend for NDIS participants. Professional, reliable and excellent communication with coordinators.",
        rating: 5,
        initial: "M",
        bg: "bg-purple-100 text-purple-600"
    },
    {
        name: "Priya S.",
        role: "NDIS Participant",
        text: "The community participation support has helped me make new friends and become more active in local activities.",
        rating: 5,
        initial: "P",
        bg: "bg-red-100 text-red-600"
    },
    {
        name: "Tom B.",
        role: "Learner Driver",
        text: "Passed my driving test on the first attempt thanks to Marvel. Great experience and very calm environment.",
        rating: 5,
        initial: "T",
        bg: "bg-yellow-100 text-yellow-600"
    },
    {
        name: "Fatima A.",
        role: "NDIS Participant",
        text: "As a new migrant, Marvel made me feel welcome and safe. They really care about their participants' wellbeing.",
        rating: 5,
        initial: "F",
        bg: "bg-emerald-100 text-emerald-600"
    }
];

export function TestimonialsMarquee() {
    return (
        <section className="py-24 bg-[#f8fafc] overflow-hidden">
            <div className="container px-4 md:px-8 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d4a28] mb-3">What Our Participants Say</h2>
                <p className="text-gray-500 text-base">Don't just take our word for it. Here's what our valued participants have to say.</p>
            </div>

            <div className="relative">
                <div className="flex animate-marquee gap-8 px-4 py-8">
                    {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
                        <div
                            key={i}
                            className="w-[400px] shrink-0 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {/* Avatar Placeholder */}
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${testimonial.bg}`}>
                                    {testimonial.initial}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                        <CheckCircle className="h-4 w-4 text-[#1B7640] fill-green-100" />
                                    </div>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" />
                                ))}
                            </div>

                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {testimonial.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Gradients for smooth fade */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
}
