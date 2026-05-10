import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format, addMinutes, isBefore, set } from 'date-fns';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dateStr = searchParams.get("date"); // yyyy-MM-dd

        if (!dateStr) {
            return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
        }

        // Parse as local date to avoid UTC off-by-one day issues
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();

        // Fetch rule for this day regardless of isActive
        const rule = await prisma.availability.findFirst({
            where: { dayOfWeek }
        });

        // Day has no rule or is explicitly inactive → no slots
        if (!rule || !rule.isActive) {
            return NextResponse.json({ slots: [] });
        }

        // Fetch bookings on this date (confirmed + recent pending)
        const pendingCutoff = new Date(Date.now() - 15 * 60 * 1000);
        const bookings = await prisma.booking.findMany({
            where: {
                date: new Date(year, month - 1, day),
                OR: [
                    { status: 'confirmed' },
                    { status: 'pending', createdAt: { gte: pendingCutoff } }
                ]
            },
            select: { time: true }
        });

        const bookedTimes = new Set(bookings.map(b => b.time));

        // Generate hourly slots between startTime and endTime
        const [startH, startM] = rule.startTime.split(':').map(Number);
        const [endH, endM] = rule.endTime.split(':').map(Number);

        const baseDate = set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        let current = set(baseDate, { hours: startH, minutes: startM });
        const end = set(baseDate, { hours: endH, minutes: endM });

        const slots = [];
        while (isBefore(current, end)) {
            const timeStr = format(current, 'HH:mm');
            slots.push({
                time: timeStr,
                displayTime: format(current, 'h:mm a'),
                available: !bookedTimes.has(timeStr),
            });
            current = addMinutes(current, 60);
        }

        return NextResponse.json({ slots });
    } catch (error: any) {
        console.error("AVAILABILITY_API_ERROR", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
