"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, UserPlus, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // First, call our new Signup API
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast({
                    title: "Signup failed",
                    description: data.error || "Something went wrong.",
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Account created!",
                description: "Logging you in...",
            });
            
            // Automatically log in the user using the new credentials
            await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/admin",
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
                className="w-full max-w-[500px]"
            >
                <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-extrabold text-[#0d4a28] mb-3 tracking-tight">
                                Create Account
                            </h1>
                            <p className="text-gray-500 font-medium">
                                Join Marvel Driving School today
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-14 bg-gray-50 border-gray-100 rounded-2xl px-5 focus:bg-white focus:ring-2 focus:ring-[#1B7640]/20 transition-all text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
                                    Email
                                </Label>
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

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-14 bg-gray-50 border-gray-100 rounded-2xl px-5 pr-12 focus:bg-white focus:ring-2 focus:ring-[#1B7640]/20 transition-all text-base font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 ml-1">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="h-14 bg-gray-50 border-gray-100 rounded-2xl px-5 focus:bg-white focus:ring-2 focus:ring-[#1B7640]/20 transition-all text-base font-mono"
                                />
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
                                        <UserPlus className="h-5 w-5" />
                                        Create Account
                                    </>
                                )}
                            </Button>

                            <div className="pt-6 border-t border-gray-100 text-center">
                                <p className="text-gray-500 font-medium">
                                    Already have an account?{" "}
                                    <Link 
                                        href="/login" 
                                        className="text-[#1B7640] font-extrabold hover:text-[#0d4a28] transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="text-center mt-8">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1B7640] font-bold transition-colors group"
                    >
                        <span>Back to homepage</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

