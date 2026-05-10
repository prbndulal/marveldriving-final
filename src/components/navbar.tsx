"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";

const logo = "/logo.png";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
    { href: "/automatic-lessons", label: "Automatic Lessons" },
    { href: "/ndis-services", label: "NDIS Services" },
    { href: "/dkt", label: "DKT - Driver Knowledge Test" },
    { href: "https://www.service.nsw.gov.au/transaction/book-a-driver-or-rider-licence-test", label: "Online Test Booking", external: true },
    { href: "/careers", label: "Careers" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const user = session?.user;
    const isAdmin = (user as any)?.role === 'admin';
    const isLoading = status === 'loading';

    // Is active logic
    const isServiceActive = serviceLinks.some(link => pathname === link.href);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-border">
            {/* Mobile Header - Hamburger | Logo | Phone */}
            <div className="lg:hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                    {/* Hamburger Menu */}
                    <button
                        className="p-2 rounded-lg text-[#1B7640] hover:bg-[#1B7640]/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X className="h-7 w-7 text-[#1B7640]" /> : <Menu className="h-7 w-7 text-[#1B7640]" />}
                    </button>

                    {/* Centered Logo */}
                    <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                        <img src={logo} alt="Marvel Driving Logo" className="h-20 w-auto object-contain" />
                    </Link>

                    {/* Phone Icon */}
                    <a
                        href="tel:0431306570"
                        className="p-2 rounded-lg text-[#1B7640] hover:bg-[#1B7640]/10 transition-colors"
                        aria-label="Call us"
                    >
                        <Phone className="h-7 w-7 text-[#1B7640] fill-[#1B7640]/20" />
                    </a>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop overlay to prevent background interaction */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 top-[76px] bg-black/50 z-40"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative z-50 overflow-hidden bg-white max-h-[calc(100vh-76px)] overflow-y-auto border-t border-gray-100"
                            >
                                {/* Quick Action Buttons */}
                                <div className="px-4 pt-4 pb-2 space-y-2">
                                    <Button asChild className="w-full text-base py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                                        <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                                            Book Driving Lesson
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild className="w-full text-base py-3 border-[#1B7640] text-[#1B7640] hover:bg-[#1B7640] hover:text-white">
                                        <Link href="/ndis-services" onClick={() => setIsMobileMenuOpen(false)}>
                                            NDIS Services
                                        </Link>
                                    </Button>
                                </div>

                                <div className="border-t border-border mx-4 my-2" />

                                <ul className="py-2 px-4 space-y-1">
                                    {/* Home */}
                                    <li>
                                        <Link
                                            href="/"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === "/"
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    {/* About Us */}
                                    <li>
                                        <Link
                                            href="/about"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === "/about"
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    {/* Our Services Dropdown - positioned after About Us */}
                                    <li>
                                        <button
                                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${isServiceActive
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span>Our Services</span>
                                            <ChevronDown className={`h-5 w-5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isServicesOpen && (
                                                <motion.ul
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-2"
                                                >
                                                    {serviceLinks.map((link) => (
                                                        <li key={link.href}>
                                                            {link.external ? (
                                                                <a
                                                                    href={link.href}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={() => {
                                                                        setIsMobileMenuOpen(false);
                                                                        setIsServicesOpen(false);
                                                                    }}
                                                                    className="block px-4 py-2 rounded-lg font-medium transition-all text-gray-700 hover:bg-gray-50 text-sm"
                                                                >
                                                                    {link.label}
                                                                </a>
                                                            ) : (
                                                                <Link
                                                                    href={link.href}
                                                                    onClick={() => {
                                                                        setIsMobileMenuOpen(false);
                                                                        setIsServicesOpen(false);
                                                                    }}
                                                                    className={`block px-4 py-2 rounded-lg font-medium transition-all text-sm ${pathname === link.href
                                                                            ? "bg-[#1B7640]/10 text-[#1B7640] font-bold"
                                                                            : "text-gray-800 hover:bg-gray-50"
                                                                        }`}
                                                                >
                                                                    {link.label}
                                                                </Link>
                                                            )}
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                    {/* Gallery */}
                                    <li>
                                        <Link
                                            href="/gallery"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === "/gallery"
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            Gallery
                                        </Link>
                                    </li>
                                    {/* Blog */}
                                    <li>
                                        <Link
                                            href="/blog"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === "/blog"
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    {/* FAQ */}
                                    <li>
                                        <Link
                                            href="/faq"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === "/faq"
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            FAQ
                                        </Link>
                                    </li>
                                    {/* Contact Us */}
                                    <li>
                                        <Link
                                            href="/contact"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all ${pathname === "/contact"
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-800 hover:bg-gray-50"
                                                }`}
                                        >
                                            Contact Us
                                        </Link>
                                    </li>

                                    <div className="pt-4 pb-8 space-y-2">
                                        {/* Auth Buttons */}
                                        {!isLoading && (
                                            <>
                                                {user ? (
                                                    <>
                                                        {isAdmin && (
                                                            <li>
                                                                <Link
                                                                    href="/admin"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="block px-4 py-3 rounded-lg font-medium transition-all text-[#1B7640] hover:bg-secondary"
                                                                >
                                                                    Admin Dashboard
                                                                </Link>
                                                            </li>
                                                        )}
                                                        <li className="pt-2">
                                                            <Button
                                                                variant="outline"
                                                                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground justify-start px-4"
                                                                onClick={() => {
                                                                    handleSignOut();
                                                                    setIsMobileMenuOpen(false);
                                                                }}
                                                            >
                                                                <LogOut className="h-4 w-4 mr-2" />
                                                                Sign Out
                                                            </Button>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <li className="">
                                                        <Button variant="outline" asChild className="w-full justify-center border-green-700 text-green-700 h-12 text-base font-bold">
                                                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                                                Sign In
                                                            </Link>
                                                        </Button>
                                                    </li>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </ul>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block">
                {/* Top bar */}
                <div className="bg-[#1B7640] text-white py-2">
                    <div className="container px-4 flex justify-between items-center text-sm font-medium">
                        <div className="flex items-center gap-6">
                            <a href="tel:0431306570" className="flex items-center gap-2 hover:text-[#fbbf24] transition-colors">
                                <Phone className="h-4 w-4" />
                                <span>0431 306 570</span>
                            </a>
                        </div>
                        <p className="text-[#fbbf24] font-semibold tracking-wide text-xs lg:text-sm">Empowering Independence through Safe & Supportive Services</p>
                    </div>
                </div>

                {/* Main nav */}
                <nav className="bg-white border-b">
                    <div className="container px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <img src={logo} alt="Marvel Driving Logo" className="h-24 w-auto object-contain" />
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${pathname === link.href
                                                ? "bg-[#1B7640] text-white"
                                                : "text-gray-700 hover:bg-[#f8fafc] hover:text-[#1B7640]"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            {/* Our Services Dropdown */}
                            <li>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isServiceActive
                                                    ? "bg-[#1B7640] text-white"
                                                    : "text-gray-700 hover:bg-[#f8fafc] hover:text-[#1B7640]"
                                                }`}
                                        >
                                            Our Services
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-100 z-50">
                                        {serviceLinks.map((link) => (
                                            <DropdownMenuItem key={link.href} asChild>
                                                {link.external ? (
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full cursor-pointer"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        className={`w-full cursor-pointer ${pathname === link.href
                                                                ? "bg-[#1B7640]/10 text-[#1B7640] font-semibold"
                                                                : ""
                                                            }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>

                        {/* Auth & CTA Buttons */}
                        <div className="flex items-center gap-3">
                            {!isLoading && (
                                <>
                                    {user ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <User className="h-4 w-4" />
                                                    Account
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-white z-50">
                                                {isAdmin && (
                                                    <>
                                                        <DropdownMenuItem asChild>
                                                            <Link href="/admin" className="w-full cursor-pointer">
                                                                <Settings className="h-4 w-4 mr-2" />
                                                                Admin Dashboard
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                    </>
                                                )}
                                                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                                                    <LogOut className="h-4 w-4 mr-2" />
                                                    Sign Out
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href="/login">Sign In</Link>
                                        </Button>
                                    )}
                                </>
                            )}
                            <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-6 rounded-lg shadow-md" asChild>
                                <Link href="/book">Book Online</Link>
                            </Button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
