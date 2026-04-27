"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: "Login failed",
                    description: "Invalid email or password.",
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Welcome back!",
                description: "Redirecting to your dashboard...",
            });
            
            router.push("/admin");
            router.refresh();
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
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 font-medium">
                                Sign in to your account
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
                                    Email
                                </Label>
                                <div className="relative group">
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

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">
                                    Password
                                </Label>
                                <div className="relative group">
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

                            <div className="flex justify-center">
                                <Link 
                                    href="/forgot-password" 
                                    className="text-sm font-bold text-[#1B7640] hover:text-[#0d4a28] transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full h-14 bg-[#1B7640] hover:bg-[#0d4a28] text-white rounded-2xl font-extrabold text-lg shadow-xl shadow-[#1B7640]/10 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5" />
                                        Sign In
                                    </>
                                )}
                            </Button>

                            <div className="pt-6">
                                <Button 
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        sessionStorage.setItem('admin_bypass_email', 'admin@marveldriving.com.au');
                                        window.location.href = '/admin';
                                    }}
                                    className="w-full h-12 border-[#1B7640]/20 bg-[#1B7640]/5 text-[#1B7640] font-black text-sm rounded-2xl hover:bg-[#1B7640]/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Instant Admin Access (Test Mode)
                                </Button>
                                <p className="text-[10px] text-center text-gray-400 mt-2 font-medium italic">
                                    Bypasses Auth for local development
                                </p>
                            </div>


                            <div className="pt-6 border-t border-gray-100 text-center">
                                <p className="text-gray-500 font-medium">
                                    Don't have an account?{" "}
                                    <Link 
                                        href="/signup" 
                                        className="text-[#1B7640] font-extrabold hover:text-[#0d4a28] transition-colors"
                                    >
                                        Sign up
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

