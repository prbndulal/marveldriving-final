import { prisma } from "@/lib/prisma";
import { 
    MessageSquare, 
    Search, 
    MoreVertical, 
    Mail, 
    Phone, 
    Clock, 
    User,
    CheckCircle2,
    Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default async function AdminEnquiries() {
    // Fetch from Prisma
    const enquiries = await prisma.enquiry.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#0d4a28] tracking-tight mb-2">Enquiries</h1>
                    <p className="text-gray-500 font-medium italic">Manage all messages from PostgreSQL</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#1B7640] transition-colors" />
                        <Input 
                            placeholder="Search messages..." 
                            className="pl-12 w-[300px] h-12 bg-white border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#1B7640]/10 transition-all font-medium"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {enquiries.length === 0 ? (
                    <Card className="border-0 shadow-sm rounded-[2.5rem] bg-white p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="h-10 w-10 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-black text-[#0d4a28] mb-2">No enquiries yet</h2>
                        <p className="text-gray-400 font-medium">Messages from the contact form will appear here.</p>
                    </Card>
                ) : (
                    enquiries.map((enquiry) => (
                        <Card key={enquiry.id} className="border-0 shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-xl hover:shadow-[#0d4a28]/5 transition-all duration-500">
                            <CardContent className="p-8">
                                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                                    <div className="flex items-start gap-6">
                                        <div className="h-16 w-16 rounded-[1.8rem] bg-gray-50 text-[#1B7640] flex items-center justify-center text-xl font-black group-hover:bg-[#fbbf24] group-hover:text-[#0d4a28] transition-colors duration-500">
                                            <User className="h-8 w-8" />
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-[#0d4a28] mb-1">{enquiry.name}</h3>
                                                <div className="flex flex-wrap gap-4 items-center">
                                                    <span className="flex items-center gap-2 text-sm text-gray-400 font-bold"><Mail className="h-4 w-4" /> {enquiry.email}</span>
                                                    <span className="flex items-center gap-2 text-sm text-gray-400 font-bold"><Phone className="h-4 w-4" /> {enquiry.phone}</span>
                                                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest"><Clock className="h-3 w-3" /> {format(new Date(enquiry.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50 italic text-gray-600 font-medium">
                                                "{enquiry.message}"
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col items-center gap-3 w-full lg:w-auto">
                                        <Button className="w-full lg:w-16 h-16 rounded-[1.8rem] bg-[#0d4a28] hover:bg-[#1B7640] text-[#fbbf24] shadow-lg shadow-[#0d4a28]/10 transition-transform active:scale-90">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </Button>
                                        <Button variant="ghost" className="w-full lg:w-16 h-16 rounded-[1.8rem] bg-rose-50 text-rose-500 hover:bg-rose-100 transition-transform active:scale-90">
                                            <Trash2 className="h-6 w-6" />
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
