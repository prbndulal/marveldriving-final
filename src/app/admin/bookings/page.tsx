"use client";

import { useState, useEffect, useCallback } from "react";
import {
    CalendarDays, Search, Clock, Phone, Mail,
    CheckCircle2, AlertCircle, Pencil, Trash2, Loader2, X, Save
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Booking {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceName: string;
    servicePrice: number;
    date: string;
    time: string;
    status: string;
    paymentStatus: string;
    stripeId: string | null;
    instructorId: string | null;
    instructor: { id: string; name: string } | null;
    createdAt: string;
}

interface EditForm {
    status: string;
    paymentStatus: string;
    date: string;
    time: string;
    instructorId: string;
}

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled"];
const PAYMENT_OPTIONS = ["unpaid", "paid", "refunded"];

export default function AdminBookings() {
    const { toast } = useToast();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPayment, setFilterPayment] = useState("all");
    const [editBooking, setEditBooking] = useState<Booking | null>(null);
    const [editForm, setEditForm] = useState<EditForm>({ status: "", paymentStatus: "", date: "", time: "", instructorId: "" });
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [instructors, setInstructors] = useState<{ id: string; name: string }[]>([]);

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/bookings");
            const data = await res.json();
            setBookings(data);
        } catch {
            toast({ title: "Failed to load bookings", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchBookings();
        fetch("/api/instructors").then(r => r.json()).then(d => setInstructors(d || [])).catch(() => {});
    }, [fetchBookings]);

    const openEdit = (b: Booking) => {
        setEditBooking(b);
        setEditForm({
            status: b.status,
            paymentStatus: b.paymentStatus,
            date: format(new Date(b.date), "yyyy-MM-dd"),
            time: b.time,
            instructorId: b.instructorId ?? "",
        });
    };

    const handleSave = async () => {
        if (!editBooking) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/bookings/${editBooking.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: editForm.status,
                    paymentStatus: editForm.paymentStatus,
                    date: editForm.date,
                    time: editForm.time,
                    instructorId: editForm.instructorId || null,
                }),
            });
            if (!res.ok) throw new Error();
            const updated = await res.json();
            setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
            setEditBooking(null);
            toast({ title: "Booking updated successfully" });
        } catch {
            toast({ title: "Failed to update booking", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this booking? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setBookings(prev => prev.filter(b => b.id !== id));
            toast({ title: "Booking deleted" });
        } catch {
            toast({ title: "Failed to delete booking", variant: "destructive" });
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = bookings.filter(b => {
        const matchSearch = !search ||
            b.customerName.toLowerCase().includes(search.toLowerCase()) ||
            b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
            b.customerPhone.includes(search);
        const matchStatus = filterStatus === "all" || b.status === filterStatus;
        const matchPayment = filterPayment === "all" || b.paymentStatus === filterPayment;
        return matchSearch && matchStatus && matchPayment;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#0d4a28] tracking-tight mb-1">Bookings</h1>
                    <p className="text-gray-500 text-sm">{bookings.length} total · {bookings.filter(b => b.paymentStatus === "paid").length} paid</p>
                </div>
                <Button onClick={fetchBookings} variant="outline" className="h-10 rounded-xl text-sm">
                    Refresh
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by name, email or phone…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-gray-200"
                    />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-11 w-40 rounded-xl border-gray-200">
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="all">All Statuses</SelectItem>
                        {STATUS_OPTIONS.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={filterPayment} onValueChange={setFilterPayment}>
                    <SelectTrigger className="h-11 w-40 rounded-xl border-gray-200">
                        <SelectValue placeholder="All payments" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="all">All Payments</SelectItem>
                        {PAYMENT_OPTIONS.map(p => <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-[#1B7640]" />
                </div>
            ) : filtered.length === 0 ? (
                <Card className="border-0 shadow-sm rounded-3xl">
                    <CardContent className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarDays className="h-8 w-8 text-gray-300" />
                        </div>
                        <h2 className="text-lg font-bold text-[#0d4a28] mb-1">No bookings found</h2>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filtered.map(booking => (
                        <Card key={booking.id} className="border-0 shadow-sm rounded-3xl bg-white overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                                <div className="flex flex-col lg:flex-row lg:items-center">
                                    {/* Customer */}
                                    <div className="p-6 lg:w-64 flex items-start gap-4 border-b lg:border-b-0 lg:border-r border-gray-50">
                                        <div className="h-12 w-12 rounded-2xl bg-[#0d4a28] text-[#fbbf24] flex items-center justify-center text-sm font-black shrink-0">
                                            {booking.customerName.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-black text-[#0d4a28] truncate">{booking.customerName}</h3>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                                <Mail className="h-3 w-3 shrink-0" />
                                                <span className="truncate">{booking.customerEmail}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                                <Phone className="h-3 w-3 shrink-0" />
                                                {booking.customerPhone}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="p-6 flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Service</p>
                                            <p className="font-bold text-[#1B7640] text-sm leading-tight">{booking.serviceName}</p>
                                            <p className="text-xs text-gray-400">${booking.servicePrice}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                                            <p className="font-bold text-[#0d4a28] text-sm flex items-center gap-1">
                                                <CalendarDays className="h-3.5 w-3.5 text-[#fbbf24]" />
                                                {format(new Date(booking.date), "d MMM yyyy")}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time</p>
                                            <p className="font-bold text-[#0d4a28] text-sm flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5 text-[#fbbf24]" />
                                                {booking.time}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment</p>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                booking.paymentStatus === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : booking.paymentStatus === "refunded"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-amber-100 text-amber-700"
                                            }`}>
                                                {booking.paymentStatus === "paid"
                                                    ? <CheckCircle2 className="h-3 w-3" />
                                                    : <AlertCircle className="h-3 w-3" />}
                                                {booking.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status + Actions */}
                                    <div className="p-6 lg:w-48 flex items-center justify-between lg:justify-end gap-3">
                                        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                            booking.status === "confirmed"
                                                ? "bg-[#1B7640] text-white"
                                                : booking.status === "cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-amber-100 text-amber-700"
                                        }`}>
                                            {booking.status}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-9 w-9 rounded-xl bg-gray-50 hover:bg-[#1B7640]/10 hover:text-[#1B7640]"
                                                onClick={() => openEdit(booking)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-9 w-9 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-600"
                                                onClick={() => handleDelete(booking.id)}
                                                disabled={deletingId === booking.id}
                                            >
                                                {deletingId === booking.id
                                                    ? <Loader2 className="h-4 w-4 animate-spin" />
                                                    : <Trash2 className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditBooking(null)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-[#0d4a28]">Edit Booking</h2>
                                <p className="text-sm text-gray-400 mt-0.5">{editBooking.customerName}</p>
                            </div>
                            <button
                                onClick={() => setEditBooking(null)}
                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            {/* Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Booking Status</Label>
                                    <Select value={editForm.status} onValueChange={v => setEditForm(f => ({ ...f, status: v }))}>
                                        <SelectTrigger className="h-11 rounded-xl border-gray-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {STATUS_OPTIONS.map(s => (
                                                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Status</Label>
                                    <Select value={editForm.paymentStatus} onValueChange={v => setEditForm(f => ({ ...f, paymentStatus: v }))}>
                                        <SelectTrigger className="h-11 rounded-xl border-gray-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {PAYMENT_OPTIONS.map(p => (
                                                <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</Label>
                                    <Input
                                        type="date"
                                        value={editForm.date}
                                        onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))}
                                        className="h-11 rounded-xl border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time</Label>
                                    <Input
                                        type="time"
                                        value={editForm.time}
                                        onChange={e => setEditForm(f => ({ ...f, time: e.target.value }))}
                                        className="h-11 rounded-xl border-gray-200"
                                    />
                                </div>
                            </div>

                            {/* Instructor */}
                            {instructors.length > 0 && (
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Assign Instructor</Label>
                                    <Select
                                        value={editForm.instructorId || "none"}
                                        onValueChange={v => setEditForm(f => ({ ...f, instructorId: v === "none" ? "" : v }))}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-gray-200">
                                            <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="none">Unassigned</SelectItem>
                                            {instructors.map(i => (
                                                <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Booking info (read-only) */}
                            <div className="bg-gray-50 rounded-2xl p-4 space-y-1.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Service</span>
                                    <span className="font-semibold text-[#0d4a28]">{editBooking.serviceName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Price</span>
                                    <span className="font-semibold">${editBooking.servicePrice}</span>
                                </div>
                                {editBooking.stripeId && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Stripe ID</span>
                                        <span className="font-mono text-xs text-gray-500 truncate max-w-[180px]">{editBooking.stripeId}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-8">
                            <Button
                                variant="outline"
                                className="flex-1 h-12 rounded-xl border-gray-200"
                                onClick={() => setEditBooking(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 h-12 rounded-xl bg-[#1B7640] hover:bg-[#0d4a28] text-white font-bold"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
