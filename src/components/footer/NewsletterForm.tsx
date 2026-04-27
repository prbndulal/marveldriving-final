"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Props {
    dark?: boolean;
}

export function NewsletterForm({ dark }: Props) {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter subscription for:", email);
        alert("Thanks for subscribing!");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={dark ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10" : "bg-background border-input text-foreground h-10"}
                required
            />
            <Button type="submit" size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white h-10 px-4 font-bold">
                Subscribe
            </Button>
        </form>
    );
}
