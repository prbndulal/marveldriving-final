import { prisma } from "@/lib/prisma";
import { 
    CalendarDays, 
    DollarSign, 
    Users, 
    MessageSquare, 
    ArrowUpRight, 
    Clock,
    TrendingUp,
    ChevronRight,
    Search
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default async function AdminDashboard() {
    // 1. Fetch Real Stats using Prisma
    const totalBookings = await prisma.booking.count();
    const confirmedCount = await prisma.booking.count({ where: { status: 'confirmed' } });
    const pendingCount = await prisma.booking.count({ where: { status: 'pending' } });
    const newEnquiriesCount = await prisma.enquiry.count({ where: { status: 'new' } });
    
    // Revenue Estimate (Simple calculation from schema)
    const revenueData = await prisma.booking.aggregate({
        _sum: { servicePrice: true },
        where: { paymentStatus: 'paid' }
    });
    const estRevenue = revenueData._sum.servicePrice || 0;

    // Recent Data
    const recentBookings = await prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    });

    const recentEnquiries = await prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    });

    const statCards = [
        {
            title: "Total Bookings",
            value: totalBookings.toString(),
            change: `${pendingCount} pending`,
            trend: "up",
            icon: CalendarDays,
            color: "from-emerald-500 to-[#1B7640]",
            id: "bookings"
        },
        {
            title: "Est. Revenue",
            value: `$${estRevenue.toLocaleString()}`,
            change: "+8.2%",
            trend: "up",
            icon: DollarSign,
            color: "from-blue-500 to-indigo-600",
            id: "revenue"
        },
        {
            title: "Active Students",
            value: confirmedCount.toString(),
            change: "+4",
            trend: "up",
            icon: Users,
            color: "from-amber-400 to-orange-600",
            id: "students"
        },
        {
            title: "New Enquiries",
            value: newEnquiriesCount.toString(),
            change: "Action required",
            trend: "down",
            icon: MessageSquare,
            color: "from-rose-500 to-pink-600",
            id: "enquiries"
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#0d4a28] tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Marvel Driving School • PostgreSQL Edition</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-gray-200" asChild>
                        <Link href="/">View Site</Link>
                    </Button>
                    <Button className="rounded-xl bg-[#0d4a28] hover:bg-[#1B7640] shadow-lg shadow-[#0d4a28]/10">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.id} className="border-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden rounded-[2rem] group hover:scale-[1.02] transition-transform duration-300">
                        <div className={`h-1.5 w-full bg-gradient-to-r ${stat.color}`} />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-gradient-to-br ${stat.color} group-hover:text-white transition-all duration-500`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-[#0d4a28] tracking-tight mb-2">{stat.value}</div>
                            <div className="flex items-center gap-1">
                                <span className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                                    {stat.change}
                                </span>
                                <span className="text-xs text-gray-400 font-medium ml-1">Current Status</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Recent Bookings List */}
                <Card className="lg:col-span-4 border-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between px-8 py-8 border-b border-gray-50 bg-gray-50/30">
                        <div>
                            <CardTitle className="text-xl font-extrabold text-[#0d4a28] tracking-tight">Recent Bookings</CardTitle>
                            <p className="text-sm text-gray-400 font-medium mt-1">Updates from PostgreSQL</p>
                        </div>
                        <Button variant="ghost" className="rounded-xl font-bold text-[#1B7640]" asChild>
                            <Link href="/admin/bookings">View All <ChevronRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                        <div className="space-y-2">
                            {recentBookings.length === 0 ? (
                                <div className="py-20 text-center text-gray-500 font-bold italic">No bookings found in Render database.</div>
                            ) : (
                                recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-[#fbbf24]/10 flex items-center justify-center text-[#d97706] font-extrabold shadow-sm">
                                                {booking.customerName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-[#0d4a28] tracking-tight">{booking.customerName}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{booking.serviceName}</span>
                                                    <span className="text-gray-200">|</span>
                                                    <span className="text-xs text-gray-400 font-medium">{format(new Date(booking.date), 'MMM dd')} at {booking.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                                                booking.status === 'confirmed' ? 'bg-green-50 text-green-700' : 
                                                booking.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Enquiries List */}
                <Card className="lg:col-span-3 border-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="px-8 py-8 border-b border-gray-50 bg-gray-50/30">
                        <CardTitle className="text-xl font-extrabold text-[#0d4a28] tracking-tight">New enquiries</CardTitle>
                        <p className="text-sm text-gray-400 font-medium mt-1">Pending student responses</p>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                        <div className="space-y-4">
                            {recentEnquiries.length === 0 ? (
                                <div className="py-20 text-center text-gray-500 font-bold italic">No pending enquiries.</div>
                            ) : (
                                recentEnquiries.map((enquiry) => (
                                    <div key={enquiry.id} className="relative p-6 rounded-3xl border border-gray-50 hover:border-[#1B7640]/20 hover:shadow-lg hover:shadow-[#1B7640]/5 transition-all group overflow-hidden bg-white">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <Users className="h-4 w-4 text-[#1B7640]" />
                                                </div>
                                                <span className="font-extrabold text-[#0d4a28]">{enquiry.name}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {format(new Date(enquiry.createdAt), 'HH:mm')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2 italic font-medium">"{enquiry.message}"</p>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                            <span className="text-[10px] font-extrabold uppercase text-[#1B7640] tracking-widest">{enquiry.type}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
