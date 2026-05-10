import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const {
        referringType, ndisNumber, ndisStartDate, ndisEndDate, hasPastReports,
        participantFullName, participantDob, participantEmail, participantPhone,
        participantAddress, participantSuburb, participantState, participantPostcode,
        planManagementType, planManagerName,
        referrerFirstName, referrerLastName, referrerPhone, referrerEmail,
    } = body;

    if (!referringType || !ndisNumber || !participantFullName || !planManagementType) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const referral = await prisma.ndisReferral.create({
        data: {
            referringType, ndisNumber, ndisStartDate, ndisEndDate,
            hasPastReports: hasPastReports || null,
            participantFullName, participantDob, participantEmail, participantPhone,
            participantAddress, participantSuburb, participantState, participantPostcode,
            planManagementType, planManagerName: planManagerName || null,
            referrerFirstName: referrerFirstName || null,
            referrerLastName: referrerLastName || null,
            referrerPhone: referrerPhone || null,
            referrerEmail: referrerEmail || null,
        },
    });

    return NextResponse.json(referral, { status: 201 });
}

export async function GET() {
    const referrals = await prisma.ndisReferral.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(referrals);
}
