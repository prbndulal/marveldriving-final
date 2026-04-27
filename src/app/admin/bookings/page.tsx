import { prisma } from "@/lib/prisma";
import { 
    CalendarDays, 
    Search, 
    Filter, 
    MoreVertical, 
    MapPin, 
    Clock, 
    Phone, 
    Mail,
    CheckCircle2,
    XCircle,
    AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default async function AdminBookings() {
    // Fetch all bookings from Prisma
    const bookings = await prisma.booking.findMany({
        orderBy: { date: 'desc' },
        include: { instructor: true }
    });

    return (
        <div className="space-y-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#0d4a28] tracking-tight mb-2">Bookings</h1>
                    <p className="text-gray-500 font-medium italic">Manage all student appointments from PostgreSQL</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#1B7640] transition-colors" />
                        <Input 
                            placeholder="Search students..." 
                            className="pl-12 w-[300px] h-12 bg-white border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#1B7640]/10 transition-all font-medium"
                        />
                    </div>
                    <Button variant="outline" className="h-12 w-12 rounded-2xl border-gray-100 p-0 hover:bg-gray-50 transition-all active:scale-95">
                        <Filter className="h-5 w-5 text-gray-500" />
                    </Button>
                </div>
            </div>

            {/* Bookings List */}
            <div className="grid gap-6">
                {bookings.length === 0 ? (
                    <Card className="border-0 shadow-sm rounded-[2.5rem] bg-white p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="h-10 w-10 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-black text-[#0d4a28] mb-2">No bookings found</h2>
                        <p className="text-gray-400 font-medium">Any new bookings from the site will appear here.</p>
                    </Card>
                ) : (
                    bookings.map((booking) => (
                        <Card key={booking.id} className="border-0 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-xl hover:shadow-[#0d4a28]/5 transition-all duration-500">
                            <CardContent className="p-0">
                                <div className="flex flex-col lg:flex-row lg:items-center">
                                    {/* Left: User Info */}
                                    <div className="p-8 lg:w-1/3 flex items-start gap-6 border-b lg:border-b-0 lg:border-r border-gray-50 bg-gray-50/20">
                                        <div className="h-16 w-16 rounded-[1.8rem] bg-[#0d4a28] text-[#fbbf24] flex items-center justify-center text-xl font-black shadow-lg shadow-[#0d4a28]/10">
                                            {booking.customerName.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-[#0d4a28] mb-1">{booking.customerName}</h3>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                                                    <Mail className="h-3 w-3" /> {booking.customerEmail}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                                                    <Phone className="h-3 w-3" /> {booking.customerPhone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Appointment Details */}
                                    <div className="p-8 lg:flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lesson Type</p>
                                            <p className="font-extrabold text-[#1B7640]">{booking.serviceName}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                                            <p className="font-extrabold text-[#0d4a28] flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-[#fbbf24]" />
                                                {format(new Date(booking.date), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</p>
                                            <p className="font-extrabold text-[#0d4a28] flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-[#fbbf24]" />
                                                {booking.time}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment</p>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {booking.paymentStatus === 'paid' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                                {booking.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="p-8 lg:w-1/6 flex items-center justify-end gap-3">
                                        <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                            booking.status === 'confirmed' ? 'bg-[#1B7640] text-white' : 'bg-amber-500 text-white'
                                        }`}>
                                            {booking.status}
                                        </span>
                                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-400">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
