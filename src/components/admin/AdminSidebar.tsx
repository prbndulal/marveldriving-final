"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Car,
    Clock,
    Home,
    Images,
    BookOpen,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Bookings",
        href: "/admin/bookings",
        icon: CalendarDays,
    },
    {
        title: "Enquiries",
        href: "/admin/enquiries",
        icon: MessageSquare,
    },
    {
        title: "Availability",
        href: "/admin/availability",
        icon: Clock,
    },
    {
        title: "Instructors",
        href: "/admin/instructors",
        icon: Users,
    },
    {
        title: "Gallery",
        href: "/admin/gallery",
        icon: Images,
    },
    {
        title: "Blog",
        href: "/admin/blog",
        icon: BookOpen,
    },
    {
        title: "Vacancies",
        href: "/admin/vacancies",
        icon: Briefcase,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/login");
            toast({
                title: "Signed out",
                description: "You have been securely logged out.",
            });
        } catch (error: any) {
            toast({
                title: "Sign out failed",
                description: "Could not complete logout.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="flex h-screen w-72 flex-col border-r border-gray-800 bg-[#0d4a28] text-white shadow-2xl">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 font-black text-2xl text-[#fbbf24] tracking-tighter group">
                    <div className="p-2 bg-[#fbbf24] rounded-xl text-[#0d4a28] group-hover:rotate-12 transition-transform duration-300">
                        <Car className="h-6 w-6" />
                    </div>
                    <span>Marvel Admin</span>
                </Link>
            </div>
            
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-2 px-6">
                    <p className="px-3 text-[10px] font-extrabold text-[#fbbf24]/50 uppercase tracking-[0.2em] mb-2">Main Menu</p>
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-extrabold transition-all duration-300",
                                pathname === item.href 
                                ? "bg-[#fbbf24] text-[#0d4a28] shadow-lg shadow-[#fbbf24]/10 translate-x-1" 
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-[#0d4a28]" : "text-[#fbbf24]/70")} />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-6 border-t border-white/5">
                <div className="grid gap-2">
                    <Link 
                        href="/" 
                        className="flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Home className="h-5 w-5" />
                        Back to Site
                    </Link>
                    <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all w-full text-left"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

