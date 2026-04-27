"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function QuickContactForm() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thanks! We'll be in touch.");
        setEmail("");
    };

    return (
        <section className="py-16 bg-[#1B7640] text-white">
            <div className="container px-4 md:px-8 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-white/80 mb-8">
                    Enter your email and we'll send you our pricing guide and answer any questions you have.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold h-12 px-8">
                        Let's Talk <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </div>
        </section>
    );
}
