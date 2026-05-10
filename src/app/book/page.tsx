"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Calendar as CalendarIcon,
    Car,
    CreditCard,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    User,
    MapPin,
    Loader2,
    Clock,
    Shield,
    Phone,
    Mail,
    Sparkles,
    FileCheck
} from "lucide-react";
import { addDays, format, isBefore, startOfDay, parse } from "date-fns";
import { useAvailability } from "@/hooks/useAvailability";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ServiceAreaBanner } from "@/components/ServiceAreaBanner";
import { PageHero } from "@/components/PageHero";
import { useToast } from "@/hooks/use-toast";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const serviceTypes = [
    {
        value: "beginner",
        label: "Regular Driving Lesson",
        description: "1-hour automatic lesson with experienced instructor",
        price: "$65/hour",
        isPaid: true,
        icon: Car
    },
    {
        value: "test-package",
        label: "Driving Test Package",
        description: "1hr pickup, 45min warm-up, use of instructor's vehicle for test",
        price: "$220",
        isPaid: true,
        icon: FileCheck
    },
    {
        value: "ndis-lesson",
        label: "NDIS Driving Lesson",
        description: "Specialised lesson for NDIS participants",
        price: "NDIS Funded",
        isPaid: false,
        icon: Shield
    },
    {
        value: "ndis-transport",
        label: "NDIS Transport Service",
        description: "Safe, reliable transport assistance",
        price: "NDIS Funded",
        isPaid: false,
        icon: MapPin
    },
];

const stepInfoDefault = [
    { num: 1, label: "Service", icon: Car },
    { num: 2, label: "Schedule", icon: CalendarIcon },
    { num: 3, label: "Details", icon: User },
    { num: 4, label: "Confirm", icon: CheckCircle },
];

const stepInfoTestPackage = [
    { num: 1, label: "Service", icon: Car },
    { num: 2, label: "Details", icon: User },
    { num: 3, label: "Checkout", icon: CreditCard },
];

function BookingContent() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState("");


    const minBookingDate = startOfDay(addDays(new Date(), 1));
    const [formData, setFormData] = useState({
        serviceType: "",
        lessonDate: null as Date | null,
        lessonTime: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        suburb: "",
        licenseType: "",
        ndisNumber: "",
        experience: "",
        notes: "",
        termsAccepted: false,
    });

    useEffect(() => {
        const type = searchParams.get("type");
        if (type && serviceTypes.find(s => s.value === type)) {
            setFormData(prev => ({ ...prev, serviceType: type }));
        }
    }, [searchParams]);

    useEffect(() => {
        const status = searchParams.get("status");
        if (status === "success") {
            setStep(5);
            toast({
                title: "Payment Successful!",
                description: "Your booking has been confirmed. Check your email for details.",
            });
        } else if (status === "cancelled") {
            const bookingId = searchParams.get("booking_id");
            if (bookingId) {
                fetch("/api/bookings/cancel", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ bookingId }),
                });
            }
            toast({
                title: "Payment Cancelled",
                description: "Your payment was cancelled. Please try again.",
                variant: "destructive",
            });
        }
    }, [searchParams, toast]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.lessonDate) {
            if (isBefore(formData.lessonDate, minBookingDate)) {
                toast({
                    title: "Invalid date",
                    description: "Bookings must be at least 24 hours in advance.",
                    variant: "destructive",
                });
                return;
            }
        }

        if (!validateEmail(formData.email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        const dateStr = formData.lessonDate ? format(formData.lessonDate, "yyyy-MM-dd") : "";
        const selectedService = serviceTypes.find(s => s.value === formData.serviceType);

        if (selectedService?.isPaid) {
            try {
                // Now directly call Stripe Checkout, handle creation on the API side
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email,
                        customerPhone: formData.phone,
                        serviceName: selectedService.label,
                        price: selectedService.price,
                        date: dateStr,
                        time: formData.lessonTime
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to process booking.");
                }

                if (result.url) {
                    window.location.assign(result.url);
                } else {
                    throw new Error('Failed to create checkout session');
                }

            } catch (error: any) {
                console.error('Payment Error:', error);
                toast({
                    title: "Booking Error",
                    description: error.message || "There was an error processing your payment.",
                    variant: "destructive",
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // NDIS Booking
            try {
                const response = await fetch('/api/bookings/unpaid', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email,
                        customerPhone: formData.phone,
                        serviceName: selectedService?.label,
                        date: dateStr,
                        time: formData.lessonTime,
                        ndisNumber: formData.ndisNumber,
                        suburb: formData.suburb,
                        notes: `Experience: ${formData.experience}\n${formData.notes}`
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to submit booking.");
                }

                toast({
                    title: "Booking Request Submitted!",
                    description: "We'll confirm your booking within 24 hours. Check your email for details.",
                });

                setStep(5);
            } catch (error: any) {
                console.error('Booking error:', error);
                toast({
                    title: "Booking Error",
                    description: error.message || "There was an error submitting your booking.",
                    variant: "destructive",
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const isTestPackage = formData.serviceType === "test-package";
    const isNDISService = formData.serviceType === "ndis-lesson" || formData.serviceType === "ndis-transport";
    const isPaidService = serviceTypes.find(s => s.value === formData.serviceType)?.isPaid;
    const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
    const currentStepInfo = isTestPackage ? stepInfoTestPackage : stepInfoDefault;

    const { slots: availableSlots, loading: slotsLoading } = useAvailability(formData.lessonDate);

    return (
        <div className="bg-background min-h-screen">
            <ServiceAreaBanner />

            <PageHero
                badge="Easy Online Booking"
                titleStart="Book Your"
                titleAccent="Lesson"
                description="Start your journey to independence with Marvel Driving. Secure booking, professional instructors, guaranteed satisfaction."
                bannerImage="/hero-dashboard.jpg"
                imageAlt="Book a driving lesson with Marvel Driving"
            />

            <section className="py-4 bg-yellow-50 border-y border-yellow-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 text-center text-yellow-800">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm md:text-base font-medium">
                            All lessons are conducted in <strong>automatic transmission vehicles</strong> only
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-10 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center gap-2 md:gap-4 max-w-2xl mx-auto">
                        {currentStepInfo.map((s, i) => {
                            const Icon = s.icon;
                            const isActive = step === s.num;
                            const isCompleted = step > s.num;

                            return (
                                <div key={s.num} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={cn(
                                                "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                                                isCompleted
                                                    ? "bg-[#1B7640] text-white shadow-lg"
                                                    : isActive
                                                        ? "bg-[#1B7640] text-white ring-4 ring-[#1B7640]/20"
                                                        : "bg-gray-100 text-gray-400"
                                            )}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
                                            ) : (
                                                <Icon className="h-4 w-4 md:h-5 md:w-5" />
                                            )}
                                        </div>
                                        <span className={cn(
                                            "mt-2 text-xs md:text-sm font-medium hidden sm:block",
                                            isActive || isCompleted ? "text-[#1B7640]" : "text-gray-400"
                                        )}>
                                            {s.label}
                                        </span>
                                    </div>
                                    {i < currentStepInfo.length - 1 && (
                                        <div className={cn(
                                            "w-8 md:w-16 h-1 mx-2 md:mx-3 rounded-full transition-colors",
                                            step > s.num ? "bg-[#1B7640]" : "bg-gray-200"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className={cn("mx-auto", isTestPackage && step === 3 ? "max-w-5xl" : "max-w-2xl")}>
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100"
                        >
                            {step === 1 && (
                                <div>
                                    <div className="text-center mb-8">
                                        <div className="w-14 h-14 bg-[#1B7640]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Car className="h-7 w-7 text-[#1B7640]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Select Your Service</h2>
                                        <p className="text-gray-500">
                                            Choose the lesson or service that best fits your needs
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {serviceTypes.map((service) => {
                                            const ServiceIcon = service.icon;
                                            const isSelected = formData.serviceType === service.value;

                                            return (
                                                <label
                                                    key={service.value}
                                                    className={cn(
                                                        "group flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300",
                                                        isSelected
                                                            ? "border-[#1B7640] bg-[#1B7640]/5 shadow-md"
                                                            : "border-gray-100 hover:border-[#1B7640]/40 hover:bg-gray-50"
                                                    )}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="serviceType"
                                                        value={service.value}
                                                        checked={isSelected}
                                                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                                        className="sr-only"
                                                    />
                                                    <div className={cn(
                                                        "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                                        isSelected ? "bg-[#1B7640] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#1B7640]/10 group-hover:text-[#1B7640]"
                                                    )}>
                                                        <ServiceIcon className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{service.label}</h3>
                                                                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                                            </div>
                                                            <span className={cn(
                                                                "flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold",
                                                                service.isPaid
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-[#1B7640]/10 text-[#1B7640]"
                                                            )}>
                                                                {service.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <Button
                                            onClick={() => setStep(2)}
                                            disabled={!formData.serviceType}
                                            size="lg"
                                            className="px-8 bg-[#1B7640] hover:bg-[#153e1e]"
                                        >
                                            Continue
                                            <ChevronRight className="h-5 w-5 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && !isTestPackage && (
                                <div>
                                    <div className="text-center mb-8">
                                        <div className="w-14 h-14 bg-[#1B7640]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <CalendarIcon className="h-7 w-7 text-[#1B7640]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Date & Time</h2>
                                        <p className="text-gray-500">
                                            Select your preferred lesson date and time slot
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-base font-semibold flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-[#1B7640]" />
                                                    Lesson Date
                                                </Label>
                                                <div className="border rounded-xl p-4 bg-white shadow-sm flex justify-center">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.lessonDate || undefined}
                                                        onSelect={(date) => setFormData({ ...formData, lessonDate: date || null, lessonTime: "" })}
                                                        disabled={(date) => isBefore(date, minBookingDate)}
                                                        className="rounded-md border-0"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    Bookings require 24 hours advance notice
                                                </p>
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="lessonTime" className="text-base font-semibold flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-[#1B7640]" />
                                                    Lesson Time
                                                </Label>
                                                {slotsLoading ? (
                                                    <div className="flex items-center gap-2 h-12 px-3 border rounded-md text-gray-500">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Loading availability...
                                                    </div>
                                                ) : (
                                                    <Select
                                                        value={formData.lessonTime}
                                                        onValueChange={(value) => setFormData({ ...formData, lessonTime: value })}
                                                    >
                                                        <SelectTrigger className="h-12 text-base">
                                                            <SelectValue placeholder="Select time slot" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white">
                                                            {availableSlots.length > 0 ? (
                                                                availableSlots.map((slot) => (
                                                                    <SelectItem
                                                                        key={slot.time}
                                                                        value={slot.time}
                                                                        disabled={!slot.available}
                                                                        className={cn(
                                                                            "py-3",
                                                                            !slot.available && "opacity-50 line-through"
                                                                        )}
                                                                    >
                                                                        {slot.displayTime}{!slot.available ? " — Booked" : ""}
                                                                    </SelectItem>
                                                                ))
                                                            ) : (
                                                                <div className="p-2 text-sm text-gray-500 text-center">No slots available</div>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                                {formData.lessonDate && !slotsLoading && availableSlots.length === 0 && (
                                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        No availability set for this day.
                                                    </p>
                                                )}
                                                {formData.lessonDate && !slotsLoading && availableSlots.length > 0 && availableSlots.every(s => !s.available) && (
                                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        All time slots are booked for this date. Please choose another date.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {selectedService && (
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#1B7640]/10 rounded-lg flex items-center justify-center">
                                                        <selectedService.icon className="h-5 w-5 text-[#1B7640]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{selectedService.label}</p>
                                                        <p className="text-sm text-[#1B7640] font-medium">{selectedService.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <Button variant="outline" onClick={() => setStep(1)} size="lg">
                                            Back
                                        </Button>
                                        <Button
                                            onClick={() => setStep(3)}
                                            disabled={!formData.lessonDate || !formData.lessonTime}
                                            size="lg"
                                            className="px-8 bg-[#1B7640] hover:bg-[#153e1e]"
                                        >
                                            Continue
                                            <ChevronRight className="h-5 w-5 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {((step === 3 && !isTestPackage) || (step === 2 && isTestPackage)) && (
                                <div>
                                    <div className="text-center mb-8">
                                        <div className="w-14 h-14 bg-[#1B7640]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <User className="h-7 w-7 text-[#1B7640]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Details</h2>
                                        <p className="text-gray-500">
                                            Enter your contact information for booking confirmation
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="font-semibold">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    placeholder="John"
                                                    className="h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="font-semibold">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    placeholder="Smith"
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="font-semibold flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, email: e.target.value });
                                                        if (emailError) setEmailError("");
                                                    }}
                                                    onBlur={() => {
                                                        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                                                            setEmailError("Please enter a valid email address");
                                                        }
                                                    }}
                                                    required
                                                    placeholder="john@example.com"
                                                    className={cn("h-12", emailError && "border-red-500 focus-visible:ring-red-500")}
                                                />
                                                {emailError && (
                                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {emailError}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="font-semibold flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-gray-500" />
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                    placeholder="04XX XXX XXX"
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-[#1B7640]/5 border border-[#1B7640]/20 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-5 w-5 text-[#1B7640] flex-shrink-0" />
                                                <p className="text-sm">
                                                    <strong>Service Area:</strong> Currently servicing Penshurst, Hurstville & Bexley only
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="suburb" className="font-semibold">Pickup Suburb</Label>
                                                <Select
                                                    value={formData.suburb}
                                                    onValueChange={(value) => setFormData({ ...formData, suburb: value })}
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue placeholder="Select your suburb" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="Penshurst" className="py-3">Penshurst</SelectItem>
                                                        <SelectItem value="Hurstville" className="py-3">Hurstville</SelectItem>
                                                        <SelectItem value="Bexley" className="py-3">Bexley</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="licenseType" className="font-semibold">License Type</Label>
                                                <Select
                                                    value={formData.licenseType}
                                                    onValueChange={(value) => setFormData({ ...formData, licenseType: value })}
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue placeholder="Select license" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="learner" className="py-3">Learner Permit</SelectItem>
                                                        <SelectItem value="p1" className="py-3">P1 License</SelectItem>
                                                        <SelectItem value="p2" className="py-3">P2 License</SelectItem>
                                                        <SelectItem value="full" className="py-3">Full License</SelectItem>
                                                        <SelectItem value="overseas" className="py-3">Overseas License</SelectItem>
                                                        <SelectItem value="none" className="py-3">No License Yet</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {isNDISService && (
                                            <div className="space-y-2">
                                                <Label htmlFor="ndisNumber" className="font-semibold">NDIS Participant Number</Label>
                                                <Input
                                                    id="ndisNumber"
                                                    value={formData.ndisNumber}
                                                    onChange={(e) => setFormData({ ...formData, ndisNumber: e.target.value })}
                                                    placeholder="Your NDIS participant number"
                                                    className="h-12"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <Button variant="outline" onClick={() => setStep(isTestPackage ? 1 : 2)} size="lg">
                                            Back
                                        </Button>
                                        <Button
                                            onClick={() => setStep(isTestPackage ? 3 : 4)}
                                            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.suburb}
                                            size="lg"
                                            className="px-8 bg-[#1B7640] hover:bg-[#153e1e]"
                                        >
                                            Continue
                                            <ChevronRight className="h-5 w-5 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Shopping Cart — Test Package only (step 3) */}
                            {step === 3 && isTestPackage && (
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[#0d4a28]">Shopping Cart</h2>

                                    {/* Cart Table */}
                                    <div className="overflow-x-auto mb-8 rounded-md">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-700 text-white">
                                                    <th className="text-left px-5 py-3 text-sm font-semibold">Product</th>
                                                    <th className="text-center px-5 py-3 text-sm font-semibold">Quantity</th>
                                                    <th className="text-right px-5 py-3 text-sm font-semibold">Unit Price</th>
                                                    <th className="text-right px-5 py-3 text-sm font-semibold">GST</th>
                                                    <th className="text-right px-5 py-3 text-sm font-semibold">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-100">
                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-[#dc2626]/10 border border-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                                                                <FileCheck className="h-8 w-8 text-[#dc2626]" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-base">Driving Test Package</p>
                                                                <p className="text-xs text-gray-500">Pickup, warm-up &amp; vehicle for test</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-center">
                                                        <input type="number" value={1} readOnly className="w-20 h-10 text-center border border-gray-200 rounded-md text-base font-medium bg-white focus:outline-none" />
                                                    </td>
                                                    <td className="px-5 py-5 text-right text-base">$220.00</td>
                                                    <td className="px-5 py-5 text-right text-base">$20.00</td>
                                                    <td className="px-5 py-5 text-right text-base font-semibold">$220.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Totals */}
                                    <div className="flex justify-end mb-8">
                                        <div className="w-full md:w-96 space-y-3">
                                            <div className="flex justify-between items-center text-base">
                                                <span className="font-semibold">GST Included:</span>
                                                <span className="font-semibold">$20.00</span>
                                            </div>
                                            <div className="flex justify-between items-center text-base">
                                                <span className="font-semibold">Card Processing Fee:</span>
                                                <span className="font-semibold">$4.40</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                                                <span className="text-xl font-bold">Total:</span>
                                                <span className="text-xl font-bold">$224.40</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer info summary */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-[#0d4a28]">
                                            <User className="h-4 w-4 text-[#1B7640]" />
                                            Customer Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            <p><span className="text-gray-500">Name:</span> {formData.firstName} {formData.lastName}</p>
                                            <p><span className="text-gray-500">Email:</span> {formData.email}</p>
                                            <p><span className="text-gray-500">Phone:</span> {formData.phone}</p>
                                            <p><span className="text-gray-500">Suburb:</span> {formData.suburb}, NSW</p>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl mb-6 cursor-pointer border border-gray-100 hover:bg-gray-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                            className="mt-1 h-4 w-4 rounded border-[#1B7640] text-[#1B7640] focus:ring-[#1B7640]"
                                            required
                                        />
                                        <span className="text-sm text-gray-500 leading-relaxed">
                                            I agree to the <Link href="/terms" className="text-[#1B7640] font-medium hover:underline">Terms &amp; Conditions</Link> and{" "}
                                            <Link href="/privacy" className="text-[#1B7640] font-medium hover:underline">Privacy Policy</Link>.{" "}
                                            I understand that <strong className="text-red-600">all bookings are final with no refunds, no cancellations and no rescheduling</strong>.
                                            I consent to Marvel Driving contacting me regarding this booking.
                                        </span>
                                    </label>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
                                        <Button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            size="lg"
                                            className="border-2 border-[#dc2626] bg-transparent text-[#dc2626] hover:bg-[#dc2626] hover:text-white rounded-md px-10 font-semibold"
                                        >
                                            Keep Shopping
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={!formData.termsAccepted || isSubmitting}
                                            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-md px-12 font-semibold shadow-lg"
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 className="h-5 w-5 animate-spin mr-2" />Processing...</>
                                            ) : (
                                                <>Check Out</>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {step === 4 && !isTestPackage && (
                                <form onSubmit={handleSubmit}>
                                    <div className="text-center mb-8">
                                        <div className="w-14 h-14 bg-[#1B7640]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="h-7 w-7 text-[#1B7640]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                            Review & {isPaidService ? "Pay" : "Confirm"}
                                        </h2>
                                        <p className="text-gray-500">
                                            Verify your booking details before {isPaidService ? "proceeding to payment" : "confirming"}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-6 border border-gray-100">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-[#1B7640]" />
                                            Booking Summary
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-gray-100">
                                                <div className="w-10 h-10 bg-[#1B7640]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Car className="h-5 w-5 text-[#1B7640]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Service</p>
                                                    <p className="font-semibold">{selectedService?.label}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-gray-100">
                                                <div className="w-10 h-10 bg-[#1B7640]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <CalendarIcon className="h-5 w-5 text-[#1B7640]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Date & Time</p>
                                                    <p className="font-semibold">{formData.lessonDate ? format(formData.lessonDate, "EEEE, d MMMM yyyy") : ""} at {formData.lessonTime ? format(parse(formData.lessonTime, 'HH:mm', new Date()), 'h:mm a') : ""}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-gray-100">
                                                <div className="w-10 h-10 bg-[#1B7640]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <User className="h-5 w-5 text-[#1B7640]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Contact</p>
                                                    <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                                                    <p className="text-sm text-gray-500">{formData.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-gray-100">
                                                <div className="w-10 h-10 bg-[#1B7640]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="h-5 w-5 text-[#1B7640]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Pickup Location</p>
                                                    <p className="font-semibold">{formData.suburb}, NSW</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-[#1B7640]/10 rounded-xl border-2 border-[#1B7640]/20">
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="h-5 w-5 text-[#1B7640]" />
                                                    <span className="font-semibold">Total Price</span>
                                                </div>
                                                <span className="text-xl font-bold text-[#1B7640]">{selectedService?.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <Label htmlFor="notes" className="font-semibold">Additional Notes (Optional)</Label>
                                        <Textarea
                                            id="notes"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            placeholder="Any special requests or information we should know..."
                                            rows={3}
                                            className="resize-none"
                                        />
                                    </div>

                                    <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl mb-6 cursor-pointer border border-gray-100 hover:bg-gray-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                            className="mt-1 h-4 w-4 rounded border-[#1B7640] text-[#1B7640] focus:ring-[#1B7640]"
                                            required
                                        />
                                        <span className="text-sm text-gray-500 leading-relaxed">
                                            I agree to the <Link href="/terms" className="text-[#1B7640] font-medium hover:underline">Terms & Conditions</Link> and
                                            understand that all lessons are conducted in automatic transmission vehicles only.
                                            I consent to Marvel Driving contacting me regarding this booking.
                                        </span>
                                    </label>

                                    {isPaidService && (
                                        <div className="mb-6 p-5 bg-gradient-to-r from-yellow-50 to-yellow-50/50 border border-yellow-200 rounded-xl">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                    <Shield className="h-5 w-5 text-yellow-700" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-yellow-900">Secure Payment via Stripe</p>
                                                    <p className="text-sm text-yellow-700">Your payment details are encrypted</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-yellow-800">
                                                You'll be redirected to Stripe's secure checkout page.
                                                We accept Visa, Mastercard, American Express, Apple Pay & Google Pay.
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-4">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={!formData.termsAccepted || isSubmitting}
                                            className="w-full text-lg py-6 bg-[#1B7640] hover:bg-[#153e1e]"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                                    Processing...
                                                </>
                                            ) : isPaidService ? (
                                                <>
                                                    <CreditCard className="h-6 w-6 mr-2" />
                                                    Pay & Confirm Booking — {selectedService?.price.split('/').shift()}
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="h-6 w-6 mr-2" />
                                                    Submit Request
                                                </>
                                            )}
                                        </Button>
                                        <Button variant="outline" type="button" onClick={() => setStep(3)} size="lg" className="w-full">
                                            Back
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {step === 5 && (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", duration: 0.6 }}
                                        className="w-24 h-24 bg-gradient-to-br from-[#1B7640] to-[#2a7b3c] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#1B7640]/30"
                                    >
                                        <CheckCircle className="h-14 w-14 text-white" />
                                    </motion.div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Booking Confirmed!</h2>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                        Thank you for booking with Marvel Driving! We've sent a confirmation email to{" "}
                                        <strong className="text-gray-900">{formData.email || "your email"}</strong>.
                                    </p>

                                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-[#1B7640]" />
                                            What happens next?
                                        </h3>
                                        <ol className="space-y-3">
                                            {[
                                                "Check your email for booking confirmation",
                                                "Our team will confirm the exact pickup details",
                                                "Your instructor will contact you before your lesson",
                                                "Be ready at your pickup location on time"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-[#1B7640]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#1B7640]">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-gray-500">{item}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <Button asChild size="lg" className="bg-[#1B7640] hover:bg-[#153e1e]">
                                            <Link href="/">Return Home</Link>
                                        </Button>
                                        <Button variant="outline" asChild size="lg">
                                            <Link href="/contact">Contact Us</Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-[#1B7640]" />
                                <span>Secure Payments</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#1B7640]" />
                                <span>Instant Confirmation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#1B7640]" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function BookingPage() {
    return (
        <div className="min-h-screen">
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-[#1B7640]" />
                </div>
            }>
                <BookingContent />
            </Suspense>
        </div>
    );
}
