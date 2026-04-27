"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Clock, AlertCircle } from "lucide-react";

interface DaySchedule {
    dayOfWeek: number;
    label: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

const DAYS = [
    { id: 1, label: "Monday" },
    { id: 2, label: "Tuesday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
    { id: 6, label: "Saturday" },
    { id: 0, label: "Sunday" },
];

export default function AvailabilityPage() {
    const { toast } = useToast();
    const [schedules, setSchedules] = useState<DaySchedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchSchedules() {
            setLoading(true);
            try {
                const response = await fetch("/api/availability/manage");
                const data = await response.json();

                const dbRules = data.rules || [];

                const mergedSchedules = DAYS.map((day) => {
                    const existing = dbRules.find((d: any) => d.dayOfWeek === day.id);
                    return {
                        dayOfWeek: day.id,
                        label: day.label,
                        startTime: existing?.startTime || "07:00",
                        endTime: existing?.endTime || "18:00",
                        isActive: existing?.isActive ?? true,
                    };
                });

                setSchedules(mergedSchedules);
            } catch (error: any) {
                toast({
                    title: "Error fetching settings",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchSchedules();
    }, [toast]);

    const handleUpdate = (index: number, field: keyof DaySchedule, value: any) => {
        const newSchedules = [...schedules];
        newSchedules[index] = { ...newSchedules[index], [field]: value };
        setSchedules(newSchedules);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch("/api/availability/manage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ schedules }),
            });

            if (!response.ok) throw new Error("Failed to save schedule.");

            toast({
                title: "Schedule Updated",
                description: "Your weekly availability has been saved in PostgreSQL.",
            });
        } catch (error: any) {
            toast({
                title: "Error saving changes",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#1B7640]" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0d4a28] tracking-tight">Availability</h1>
                    <p className="text-gray-500 font-medium uppercase tracking-[0.2em] text-[10px]">Weekly Working Hours • PostgreSQL</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="rounded-xl bg-[#0d4a28] hover:bg-[#1B7640] h-12 px-8 font-extrabold shadow-lg shadow-[#0d4a28]/10"
                >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Schedule
                </Button>
            </div>

            <Card className="border-0 shadow-[0_15px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-gray-50/50 px-8 py-8 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#fbbf24]/10 rounded-xl">
                            <Clock className="h-5 w-5 text-[#d97706]" />
                        </div>
                        <CardTitle className="text-xl font-extrabold text-[#0d4a28]">Weekly Schedule</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="space-y-4">
                        {schedules.map((day, index) => (
                            <div 
                                key={day.dayOfWeek} 
                                className={`flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 ${
                                    day.isActive 
                                    ? "bg-white border-gray-100 shadow-sm" 
                                    : "bg-gray-50/50 border-transparent opacity-60 grayscale-[0.5]"
                                }`}
                            >
                                <div className="w-full sm:w-32 font-black text-[#0d4a28] flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-[#fbbf24]" />
                                    {day.label}
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl">
                                    <Switch
                                        checked={day.isActive}
                                        onCheckedChange={(checked: boolean) => handleUpdate(index, "isActive", checked)}
                                        className="data-[state=checked]:bg-[#1B7640]"
                                    />
                                    <span className={`text-xs font-extrabold uppercase tracking-widest min-w-[60px] ${day.isActive ? "text-[#1B7640]" : "text-gray-400"}`}>
                                        {day.isActive ? "Active" : "Oﬀ Duty"}
                                    </span>
                                </div>

                                {day.isActive ? (
                                    <div className="flex items-center gap-4 flex-1 justify-end">
                                        <div className="relative">
                                            <Input
                                                type="time"
                                                value={day.startTime}
                                                onChange={(e) => handleUpdate(index, "startTime", e.target.value)}
                                                className="w-36 h-12 bg-white border-gray-100 rounded-xl font-bold text-[#0d4a28] px-4 focus:ring-[#1B7640]/20 transition-all"
                                            />
                                        </div>
                                        <span className="text-gray-300 font-bold">to</span>
                                        <div className="relative">
                                            <Input
                                                type="time"
                                                value={day.endTime}
                                                onChange={(e) => handleUpdate(index, "endTime", e.target.value)}
                                                className="w-36 h-12 bg-white border-gray-100 rounded-xl font-bold text-[#0d4a28] px-4 focus:ring-[#1B7640]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex justify-end">
                                        <span className="text-xs font-bold text-gray-400 italic">No bookings accepted on this day</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-extrabold text-amber-900 mb-1 tracking-tight">PostgreSQL Note</h4>
                    <p className="text-sm text-amber-800/80 font-medium leading-relaxed">
                        Weekly schedules are now synchronized with your Render PostgreSQL database.
                    </p>
                </div>
            </div>
        </div>
    );
}
