import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") return false;
    return true;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const vacancy = await prisma.jobVacancy.update({ where: { id }, data: body });
    return NextResponse.json(vacancy);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await prisma.jobVacancy.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
