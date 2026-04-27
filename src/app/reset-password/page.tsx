"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Make sure both passwords are the same.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Implement your own reset password logic here with Prisma.
            // This usually involves validating a token from the URL.
            
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            // Simulate success for now
            setIsSuccess(true);
            toast({
                title: "Password updated!",
                description: "Your session is now secure. Please sign in again.",
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
                                New Password
                            </h1>
                            <p className="text-gray-500 font-medium">
                                Choose a strong, secure password
                            </p>
                        </div>

                        {!isSuccess ? (
                            <form onSubmit={handleResetPassword} className="space-y-6">
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
                                            <Save className="h-5 w-5" />
                                            Update Password
                                        </>
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-6 space-y-6">
                                <div className="w-20 h-20 bg-[#dcfce7] text-[#16a34a] rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-[#0d4a28]">Success!</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Your password has been reset securely. You can now log back in.
                                    </p>
                                </div>
                                <Button 
                                    onClick={() => router.push("/login")}
                                    className="w-full h-14 bg-[#1B7640] hover:bg-[#0d4a28] text-white rounded-2xl font-extrabold shadow-xl shadow-[#1B7640]/10"
                                >
                                    Go to login
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
