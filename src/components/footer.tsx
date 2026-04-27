"use client";

import { ComponentType } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Clock, LucideIcon } from "lucide-react";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { ScrollLink } from "@/components/ScrollLink";

const logo = "/logo.png";
const ndisRegistered = "/ndis-logo.png";

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

interface SocialLink {
    href: string;
    icon: LucideIcon | ComponentType<{ className?: string }>;
    label: string;
}

const quickLinks = [
    { href: "/automatic-lessons", label: "Driving Lessons" },
    { href: "/ndis-services", label: "NDIS Services" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
];

const services = [
    { href: "/automatic-lessons", label: "Automatic Driving Lessons" },
    { href: "/ndis-services", label: "Transport Services" },
    { href: "/ndis-services", label: "Daily Living Support" },
    { href: "/ndis-services", label: "Community Participation" },
    { href: "/book", label: "Book Online" },
];

const socialLinks: (SocialLink & { color: string })[] = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook", color: "hover:bg-[#1877F2] text-[#1877F2] hover:text-white" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram", color: "hover:bg-[#E4405F] text-[#E4405F] hover:text-white" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", color: "hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube", color: "hover:bg-[#FF0000] text-[#FF0000] hover:text-white" },
    { href: "https://tiktok.com/@marveldriving", icon: TikTokIcon, label: "TikTok", color: "hover:bg-[#000000] text-[#000000] hover:text-white" },
];

export function Footer() {
    return (
        <>
            {/* Elegant divider above footer */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1B7640]/20"></div>
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-white px-6">
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#1B7640] to-transparent rounded-full"></div>
                    </div>
                </div>
            </div>

            <footer className="bg-[#f0f4f0] text-[#1B7640]">
                <div className="container px-4 sm:px-6 py-12 lg:py-16">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">

                        {/* Brand Column */}
                        <div className="sm:col-span-2 lg:col-span-1 space-y-4">
                            <div className="flex items-center gap-4">
                                <img src={logo} alt="Marvel Driving and Transport" className="h-20 w-auto object-contain" />
                                <img src={ndisRegistered} alt="NDIS Registered Provider" className="h-16 w-auto object-contain" />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Marvel Driving and Transport Pty Ltd — Empowering Independence through safe,
                                professional and supportive transport and driving services.
                            </p>
                            <p className="text-[#1B7640]/80 text-sm italic">"Choice, Control, Community"</p>

                            {/* Follow Us */}
                            <div className="pt-3">
                                <p className="font-semibold text-[#1B7640] text-xs uppercase tracking-wider mb-2">Follow Us</p>
                                <div className="flex gap-2.5">
                                    {socialLinks.map(social => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-2 bg-[#1B7640]/10 rounded-full transition-colors ${social.color}`}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-4 w-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="pt-4">
                                <p className="font-semibold text-[#1B7640] text-xs uppercase tracking-wider mb-2">Stay Updated</p>
                                <NewsletterForm />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-bold text-base mb-4 text-[#1B7640]">Quick Links</h3>
                            <ul className="space-y-2.5">
                                {quickLinks.map(link => (
                                    <li key={link.href + link.label}>
                                        <ScrollLink href={link.href} className="inline-block text-sm text-gray-500 px-2 py-1 rounded-md transition-colors duration-200 hover:text-[#1B7640]">
                                            {link.label}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="font-bold text-base mb-4 text-[#1B7640]">Our Services</h3>
                            <ul className="space-y-2.5">
                                {services.map((link, index) => (
                                    <li key={link.href + index}>
                                        <ScrollLink href={link.href} className="inline-block text-sm text-gray-500 px-2 py-1 rounded-md transition-colors duration-200 hover:text-[#1B7640]">
                                            {link.label}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Hours */}
                        <div>
                            <h3 className="font-bold text-base mb-4 text-[#1B7640]">Contact Us</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="tel:0431306570" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#1B7640] transition-colors">
                                        <Phone className="h-4 w-4 shrink-0 text-[#1B7640]" />
                                        <span>0431 306 570</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@marveldriving.com.au" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#1B7640] transition-colors">
                                        <Mail className="h-4 w-4 shrink-0 text-[#1B7640]" />
                                        <span className="break-all">info@marveldriving.com.au</span>
                                    </a>
                                </li>
                                <li className="flex items-start gap-2.5 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#1B7640]" />
                                    <div>
                                        <p>Head Office: Penshurst, NSW 2222</p>
                                        <p className="text-xs mt-0.5 text-gray-400">Services available in Sydney</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2.5 text-sm text-gray-500">
                                    <Clock className="h-4 w-4 shrink-0 mt-0.5 text-[#1B7640]" />
                                    <div>
                                        <p className="font-medium">Mon - Sun: 8:00 AM - 4:00 PM</p>
                                        <p className="text-xs mt-1 text-gray-400">ABN: 65 661 258 591</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* We Accept */}
                    <div className="mt-10 pt-8 border-t border-[#1B7640]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="font-semibold text-[#1B7640] text-xs uppercase tracking-wider">We Accept</p>
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            <div className="bg-white rounded px-2.5 py-1.5 shadow-sm border border-gray-100">
                                <svg viewBox="0 0 48 16" className="h-4 w-auto" fill="none">
                                    <path d="M19.2 1.6L15.6 14.4H12.4L16 1.6H19.2ZM34.4 9.6L36 5.2L36.8 9.6H34.4ZM37.6 14.4H40.4L38 1.6H35.2C34.4 1.6 33.8 2 33.6 2.8L28.8 14.4H32L32.6 12.4H36.4L36.8 14.4H37.6ZM28.8 10C28.8 6.4 24 6.2 24 4.4C24 3.8 24.4 3.2 25.6 3C26.2 2.8 27.6 2.8 29.2 3.6L29.8 1.8C29 1.4 27.8 1.2 26.4 1.2C23.4 1.2 21.2 2.8 21.2 5C21.2 6.6 22.6 7.4 23.6 8C24.8 8.6 25.2 9 25.2 9.6C25.2 10.4 24.2 10.8 23.4 10.8C21.8 10.8 20.8 10.4 20 9.8L19.4 11.8C20.2 12.2 21.6 12.6 23 12.6C26.2 12.6 28.8 11.2 28.8 10ZM14 1.6L9 14.4H5.8L3.4 3.8C3.2 3 3 2.8 2.4 2.4C1.4 1.8 0 1.4 0 1.4L0.2 1.2H5.2C6 1.2 6.6 1.8 6.8 2.6L8 9.6L11 1.6H14Z" fill="#1A1F71" />
                                </svg>
                            </div>
                            <div className="bg-white rounded px-2.5 py-1.5 shadow-sm border border-gray-100">
                                <svg viewBox="0 0 40 24" className="h-4 w-auto" fill="none">
                                    <circle cx="15" cy="12" r="9" fill="#EB001B" />
                                    <circle cx="25" cy="12" r="9" fill="#F79E1B" />
                                    <path d="M20 5.3A9 9 0 0 1 23.5 12 9 9 0 0 1 20 18.7 9 9 0 0 1 16.5 12 9 9 0 0 1 20 5.3Z" fill="#FF5F00" />
                                </svg>
                            </div>
                            <div className="bg-white rounded px-2.5 py-1.5 shadow-sm border border-gray-100">
                                <svg viewBox="0 0 50 20" className="h-4 w-auto" fill="none">
                                    <path d="M9.2 2.6C8.6 3.4 7.6 4 6.8 3.9C6.7 3 7.1 2.1 7.6 1.4C8.2 0.6 9.2 0.1 10 0C10.1 1 9.7 1.9 9.2 2.6ZM10 4.2C8.8 4.1 7.8 4.9 7.2 4.9C6.6 4.9 5.8 4.2 4.8 4.2C3.4 4.3 2.2 5 1.4 6.2C-0.2 8.6 1 12.2 2.6 14.2C3.4 15.2 4.2 16.2 5.4 16.2C6.4 16.2 6.8 15.6 8 15.6C9.2 15.6 9.6 16.2 10.6 16.2C11.8 16.2 12.6 15.2 13.2 14.2C13.8 13.4 14.2 12.6 14.4 12.2C14.4 12.2 12.2 11.2 12.2 8.8C12.2 6.6 13.8 5.6 14 5.4C12.8 3.8 11 4.2 10 4.2Z" fill="black" />
                                    <path d="M20 3.2C23 3.2 25.2 5.4 25.2 8.4C25.2 11.4 23 13.6 19.8 13.6H17.4V17.8H15V3.2H20ZM17.4 11.6H19.4C21.4 11.6 22.6 10.4 22.6 8.4C22.6 6.4 21.4 5.2 19.4 5.2H17.4V11.6Z" fill="black" />
                                    <path d="M26.2 14C26.2 12.2 27.6 11.2 30 11L32.6 10.8V10C32.6 8.8 31.8 8.2 30.6 8.2C29.4 8.2 28.6 8.8 28.4 9.8H26.2C26.4 7.8 28 6.4 30.6 6.4C33.2 6.4 34.8 7.8 34.8 10V17.8H32.8V16C32.2 17.2 30.8 18 29.4 18C27.6 18 26.2 16.8 26.2 14ZM32.6 13.2V12.4L30.4 12.6C29 12.8 28.4 13.2 28.4 14C28.4 14.8 29 15.4 30 15.4C31.4 15.4 32.6 14.4 32.6 13.2Z" fill="black" />
                                    <path d="M37 21.2V19.4C37.2 19.4 37.6 19.4 37.8 19.4C38.8 19.4 39.4 19 39.8 17.8L40 17.4L36.2 6.6H38.8L41.2 14.8L43.6 6.6H46L42 18C41 20.4 40 21.2 38 21.2C37.8 21.2 37.2 21.2 37 21.2Z" fill="black" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#1B7640]/10 bg-[#e8ede8]">
                    <div className="container px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
                        <p className="text-center sm:text-left">
                            © {new Date().getFullYear()} Marvel Driving and Transport Pty Ltd. All rights reserved. *Terms & Conditions apply.
                        </p>
                        <div className="flex gap-2">
                            <ScrollLink href="/privacy" className="px-2 py-1 rounded-md transition-colors duration-200 hover:text-[#1B7640]">
                                Privacy Policy
                            </ScrollLink>
                            <ScrollLink href="/terms" className="px-2 py-1 rounded-md transition-colors duration-200 hover:text-[#1B7640]">
                                Terms & Conditions
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
