"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Supabase integration omitted for now, just simulation

export function NDISEnquiryForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        participantType: "",
        planType: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Enquiry Submitted",
            description: "We'll get back to you within 24 hours.",
        });

        setIsSubmitting(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            participantType: "",
            planType: "",
            message: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="0400 000 000"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="participantType">I am a...</Label>
                    <Select onValueChange={(val) => setFormData({ ...formData, participantType: val })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="participant">NDIS Participant</SelectItem>
                            <SelectItem value="coordinator">Support Coordinator</SelectItem>
                            <SelectItem value="family">Family/Carer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="planType">Plan Management Type</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, planType: val })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="plan-managed">Plan Managed</SelectItem>
                        <SelectItem value="self-managed">Self Managed</SelectItem>
                        <SelectItem value="ndia-managed">NDIA Managed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message / Specific Needs</Label>
                <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your goals or specific requirements..."
                    rows={4}
                />
            </div>

            <Button type="submit" className="w-full bg-[#1B7640] hover:bg-[#153e1e]" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Enquiry"
                )}
            </Button>
        </form>
    );
}
