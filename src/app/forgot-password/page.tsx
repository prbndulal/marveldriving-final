"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { toast } = useToast();

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Implement your own forgot password logic here with Prisma
            // and an email provider (e.g., Resend, SendGrid).
            // For now, we'll just simulate a successful request.
            
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            // Simulate success for demo purposes if API isn't fully implemented
            setIsSent(true);
            toast({
                title: "Reset link sent!",
                description: "If an account exists with that email, you will receive a reset link shortly.",
            });
        } catch (error: any) {
            toast({
                title: "An error occurred",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[450px]"
            >
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-extrabold text-[#0d4a28] mb-3 tracking-tight">
                                Reset Password
                            </h1>
                            <p className="text-gray-500 font-medium">
                                We'll send you a secure link to your email
                            </p>
                        </div>

                        {!isSent ? (
                            <form onSubmit={handleResetRequest} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-14 bg-gray-50 border-gray-100 rounded-2xl px-5 focus:bg-white focus:ring-2 focus:ring-[#1B7640]/20 transition-all text-base"
                                        />
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full h-14 bg-[#1B7640] hover:bg-[#0d4a28] text-white rounded-2xl font-extrabold text-lg shadow-xl shadow-[#1B7640]/10 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
                                >
                                    {isLoading ? (
                                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Send Reset Link
                                        </>
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-6 space-y-6">
                                <div className="w-20 h-20 bg-[#fef3c7] text-[#d97706] rounded-full flex items-center justify-center mx-auto">
                                    <Mail className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-[#0d4a28]">Check your email</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        We've sent a link to **{email}**. Click it to securely reset your password.
                                    </p>
                                </div>
                                <Button 
                                    onClick={() => setIsSent(false)}
                                    variant="outline"
                                    className="rounded-xl border-gray-200 font-bold"
                                >
                                    Try a different email
                                </Button>
                            </div>
                        )}

                        <div className="pt-8 border-t border-gray-100 text-center mt-8">
                            <Link 
                                href="/login" 
                                className="inline-flex items-center gap-2 text-[#1B7640] font-extrabold hover:text-[#0d4a28] transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
