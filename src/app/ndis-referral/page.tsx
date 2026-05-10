"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/PageHero";
import { useToast } from "@/hooks/use-toast";

type ReferringType = "self" | "someone_else";
type PlanMgmt = "plan_managed" | "self_managed" | "ndia_managed";

interface FormState {
    referringType: ReferringType | "";
    ndisNumber: string;
    ndisStartDate: string;
    ndisEndDate: string;
    hasPastReports: string;
    participantFullName: string;
    participantDob: string;
    participantEmail: string;
    participantPhone: string;
    participantAddress: string;
    participantSuburb: string;
    participantState: string;
    participantPostcode: string;
    planManagementType: PlanMgmt | "";
    planManagerName: string;
    referrerFirstName: string;
    referrerLastName: string;
    referrerPhone: string;
    referrerEmail: string;
}

const initialState: FormState = {
    referringType: "",
    ndisNumber: "",
    ndisStartDate: "",
    ndisEndDate: "",
    hasPastReports: "",
    participantFullName: "",
    participantDob: "",
    participantEmail: "",
    participantPhone: "",
    participantAddress: "",
    participantSuburb: "",
    participantState: "",
    participantPostcode: "",
    planManagementType: "",
    planManagerName: "",
    referrerFirstName: "",
    referrerLastName: "",
    referrerPhone: "",
    referrerEmail: "",
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B7640] uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#1B7640]/20">
        {children}
    </h2>
);

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <Label className="text-base text-gray-500 font-normal">
        {children} {required && <span className="text-red-500">*</span>}
    </Label>
);

export default function NDISReferral() {
    const { toast } = useToast();
    const [form, setForm] = useState<FormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm((s) => ({ ...s, [key]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.referringType) {
            toast({ title: "Please select who you are referring", variant: "destructive" });
            return;
        }
        if (!form.planManagementType) {
            toast({ title: "Please select how the plan is managed", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/ndis-referral", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setIsSubmitted(true);
            toast({ title: "Referral submitted!", description: "We will get back to you within 1-2 business days." });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            toast({ title: "Submission failed", description: "Please try again or call us directly.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <PageHero
                    badge="NDIS Registered Provider — #4050085206"
                    titleStart="NDIS Referral"
                    titleAccent="Form"
                    description="Refer yourself or someone else to our NDIS Disability Driving program."
                    bannerImage="/slider-1.jpg"
                    imageAlt="NDIS Referral Form"
                />
                <section className="py-24 flex-1">
                    <div className="container px-4 md:px-8 max-w-2xl text-center mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-[#1B7640]/10 mb-6"
                        >
                            <CheckCircle className="h-10 w-10 text-[#1B7640]" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Thank You!</h2>
                        <p className="text-lg text-gray-500 mb-8">
                            Your NDIS referral has been received. Our team will review the details and contact you within 1-2 business days to discuss the next steps.
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#1B7640] hover:bg-[#0d4a28] text-white"
                            onClick={() => { setForm(initialState); setIsSubmitted(false); }}
                        >
                            Submit Another Referral
                        </Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="NDIS Registered Provider — #4050085206"
                titleStart="NDIS Referral"
                titleAccent="Form"
                description="Refer yourself or someone else to our NDIS Disability Driving program. Fill out the form below and we will get back to you with the next steps."
                bannerImage="/slider-1.jpg"
                imageAlt="NDIS Referral Form"
            />

            <section className="py-16 md:py-20 bg-white flex-1">
                <div className="container px-4 md:px-8 max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B7640] uppercase tracking-tight mb-4">
                            NDIS Referral Form
                        </h1>
                        <p className="text-lg text-gray-500">
                            If you would like to refer yourself or someone else to our Disability Driving program, please fill out the form below with all your/their details and we will get back to you with the next steps.
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-14">
                        {/* Who are you referring */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-3">
                            <FieldLabel required>Who are you referring?</FieldLabel>
                            <RadioGroup
                                value={form.referringType}
                                onValueChange={(v) => update("referringType", v as ReferringType)}
                                className="space-y-2 pt-2"
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="self" id="ref-self" />
                                    <Label htmlFor="ref-self" className="text-base font-normal text-gray-500 cursor-pointer">I am referring myself</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="someone_else" id="ref-other" />
                                    <Label htmlFor="ref-other" className="text-base font-normal text-gray-500 cursor-pointer">I am referring someone else</Label>
                                </div>
                            </RadioGroup>
                        </motion.div>

                        {/* NDIS Plan Information */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <SectionTitle>NDIS Plan Information</SectionTitle>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <FieldLabel required>NDIS Number</FieldLabel>
                                    <Input value={form.ndisNumber} onChange={(e) => update("ndisNumber", e.target.value)} required maxLength={50} className="h-11" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <FieldLabel required>NDIS Start Date</FieldLabel>
                                        <Input type="date" value={form.ndisStartDate} onChange={(e) => update("ndisStartDate", e.target.value)} required className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <FieldLabel required>NDIS End Date</FieldLabel>
                                        <Input type="date" value={form.ndisEndDate} onChange={(e) => update("ndisEndDate", e.target.value)} required className="h-11" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel required>Are you able to provide Onroad Driving Education with any past reports or assessments that may assist in serving the Participant?</FieldLabel>
                                    <Select value={form.hasPastReports} onValueChange={(v) => update("hasPastReports", v)}>
                                        <SelectTrigger className="h-11"><SelectValue placeholder="SELECT ONE OPTION" /></SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                            <SelectItem value="unsure">Unsure</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Participant Information */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <SectionTitle>Participant Information</SectionTitle>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <FieldLabel required>Participant Full Name</FieldLabel>
                                    <Input value={form.participantFullName} onChange={(e) => update("participantFullName", e.target.value)} required maxLength={150} className="h-11" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <FieldLabel required>Date of Birth</FieldLabel>
                                        <Input type="date" value={form.participantDob} onChange={(e) => update("participantDob", e.target.value)} required className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <FieldLabel required>Email Address</FieldLabel>
                                        <Input type="email" value={form.participantEmail} onChange={(e) => update("participantEmail", e.target.value)} required maxLength={255} className="h-11" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel required>Phone Number</FieldLabel>
                                    <Input type="tel" value={form.participantPhone} onChange={(e) => update("participantPhone", e.target.value)} required maxLength={20} className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel required>Participant Address</FieldLabel>
                                    <Input value={form.participantAddress} onChange={(e) => update("participantAddress", e.target.value)} required maxLength={255} className="h-11" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <FieldLabel required>Suburb</FieldLabel>
                                        <Input value={form.participantSuburb} onChange={(e) => update("participantSuburb", e.target.value)} required maxLength={100} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <FieldLabel required>State</FieldLabel>
                                        <Input value={form.participantState} onChange={(e) => update("participantState", e.target.value)} required maxLength={50} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <FieldLabel required>Postcode</FieldLabel>
                                        <Input value={form.participantPostcode} onChange={(e) => update("participantPostcode", e.target.value)} required maxLength={10} className="h-11" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <FieldLabel required>How is the Participant's Plan managed?</FieldLabel>
                                    <RadioGroup
                                        value={form.planManagementType}
                                        onValueChange={(v) => update("planManagementType", v as PlanMgmt)}
                                        className="space-y-2 pt-1"
                                    >
                                        {[
                                            { v: "plan_managed", l: "Plan-Managed" },
                                            { v: "self_managed", l: "Self-Managed" },
                                            { v: "ndia_managed", l: "NDIA-Managed" },
                                        ].map((o) => (
                                            <div key={o.v} className="flex items-center space-x-3">
                                                <RadioGroupItem value={o.v} id={`pm-${o.v}`} />
                                                <Label htmlFor={`pm-${o.v}`} className="text-base font-normal text-gray-500 cursor-pointer">{o.l}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>If you are Plan Managed, what is the name of your Plan Manager?</FieldLabel>
                                    <Input value={form.planManagerName} onChange={(e) => update("planManagerName", e.target.value)} maxLength={150} className="h-11" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Referrer Details */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <SectionTitle>Referrer Details</SectionTitle>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <FieldLabel>Referrer First Name</FieldLabel>
                                        <Input value={form.referrerFirstName} onChange={(e) => update("referrerFirstName", e.target.value)} maxLength={100} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <FieldLabel>Referrer Last Name</FieldLabel>
                                        <Input value={form.referrerLastName} onChange={(e) => update("referrerLastName", e.target.value)} maxLength={100} className="h-11" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <FieldLabel>Referrer Phone</FieldLabel>
                                        <Input type="tel" value={form.referrerPhone} onChange={(e) => update("referrerPhone", e.target.value)} maxLength={20} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <FieldLabel>Referrer Email</FieldLabel>
                                        <Input type="email" value={form.referrerEmail} onChange={(e) => update("referrerEmail", e.target.value)} maxLength={255} className="h-11" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-14 text-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <><Loader2 className="h-5 w-5 animate-spin mr-2" />Submitting...</>
                            ) : (
                                <><Send className="h-5 w-5 mr-2" />Submit Referral</>
                            )}
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}
