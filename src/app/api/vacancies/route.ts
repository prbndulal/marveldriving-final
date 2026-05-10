import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    const vacancies = await prisma.jobVacancy.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json(vacancies);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const vacancy = await prisma.jobVacancy.create({ data: body });
    return NextResponse.json(vacancy, { status: 201 });
}
