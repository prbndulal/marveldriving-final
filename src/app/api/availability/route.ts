import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format, getDay, addMinutes, isBefore, set } from 'date-fns';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dateStr = searchParams.get("date"); // yyyy-MM-dd

        if (!dateStr) {
            return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
        }

        const date = new Date(dateStr);
        const dayOfWeek = getDay(date);

        // 1. Fetch configured availability for this day
        const rule = await prisma.availability.findFirst({
            where: {
                dayOfWeek: dayOfWeek,
                isActive: true
            }
        });

        // 2. Fetch confirmed bookings + pending bookings created within the last 15 minutes
        const pendingCutoff = new Date(Date.now() - 15 * 60 * 1000);
        const bookings = await prisma.booking.findMany({
            where: {
                date: new Date(dateStr),
                OR: [
                    { status: 'confirmed' },
                    { status: 'pending', createdAt: { gte: pendingCutoff } }
                ]
            },
            select: { time: true }
        });

        const bookedTimes = new Set(bookings.map(b => b.time));

        // 3. Generate slots using logic
        let startH = 7, startM = 0, endH = 18, endM = 0;

        if (rule) {
            const [sh, sm] = rule.startTime.split(':').map(Number);
            const [eh, em] = rule.endTime.split(':').map(Number);
            startH = sh; startM = sm;
            endH = eh; endM = em;
        }

        const baseDate = set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        let current = set(baseDate, { hours: startH, minutes: startM });
        const end = set(baseDate, { hours: endH, minutes: endM });

        const slots = [];
        while (isBefore(current, end)) {
            const timeStr = format(current, 'HH:mm'); // Needs to match how time is stored
            const displayTime = format(current, 'h:mm a');

            slots.push({
                time: timeStr,
                displayTime: displayTime,
                available: !bookedTimes.has(timeStr) // Should actually match precisely. HH:MM vs HH:MM:SS
            });

            current = addMinutes(current, 60);
        }

        return NextResponse.json({ slots });
    } catch (error: any) {
        console.error("AVAILABILITY_API_ERROR", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
